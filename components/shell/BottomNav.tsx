"use client";

import * as React from "react";
import { useUiLang } from "@/lib/i18n";

export interface NavTab<K extends string = string> {
  key: K;
  ko: string;
  ja: string;
  icon?: React.ReactNode; // <path/> 들 (24x24 stroke 아이콘)
  emoji?: string;         // 이모지 아이콘(여행 등) — icon 대신 사용
}

/** 공통 하단 탭 바 — 일본어 카테고리 디자인 기준. tabs 구성을 props로 주입. */
export function BottomNav<K extends string>({
  tab, tabs, onChange, accent,
}: {
  tab: K;
  tabs: NavTab<K>[];
  onChange: (k: K) => void;
  accent: string;
}) {
  const lang = useUiLang();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-stretch justify-around gap-1 px-2 pt-1.5" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}>
        {tabs.map((n) => {
          const on = tab === n.key;
          return (
            <button key={n.key} onClick={() => onChange(n.key)} aria-current={on ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition active:scale-95"
              style={{ color: on ? accent : "var(--text-3)", background: on ? `${accent}14` : "transparent" }}>
              {n.emoji
                ? <span className="text-xl leading-none">{n.emoji}</span>
                : <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={on ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>}
              <span className={`text-[11px] leading-none ${on ? "font-extrabold" : "font-medium"}`}>{lang === "ja" ? n.ja : n.ko}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
