"use client";

import { useEffect, useState } from "react";
import { kv } from "@/lib/platform/kv";

export type Theme = "light" | "dark" | "system";
// layout.tsx의 FOUC 방지 부트 스크립트와 동일한 키를 사용해야
// 새로고침 시 사용자가 고른 테마가 즉시 적용된다.
const KEY = "app-theme";

export function getStoredTheme(): Theme {
  return (kv.get(KEY) as Theme) ?? "system";
}

function resolve(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolve(theme));
}

/** 테마 상태 훅 (light/dark/system) */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored); // 부트 스크립트 누락 시 방어적으로 재적용
  }, []);

  const change = (t: Theme) => {
    setTheme(t);
    kv.set(KEY, t);
    applyTheme(t);
  };

  // 시스템 테마 변경 추적
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const fn = () => applyTheme("system");
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [theme]);

  return { theme, change };
}
