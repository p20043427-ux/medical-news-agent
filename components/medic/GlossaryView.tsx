"use client";

import { useMemo, useState } from "react";
import { MED_GLOSSARY } from "@/lib/medic/glossary";
import { speakKo } from "@/lib/ko/speech";
import { speakJa } from "@/lib/jp/speech";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

const ALL_TERMS = MED_GLOSSARY.flatMap((c) => c.terms.map((t) => ({ ...t, cat: c.key })));

export default function MedicGlossaryView({ uiLang }: { uiLang: UiLang }) {
  const [cat, setCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const terms = useMemo(() => ALL_TERMS.filter((t) =>
    (cat === null || t.cat === cat) &&
    (q === "" || t.ko.includes(query) || t.ja.includes(query) || t.koRomaja.toLowerCase().includes(q) || t.jaReading.includes(query)),
  ), [cat, q, query]);

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "의료용어 사전", "医療用語辞典")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "한일 대역 의료용어 · 눌러서 발음 듣기", "韓日対訳の医療用語 · タップで発音")}</p>
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tt(uiLang, "한국어·일본어·로마자 검색", "韓国語・日本語・ローマ字で検索")}
            className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--text-1)" }} />
          {query && <button onClick={() => setQuery("")} aria-label={tt(uiLang, "지우기", "クリア")} className="shrink-0 text-sm" style={{ color: "var(--text-3)" }}>✕</button>}
        </div>
      </div>

      <div className="mt-2 flex gap-1.5 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: "none" }}>
        <Chip active={cat === null} accent={MED_ACCENT} onClick={() => setCat(null)}>{tt(uiLang, "전체", "すべて")}</Chip>
        {MED_GLOSSARY.map((c) => (
          <Chip key={c.key} active={cat === c.key} accent={MED_ACCENT} onClick={() => setCat(cat === c.key ? null : c.key)}>
            <span>{c.emoji}</span><span>{uiLang === "ja" ? c.titleJa : c.titleKo}</span>
          </Chip>
        ))}
      </div>

      <p className="px-4 pt-2 text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(uiLang, `${terms.length}개`, `${terms.length}個`)}</p>

      {terms.length === 0 ? (
        <EmptyState emoji="🔍" title={tt(uiLang, "검색 결과가 없어요", "検索結果がありません")} description={tt(uiLang, "다른 검색어를 시도해 보세요.", "別のキーワードを試してください。")} />
      ) : (
        <ul className="mt-1 px-4">
          {terms.map((t, i) => (
            <li key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-base font-bold" style={{ color: "var(--text-1)" }}>{t.ja}</span>
                  <span className="font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{t.jaReading}</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-base font-bold" style={{ color: "var(--text-2)" }}>{t.ko}</span>
                  <span className="font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{t.koRomaja}</span>
                </div>
                {(t.exampleKo || t.exampleJa) && (
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {uiLang === "ja" ? t.exampleJa : t.exampleKo}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button onClick={() => speakJa(t.jaReading)} aria-label="日本語" className="grid h-8 w-8 place-items-center rounded-full text-base" style={{ background: "#E6394618", color: "#E63946" }}>🔊</button>
                <button onClick={() => speakKo(t.ko)} aria-label="한국어" className="grid h-8 w-8 place-items-center rounded-full text-base" style={{ background: "#2563EB18", color: "#2563EB" }}>🔊</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
