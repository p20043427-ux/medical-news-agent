"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "jp-app-progress-v2";
const OLD_KEY = "jp-app-progress-v1";

/** Leitner 박스별 다음 복습까지 간격(일). box 0 = 미학습. */
const INTERVALS = [0, 1, 2, 4, 7, 15, 30];
const MAX_BOX = 6;
/** box 이상이면 '학습 완료'로 간주 */
const KNOWN_BOX = 3;

export interface CardState {
  /** Leitner 박스 (0~6) */
  box: number;
  /** 다음 복습 예정일 (yyyy-mm-dd) */
  due: string;
  /** 총 복습 횟수 */
  reps: number;
  /** 틀린 횟수 */
  lapses: number;
}

export interface Progress {
  /** 단어 id별 SRS 상태 */
  cards: Record<string, CardState>;
  /** 날짜별 학습 카드 수 (yyyy-mm-dd -> count) */
  daily: Record<string, number>;
  /** 학습 시작일 */
  startedAt: string;
  /** 목표 시험일 (yyyy-mm-dd) — D-day 계산용 */
  goalDate?: string;
}

export type Grade = "again" | "good" | "easy";

const EMPTY: Progress = {
  cards: {},
  daily: {},
  startedAt: todayKey(),
};

export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Progress) };
    // v1 → v2 마이그레이션
    const old = window.localStorage.getItem(OLD_KEY);
    if (old) {
      const o = JSON.parse(old) as {
        knownWords?: string[];
        studyWords?: string[];
        daily?: Record<string, number>;
        startedAt?: string;
      };
      const cards: Record<string, CardState> = {};
      (o.knownWords ?? []).forEach((id) => {
        cards[id] = { box: KNOWN_BOX, due: addDays(INTERVALS[KNOWN_BOX]), reps: 1, lapses: 0 };
      });
      (o.studyWords ?? []).forEach((id) => {
        cards[id] = { box: 1, due: todayKey(), reps: 1, lapses: 0 };
      });
      return { cards, daily: o.daily ?? {}, startedAt: o.startedAt ?? todayKey() };
    }
  } catch {
    /* 무시 */
  }
  return EMPTY;
}

function save(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* 무시 */
  }
}

function bumpDaily(daily: Record<string, number>): Record<string, number> {
  const k = todayKey();
  return { ...daily, [k]: (daily[k] ?? 0) + 1 };
}

// ───── 순수 셀렉터 ─────

export function isKnown(p: Progress, id: string): boolean {
  return (p.cards[id]?.box ?? 0) >= KNOWN_BOX;
}

export function knownCount(p: Progress): number {
  return Object.values(p.cards).filter((c) => c.box >= KNOWN_BOX).length;
}

/** 오늘 복습 대상 id (복습 예정일이 지난, 아직 미완료 카드) */
export function dueIds(p: Progress, pool?: string[]): string[] {
  const today = todayKey();
  return Object.entries(p.cards)
    .filter(([id, c]) => c.box >= 1 && c.box < MAX_BOX && c.due <= today && (!pool || pool.includes(id)))
    .map(([id]) => id);
}

/** 연속 학습일 (오늘 또는 어제부터 거꾸로) */
export function streak(p: Progress): number {
  const days = p.daily;
  let n = 0;
  const d = new Date();
  // 오늘 학습 안 했으면 어제부터 카운트
  if (!days[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (days[todayKey(d)] > 0) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/** 최근 N일 학습량 [{date, count}] (오래된→최신) */
export function recentDaily(p: Progress, n = 7): { date: Date; count: number }[] {
  const out: { date: Date; count: number }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ date: d, count: p.daily[todayKey(d)] ?? 0 });
  }
  return out;
}

/** 목표일까지 남은 일수 (D-day). 미설정 시 null */
export function daysUntilGoal(p: Progress): number | null {
  if (!p.goalDate) return null;
  const diff = new Date(p.goalDate).getTime() - new Date(todayKey()).getTime();
  return Math.round(diff / 86400000);
}

// ───── 상태 변경 ─────

function applySkim(p: Progress, id: string, known: boolean): Progress {
  const box = known ? KNOWN_BOX : 1;
  const cards = {
    ...p.cards,
    [id]: {
      box,
      due: addDays(INTERVALS[box]),
      reps: (p.cards[id]?.reps ?? 0) + 1,
      lapses: p.cards[id]?.lapses ?? 0,
    },
  };
  return { ...p, cards, daily: bumpDaily(p.daily) };
}

function applyGrade(p: Progress, id: string, grade: Grade): Progress {
  const cur = p.cards[id] ?? { box: 0, due: todayKey(), reps: 0, lapses: 0 };
  let box = cur.box;
  let lapses = cur.lapses;
  if (grade === "again") {
    box = 1;
    lapses += 1;
  } else if (grade === "good") {
    box = Math.min(box + 1, MAX_BOX);
  } else {
    box = Math.min(box + 2, MAX_BOX);
  }
  const cards = {
    ...p.cards,
    [id]: { box, due: addDays(INTERVALS[box]), reps: cur.reps + 1, lapses },
  };
  return { ...p, cards, daily: bumpDaily(p.daily) };
}

/** SRS 진도 훅 — localStorage 저장 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(load());
    setReady(true);
  }, []);

  const markSkim = useCallback((id: string, known: boolean) => {
    setProgress((prev) => {
      const next = applySkim(prev, id, known);
      save(next);
      return next;
    });
  }, []);

  const grade = useCallback((id: string, g: Grade) => {
    setProgress((prev) => {
      const next = applyGrade(prev, id, g);
      save(next);
      return next;
    });
  }, []);

  const setGoalDate = useCallback((date: string | undefined) => {
    setProgress((prev) => {
      const next = { ...prev, goalDate: date };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(EMPTY);
    setProgress(EMPTY);
  }, []);

  return { progress, ready, markSkim, grade, setGoalDate, reset };
}
