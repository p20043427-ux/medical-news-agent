"use client";

import { useMemo, useState } from "react";
import type { Word, Category } from "@/lib/jp/types";
import Flashcard from "./Flashcard";
import SwipeCard from "./SwipeCard";

export default function VocabStudy({
  category,
  words,
  showFurigana,
  onToggleFurigana,
  onSkim,
  onExit,
  onReview,
  onQuiz,
  bookmarks = [],
  onToggleBookmark,
}: {
  category: Category;
  words: Word[];
  showFurigana: boolean;
  onToggleFurigana: () => void;
  onSkim: (id: string, known: boolean) => void;
  onExit: () => void;
  onReview: () => void;
  onQuiz: () => void;
  bookmarks?: string[];
  onToggleBookmark?: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [hideMeaning, setHideMeaning] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [done, setDone] = useState(false);

  const total = words.length;
  const word = words[index];

  function next(isKnown: boolean) {
    if (!word) return;
    onSkim(word.id, isKnown);
    if (isKnown) setKnown((k) => k + 1);
    else setUnknown((u) => u + 1);
    if (index + 1 >= total) setDone(true);
    else setIndex((i) => i + 1);
  }

  const progressPct = useMemo(
    () => (total ? Math.round((index / total) * 100) : 0),
    [index, total],
  );

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-slate-900">스키밍 완료!</h2>
        <p className="text-slate-500">
          {category.label} · 총 {total}개 중{" "}
          <strong className="text-emerald-600">{known}개</strong> 알고 있어요.
          <br />
          모르는 <strong className="text-slate-700">{unknown}개</strong>를 복습·퀴즈로 익혀요.
        </p>
        <div className="mt-2 grid w-full max-w-xs gap-2.5">
          <button onClick={onReview} className="ui-btn ui-btn-brand py-3.5">
            🔁 복습 카드 시작
          </button>
          <button onClick={onQuiz} className="ui-btn ui-btn-surface py-3.5">
            📝 퀴즈로 점검
          </button>
          <button
            onClick={() => {
              setIndex(0);
              setKnown(0);
              setUnknown(0);
              setDone(false);
            }}
            className="rounded-2xl py-2 text-sm font-semibold text-slate-400"
          >
            다시 스키밍
          </button>
        </div>
        <button onClick={onExit} className="text-sm font-semibold text-slate-400">
          홈으로
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* 상단 카운터 바 */}
      <div className="relative flex items-center px-4 pb-2 pt-2">
        <button
          onClick={onExit}
          aria-label="뒤로"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        <div className="mx-auto flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-bold text-slate-400 shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
            {unknown}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-bold text-emerald-600 shadow-sm">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            {known}/{total}
          </span>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="설정"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-4 top-12 z-30 w-44 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <button
                onClick={onToggleFurigana}
                className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                후리가나
                <Toggle on={showFurigana} />
              </button>
              <button
                onClick={() => setHideMeaning((h) => !h)}
                className="flex w-full items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                뜻 숨기기
                <Toggle on={hideMeaning} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 진행 바 */}
      <div className="px-5 pb-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70">
          <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* 카드 (스와이프) */}
      <div className="flex-1 px-4">
        {word && (
          <SwipeCard swipeKey={word.id} onSwipe={(k) => next(k)}>
            <Flashcard
              word={word}
              showFurigana={showFurigana}
              emoji={category.emoji}
              hideMeaningDefault={hideMeaning}
              bookmarked={bookmarks.includes(word.id)}
              onToggleBookmark={onToggleBookmark ? () => onToggleBookmark(word.id) : undefined}
            />
          </SwipeCard>
        )}
        <p className="mt-3 text-center text-xs text-slate-400">
          ← 알고 있어요 · 학습할게요 → · 카드를 좌우로 밀어보세요
        </p>
      </div>

      {/* 하단 액션 */}
      <div className="sticky bottom-16 z-10 flex gap-3 bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8] to-transparent px-4 pb-4 pt-6">
        <button onClick={() => next(true)} className="ui-btn ui-btn-success flex-1 py-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          알고 있어요
        </button>
        <button onClick={() => next(false)} className="ui-btn ui-btn-dark flex-1 py-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          학습할게요
        </button>
      </div>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative h-5 w-9 rounded-full transition ${on ? "bg-emerald-500" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}
