import { describe, it, expect } from "vitest";
import { todayKey, addDays, bumpDaily, GRADE_Q, GRADE_XP } from "@/lib/learn/schedule";

describe("schedule (jp/ko 공유 유틸)", () => {
  it("todayKey 는 yyyy-mm-dd 형식", () => {
    const k = todayKey(new Date("2026-06-26T09:00:00Z"));
    expect(k).toBe("2026-06-26");
  });

  it("addDays 는 기준일로부터 n일 뒤", () => {
    const base = new Date("2026-06-26T00:00:00Z");
    expect(addDays(1, base)).toBe("2026-06-27");
    expect(addDays(7, base)).toBe("2026-07-03");
    expect(addDays(0, base)).toBe("2026-06-26");
  });

  it("bumpDaily 는 오늘 카운트만 1 증가시키고 다른 날은 보존", () => {
    const today = todayKey();
    const before = { "2020-01-01": 5 };
    const after = bumpDaily(before);
    expect(after["2020-01-01"]).toBe(5);     // 기존 보존
    expect(after[today]).toBe(1);            // 신규 +1
    expect(before).not.toHaveProperty(today); // 불변성: 원본 미변경
  });

  it("등급 맵은 again<hard<good<easy 순서로 q·xp 정의", () => {
    expect(GRADE_Q).toEqual({ again: 0, hard: 3, good: 4, easy: 5 });
    expect(GRADE_XP).toEqual({ again: 2, hard: 10, good: 15, easy: 20 });
  });
});
