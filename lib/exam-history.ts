"use client";

// 모의시험 응시 이력 — 언어별 저장(kv). MockExam과 분석 화면이 공용으로 사용.
import { kv } from "@/lib/platform/kv";

export type ExamAttempt = { t: number; round: string; diff: string; pct: number };

const key = (lang: "jp" | "en" | "ko") => `${lang}-exam-history`;

export function getExamHistory(lang: "jp" | "en" | "ko"): ExamAttempt[] {
  return kv.getJSON<ExamAttempt[]>(key(lang), []);
}

export function pushExamHistory(lang: "jp" | "en" | "ko", a: ExamAttempt) {
  const arr = getExamHistory(lang);
  arr.push(a);
  kv.setJSON(key(lang), arr.slice(-100));
}
