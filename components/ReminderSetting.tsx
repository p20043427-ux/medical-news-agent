"use client";

import { useEffect, useState } from "react";
import { getReminder, setReminder, requestPermission, fireStudyNotification, notificationsSupported, permissionState } from "@/lib/reminder";

// 학습 리마인더 설정 카드 (JP·EN Stats 공용)
export default function ReminderSetting({ accent = "#E63946" }: { accent?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("20:00");
  const [perm, setPerm] = useState<string>("default");

  useEffect(() => {
    const r = getReminder();
    setEnabled(r.enabled); setTime(r.time);
    setPerm(permissionState());
  }, []);

  if (!notificationsSupported()) {
    return (
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>학습 리마인더</p>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>이 브라우저는 알림을 지원하지 않아요.</p>
      </div>
    );
  }

  async function toggle() {
    if (!enabled) {
      const p = await requestPermission();
      setPerm(p);
      if (p !== "granted") return;
    }
    const next = !enabled;
    setEnabled(next);
    setReminder({ enabled: next, time });
  }
  function changeTime(t: string) {
    setTime(t);
    setReminder({ enabled, time: t });
  }

  return (
    <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 pr-3">
          <p className="font-bold" style={{ color: "var(--text-1)" }}>학습 리마인더</p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>앱이 열려 있을 때 설정한 시각에 알려드려요.</p>
        </div>
        <button onClick={toggle} aria-label="리마인더 토글" role="switch" aria-checked={enabled}
          className="relative h-7 w-12 shrink-0 rounded-full transition"
          style={{ background: enabled ? accent : "var(--surface)" }}>
          <span className="absolute top-1 h-5 w-5 rounded-full bg-white transition-all" style={{ left: enabled ? "26px" : "4px" }} />
        </button>
      </div>

      {enabled && (
        <div className="mt-4 flex items-center gap-2">
          <input type="time" value={time} onChange={(e) => changeTime(e.target.value)}
            className="rounded-xl border px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-1)" }} />
          <button onClick={() => fireStudyNotification(true)}
            className="rounded-xl px-3 py-2.5 text-sm font-semibold"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}>테스트 알림</button>
        </div>
      )}
      {enabled && perm !== "granted" && (
        <p className="mt-2 text-xs" style={{ color: "#E63946" }}>브라우저 알림 권한이 필요해요.</p>
      )}
    </div>
  );
}
