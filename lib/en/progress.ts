"use client";

import { useCallback, useEffect, useState } from "react";
import { queueRemotePush, HYDRATED_EVENT } from "@/lib/sync";

const KEY = "en-app-progress-v1";

const DEFAULT_EF = 2.5;
const MIN_EF = 1.3;

export interface EnCardState {
  due: string;           // yyyy-mm-dd
  reps: number;
  lapses: number;
  easeFactor: number;
  interval: number;      // days
  lastGrade?: number;
}

export interface EnProgress {
  cards: Record<string, EnCardState>;  // wordId → state
  daily: Record<string, number>;       // yyyy-mm-dd → count
  startedAt: string;
  xp: number;
  achievements: string[];
  goalDate?: string;
}

export type EnGrade = "again" | "hard" | "good" | "easy";

const GRADE_MAP: Record<EnGrade, number> = { again: 0, hard: 3, good: 4, easy: 5 };
const XP_MAP: Record<EnGrade, number> = { again: 2, hard: 10, good: 15, easy: 20 };

const EMPTY: EnProgress = {
  cards: {},
  daily: {},
  startedAt: todayKey(),
  xp: 0,
  achievements: [],
};

export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return todayKey(d);
}

function sm2(cur: EnCardState, q: number): { interval: number; easeFactor: number } {
  let { interval, easeFactor, reps } = cur;
  if (q >= 3) {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 6;
    else interval = Math.max(1, Math.round(interval * easeFactor));
  } else {
    interval = 1;
  }
  easeFactor = Math.max(MIN_EF, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return { interval, easeFactor };
}

function load(): EnProgress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) as EnProgress };
  } catch { /* ignore */ }
  return EMPTY;
}

function save(p: EnProgress) {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  queueRemotePush("en", p);
}

function bumpDaily(daily: Record<string, number>): Record<string, number> {
  const k = todayKey();
  return { ...daily, [k]: (daily[k] ?? 0) + 1 };
}

// ── 셀렉터 ──
export function isLearned(p: EnProgress, id: string): boolean {
  const c = p.cards[id];
  return !!c && c.reps >= 1 && c.interval >= 3;
}

export function learnedCount(p: EnProgress): number {
  return Object.entries(p.cards).filter(([id]) => isLearned(p, id)).length;
}

export function dueIds(p: EnProgress, pool?: string[]): string[] {
  const today = todayKey();
  return Object.entries(p.cards)
    .filter(([id, c]) => c.reps >= 1 && c.due <= today && (!pool || pool.includes(id)))
    .map(([id]) => id);
}

export function enStreak(p: EnProgress): number {
  let n = 0;
  const d = new Date();
  if (!p.daily[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (p.daily[todayKey(d)] > 0) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function enRecentDaily(p: EnProgress, n = 14): { date: Date; count: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return { date: d, count: p.daily[todayKey(d)] ?? 0 };
  });
}

export function totalEnReviews(p: EnProgress): number {
  return Object.values(p.daily).reduce((a, b) => a + b, 0);
}

// ── 상태 변경 ──
function applyMarkNew(p: EnProgress, id: string): EnProgress {
  const card: EnCardState = { due: addDays(1), reps: 1, lapses: 0, easeFactor: DEFAULT_EF, interval: 1 };
  return { ...p, cards: { ...p.cards, [id]: card }, daily: bumpDaily(p.daily), xp: p.xp + 5 };
}

function applyGrade(p: EnProgress, id: string, grade: EnGrade): EnProgress {
  const q = GRADE_MAP[grade];
  const cur = p.cards[id] ?? { due: todayKey(), reps: 0, lapses: 0, easeFactor: DEFAULT_EF, interval: 0 };
  const { interval, easeFactor } = sm2(cur, q);
  const lapses = grade === "again" ? cur.lapses + 1 : cur.lapses;
  return {
    ...p,
    cards: {
      ...p.cards,
      [id]: { due: addDays(interval), reps: cur.reps + 1, lapses, easeFactor, interval, lastGrade: q },
    },
    daily: bumpDaily(p.daily),
    xp: p.xp + XP_MAP[grade],
  };
}

// ── React 훅 ──
export function useEnProgress() {
  const [progress, setProgress] = useState<EnProgress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => { setProgress(load()); setReady(true); }, []);

  // 로그인 후 원격 진도가 로컬에 반영되면 다시 읽어들임
  useEffect(() => {
    const reload = () => setProgress(load());
    window.addEventListener(HYDRATED_EVENT, reload);
    return () => window.removeEventListener(HYDRATED_EVENT, reload);
  }, []);

  const markNew = useCallback((id: string) => {
    setProgress((prev) => { const next = applyMarkNew(prev, id); save(next); return next; });
  }, []);

  const grade = useCallback((id: string, g: EnGrade) => {
    setProgress((prev) => { const next = applyGrade(prev, id, g); save(next); return next; });
  }, []);

  const setGoalDate = useCallback((date: string | undefined) => {
    setProgress((prev) => { const next = { ...prev, goalDate: date }; save(next); return next; });
  }, []);

  const reset = useCallback(() => { save(EMPTY); setProgress(EMPTY); }, []);
  const exportJson = useCallback(() => JSON.stringify(progress), [progress]);
  const importJson = useCallback((json: string): boolean => {
    try {
      const p = JSON.parse(json) as EnProgress;
      if (!p?.cards) return false;
      const next = { ...EMPTY, ...p };
      save(next); setProgress(next); return true;
    } catch { return false; }
  }, []);

  return { progress, ready, markNew, grade, setGoalDate, reset, exportJson, importJson };
}
