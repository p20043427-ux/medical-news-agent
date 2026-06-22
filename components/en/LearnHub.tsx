"use client";

import { EN_VOCAB } from "@/lib/en/vocab";
import { GRAMMAR_POINTS } from "@/lib/en/grammar";
import { PHRASAL_VERBS } from "@/lib/en/phrasal-verbs";

export type EnLearnView = "vocab" | "grammar";

const CARDS: { key: EnLearnView; glyph: string; title: string; desc: string; grad: string; shadow: string }[] = [
  { key: "vocab", glyph: "A", title: "단어 학습", desc: `${EN_VOCAB.length}개 어휘 · 스키밍·복습`, grad: "linear-gradient(135deg,#4361EE,#7209B7)", shadow: "rgba(67,97,238,.35)" },
  { key: "grammar", glyph: "G", title: "문법 · 구동사", desc: `문법 ${GRAMMAR_POINTS.length} · 구동사 ${PHRASAL_VERBS.length}`, grad: "linear-gradient(135deg,#7209B7,#a29bfe)", shadow: "rgba(114,9,183,.35)" },
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
