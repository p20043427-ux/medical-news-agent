"use client";

import { useCallback, useEffect, useState } from "react";
import { kv } from "@/lib/platform/kv";

// 롤플레이 완료 기록 — ns별(jp/en) 저장(kv). 값 = 최소 실수 횟수(베스트).
const storageKey = (ns: string) => `roleplay-${ns}`;
const EVENT = "roleplay-changed";

export function getRoleplay(ns: string): Record<string, number> {
  return kv.getJSON<Record<string, number>>(storageKey(ns), {});
}

function persist(ns: string, v: Record<string, number>) {
  kv.setJSON(storageKey(ns), v);
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
