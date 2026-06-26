"use client";

import { useCallback, useEffect, useState } from "react";
import { kv } from "@/lib/platform/kv";

// 표현 즐겨찾기 — 언어별 네임스페이스로 저장(kv). key는 표현 텍스트(안정적).
const storageKey = (ns: string) => `fav-${ns}`;
const EVENT = "favorites-changed";

export function getFavorites(ns: string): string[] {
  return kv.getJSON<string[]>(storageKey(ns), []);
}

function setFavorites(ns: string, list: string[]) {
  kv.setJSON(storageKey(ns), list);
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
