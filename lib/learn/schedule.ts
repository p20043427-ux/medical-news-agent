// 학습 진도 모듈(jp/ko)이 공유하는 날짜·등급 유틸.
// 카드 모델과 훅은 언어별로 다르므로 통합하지 않고, 진짜 중복인 원시 함수만 모은다.

/** 로컬 기준 yyyy-mm-dd 키. */
export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** 오늘(또는 from)로부터 n일 뒤의 yyyy-mm-dd. */
export function addDays(n: number, from: Date = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + n);
  return todayKey(d);
}

/** 오늘자 학습 카운트를 1 증가시킨 새 daily 맵. */
export function bumpDaily(daily: Record<string, number>): Record<string, number> {
  const k = todayKey();
  return { ...daily, [k]: (daily[k] ?? 0) + 1 };
}

/** 4단계 자기평가 등급(jp/ko 공통). */
export type SrsGrade = "again" | "hard" | "good" | "easy";

/** 등급 → SM-2 품질점수 q(0~5). */
export const GRADE_Q: Record<SrsGrade, number> = { again: 0, hard: 3, good: 4, easy: 5 };

/** 등급 → 획득 XP. */
export const GRADE_XP: Record<SrsGrade, number> = { again: 2, hard: 10, good: 15, easy: 20 };
