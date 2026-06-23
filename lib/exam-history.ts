"use client";

// 모의시험 응시 이력 — 언어별 localStorage. MockExam과 분석 화면이 공용으로 사용.
export type ExamAttempt = { t: number; round: string; diff: string; pct: number };

const key = (lang: "jp" | "en" | "ko") => `${lang}-exam-history`;

export function getExamHistory(lang: "jp" | "en" | "ko"): ExamAttempt[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(key(lang)) || "[]"); } catch { return []; }
}

export function pushExamHistory(lang: "jp" | "en" | "ko", a: ExamAttempt) {
  try {
    const arr = getExamHistory(lang);
    arr.push(a);
    window.localStorage.setItem(key(lang), JSON.stringify(arr.slice(-100)));
  } catch { /* ignore */ }
}
