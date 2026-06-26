import { describe, it, expect } from "vitest";
import { sm2Core, DEFAULT_EF, MIN_EF } from "@/lib/learn/sm2";

describe("sm2Core", () => {
  const base = { interval: 1, easeFactor: DEFAULT_EF, reps: 0 };

  it("첫 번째 정답(q=5): interval=1, EF 증가", () => {
    const res = sm2Core({ ...base, reps: 0 }, 5);
    expect(res.interval).toBe(1);
    expect(res.easeFactor).toBeGreaterThan(DEFAULT_EF);
  });

  it("두 번째 정답(q=4): interval=6", () => {
    const res = sm2Core({ interval: 1, easeFactor: DEFAULT_EF, reps: 1 }, 4);
    expect(res.interval).toBe(6);
  });

  it("세 번째 정답: interval = prev * EF (반올림)", () => {
    const res = sm2Core({ interval: 6, easeFactor: 2.5, reps: 2 }, 4);
    expect(res.interval).toBe(Math.round(6 * 2.5));
  });

  it("오답(q=2): interval=1로 리셋", () => {
    const res = sm2Core({ interval: 30, easeFactor: DEFAULT_EF, reps: 5 }, 2);
    expect(res.interval).toBe(1);
  });

  it("EF는 MIN_EF(1.3) 미만으로 내려가지 않는다", () => {
    let state = { interval: 1, easeFactor: 1.3, reps: 0 };
    for (let i = 0; i < 10; i++) {
      const res = sm2Core(state, 0);
      expect(res.easeFactor).toBeGreaterThanOrEqual(MIN_EF);
      state = { ...state, easeFactor: res.easeFactor };
    }
  });

  it("경계값 q=3: 정답으로 처리", () => {
    const res = sm2Core({ ...base, reps: 0 }, 3);
    expect(res.interval).toBe(1);
  });

  it("EF 계산: q=5 최고점에서 EF 최대 증가 (0.1 순증가)", () => {
    const res = sm2Core(base, 5);
    expect(res.easeFactor).toBeCloseTo(DEFAULT_EF + 0.1, 5);
  });
});
