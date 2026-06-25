"use client";

import { useMemo, useState } from "react";
import { KO_VOCAB, KO_CATEGORIES } from "@/lib/ko/vocab";
import type { KoWord } from "@/lib/ko/types";
import { speakKo } from "@/lib/ko/speech";
import { Segmented } from "@/components/ui/segmented";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { tt, type UiLang } from "@/lib/i18n";

const ACCENT = "#2563EB";
const EMOJI: Record<string, string> = Object.fromEntries(KO_CATEGORIES.map((c) => [c.key, c.emoji]));

function meaningOf(w: KoWord, lang: UiLang): string {
  return lang === "ko" ? (w.meaningKo ?? w.meaning) : w.meaning;
}

export default function KoLibraryView({ lang, bookmarks, mistakes, onToggleBookmark, onClearMistake }: {
  lang: UiLang;
  bookmarks: string[];
  mistakes: string[];
  onToggleBookmark: (id: string) => void;
  onClearMistake: (id: string) => void;
}) {
  const [sub, setSub] = useState<"wordbook" | "mistakes">("wordbook");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const q = query.trim();
  const searching = q !== "" || cat !== null;

  const wordbookWords = useMemo(() => {
    if (sub !== "wordbook") return [];
    const base = !searching
      ? KO_VOCAB.filter((w) => bookmarks.includes(w.id))
      : KO_VOCAB.filter((w) =>
          (cat === null || w.category === cat) &&
          (q === "" || w.word.includes(q) || w.romaja.toLowerCase().includes(q.toLowerCase()) || w.meaning.includes(q) || (w.meaningKo ?? "").includes(q)));
    return base;
  }, [sub, searching, bookmarks, cat, q]);

  const mistakeWords = useMemo(() => (sub === "mistakes" ? KO_VOCAB.filter((w) => mistakes.includes(w.id)) : []), [sub, mistakes]);

  function Row({ w, trailing }: { w: KoWord; trailing: React.ReactNode }) {
    return (
      <li className="flex items-center gap-3 px-1 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <button onClick={() => speakKo(w.word)} className="flex min-w-0 flex-1 items-center gap-3 text-left transition active:opacity-60">
          <span className="text-2xl">{EMOJI[w.category] ?? "📖"}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold" style={{ color: "var(--text-1)" }}>{w.word} <span className="font-mono text-xs font-normal" style={{ color: "var(--text-3)" }}>{w.romaja}</span></p>
            <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{meaningOf(w, lang)}</p>
          </div>
        </button>
        {trailing}
      </li>
    );
  }

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <Segmented value={sub} onChange={setSub} accent={ACCENT}
          options={[
            { value: "wordbook", label: tt(lang, `📚 단어장 (${bookmarks.length})`, `📚 単語帳 (${bookmarks.length})`) },
            { value: "mistakes", label: tt(lang, `🎯 오답노트 (${mistakes.length})`, `🎯 間違いノート (${mistakes.length})`) },
          ]} />
      </div>

      {sub === "wordbook" ? (
        <div className="mt-3">
          <div className="px-4">
            <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tt(lang, "단어·뜻·로마자 검색 (전체 단어)", "単語・意味・ローマ字で検索（全単語）")}
                className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--text-1)" }} />
              {query && <button onClick={() => setQuery("")} aria-label={tt(lang, "지우기", "クリア")} className="shrink-0 text-sm" style={{ color: "var(--text-3)" }}>✕</button>}
            </div>
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              <Chip active={cat === null} accent={ACCENT} onClick={() => setCat(null)}>{tt(lang, "전체", "すべて")}</Chip>
              {KO_CATEGORIES.filter((c) => KO_VOCAB.some((w) => w.category === c.key)).map((c) => (
                <Chip key={c.key} active={cat === c.key} accent={ACCENT} onClick={() => setCat(cat === c.key ? null : c.key)}>
                  <span>{c.emoji}</span><span>{lang === "ja" ? c.labelJa : c.label}</span>
                </Chip>
              ))}
            </div>
            <p className="mt-2 text-sm font-bold" style={{ color: "var(--text-1)" }}>
              {searching ? tt(lang, "검색 결과", "検索結果") : tt(lang, "저장된 단어", "保存した単語")} <span style={{ color: "var(--text-3)" }}>{tt(lang, `${wordbookWords.length}개`, `${wordbookWords.length}個`)}</span>
            </p>
          </div>
          {wordbookWords.length === 0 ? (
            searching
              ? <EmptyState emoji="🔍" title={tt(lang, "검색 결과가 없어요", "検索結果がありません")} description={tt(lang, "다른 검색어나 카테고리를 시도해 보세요.", "別のキーワードやカテゴリーを試してください。")} />
              : <EmptyState emoji="📚" title={tt(lang, "단어장이 비어있어요", "単語帳が空です")} description={tt(lang, "위에서 검색하거나 ☆를 눌러 단어를 저장하세요.", "上で検索するか、☆を押して単語を保存しましょう。")} />
          ) : (
            <ul className="mt-1 px-4">
              {wordbookWords.map((w) => {
                const saved = bookmarks.includes(w.id);
                return <Row key={w.id} w={w} trailing={
                  <button onClick={() => onToggleBookmark(w.id)} aria-label={tt(lang, "단어장 저장", "単語帳に保存")}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg" style={{ color: saved ? "#f0932b" : "var(--text-3)" }}>{saved ? "★" : "☆"}</button>
                } />;
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-3 px-4">
          {mistakeWords.length === 0 ? (
            <EmptyState emoji="🎯" title={tt(lang, "아직 오답이 없어요", "まだ間違いがありません")} description={tt(lang, "퀴즈·모의시험에서 틀린 단어가 여기에 모여요.", "クイズ・模擬試験で間違えた単語がここに集まります。")} />
          ) : (
            <ul className="mt-1">
              {mistakeWords.map((w) => (
                <Row key={w.id} w={w} trailing={
                  <button onClick={() => onClearMistake(w.id)} aria-label={tt(lang, "오답 제거", "間違いを削除")}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm" style={{ background: "var(--surface)", color: "var(--text-3)" }}>✕</button>
                } />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
