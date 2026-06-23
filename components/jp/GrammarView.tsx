"use client";

import { useState } from "react";
import { JP_GRAMMAR } from "@/lib/jp/grammar";
import { speakJa } from "@/lib/jp/speech";

function SpeakBtn({ text }: { text: string }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); speakJa(text); }} aria-label="발음 듣기"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition active:scale-90"
      style={{ background: "var(--surface)", color: "#E63946" }}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
    </button>
  );
}

export default function GrammarView() {
  const [open, setOpen] = useState<string | null>(JP_GRAMMAR[0]?.id ?? null);

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>N5 문법</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>조사·활용·표현을 예문과 함께 익혀요. ({JP_GRAMMAR.length}개)</p>

      <div className="space-y-2.5">
        {JP_GRAMMAR.map((g) => {
          const isOpen = open === g.id;
          return (
            <div key={g.id} className="overflow-hidden rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(isOpen ? null : g.id)} className="flex w-full items-center gap-3 p-4 text-left">
                <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: g.level === "N4" ? "#7209B7" : "#E63946" }}>{g.level}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold" style={{ color: "var(--text-1)" }}>{g.title}</span>
                  <span className="block truncate text-xs" style={{ color: "var(--text-3)" }}>{g.brief}</span>
                </span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform" style={{ color: "var(--text-3)", transform: isOpen ? "rotate(180deg)" : "none" }}
                  fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="mb-3 rounded-xl p-3 text-sm leading-relaxed" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
                    📘 {g.rule}
                  </div>
                  <div className="space-y-2">
                    {g.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-xl p-3" style={{ background: "var(--surface)" }}>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{ex.jp}</p>
                          <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{ex.reading}</p>
                          <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{ex.ko}</p>
                          {ex.note && <p className="mt-1 text-[11px]" style={{ color: "#E63946" }}>→ {ex.note}</p>}
                        </div>
                        <SpeakBtn text={ex.reading || ex.jp} />
                      </div>
                    ))}
                  </div>
                  {g.commonMistake && (
                    <p className="mt-3 rounded-xl p-2.5 text-xs leading-relaxed" style={{ background: "#E6394610", color: "var(--text-2)" }}>⚠️ 흔한 실수: {g.commonMistake}</p>
                  )}
                  {g.tip && (
                    <p className="mt-2 rounded-xl p-2.5 text-xs leading-relaxed" style={{ background: "#00b89412", color: "var(--text-2)" }}>💡 {g.tip}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
