"use client";

import * as React from "react";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";

/**
 * 공통 상단 헤더 — 일본어 카테고리 디자인 기준.
 * 뒤로 · 타이틀(한/일) · 우측 슬롯(진도칩·언어토글·계정) · 하단 슬롯(주간띠·안내문).
 */
export function AppHeader({
  onBack, title, right, below,
}: {
  onBack?: () => void;
  title: React.ReactNode;
  right?: React.ReactNode;
  below?: React.ReactNode;
}) {
  const lang = useUiLang();
  return (
    <header className="sticky top-0 z-30" style={{ background: "var(--bg)", paddingTop: "env(safe-area-inset-top)" }}>
      <div className="flex items-center gap-2 px-4 pb-2 pt-3">
        {onBack && (
          <button onClick={onBack} aria-label={tt(lang, "뒤로", "戻る")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}
        {title}
        {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
      </div>
      {below && <div className="px-4 pb-2">{below}</div>}
      <div style={{ height: 1, background: "var(--border)" }} />
    </header>
  );
}

/** 텍스트 타이틀 (예: "한국어 韓国語") */
export function HeaderTitle({ ko, ja }: { ko: string; ja?: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
      {ko}{ja && <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>{ja}</span>}
    </span>
  );
}

/** 진도 링 칩 (%, D-day) */
export function ProgressChip({ pct, dday, accent }: { pct: number; dday?: number | null; accent: string }) {
  const r = 7, circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ border: "1px solid var(--border)" }}>
      <svg viewBox="0 0 18 18" className="h-4 w-4 -rotate-90">
        <circle cx="9" cy="9" r={r} fill="none" stroke="var(--surface)" strokeWidth="2.5" />
        <circle cx="9" cy="9" r={r} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} />
      </svg>
      <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-2)" }}>{pct}%</span>
      {dday !== null && dday !== undefined && (
        <span className="text-xs font-extrabold" style={{ color: "var(--text-1)" }}>
          {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY" : `D+${-dday}`}
        </span>
      )}
    </div>
  );
}

/** UI 언어 토글 (한/日) */
export function LangToggle({ accent }: { accent: string }) {
  const lang = useUiLang();
  return (
    <div className="flex rounded-full p-0.5" style={{ background: "var(--surface)" }}>
      {(["ko", "ja"] as UiLang[]).map((l) => (
        <button key={l} onClick={() => setUiLang(l)} className="rounded-full px-2.5 py-1 text-xs font-bold transition"
          style={lang === l ? { background: accent, color: "#fff" } : { color: "var(--text-3)" }}>{l === "ko" ? "한" : "日"}</button>
      ))}
    </div>
  );
}

/** 주간 학습 스트립 */
export function WeekStrip({ accent, studied }: { accent: string; studied: (d: Date) => boolean }) {
  const lang = useUiLang();
  const WD = lang === "ja" ? ["日", "月", "火", "水", "木", "金", "土"] : ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  return (
    <>
      <div className="grid grid-cols-7 text-center text-[11px]" style={{ color: "var(--text-3)" }}>
        {WD.map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 text-center">
        {week.map((d, i) => {
          const isToday = d.toDateString() === now.toDateString();
          const did = studied(d);
          return (
            <div key={i} className="flex flex-col items-center gap-1 py-0.5">
              <span className="grid h-8 w-8 place-items-center rounded-full text-sm"
                style={{ background: isToday ? accent : "transparent", color: isToday ? "#fff" : did ? "var(--text-1)" : "var(--text-3)", fontWeight: isToday ? 800 : did ? 700 : 500 }}>
                {d.getDate()}
              </span>
              <span className="h-1 w-1 rounded-full" style={{ background: did && !isToday ? "#10B981" : "transparent" }} />
            </div>
          );
        })}
      </div>
    </>
  );
}
