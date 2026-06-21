"use client";

import type { Word } from "@/lib/jp/types";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";

// 카테고리별 카드 헤더 그라데이션
const GRADIENTS: Record<string, string> = {
  greeting: "from-rose-400 to-orange-300",
  people: "from-violet-400 to-indigo-300",
  number: "from-sky-400 to-cyan-300",
  time: "from-amber-400 to-yellow-300",
  food: "from-emerald-400 to-lime-300",
  place: "from-teal-400 to-emerald-300",
  adjective: "from-fuchsia-400 to-pink-300",
  daily: "from-blue-400 to-indigo-300",
  adverb: "from-slate-400 to-slate-300",
};

export default function Flashcard({
  word,
  showFurigana,
  showMeaning,
  emoji,
}: {
  word: Word;
  showFurigana: boolean;
  showMeaning: boolean;
  emoji: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
      {/* 헤더 (이미지 영역 대체) */}
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${
          GRADIENTS[word.category] ?? "from-slate-400 to-slate-300"
        }`}
      >
        <span className="text-7xl drop-shadow-sm">{emoji}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {word.pos}
        </span>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h2 className="truncate text-3xl font-bold text-slate-900">
                {word.word}
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-400">[{word.reading}]</p>
          </div>
          <SpeakerButton text={word.reading} size={44} />
        </div>

        {/* 뜻 */}
        <div className="min-h-[28px]">
          {showMeaning ? (
            <p className="text-lg font-medium text-slate-800">{word.meaning}</p>
          ) : (
            <p className="select-none rounded-lg bg-slate-100 py-1.5 text-center text-sm text-slate-400">
              👆 탭하면 뜻이 보여요
            </p>
          )}
        </div>

        {/* 예문 */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg leading-relaxed text-slate-800">
              <Furigana tokens={word.example.tokens} showFurigana={showFurigana} />
            </p>
            <SpeakerButton text={tokensToText(word.example.tokens)} size={36} />
          </div>
          {showMeaning && (
            <p className="mt-2 text-sm text-slate-500">{word.example.ko}</p>
          )}
        </div>
      </div>
    </div>
  );
}
