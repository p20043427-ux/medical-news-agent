"use client";

import { useState } from "react";
import { KO_CONVERSATIONS } from "@/lib/ko/conversations";
import type { KoConversation } from "@/lib/ko/types";
import { speakKo } from "@/lib/ko/speech";
import { tt, type UiLang } from "@/lib/i18n";

export default function KoConversationView({ lang }: { lang: UiLang }) {
  const [active, setActive] = useState<KoConversation | null>(null);
  const [showJa, setShowJa] = useState(true);

  if (active) {
    return (
      <div className="px-4 pb-28 pt-2">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => setActive(null)} aria-label={tt(lang, "뒤로", "戻る")} className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold" style={{ color: "var(--text-1)" }}>{active.emoji} {active.title}</p>
            <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{active.situation}</p>
          </div>
          <button onClick={() => setShowJa((s) => !s)} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold" style={showJa ? { background: "#2563EB", color: "#fff" } : { background: "var(--surface)", color: "var(--text-3)" }}>{tt(lang, "일본어", "日本語")}</button>
        </div>

        <button onClick={() => speakKo(active.lines.map((l) => l.ko).join(". "))} className="mb-4 w-full rounded-xl py-2.5 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>🔊 {tt(lang, "전체 듣기", "全文を聞く")}</button>

        <div className="space-y-2.5">
          {active.lines.map((l, i) => {
            const mine = l.speaker === "B";
            return (
              <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <button onClick={() => speakKo(l.ko)} className="max-w-[82%] rounded-2xl px-4 py-2.5 text-left"
                  style={mine ? { background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff" } : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}>
                  <p className="text-[15px] font-semibold leading-snug">{l.ko}</p>
                  <p className="mt-0.5 font-mono text-[11px]" style={{ color: mine ? "rgba(255,255,255,.85)" : "var(--text-3)" }}>{l.romaja}</p>
                  {showJa && <p className="mt-0.5 text-[11px]" style={{ color: mine ? "rgba(255,255,255,.85)" : "var(--text-3)" }}>{l.ja}</p>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "생활 회화", "日常会話")}</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "상황별 회화를 듣고 따라 말해요.", "場面別の会話を聞いて練習しましょう。")}</p>
      <div className="space-y-3">
        {KO_CONVERSATIONS.map((c) => (
          <button key={c.id} onClick={() => { setActive(c); setShowJa(true); }}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: "var(--surface)" }}>{c.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
                <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold" style={{ background: "var(--surface)", color: "var(--text-3)" }}>T{c.topik}</span>
              </span>
              <span className="block truncate text-sm" style={{ color: "var(--text-3)" }}>{c.situation}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
