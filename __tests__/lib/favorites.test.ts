import { describe, it, expect, beforeEach } from "vitest";
import { getFavorites } from "@/lib/favorites";

beforeEach(() => {
  window.localStorage.clear();
});

describe("getFavorites", () => {
  it("저장 없이 빈 배열 반환", () => {
    expect(getFavorites("test")).toEqual([]);
  });

  it("손상된 JSON은 빈 배열 반환", () => {
    window.localStorage.setItem("fav-test", "{corrupt");
    expect(getFavorites("test")).toEqual([]);
  });

  it("네임스페이스가 다르면 서로 격리", () => {
    window.localStorage.setItem("fav-ns1", JSON.stringify(["a"]));
    window.localStorage.setItem("fav-ns2", JSON.stringify(["b"]));
    expect(getFavorites("ns1")).toEqual(["a"]);
    expect(getFavorites("ns2")).toEqual(["b"]);
  });
});
