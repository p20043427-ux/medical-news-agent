"use client";

import { useState } from "react";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";
import AccountButton from "@/components/auth/AccountButton";
import MedicPhrasebookView from "./PhrasebookView";
import MedicGlossaryView from "./GlossaryView";
import MedicCardsView from "./CardsView";
import MedicVisitView from "./VisitView";
import { MED_ACCENT } from "./common";

type Tab = "phrase" | "glossary" | "cards" | "visit";

const NAV: { key: Tab; ko: string; ja: string; icon: React.ReactNode }[] = [
  { key: "phrase", ko: "회화", ja: "会話", icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></> },
  { key: "glossary", ko: "용어", ja: "用語", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { key: "cards", ko: "카드", ja: "カード", icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></> },
  { key: "visit", ko: "실무", ja: "実務", icon: <><path d="M9 11l3 3 8-8" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
];

export default function MedicApp({ onBack }: { onBack?: () => void }) {
  const lang = useUiLang();
  const [tab, setTab] = useState<Tab>("phrase");

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      <header className="sticky top-0 z-30" style={{ background: "var(--bg)", paddingTop: "env(safe-area-inset-top)" }}>
        <div className="flex items-center gap-2 px-4 pb-2 pt-3">
          {onBack && (
            <button onClick={onBack} aria-label={tt(lang, "뒤로", "戻る")} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}
          <span className="flex items-center gap-1.5 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
            <span>🏥</span>{tt(lang, "의료교류", "医療交流")} <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>{tt(lang, "医療交流", "의료교류")}</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex rounded-full p-0.5" style={{ background: "var(--surface)" }}>
              {(["ko", "ja"] as UiLang[]).map((l) => (
                <button key={l} onClick={() => setUiLang(l)} className="rounded-full px-2.5 py-1 text-xs font-bold transition"
                  style={lang === l ? { background: MED_ACCENT, color: "#fff" } : { color: "var(--text-3)" }}>{l === "ko" ? "한" : "日"}</button>
              ))}
            </div>
            <AccountButton />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 px-4 pb-2">
          <p className="flex-1 rounded-xl px-3 py-1.5 text-[11px] leading-snug" style={{ background: `${MED_ACCENT}12`, color: "var(--text-2)" }}>
            {tt(lang, "은성의료재단 ↔ 가마치그룹 직원 상호방문 지원", "蒲池グループ ↔ 恩成医療財団 職員相互訪問サポート")}
          </p>
          <span className="shrink-0 rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: "#F59E0B22", color: "#B45309" }}>
            {tt(lang, "⚠ 감수 전 초안", "⚠ 監修前ドラフト")}
          </span>
        </div>
        <div style={{ height: 1, background: "var(--border)" }} />
      </header>

      {tab === "phrase" && <MedicPhrasebookView uiLang={lang} />}
      {tab === "glossary" && <MedicGlossaryView uiLang={lang} />}
      {tab === "cards" && <MedicCardsView uiLang={lang} />}
      {tab === "visit" && <MedicVisitView uiLang={lang} />}

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-stretch justify-around gap-1 px-2 pt-1.5" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}>
          {NAV.map((n) => {
            const on = tab === n.key;
            return (
              <button key={n.key} onClick={() => setTab(n.key)} aria-current={on ? "page" : undefined}
                className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition active:scale-95"
                style={{ color: on ? MED_ACCENT : "var(--text-3)", background: on ? `${MED_ACCENT}14` : "transparent" }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={on ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                <span className={`text-[11px] leading-none ${on ? "font-extrabold" : "font-medium"}`}>{lang === "ja" ? n.ja : n.ko}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
