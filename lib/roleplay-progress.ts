"use client";

import { useCallback, useEffect, useState } from "react";

// 롤플레이 완료 기록 — ns별(jp/en) localStorage. 값 = 최소 실수 횟수(베스트).
const storageKey = (ns: string) => `roleplay-${ns}`;
const EVENT = "roleplay-changed";

export function getRoleplay(ns: string): Record<string, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(storageKey(ns)) || "{}"); } catch { return {}; }
}

function persist(ns: string, v: Record<string, number>) {
  try { window.localStorage.setItem(storageKey(ns), JSON.stringify(v)); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: ns }));
}

export function useRoleplay(ns: string) {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    setData(getRoleplay(ns));
    const h = (e: Event) => { if ((e as CustomEvent).detail === ns) setData(getRoleplay(ns)); };
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, [ns]);

  const record = useCallback((id: string, mistakes: number) => {
    const cur = getRoleplay(ns);
    if (cur[id] === undefined || mistakes < cur[id]) {
      const next = { ...cur, [id]: mistakes };
      persist(ns, next);
      setData(next);
    }
  }, [ns]);

  return { data, record };
}
