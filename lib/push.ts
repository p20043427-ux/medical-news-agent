"use client";

import { getSupabase } from "./supabase/client";

// 웹 푸시(VAPID) 클라이언트 헬퍼.
// NEXT_PUBLIC_VAPID_PUBLIC_KEY 가 설정되고 백엔드(push_subscriptions 테이블 +
// send-reminders 엣지 함수 + cron)가 배포되어 있어야 실제로 동작한다.
// 미설정 시 모든 함수가 안전하게 false 를 반환하므로 로컬 리마인더로 폴백된다.

export const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

export function webPushSupported(): boolean {
  return typeof window !== "undefined"
    && "serviceWorker" in navigator
    && "PushManager" in window
    && "Notification" in window
    && !!VAPID_PUBLIC_KEY;
}

function urlBase64ToBuffer(base64: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const buf = new ArrayBuffer(raw.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < raw.length; i++) view[i] = raw.charCodeAt(i);
  return buf;
}

/** 구독을 만들고 Supabase 에 저장. 성공 시 true. */
export async function subscribeWebPush(time: string, lang: "jp" | "en"): Promise<boolean> {
  if (!webPushSupported()) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (Notification.permission !== "granted") {
      const p = await Notification.requestPermission();
      if (p !== "granted") return false;
    }
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToBuffer(VAPID_PUBLIC_KEY),
      });
    }
    const j = sub.toJSON();
    const sb = getSupabase();
    if (sb) {
      const { data: auth } = await sb.auth.getUser();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      await sb.from("push_subscriptions").upsert(
        { endpoint: j.endpoint, subscription: j, time, tz, lang, user_id: auth.user?.id ?? null, enabled: true },
        { onConflict: "endpoint" },
      );
    }
    return true;
  } catch {
    return false;
  }
}

/** 구독 해제 + 서버 비활성화. */
export async function unsubscribeWebPush(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    const endpoint = sub.toJSON().endpoint;
    await sub.unsubscribe();
    const sb = getSupabase();
    if (sb && endpoint) await sb.from("push_subscriptions").update({ enabled: false }).eq("endpoint", endpoint);
  } catch { /* ignore */ }
}
