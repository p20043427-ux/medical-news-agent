"use client";

import { useCallback, useEffect, useState } from "react";
import { queueRemotePush, HYDRATED_EVENT } from "@/lib/sync";
import { sm2Core, DEFAULT_EF } from "@/lib/learn/sm2";

const KEY = "jp-app-progress-v3";

export interface CardState {
  box: number;          // 0=신규, 1~5=학습중, 6=완료 (하위 호환)
  due: string;          // yyyy-mm-dd
  reps: number;
  lapses: number;
  easeFactor: number;   // SM-2 EF (default 2.5)
  interval: number;     // 다음 복습까지 일 수
  lastGrade?: number;   // 마지막 점수 0~5
}

export interface Progress {
  cards: Record<string, CardState>;
  daily: Record<string, number>;  // yyyy-mm-dd → count
  startedAt: string;
  goalDate?: string;
  xp: number;
  achievements: string[];
  bookmarks: string[];            // persisted word ids
  mistakes: string[];             // 영구 오답 단어 id (오답노트)
  dailyGoal?: number;             // 일일 목표 카드 수 (기본 20)
}

export type Grade = "again" | "hard" | "good" | "easy";

const GRADE_MAP: Record<Grade, number> = { again: 0, hard: 3, good: 4, easy: 5 };
const XP_MAP: Record<Grade, number> = { again: 2, hard: 10, good: 15, easy: 20 };

const EMPTY: Progress = {
  cards: {},
  daily: {},
  startedAt: todayKey(),
  xp: 0,
  achievements: [],
  bookmarks: [],
  mistakes: [],
};

export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

// ── SM-2 알고리즘 ──
function sm2(cur: CardState, q: number): { interval: number; easeFactor: number; box: number } {
  const { interval, easeFactor } = sm2Core(cur, q);
  const box = q >= 3 ? Math.min(cur.box + 1, 6) : 1;
  return { interval, easeFactor, box };
}

function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Progress;
      // 기존 카드에 SM-2 필드 기본값 보장
      const cards: Record<string, CardState> = {};
      for (const [id, c] of Object.entries(parsed.cards)) {
        cards[id] = {
          ...c,
          easeFactor: c.easeFactor ?? DEFAULT_EF,
          interval: c.interval ?? (c.box <= 1 ? 1 : c.box <= 2 ? 2 : c.box <= 3 ? 4 : c.box <= 4 ? 7 : 15),
        };
      }
      return { ...parsed, xp: parsed.xp ?? 0, achievements: parsed.achievements ?? [], bookmarks: parsed.bookmarks ?? [], mistakes: parsed.mistakes ?? [], cards };
    }
    // 이전 버전 마이그레이션
    const old = window.localStorage.getItem("jp-app-progress-v2");
    if (old) {
      const o = JSON.parse(old) as { cards?: Record<string, Partial<CardState>>; daily?: Record<string, number>; startedAt?: string };
      const cards: Record<string, CardState> = {};
      for (const [id, c] of Object.entries(o.cards ?? {})) {
        cards[id] = {
          box: c.box ?? 0,
          due: c.due ?? todayKey(),
          reps: c.reps ?? 0,
          lapses: c.lapses ?? 0,
          easeFactor: DEFAULT_EF,
          interval: c.box ? (c.box <= 1 ? 1 : c.box <= 3 ? 4 : 15) : 0,
        };
      }
      return { cards, daily: o.daily ?? {}, startedAt: o.startedAt ?? todayKey(), xp: 0, achievements: [], bookmarks: [], mistakes: [] };
    }
  } catch { /* ignore */ }
  return EMPTY;
}

function save(p: Progress) {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  queueRemotePush("jp", p);
}

function bumpDaily(daily: Record<string, number>): Record<string, number> {
  const k = todayKey();
  return { ...daily, [k]: (daily[k] ?? 0) + 1 };
}

