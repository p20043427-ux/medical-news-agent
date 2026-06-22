"use client";

import { useMemo, useState } from "react";
import type { Word, Category } from "@/lib/jp/types";
import type { Grade } from "@/lib/jp/progress";
import Furigana from "./Furigana";
import SpeakerButton from "./SpeakerButton";

export default function ReviewMode({
  category,
  words,
  showFurigana,
  onGrade,
  onExit,
  onQuiz,
}: {
  category: Category;
  words: Word[];
  showFurigana: boolean;
  onGrade: (id: string, g: Grade) => void;
  onExit: () => void;
  onQuiz: () => void;
}) {
  const initial = useMemo(() => words.map((w) => w.id), [words]);
  const byId = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);

  const [queue, setQueue] = useState<string[]>(initial);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const totalPlanned = initial.length;
  const id = queue[pos];
  const word = id ? byId.get(id) : undefined;

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-bold text-slate-900">복습 완료!</h2>
        <p className="text-slate-500">
          {category.label} 단어 <strong className="text-slate-800">{reviewed}회</strong> 복습했어요.
        </p>
        <div className="mt-2 grid w-full max-w-xs gap-2.5">
          <button onClick={onQuiz} className="btn btn-primary py-3.5">
            📝 퀴즈로 점검
          </button>
          <button onClick={onExit} className="btn btn-outline py-3.5">
            홈으로
          </button>
        </div>
      </div>
    );
  }

  function grade(g: Grade) {
    if (!word) return;
    onGrade(word.id, g);
    setReviewed((r) => r + 1);
    // '다시'는 이번 세션 뒤쪽에 다시 넣어 반복
    if (g === "again") setQueue((q) => [...q, word.id]);
    setRevealed(false);
    setPos((p) => p + 1);
  }

  const remaining = queue.length - pos;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* 상단 */}
      <div className="flex items-center px-4 pb-2 pt-2">
        <button onClick={onExit} aria-label="뒤로" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="mx-auto flex items-center gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">🔁 복습</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-sm font-bold text-slate-500 shadow-sm">
            남은 {remaining}장
          </span>
        </div>
        <span className="h-9 w-9" />
      </div>

      <div className="px-5 pb-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70">
          <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${totalPlanned ? Math.min((reviewed / totalPlanned) * 100, 100) : 0}%` }} />
        </div>
      </div>

      {/* 카드 */}
      <div className="flex flex-1 items-start px-4">
        <button
          onClick={() => setRevealed(true)}
          className="flex min-h-[360px] w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5"
        >
          <span className="text-xs font-semibold text-slate-400">
            {revealed ? "뜻·예문" : "이 단어의 뜻은?"}
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-extrabold text-amber-500">{word.word}</h2>
            <SpeakerButton text={word.reading} size={40} />
          </div>
          <p className="text-sm text-slate-400">[{word.reading}]</p>

          {revealed ? (
            <div className="mt-2 w-full space-y-4">
              <p className="text-2xl font-bold text-slate-900">{word.meaning}</p>
              <div className="rounded-2xl bg-slate-50 p-4 text-left">
                <p className="text-lg leading-relaxed text-slate-700">
                  <Furigana tokens={word.example.tokens} showFurigana={showFurigana} />
                </p>
                <p className="mt-2 text-sm text-slate-500">{word.example.ko}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-400">
              👆 탭하면 답이 보여요
            </p>
          )}
        </button>
      </div>

      {/* 하단: 채점 or 보기 */}
      <div className="sticky bottom-16 z-10 bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8] to-transparent px-4 pb-4 pt-6">
        {revealed ? (
          <div className="grid grid-cols-3 gap-2.5">
            <button onClick={() => grade("again")} className="btn btn-rose flex-col py-3.5">
              다시
              <span className="block text-[11px] font-medium text-white/75">1일</span>
            </button>
            <button onClick={() => grade("good")} className="btn btn-primary flex-col py-3.5">
              좋음
              <span className="block text-[11px] font-medium text-white/65">며칠 뒤</span>
            </button>
            <button onClick={() => grade("easy")} className="btn btn-emerald flex-col py-3.5">
              쉬움
              <span className="block text-[11px] font-medium text-white/75">길게</span>
            </button>
          </div>
        ) : (
          <button onClick={() => setRevealed(true)} className="btn btn-primary w-full py-4">
            답 확인
          </button>
        )}
      </div>
    </div>
  );
}
