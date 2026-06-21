"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "jp-app-progress-v1";

export interface Progress {
  /** 학습 완료한 단어 id 목록 */
  knownWords: string[];
  /** 학습할 단어로 표시한 id 목록 */
  studyWords: string[];
  /** 날짜별 학습한 카드 수 (yyyy-mm-dd -> count) */
  daily: Record<string, number>;
  /** 연속 학습일 기준 시작일 등 메타 */
  startedAt: string;
}

const EMPTY: Progress = {
  knownWords: [],
  studyWords: [],
  daily: {},
  startedAt: new Date().toISOString().slice(0, 10),
};

function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Progress) };
  } catch {
    return EMPTY;
  }
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** 진도 상태 훅 — localStorage 에 저장된다. */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(load());
    setReady(true);
  }, []);

  const persist = useCallback((next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* 저장 실패는 무시 */
    }
  }, []);

  const markWord = useCallback(
    (id: string, known: boolean) => {
      setProgress((prev) => {
        const knownWords = new Set(prev.knownWords);
        const studyWords = new Set(prev.studyWords);
        if (known) {
          knownWords.add(id);
          studyWords.delete(id);
        } else {
          studyWords.add(id);
          knownWords.delete(id);
        }
        const day = todayKey();
        const next: Progress = {
          ...prev,
          knownWords: [...knownWords],
          studyWords: [...studyWords],
          daily: { ...prev.daily, [day]: (prev.daily[day] ?? 0) + 1 },
        };
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* 무시 */
        }
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  return { progress, ready, markWord, reset };
}
