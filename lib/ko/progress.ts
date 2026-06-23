"use client";

import { useCallback, useEffect, useState } from "react";
import { sm2Core, DEFAULT_EF } from "@/lib/learn/sm2";

const KEY = "ko-app-progress-v1";

export interface KoCardState {
  due: string;
  reps: number;
  lapses: number;
  easeFactor: number;
  interval: number;
}

export interface KoProgress {
  cards: Record<string, KoCardState>;
  daily: Record<string, number>;
  startedAt: string;
  xp: number;
}

export type KoGrade = "again" | "hard" | "good" | "easy";
const GRADE_Q: Record<KoGrade, number> = { again: 0, hard: 3, good: 4, easy: 5 };
const GRADE_XP: Record<KoGrade, number> = { again: 2, hard: 10, good: 15, easy: 20 };

export function todayKey(d: Date = new Date()): string { return d.toISOString().slice(0, 10); }
function addDays(n: number): string { const d = new Date(); d.setDate(d.getDate() + n); return todayKey(d); }

const EMPTY: KoProgress = { cards: {}, daily: {}, startedAt: todayKey(), xp: 0 };

function load(): KoProgress {
  if (typeof window === "undefined") return EMPTY;
  try { const raw = window.localStorage.getItem(KEY); if (raw) return { ...EMPTY, ...JSON.parse(raw) as KoProgress }; } catch { /* ignore */ }
  return EMPTY;
}
function save(p: KoProgress) { try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } }
function bumpDaily(d: Record<string, number>) { const k = todayKey(); return { ...d, [k]: (d[k] ?? 0) + 1 }; }

export function isKoLearned(p: KoProgress, id: string): boolean {
  const c = p.cards[id]; return !!c && c.reps >= 1 && c.interval >= 3;
}
export function koLearnedCount(p: KoProgress): number {
  return Object.values(p.cards).filter((c) => c.reps >= 1 && c.interval >= 3).length;
}
export function koDueIds(p: KoProgress, pool?: string[]): string[] {
  const today = todayKey();
  return Object.entries(p.cards).filter(([id, c]) => c.reps >= 1 && c.due <= today && (!pool || pool.includes(id))).map(([id]) => id);
}
export function koStreak(p: KoProgress): number {
  let n = 0;
  for (let i = 0; ; i++) { const d = new Date(); d.setDate(d.getDate() - i); if ((p.daily[todayKey(d)] ?? 0) > 0) n++; else if (i > 0) break; }
  return n;
}

export function useKoProgress() {
  const [progress, setProgress] = useState<KoProgress>(EMPTY);
  const [ready, setReady] = useState(false);
  useEffect(() => { setProgress(load()); setReady(true); }, []);

  const persist = useCallback((next: KoProgress) => { setProgress(next); save(next); }, []);

  const markNew = useCallback((id: string) => {
    setProgress((p) => {
      if (p.cards[id]) return p;
      const next = { ...p, cards: { ...p.cards, [id]: { due: addDays(1), reps: 1, lapses: 0, easeFactor: DEFAULT_EF, interval: 1 } }, daily: bumpDaily(p.daily), xp: p.xp + 5 };
      save(next); return next;
    });
  }, []);

  const grade = useCallback((id: string, g: KoGrade) => {
    setProgress((p) => {
      const cur = p.cards[id] ?? { due: todayKey(), reps: 0, lapses: 0, easeFactor: DEFAULT_EF, interval: 0 };
      const { interval, easeFactor } = sm2Core(cur, GRADE_Q[g]);
      const card: KoCardState = { due: addDays(interval), reps: cur.reps + 1, lapses: cur.lapses + (g === "again" ? 1 : 0), easeFactor, interval };
      const next = { ...p, cards: { ...p.cards, [id]: card }, daily: bumpDaily(p.daily), xp: p.xp + GRADE_XP[g] };
      save(next); return next;
    });
  }, []);

  const reset = useCallback(() => persist(EMPTY), [persist]);

  return { progress, ready, markNew, grade, reset };
}
