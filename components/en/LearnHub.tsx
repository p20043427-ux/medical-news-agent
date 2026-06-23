"use client";

import { EN_VOCAB } from "@/lib/en/vocab";
import { GRAMMAR_POINTS } from "@/lib/en/grammar";
import { PHRASAL_VERBS } from "@/lib/en/phrasal-verbs";
import { EN_TRAVEL_PHRASEBOOK } from "@/lib/en/phrasebook";
import { EN_CONVERSATIONS } from "@/lib/en/conversations";

export type EnLearnView = "vocab" | "grammar" | "exam" | "phrasebook" | "roleplay" | "conversation" | "dictation";

const CARDS: { key: EnLearnView; glyph: string; title: string; desc: string; grad: string; shadow: string }[] = [
  { key: "vocab", glyph: "A", title: "단어 학습", desc: `${EN_VOCAB.length}개 어휘 · 스키밍·복습`, grad: "linear-gradient(135deg,#4361EE,#7209B7)", shadow: "rgba(67,97,238,.35)" },
  { key: "grammar", glyph: "G", title: "문법 · 구동사", desc: `문법 ${GRAMMAR_POINTS.length} · 구동사 ${PHRASAL_VERBS.length}`, grad: "linear-gradient(135deg,#7209B7,#a29bfe)", shadow: "rgba(114,9,183,.35)" },
  { key: "conversation", glyph: "C", title: "생활 회화", desc: `${EN_CONVERSATIONS.length}개 상황 · 듣고 따라 말하기`, grad: "linear-gradient(135deg,#a29bfe,#6c5ce7)", shadow: "rgba(108,92,231,.35)" },
  { key: "roleplay", glyph: "R", title: "회화 롤플레이", desc: `${EN_CONVERSATIONS.length}개 상황 · 골라서 대화 완성`, grad: "linear-gradient(135deg,#6c5ce7,#0984e3)", shadow: "rgba(108,92,231,.35)" },
  { key: "phrasebook", glyph: "T", title: "여행 회화집", desc: `${EN_TRAVEL_PHRASEBOOK.length}개 상황별 즉석 표현`, grad: "linear-gradient(135deg,#00b894,#00cec9)", shadow: "rgba(0,184,148,.35)" },
  { key: "dictation", glyph: "L", title: "받아쓰기", desc: "문장 듣고 고르기 · 청해 훈련", grad: "linear-gradient(135deg,#0984e3,#74b9ff)", shadow: "rgba(9,132,227,.35)" },
  { key: "exam", glyph: "T", title: "모의시험 (CEFR)", desc: "어휘/구동사/독해/청해 · 난이도·회차", grad: "linear-gradient(135deg,#4361EE,#3A0CA3)", shadow: "rgba(58,12,163,.35)" },
];

export default function EnLearnHub({ onOpen }: { onOpen: (v: EnLearnView) => void }) {
  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>학습</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>어휘와 문법을 골라 학습해요.</p>
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
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{c.desc}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
