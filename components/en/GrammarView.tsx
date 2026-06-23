"use client";

import { useState } from "react";
import { GRAMMAR_POINTS } from "@/lib/en/grammar";
import { PHRASAL_VERBS } from "@/lib/en/phrasal-verbs";
import type { GrammarPoint, PhrasalVerb } from "@/lib/en/types";
import { speakEn } from "@/lib/en/speech";
import { AccordionItem } from "@/components/ui/accordion";
import GrammarQuiz from "@/components/GrammarQuiz";

type Section = "grammar" | "phrasal";

const CEFR_COLORS: Record<string, string> = {
  A1: "#10B981", A2: "#3B82F6", B1: "#8B5CF6", B2: "#EC4899", C1: "#F59E0B",
};

const BASE_VERBS = ["break", "come", "get", "give", "go", "look", "make", "put", "run", "take", "turn", "work", "figure", "carry", "set", "point"];

function SpeakBtn({ text }: { text: string }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speakEn(text); }}
      aria-label="발음 듣기"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition active:scale-90"
      style={{ background: "var(--surface)", color: "#4361EE" }}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
    </button>
  );
}


function GrammarCard({ gp }: { gp: GrammarPoint }) {
  const [open, setOpen] = useState(false);
  return (
    <AccordionItem open={open} onToggle={() => setOpen((s) => !s)} bordered={false}
      header={
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
            style={{ background: CEFR_COLORS[gp.cefrLevel] ?? "#4361EE" }}>
            {gp.cefrLevel}
          </span>
          <div className="min-w-0">
            <p className="font-bold" style={{ color: "var(--text-1)" }}>{gp.title}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{gp.brief}</p>
          </div>
        </div>
      }>
        <div className="space-y-4">
          <div className="rounded-xl p-3" style={{ background: "var(--surface)" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#4361EE" }}>핵심 규칙</p>
            <p className="text-sm" style={{ color: "var(--text-2)" }}>{gp.rule}</p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-bold" style={{ color: "var(--text-3)" }}>예문</p>
            {gp.examples.map((ex, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: "var(--surface)" }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: "var(--text-1)" }}>{ex.en}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{ex.ko}</p>
                    {ex.note && <p className="text-xs mt-1 italic" style={{ color: "#4361EE" }}>({ex.note})</p>}
                  </div>
                  <SpeakBtn text={ex.en} />
                </div>
              </div>
            ))}
          </div>

          {gp.commonMistake && (
            <div className="rounded-xl p-3" style={{ background: "#EF444415" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#EF4444" }}>⚠ 흔한 실수</p>
              <p className="text-xs" style={{ color: "#EF4444" }}>{gp.commonMistake}</p>
            </div>
          )}
          {gp.tip && (
            <div className="rounded-xl p-3" style={{ background: "#4361EE15" }}>
              <p className="text-xs" style={{ color: "#4361EE" }}>💡 {gp.tip}</p>
            </div>
          )}
        </div>
    </AccordionItem>
  );
}

function PhrasalVerbCard({ pv }: { pv: PhrasalVerb }) {
  return (
    <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-lg" style={{ color: "#4361EE" }}>{pv.phrase}</h3>
          <SpeakBtn text={pv.phrase} />
        </div>
        <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
          style={{ background: CEFR_COLORS[pv.cefrLevel] ?? "#4361EE" }}>
          {pv.cefrLevel}
        </span>
      </div>
      <p className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>{pv.meaning}</p>
      <div className="rounded-xl p-3" style={{ background: "var(--surface)" }}>
        <p className="text-sm" style={{ color: "var(--text-2)" }}>"{pv.example.en}"</p>
        <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{pv.example.ko}</p>
      </div>
      {pv.separable && (
        <p className="text-xs mt-1.5" style={{ color: "var(--text-3)" }}>
          🔀 분리 가능 (예: put it off / put off the meeting)
        </p>
      )}
    </div>
  );
}

export default function EnGrammarView() {
  const [section, setSection] = useState<Section>("grammar");
  const [selectedBase, setSelectedBase] = useState<string>("break");
  const [quiz, setQuiz] = useState(false);

  const filteredPV = PHRASAL_VERBS.filter((pv) =>
    pv.phrase.startsWith(selectedBase)
  );

  if (quiz) {
    return (
      <GrammarQuiz accent="#4361EE" speak={speakEn} onExit={() => setQuiz(false)}
        points={GRAMMAR_POINTS.map((g) => ({ title: g.title, brief: g.brief, examples: g.examples.map((e) => ({ text: e.en, audio: e.en, ko: e.ko })) }))}
      />
    );
  }

  return (
    <div className="pb-28 pt-2">
      {/* 섹션 탭 */}
      <div className="sticky top-[56px] z-20 px-4 pb-2" style={{ background: "var(--bg)" }}>
        <div className="flex rounded-2xl p-1 gap-1" style={{ background: "var(--surface)" }}>
          {([["grammar", "📖 문법 포인트"], ["phrasal", "🔗 구동사"]] as [Section, string][]).map(([s, label]) => (
            <button key={s} onClick={() => setSection(s)}
              className="flex-1 rounded-xl py-2.5 text-sm font-bold transition"
              style={{
                background: section === s ? "#4361EE" : "transparent",
                color: section === s ? "white" : "var(--text-3)",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {section === "grammar" && (
        <div className="px-4 space-y-3">
          <button onClick={() => setQuiz(true)} className="w-full rounded-2xl py-3 text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)", boxShadow: "0 4px 12px rgba(67,97,238,.3)" }}>
            📝 문법 퀴즈 풀기
          </button>
          <p className="text-xs px-1" style={{ color: "var(--text-3)" }}>
            탭하면 펼쳐집니다 — {GRAMMAR_POINTS.length}개 문법 포인트
          </p>
          {GRAMMAR_POINTS.map((gp) => (
            <GrammarCard key={gp.id} gp={gp} />
          ))}
        </div>
      )}

      {section === "phrasal" && (
        <div className="px-4">
          <p className="text-xs mb-3 px-1" style={{ color: "var(--text-3)" }}>
            기본 동사별로 구동사를 학습합니다
          </p>
          {/* 기본 동사 필터 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {BASE_VERBS.map((base) => {
              const count = PHRASAL_VERBS.filter((pv) => pv.phrase.startsWith(base)).length;
              if (count === 0) return null;
              return (
                <button key={base} onClick={() => setSelectedBase(base)}
                  className="rounded-full px-3 py-1.5 text-sm font-bold transition"
                  style={{
                    background: selectedBase === base ? "#4361EE" : "var(--card)",
                    color: selectedBase === base ? "white" : "var(--text-2)",
                    boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                  }}>
                  {base} ({count})
                </button>
              );
            })}
          </div>
          <div className="space-y-3">
            {filteredPV.length > 0 ? (
              filteredPV.map((pv) => <PhrasalVerbCard key={pv.id} pv={pv} />)
            ) : (
              <div className="text-center py-10" style={{ color: "var(--text-3)" }}>
                구동사 없음
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
