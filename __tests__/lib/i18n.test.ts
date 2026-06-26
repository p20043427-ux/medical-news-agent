import { describe, it, expect } from "vitest";
import { tt } from "@/lib/i18n";

describe("tt (inline translation helper)", () => {
  it("lang=ko → 한국어 반환", () => {
    expect(tt("ko", "안녕", "こんにちは")).toBe("안녕");
  });

  it("lang=ja → 일본어 반환", () => {
    expect(tt("ja", "안녕", "こんにちは")).toBe("こんにちは");
  });

  it("빈 문자열도 그대로 반환", () => {
    expect(tt("ko", "", "ja-str")).toBe("");
    expect(tt("ja", "ko-str", "")).toBe("");
  });
});
