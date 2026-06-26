"use client";

import { useEffect } from "react";
import { kv } from "@/lib/platform/kv";

// 로컬 학습 리마인더. 서버 없는 환경이라 '앱이 열려 있을 때' 예약 알림을 띄운다.
const KEY = "study-reminder";
const LAST = "study-reminder-last";

export interface Reminder { enabled: boolean; time: string } // time = "HH:MM"

export function getReminder(): Reminder {
  const def: Reminder = { enabled: false, time: "20:00" };
  return { ...def, ...kv.getJSON<Partial<Reminder>>(KEY, {}) };
}
export function setReminder(r: Reminder) {
  kv.setJSON(KEY, r);
}

export function notificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}
export function permissionState(): NotificationPermission | "unsupported" {
  return notificationsSupported() ? Notification.permission : "unsupported";
}
export async function requestPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return "denied";
  try { return await Notification.requestPermission(); } catch { return "denied"; }
}

export async function fireStudyNotification(test = false) {
  if (!notificationsSupported() || Notification.permission !== "granted") return;
  const title = "오늘의 학습 시간이에요 📚";
  const body = test ? "리마인더가 이렇게 표시돼요." : "잠깐이면 충분해요. 오늘 목표를 채워볼까요?";
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, { body, icon: "/icons/icon-192.png", badge: "/icons/icon-192.png", tag: "study-reminder" });
      return;
    }
  } catch { /* fall through */ }
  try { new Notification(title, { body }); } catch { /* ignore */ }
}

const todayKey = () => new Date().toISOString().slice(0, 10);

/** 앱 루트에서 호출 — 설정된 시각에 알림을 예약한다(앱이 열려 있는 동안). */
export function useReminderScheduler() {
  useEffect(() => {
    let timer: number | undefined;
    function schedule() {
      const r = getReminder();
      if (!r.enabled || !notificationsSupported() || Notification.permission !== "granted") return;
      const [h, m] = r.time.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h || 0, m || 0, 0, 0);
      if (target.getTime() <= now.getTime()) {
        // 오늘 시간이 지났으면: 아직 안 띄웠으면 한 번, 그리고 내일로 예약
        if (kv.get(LAST) !== todayKey()) {
          fireStudyNotification();
          kv.set(LAST, todayKey());
        }
        target.setDate(target.getDate() + 1);
      }
      const ms = Math.min(target.getTime() - now.getTime(), 2 ** 31 - 1);
      timer = window.setTimeout(() => {
        fireStudyNotification();
        kv.set(LAST, todayKey());
        schedule();
      }, Math.max(ms, 1000));
    }
    schedule();
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);
}
