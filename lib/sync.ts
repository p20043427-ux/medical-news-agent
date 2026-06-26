"use client";

import { getSupabase } from "./supabase/client";
import { kv } from "@/lib/platform/kv";

export type Lang = "jp" | "en";

// 진도 데이터의 localStorage 키 (각 progress 모듈과 동일하게 유지)
export const STORAGE_KEYS: Record<Lang, string> = {
  jp: "jp-app-progress-v3",
  en: "en-app-progress-v1",
};

// 하이드레이션(원격 → 로컬) 직후 훅들이 다시 읽도록 알리는 이벤트
export const HYDRATED_EVENT = "lingua:hydrated";

const timers: Partial<Record<Lang, ReturnType<typeof setTimeout>>> = {};

/** 저장 시 호출 — 디바운스 후 로그인 상태면 Supabase 에 업서트 */
export function queueRemotePush(lang: Lang, data: unknown): void {
  const sb = getSupabase();
  if (!sb) return;
  if (timers[lang]) clearTimeout(timers[lang]);
  timers[lang] = setTimeout(() => {
    void pushNow(lang, data);
  }, 1200);
}

async function pushNow(lang: Lang, data: unknown): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { data: auth } = await sb.auth.getUser();
  const user = auth.user;
  if (!user) return;
  await sb
    .from("user_progress")
    .upsert(
      { user_id: user.id, lang, data, updated_at: new Date().toISOString() },
      { onConflict: "user_id,lang" }
    );
}

/** 로그인 직후: 원격 진도를 로컬에 내려받고 훅에 반영 알림 */
export async function hydrateFromRemote(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { data: auth } = await sb.auth.getUser();
  const user = auth.user;
  if (!user) return;

  const { data, error } = await sb
    .from("user_progress")
    .select("lang,data")
    .eq("user_id", user.id);
  if (error || !data) return;

  let changed = false;
  for (const row of data as { lang: Lang; data: unknown }[]) {
    const key = STORAGE_KEYS[row.lang];
    if (key && row.data) {
      kv.set(key, JSON.stringify(row.data));
      changed = true;
    }
  }
  if (changed) window.dispatchEvent(new Event(HYDRATED_EVENT));
}

/** 첫 로그인: 원격에 없는 언어는 게스트(로컬) 진도를 올려 이어서 학습 */
export async function pushLocalIfRemoteEmpty(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { data: auth } = await sb.auth.getUser();
  const user = auth.user;
  if (!user) return;

  const { data } = await sb
    .from("user_progress")
    .select("lang")
    .eq("user_id", user.id);
  const existing = new Set((data ?? []).map((r: { lang: string }) => r.lang));

  for (const lang of ["jp", "en"] as Lang[]) {
    if (existing.has(lang)) continue;
    const raw = kv.get(STORAGE_KEYS[lang]);
    if (!raw) continue;
    try {
      await sb.from("user_progress").upsert(
        {
          user_id: user.id,
          lang,
          data: JSON.parse(raw),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lang" }
      );
    } catch {
      /* ignore */
    }
  }
}
