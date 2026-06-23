"use client";

import { useEffect, useState } from "react";
import { EN_CONVERSATIONS, type EnConversation } from "@/lib/en/conversations";
import { speakEn } from "@/lib/en/speech";
import { bumpActivity } from "@/lib/daily-activity";
import { Button } from "@/components/ui";

export default function EnConversationView() {
  const [active, setActive] = useState<EnConversation | null>(null);
  const [showKo, setShowKo] = useState(true);
  const [read, setRead] = useState<string[]>([]);

  useEffect(() => {
    try { setRead(JSON.parse(localStorage.getItem("en-conv-read") || "[]")); } catch { /* ignore */ }
  }, []);
  function markRead(id: string) {
    setRead((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem("en-conv-read", JSON.stringify(next)); } catch { /* ignore */ }
      bumpActivity("en", "conversation");
      return next;
    });
  }

  // ── 상세 ──
  if (active) {
    return (
      <div className="px-4 pb-28 pt-2">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => setActive(null)} aria-label="뒤로" className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold" style={{ color: "var(--text-1)" }}>{active.emoji} {active.title}</p>
            <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{active.situation}</p>
          </div>
          <button onClick={() => setShowKo((s) => !s)} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold"
            style={showKo ? { background: "#4361EE", color: "#fff" } : { background: "var(--surface)", color: "var(--text-3)" }}>한글</button>
        </div>

        <button onClick={() => speakEn(active.lines.map((l) => l.en).join(". "))}
          className="mb-4 w-full rounded-xl py-2.5 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
          🔊 전체 듣기
        </button>

        <div className="space-y-2.5">
          {active.lines.map((l, i) => {
            const mine = l.speaker === "B";
            return (
              <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <button onClick={() => speakEn(l.en)} className="max-w-[82%] rounded-2xl px-4 py-2.5 text-left"
                  style={mine ? { background: "linear-gradient(135deg,#4361EE,#7209B7)", color: "#fff" } : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}>
                  <p className="text-[15px] font-semibold leading-snug">{l.en}</p>
                  {showKo && <p className="mt-0.5 text-[11px]" style={{ color: mine ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>{l.ko}</p>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── 목록 ──
  return (
    <div className="px-4 pb-28 pt-2">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>생활 회화</h1>
      <p className="mb-2 text-sm" style={{ color: "var(--text-3)" }}>상황별 영어 대화를 듣고 따라 말해 보세요.</p>
      {read.length > 0 && (
        <p className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "#10B98114", color: "#10B981" }}>
          ✓ 읽음 {read.length} / {EN_CONVERSATIONS.length}
        </p>
      )}

      <div className="space-y-3">
        {EN_CONVERSATIONS.map((c) => (
          <button key={c.id} onClick={() => { markRead(c.id); setActive(c); setShowKo(true); }}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: "var(--surface)" }}>
              {c.emoji}
              {read.includes(c.id) && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "#10B981", border: "2px solid var(--card)" }}>✓</span>}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
                <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold" style={{ background: "var(--surface)", color: "var(--text-3)" }}>{c.level}</span>
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
