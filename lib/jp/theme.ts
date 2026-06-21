"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const KEY = "jp-app-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (window.localStorage.getItem(KEY) as Theme) ?? "system";
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
    setTheme(getStoredTheme());
  }, []);

  const change = (t: Theme) => {
    setTheme(t);
    window.localStorage.setItem(KEY, t);
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
