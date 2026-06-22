"use client";

import { CONVERSATIONS } from "@/lib/jp/conversations";
import { VERBS } from "@/lib/jp/verbs";

export type LearnView = "conversation" | "verbs" | "kana" | "exam";

// 아이콘은 통일감을 위해 일본어 글자(흰색 볼드)로 표기 — 会(会話)·動(動詞)·あ(かな)
const CARDS: { key: LearnView; glyph: string; title: string; desc: (n: { conv: number; verb: number }) => string; grad: string; shadow: string }[] = [
  { key: "conversation", glyph: "会", title: "생활 회화", desc: (n) => `${n.conv}개 상황 · 핵심표현`, grad: "linear-gradient(135deg,#a29bfe,#6c5ce7)", shadow: "rgba(108,92,231,.35)" },
  { key: "verbs", glyph: "動", title: "필수 동사", desc: (n) => `${n.verb}개 · 활용형(ます·て·ない)`, grad: "linear-gradient(135deg,#fd79a8,#e84393)", shadow: "rgba(232,67,147,.35)" },
  { key: "kana", glyph: "あ", title: "가나 (히라가나·가타카나)", desc: () => "기초 문자 · 발음 · 퀴즈", grad: "linear-gradient(135deg,#E63946,#F4A261)", shadow: "rgba(230,57,70,.35)" },
  { key: "exam", glyph: "試", title: "JLPT N5 모의시험", desc: () => "문자·어휘 / 문법 / 청해 · 합격 판정", grad: "linear-gradient(135deg,#0984e3,#74b9ff)", shadow: "rgba(9,132,227,.35)" },
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
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold"
              style={{ background: c.grad, boxShadow: `0 4px 12px ${c.shadow}`, color: "#fff" }}>
              {c.glyph}
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
