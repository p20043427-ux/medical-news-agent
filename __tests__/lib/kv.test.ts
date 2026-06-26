import { describe, it, expect, beforeEach } from "vitest";
import { kv } from "@/lib/platform/kv";

// jsdom provides localStorage; clear it between tests
beforeEach(() => {
  window.localStorage.clear();
});

describe("kv.get / kv.set", () => {
  it("없는 키는 null 반환", () => {
    expect(kv.get("missing")).toBeNull();
  });

  it("set → get 왕복", () => {
    kv.set("foo", "bar");
    expect(kv.get("foo")).toBe("bar");
  });

  it("remove 후 null 반환", () => {
    kv.set("k", "v");
    kv.remove("k");
    expect(kv.get("k")).toBeNull();
  });
});

describe("kv.getJSON / kv.setJSON", () => {
  it("없는 키는 fallback 반환", () => {
    expect(kv.getJSON("nope", [])).toEqual([]);
  });

  it("setJSON → getJSON 왕복", () => {
    kv.setJSON("obj", { x: 1 });
    expect(kv.getJSON("obj", {})).toEqual({ x: 1 });
  });

  it("손상된 JSON은 fallback 반환", () => {
    window.localStorage.setItem("bad", "{broken");
    expect(kv.getJSON("bad", "safe")).toBe("safe");
  });

  it("배열 저장/복원", () => {
    kv.setJSON("arr", [1, 2, 3]);
    expect(kv.getJSON<number[]>("arr", [])).toEqual([1, 2, 3]);
  });
});
