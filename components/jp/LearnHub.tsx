"use client";

import { CONVERSATIONS } from "@/lib/jp/conversations";
import { VERBS } from "@/lib/jp/verbs";

export type LearnView = "conversation" | "verbs" | "kana";

const CARDS: { key: LearnView; emoji: string; title: string; desc: (n: { conv: number; verb: number }) => string; grad: string; shadow: string }[] = [
  { key: "conversation", emoji: "💬", title: "생활 회화", desc: (n) => `${n.conv}개 상황 · 핵심표현`, grad: "linear-gradient(135deg,#a29bfe,#6c5ce7)", shadow: "rgba(108,92,231,.3)" },
  { key: "verbs", emoji: "🔤", title: "필수 동사", desc: (n) => `${n.verb}개 · 활용형(ます·て·ない)`, grad: "linear-gradient(135deg,#fd79a8,#e84393)", shadow: "rgba(232,67,147,.3)" },
  { key: "kana", emoji: "あ", title: "가나 (히라가나·가타카나)", desc: () => "기초 문자 · 발음 · 퀴즈", grad: "linear-gradient(135deg,#E63946,#F4A261)", shadow: "rgba(230,57,70,.3)" },
];

export default function LearnHub({ onOpen }: { onOpen: (v: LearnView) => void }) {
  const counts = { conv: CONVERSATIONS.length, verb: VERBS.length };
  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>학습</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>회화 · 동사 · 문자를 골라 학습해요.</p>
      <div className="space-y-3">
        {CARDS.map((c) => (
          <button
            key={c.key}
            onClick={() => onOpen(c.key)}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl"
              style={{ background: c.grad, boxShadow: `0 4px 12px ${c.shadow}`, color: "#fff" }}>
              {c.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold" style={{ color: "var(--text-1)" }}>{c.title}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{c.desc(counts)}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
