"use client";

import { useMemo, useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import type { Word } from "@/lib/jp/types";
import Flashcard from "./Flashcard";
import { Button } from "@/components/ui";
import { Chip } from "@/components/ui/chip";

const EMOJI: Record<string, string> = Object.fromEntries(
  VOCAB_CATEGORIES.map((c) => [c.key, c.emoji])
);

export default function Wordbook({
  bookmarks,
  showFurigana,
  onToggleBookmark,
  onStudy,
}: {
  bookmarks: string[];
  showFurigana: boolean;
  onToggleBookmark: (id: string) => void;
  onStudy: (ids: string[]) => void;
}) {
  const [selected, setSelected] = useState<Word | null>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<"default" | "reading" | "meaning">("default");

  const q = query.trim().toLowerCase();
  const searching = q !== "" || cat !== null;

  const words = useMemo(() => {
    const base = !searching
      ? VOCAB.filter((w) => bookmarks.includes(w.id))
      : VOCAB.filter((w) =>
          (cat === null || w.category === cat) &&
          (q === "" ||
            w.word.includes(query) ||
            w.reading.includes(query) ||
            w.romaji.toLowerCase().includes(q) ||
            w.meaning.toLowerCase().includes(q)),
        );
    if (sort === "reading") return [...base].sort((a, b) => a.reading.localeCompare(b.reading, "ja"));
    if (sort === "meaning") return [...base].sort((a, b) => a.meaning.localeCompare(b.meaning, "ko"));
    return base;
  }, [searching, bookmarks, cat, q, query, sort]);

  return (
    <div className="pb-28">
      {/* 검색 + 카테고리 필터 */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="단어·뜻·읽기·로마자 검색 (전체 단어)"
            className="w-full bg-transparent text-sm outline-none"
            style={{ color: "var(--text-1)" }}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="지우기" className="shrink-0 text-sm" style={{ color: "var(--text-3)" }}>✕</button>
          )}
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <Chip active={cat === null} accent="#E63946" onClick={() => setCat(null)}>전체</Chip>
          {VOCAB_CATEGORIES.map((c) => (
            <Chip key={c.key} active={cat === c.key} accent="#E63946" onClick={() => setCat(cat === c.key ? null : c.key)}>
              <span>{c.emoji}</span><span>{c.label}</span>
            </Chip>
          ))}
        </div>
      </div>

      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
          {searching ? "검색 결과" : "저장된 단어"} <span className="text-base font-bold" style={{ color: "var(--text-3)" }}>{words.length}개</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg p-0.5" style={{ background: "var(--surface)" }}>
            {([["default", "기본"], ["reading", "가나"], ["meaning", "뜻"]] as ["default" | "reading" | "meaning", string][]).map(([s, label]) => (
              <button key={s} onClick={() => setSort(s)}
                className="rounded-md px-2 py-1 text-xs font-bold transition"
                style={sort === s ? { background: "var(--card)", color: "var(--text-1)" } : { color: "var(--text-3)" }}>
                {label}
              </button>
            ))}
          </div>
          {!searching && bookmarks.length > 0 && (
            <Button variant="brand" size="free" onClick={() => onStudy(bookmarks)} className="px-3 py-2 text-sm">복습</Button>
          )}
        </div>
      </div>

      <div style={{ height: 1, background: "var(--border)" }} className="mx-4" />

      {words.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <span className="text-5xl">{searching ? "🔍" : "📚"}</span>
          <p className="text-base font-semibold" style={{ color: "var(--text-2)" }}>{searching ? "검색 결과가 없어요" : "단어장이 비어있어요"}</p>
          {!searching && (
            <p className="text-sm" style={{ color: "var(--text-3)" }}>위에서 검색하거나, 카드의 ★로 단어를 저장하세요.</p>
          )}
        </div>
      ) : (
        <ul className="mt-1">
          {words.map((w) => {
            const saved = bookmarks.includes(w.id);
            return (
              <li key={w.id} className="flex items-center gap-1 pr-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <button className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition active:opacity-60" onClick={() => setSelected(w)}>
                  <span className="text-2xl">{EMOJI[w.category] ?? "📖"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-bold" style={{ color: "var(--text-1)" }}>{w.word}</p>
                    <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>[{w.reading}]　{w.meaning}</p>
                  </div>
                </button>
                <button onClick={() => onToggleBookmark(w.id)} aria-label="단어장 저장"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
                  style={{ color: saved ? "#f0932b" : "var(--text-3)" }}>{saved ? "★" : "☆"}</button>
              </li>
            );
          })}
        </ul>
      )}

      {/* 단어 카드 모달 */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md animate-[slideUp_0.25s_ease-out]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-white/40" />
            </div>
            <div className="px-3 pb-3">
              <Flashcard
                word={selected}
                showFurigana={showFurigana}
                emoji={EMOJI[selected.category] ?? "📖"}
                hideMeaningDefault={false}
                bookmarked={bookmarks.includes(selected.id)}
                onToggleBookmark={() => onToggleBookmark(selected.id)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
