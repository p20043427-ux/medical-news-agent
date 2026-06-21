"use client";

import { useMemo, useState } from "react";
import type { Word, Category } from "@/lib/jp/types";
import Flashcard from "./Flashcard";

export default function VocabStudy({
  category,
  words,
  showFurigana,
  onToggleFurigana,
  onMark,
  onExit,
}: {
  category: Category;
  words: Word[];
  showFurigana: boolean;
  onToggleFurigana: () => void;
  onMark: (id: string, known: boolean) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);
  const [known, setKnown] = useState(0);
  const [done, setDone] = useState(false);

  const total = words.length;
  const word = words[index];

  function next(isKnown: boolean) {
    if (!word) return;
    onMark(word.id, isKnown);
    if (isKnown) setKnown((k) => k + 1);
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setShowMeaning(true);
    }
  }

  const progressPct = useMemo(
    () => (total ? Math.round((index / total) * 100) : 0),
    [index, total],
  );

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-slate-900">학습 완료!</h2>
        <p className="text-slate-500">
          {category.label} · 총 {total}개 중{" "}
          <strong className="text-slate-800">{known}개</strong>를 알고 있어요.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setIndex(0);
              setKnown(0);
              setDone(false);
              setShowMeaning(true);
            }}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
          >
            다시 하기
          </button>
          <button
            onClick={onExit}
            className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white"
          >
            홈으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* 상단 바 */}
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <button
          onClick={onExit}
          aria-label="뒤로"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="flex flex-1 items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
            {index + 1} / {total}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <button
          onClick={onToggleFurigana}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            showFurigana
              ? "bg-slate-900 text-white"
              : "border border-slate-300 bg-white text-slate-500"
          }`}
        >
          ふり
        </button>
      </div>

      {/* 카드 */}
      <div className="flex-1 px-4">
        <button
          type="button"
          onClick={() => setShowMeaning((s) => !s)}
          className="block w-full text-left"
        >
          {word && (
            <Flashcard
              word={word}
              showFurigana={showFurigana}
              showMeaning={showMeaning}
              emoji={category.emoji}
            />
          )}
        </button>
      </div>

      {/* 하단 액션 */}
      <div className="sticky bottom-16 z-10 flex gap-3 bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8] to-transparent px-4 pb-4 pt-6">
        <button
          onClick={() => next(true)}
          className="flex-1 rounded-2xl border border-slate-300 bg-white py-4 font-bold text-slate-700 shadow-sm transition active:scale-95"
        >
          알고 있어요
        </button>
        <button
          onClick={() => next(false)}
          className="flex-1 rounded-2xl bg-slate-900 py-4 font-bold text-white shadow-sm transition active:scale-95"
        >
          학습할게요
        </button>
      </div>
    </div>
  );
}