// ── 셀렉터 ──
export function isKnown(p: Progress, id: string): boolean {
  return (p.cards[id]?.box ?? 0) >= 3;
}
export function knownCount(p: Progress): number {
  return Object.values(p.cards).filter((c) => c.box >= 3).length;
}
export function dueIds(p: Progress, pool?: string[]): string[] {
  const today = todayKey();
  return Object.entries(p.cards)
    .filter(([id, c]) => c.box >= 1 && c.box < 6 && c.due <= today && (!pool || pool.includes(id)))
    .map(([id]) => id);
}
export function streak(p: Progress): number {
  const days = p.daily;
  let n = 0;
  const d = new Date();
  if (!days[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (days[todayKey(d)] > 0) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
export function recentDaily(p: Progress, n = 14): { date: Date; count: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return { date: d, count: p.daily[todayKey(d)] ?? 0 };
  });
}
export function daysUntilGoal(p: Progress): number | null {
  if (!p.goalDate) return null;
  return Math.round((new Date(p.goalDate).getTime() - new Date(todayKey()).getTime()) / 86400000);
}
export function totalReviews(p: Progress): number {
  return Object.values(p.daily).reduce((a, b) => a + b, 0);
}

// ── 상태 변경 ──
function applyMarkNew(p: Progress, id: string, known: boolean): Progress {
  const box = known ? 3 : 1;
  const interval = known ? 4 : 1;
  return {
    ...p,
    cards: {
      ...p.cards,
      [id]: { box, due: addDays(interval), reps: (p.cards[id]?.reps ?? 0) + 1, lapses: 0, easeFactor: DEFAULT_EF, interval },
    },
    daily: bumpDaily(p.daily),
    xp: p.xp + (known ? 8 : 5),
  };
}

function applyGrade(p: Progress, id: string, grade: Grade): Progress {
  const q = GRADE_MAP[grade];
  const xpGain = XP_MAP[grade];
  const cur = p.cards[id] ?? { box: 0, due: todayKey(), reps: 0, lapses: 0, easeFactor: DEFAULT_EF, interval: 0 };
  const { interval, easeFactor, box } = sm2(cur, q);
  const lapses = grade === "again" ? cur.lapses + 1 : cur.lapses;

  const newCard: CardState = {
    box,
    due: addDays(interval),
    reps: cur.reps + 1,
    lapses,
    easeFactor,
    interval,
    lastGrade: q,
  };

  const cards = { ...p.cards, [id]: newCard };
  // 오답노트: 틀리면(again) 추가, 맞히면(good/easy) 제거
  const mset = new Set(p.mistakes ?? []);
  if (grade === "again") mset.add(id);
  else if (grade === "good" || grade === "easy") mset.delete(id);
  return { ...p, cards, daily: bumpDaily(p.daily), xp: p.xp + xpGain, mistakes: [...mset] };
}

function applyToggleBookmark(p: Progress, id: string): Progress {
  const existing = p.bookmarks ?? [];
  const bookmarks = existing.includes(id)
    ? existing.filter((b) => b !== id)
    : [...existing, id];
  return { ...p, bookmarks };
}

// ── React 훅 ──
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => { setProgress(load()); setReady(true); }, []);

  // 로그인 후 원격 진도가 로컬에 반영되면 다시 읽어들임
  useEffect(() => {
    const reload = () => setProgress(load());
    window.addEventListener(HYDRATED_EVENT, reload);
    return () => window.removeEventListener(HYDRATED_EVENT, reload);
  }, []);

  const markNew = useCallback((id: string, known: boolean) => {
    setProgress((prev) => { const next = applyMarkNew(prev, id, known); save(next); return next; });
  }, []);

  const grade = useCallback((id: string, g: Grade) => {
    setProgress((prev) => { const next = applyGrade(prev, id, g); save(next); return next; });
  }, []);

  const setGoalDate = useCallback((date: string | undefined) => {
    setProgress((prev) => { const next = { ...prev, goalDate: date }; save(next); return next; });
  }, []);

  const setDailyGoal = useCallback((n: number) => {
    setProgress((prev) => { const next = { ...prev, dailyGoal: n }; save(next); return next; });
  }, []);

  const reset = useCallback(() => { save(EMPTY); setProgress(EMPTY); }, []);

  const exportJson = useCallback(() => JSON.stringify(progress), [progress]);

  const importJson = useCallback((json: string): boolean => {
    try {
      const p = JSON.parse(json) as Progress;
      if (!p?.cards) return false;
      const next = { ...EMPTY, ...p };
      save(next); setProgress(next); return true;
    } catch { return false; }
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setProgress((prev) => { const next = applyToggleBookmark(prev, id); save(next); return next; });
  }, []);

  const addMistakes = useCallback((ids: string[]) => {
    setProgress((prev) => {
      const m = new Set(prev.mistakes ?? []);
      ids.forEach((i) => m.add(i));
      const next = { ...prev, mistakes: [...m] };
      save(next); return next;
    });
  }, []);

  return { progress, ready, markNew, grade, setGoalDate, setDailyGoal, reset, exportJson, importJson, toggleBookmark, addMistakes };
}

// 하위 호환 alias
export const markSkim = (
  setter: (id: string, known: boolean) => void
) => setter;
