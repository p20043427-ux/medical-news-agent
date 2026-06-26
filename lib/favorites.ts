"use client";

import { useCallback, useEffect, useState } from "react";

// 표현 즐겨찾기 — 언어별 네임스페이스로 localStorage에 저장. key는 표현 텍스트(안정적).
const storageKey = (ns: string) => `fav-${ns}`;
const EVENT = "favorites-changed";

export function getFavorites(ns: string): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(storageKey(ns)) || "[]"); } catch { return []; }
}

function setFavorites(ns: string, list: string[]) {
  try { window.localStorage.setItem(storageKey(ns), JSON.stringify(list)); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: ns }));
}

/** 즐겨찾기 목록과 토글 함수를 반환. 같은 ns의 다른 컴포넌트와 동기화된다. */
export function useFavorites(ns: string) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavorites(ns));
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === ns) setFavs(getFavorites(ns));
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, [ns]);

  const toggle = useCallback((key: string) => {
    const cur = getFavorites(ns);
    const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
    setFavorites(ns, next);
    setFavs(next);
  }, [ns]);

  const has = useCallback((key: string) => favs.includes(key), [favs]);

  return { favs, has, toggle };
}
