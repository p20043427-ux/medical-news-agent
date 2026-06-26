"use client";

import { useEffect, useState } from "react";
import { kv } from "@/lib/platform/kv";

// 일일 활동 카운터(미션용) — 언어별, 날짜 바뀌면 자동 리셋.
export type ActivityType = "conversation" | "exam" | "roleplay";
export type Activity = Record<ActivityType, number>;

const EMPTY: Activity = { conversation: 0, exam: 0, roleplay: 0 };
const key = (lang: "jp" | "en") => `daily-activity-${lang}`;
const EVENT = "daily-activity-changed";
const today = () => new Date().toISOString().slice(0, 10);

export function getActivity(lang: "jp" | "en"): Activity {
  const o = kv.getJSON<{ date?: string; act?: Partial<Activity> }>(key(lang), {});
  return o.date === today() ? { ...EMPTY, ...o.act } : { ...EMPTY };
}

export function bumpActivity(lang: "jp" | "en", type: ActivityType) {
  const cur = getActivity(lang);
  cur[type] = (cur[type] || 0) + 1;
  kv.setJSON(key(lang), { date: today(), act: cur });
  window.dispatchEvent(new CustomEvent(EVENT, { detail: lang }));
}

export function useDailyActivity(lang: "jp" | "en"): Activity {
  const [act, setAct] = useState<Activity>(EMPTY);
  useEffect(() => {
    setAct(getActivity(lang));
    const h = (e: Event) => { if ((e as CustomEvent).detail === lang) setAct(getActivity(lang)); };
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, [lang]);
  return act;
}
