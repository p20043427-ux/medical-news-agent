"use client";

import { useMemo, useState } from "react";
import { MED_GLOSSARY } from "@/lib/medic/glossary";
import type { MedTerm } from "@/lib/medic/types";
import { speakKo } from "@/lib/ko/speech";
import { speakJa } from "@/lib/jp/speech";
import { EmptyState } from "@/components/ui/empty-state";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

const ALL_TERMS = MED_GLOSSARY.flatMap((c) => c.terms.map((t) => ({ ...t, cat: c.key })));

function TermRow({ t, uiLang }: { t: MedTerm; uiLang: UiLang }) {
  return (
    <li className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-bold" style={{ color: "var(--text-1)" }}>{t.ja}</span>
          <span className="font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{t.jaReading}</span>
          {t.jaPron && <span className="text-[12px] font-semibold" style={{ color: "#E63946" }}>🗣 {t.jaPron}</span>}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-bold" style={{ color: "var(--text-2)" }}>{t.ko}</span>
          {t.koPron && <span className="text-[12px] font-semibold" style={{ color: "#2563EB" }}>🗣 {t.koPron}</span>}
          <span className="font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{t.koRomaja}</span>
        </div>
        {(t.exampleKo || t.exampleJa) && (
          <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{uiLang === "ja" ? t.exampleJa : t.exampleKo}</p>
        )}
      </div>
      <div className="flex shrink-0 flex-col gap-1.5">
        <button onClick={() => speakJa(t.jaReading)} aria-label="日本語" className="grid h-10 w-10 place-items-center rounded-full text-base" style={{ background: "#E6394618", color: "#E63946" }}>🔊</button>
        <button onClick={() => speakKo(t.ko)} aria-label="한국어" className="grid h-10 w-10 place-items-center rounded-full text-base" style={{ background: "#2563EB18", color: "#2563EB" }}>🔊</button>
      </div>
    </li>
  );
}

export default function MedicGlossaryView({ uiLang }: { uiLang: UiLang }) {
  const [cat, setCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const searchResults = useMemo(() => q ? ALL_TERMS.filter((t) =>
    t.ko.includes(query) || t.ja.includes(query) || t.koRomaja.toLowerCase().includes(q) || t.jaReading.includes(query),
  ) : [], [q, query]);
  const category = MED_GLOSSARY.find((c) => c.key === cat);

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "의료용어 사전", "医療用語辞典")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "분야를 고르거나 검색해 발음을 들어보세요.", "分野を選ぶか検索して発音を確認。")}</p>
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tt(uiLang, "전체 용어 검색", "全用語を検索")}
            className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--text-1)" }} />
          {query && <button onClick={() => setQuery("")} aria-label={tt(uiLang, "지우기", "クリア")} className="shrink-0 text-sm" style={{ color: "var(--text-3)" }}>✕</button>}
        </div>
      </div>

      {q ? (
        <div className="px-4 pt-3">
          <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(uiLang, `검색 결과 ${searchResults.length}개`, `検索結果 ${searchResults.length}件`)}</p>
          {searchResults.length === 0
            ? <EmptyState emoji="🔍" title={tt(uiLang, "검색 결과가 없어요", "検索結果がありません")} description={tt(uiLang, "다른 검색어를 시도해 보세요.", "別のキーワードを。")} />
            : <ul>{searchResults.map((t, i) => <TermRow key={i} t={t} uiLang={uiLang} />)}</ul>}
        </div>
      ) : category ? (
        <div className="px-4 pt-3">
          <button onClick={() => setCat(null)} className="mb-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            {tt(uiLang, "분야", "分野")}
          </button>
          <h2 className="mb-1 flex items-center gap-2 text-lg font-extrabold" style={{ color: "var(--text-1)" }}>
            <span>{category.emoji}</span><span>{uiLang === "ja" ? category.titleJa : category.titleKo}</span>
            <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>{category.terms.length}</span>
          </h2>
          <ul>{category.terms.map((t, i) => <TermRow key={i} t={t} uiLang={uiLang} />)}</ul>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 px-4 pt-3">
          {MED_GLOSSARY.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className="flex flex-col items-start rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.97]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="text-3xl">{c.emoji}</span>
              <span className="mt-1.5 text-sm font-extrabold leading-tight" style={{ color: "var(--text-1)" }}>{uiLang === "ja" ? c.titleJa : c.titleKo}</span>
              <span className="mt-0.5 text-xs font-bold" style={{ color: MED_ACCENT }}>{tt(uiLang, `${c.terms.length}개`, `${c.terms.length}個`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
