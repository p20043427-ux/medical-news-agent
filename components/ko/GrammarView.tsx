"use client";

import { useState } from "react";
import { KO_GRAMMAR } from "@/lib/ko/grammar";
import { speakKo } from "@/lib/ko/speech";
import { AccordionItem } from "@/components/ui/accordion";
import { tt, type UiLang } from "@/lib/i18n";

export default function KoGrammarView({ lang }: { lang: UiLang }) {
  const [open, setOpen] = useState<string | null>(KO_GRAMMAR[0]?.id ?? null);

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "문법", "文法")}</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "TOPIK 1~2 핵심 문법", "TOPIK 1〜2 の重要文法")} ({KO_GRAMMAR.length})</p>

      <div className="space-y-2.5">
        {KO_GRAMMAR.map((g) => {
          const isOpen = open === g.id;
          return (
            <AccordionItem key={g.id} open={isOpen} onToggle={() => setOpen(isOpen ? null : g.id)}
              header={
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: g.topik === 2 ? "#7C3AED" : "#2563EB" }}>T{g.topik}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold" style={{ color: "var(--text-1)" }}>{g.title}</span>
                    <span className="block truncate text-xs" style={{ color: "var(--text-3)" }}>{g.brief}</span>
                  </span>
                </div>
              }>
              <div className="mb-3 rounded-xl p-3 text-sm leading-relaxed" style={{ background: "var(--surface)", color: "var(--text-2)" }}>📘 {g.rule}</div>
              <div className="space-y-2">
                {g.examples.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl p-3" style={{ background: "var(--surface)" }}>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{ex.ko}</p>
                      <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-3)" }}>{ex.romaja}</p>
                      <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{ex.ja}</p>
                      {ex.note && <p className="mt-1 text-[11px]" style={{ color: "#2563EB" }}>→ {ex.note}</p>}
                    </div>
                    <button onClick={() => speakKo(ex.ko)} aria-label={tt(lang, "발음", "発音")} className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: "var(--card)", color: "#2563EB" }}>🔊</button>
                  </div>
                ))}
              </div>
              {g.commonMistake && <p className="mt-3 rounded-xl p-2.5 text-xs leading-relaxed" style={{ background: "#EF444410", color: "var(--text-2)" }}>⚠️ {g.commonMistake}</p>}
              {g.tip && <p className="mt-2 rounded-xl p-2.5 text-xs leading-relaxed" style={{ background: "#2563EB12", color: "var(--text-2)" }}>💡 {g.tip}</p>}
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
}
