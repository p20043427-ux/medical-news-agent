"use client";

import { useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import type { Word } from "@/lib/jp/types";
import Flashcard from "./Flashcard";

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

  const words = VOCAB.filter((w) => bookmarks.includes(w.id));

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-28 text-center">
        <span className="text-5xl">📚</span>
        <p className="text-base font-semibold" style={{ color: "var(--text-2)" }}>단어장이 비어있어요</p>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          플래시카드에서{" "}
          <svg viewBox="0 0 24 24" className="inline h-4 w-4 align-text-bottom" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          {" "}버튼으로 단어를 저장하세요
        </p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--text-3)" }}>저장된 단어</p>
          <p className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>
            단어장 <span className="text-base font-bold" style={{ color: "var(--text-3)" }}>{words.length}개</span>
          </p>
        </div>
        <button
          onClick={() => onStudy(bookmarks)}
          className="rounded-full px-4 py-2 text-sm font-bold text-white shadow"
          style={{ background: "#E63946" }}
        >
          복습하기
        </button>
      </div>

      <div style={{ height: 1, background: "var(--border)" }} className="mx-4" />

      {/* 단어 목록 */}
      <ul className="mt-1">
        {words.map((w) => (
          <li key={w.id}>
            <button
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:opacity-60"
              style={{ borderBottom: "1px solid var(--border)" }}
              onClick={() => setSelected(w)}
            >
              <span className="text-2xl">{EMOJI[w.category] ?? "📖"}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-bold" style={{ color: "var(--text-1)" }}>
                  {w.word}
                </p>
                <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>
                  [{w.reading}]　{w.meaning}
                </p>
              </div>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {/* 단어 카드 모달 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md animate-[slideUp_0.25s_ease-out]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 손잡이 */}
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
