// SM-2 간격 반복 핵심 알고리즘 — 일본어/영어 progress 모듈이 공유.
// 동작은 기존 각 모듈의 구현과 동일.

export const DEFAULT_EF = 2.5;
export const MIN_EF = 1.3;

export interface Sm2Input {
  interval: number;
  easeFactor: number;
  reps: number;
}

/**
 * 품질 점수 q(0~5)에 따라 다음 간격(일)과 EF를 계산한다.
 * q>=3 정답: reps 0→1일, 1→6일, 이후 interval*EF. q<3 오답: 1일 리셋.
 */
export function sm2Core(cur: Sm2Input, q: number): { interval: number; easeFactor: number } {
  let { interval, easeFactor } = cur;
  if (q >= 3) {
    if (cur.reps === 0) interval = 1;
    else if (cur.reps === 1) interval = 6;
    else interval = Math.max(1, Math.round(interval * easeFactor));
  } else {
    interval = 1;
  }
  easeFactor = Math.max(MIN_EF, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return { interval, easeFactor };
}
