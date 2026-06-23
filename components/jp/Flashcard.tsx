"use client";

import { useEffect, useState } from "react";
import type { Word } from "@/lib/jp/types";
import { posTag } from "@/lib/jp/extras";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import WordImage from "./WordImage";
import WritingPad from "./WritingPad";
import { useUiLang, tt } from "@/lib/i18n";

export default function Flashcard({
  word,
  showFurigana,
  emoji,
  hideMeaningDefault,
  bookmarked = false,
  onToggleBookmark,
}: {
  word: Word;
  showFurigana: boolean;
  emoji: string;
  hideMeaningDefault: boolean;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  const lang = useUiLang();
  const [showMeaning, setShowMeaning] = useState(!hideMeaningDefault);
  const [showKo, setShowKo] = useState(!hideMeaningDefault);
  const [flipped, setFlipped] = useState(false);
  const [writeMode, setWriteMode] = useState(false);

  // 카드(단어)가 바뀌면 상태 초기화
  useEffect(() => {
    setShowMeaning(!hideMeaningDefault);
    setShowKo(!hideMeaningDefault);
    setFlipped(false);
    setWriteMode(false);
  }, [word.id, hideMeaningDefault]);

  const tag = posTag(word.pos);
  const hasExtras = (word.synonyms?.length ?? 0) > 0 || !!word.tip;

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
      {/* ───── 쓰기 모드 ───── */}
      {writeMode ? (
        <div className="flex min-h-[460px] flex-col">
          <div className="flex items-center justify-between bg-amber-50 px-5 py-4">
            <span className="text-sm font-semibold text-amber-600">{tt(lang, "쓰기 연습", "書き取り練習")}</span>
            <button
              onClick={() => setWriteMode(false)}
              className="flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              {tt(lang, "닫기", "閉じる")}
            </button>
          </div>
          <WritingPad character={word.word} reading={word.reading} />
        </div>
      ) : /* ───── 뒷면: 유사어 · 팁 ───── */
      flipped ? (
        <div className="flex h-full min-h-[460px] flex-col">
          {/* 헤더 바 */}
          <div className="flex items-center justify-between bg-slate-100 px-5 py-4">
            <span className="text-xl font-bold text-slate-400">{word.word}</span>
            <span className="text-sm text-slate-400">{word.meaning}</span>
          </div>

          <div className="flex-1 space-y-5 p-5">
            {word.synonyms && word.synonyms.length > 0 && (
              <section>
                <div className="mb-2 rounded-xl bg-slate-100 py-2 text-center text-sm font-bold text-slate-600">
                  {tt(lang, "유사어", "類義語")}
                </div>
                <ul className="divide-y divide-slate-100">
                  {word.synonyms.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                        {s.pos}
                      </span>
                      <span className="text-lg font-bold text-slate-900">{s.word}</span>
                      <span className="ml-auto text-sm text-slate-500">{s.meaning}</span>
                      <SpeakerButton text={s.reading} size={32} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {word.tip && (
              <section>
                <div className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-500">
                  {tt(lang, "💡 팁", "💡 ヒント")}
                </div>
                <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
                  {word.tip}
                </p>
              </section>
            )}
          </div>

          <div className="p-4">
            <button
              onClick={() => setFlipped(false)}
              className="ml-auto flex items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              {tt(lang, "뒤로", "戻る")}
            </button>
          </div>
        </div>
      ) : (
        /* ───── 앞면 ───── */
        <>
          {/* 이미지 헤더 (일러스트 아트) */}
          <div className="relative h-44">
            <WordImage id={word.id} category={word.category} emoji={emoji} />
            <button
              onClick={onToggleBookmark}
              aria-label={tt(lang, "북마크", "ブックマーク")}
              className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-slate-700 shadow-sm backdrop-blur"
              style={{ color: bookmarked ? "#E63946" : undefined }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </button>
          </div>

          {/* 본문 */}
          <div className="space-y-4 p-5">
            {/* 표제어 */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-3xl font-extrabold text-amber-500">
                  {word.word}
                </h2>
                <p className="mt-1 text-sm text-slate-400">[{word.reading}]</p>
              </div>
              <SpeakerButton text={word.reading} size={44} />
            </div>

            {/* 품사 + 뜻 보기 */}
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold lowercase text-slate-500">
                {tag}
              </span>
              {showMeaning ? (
                <span className="text-lg font-semibold text-slate-800">
                  {word.meaning}
                </span>
              ) : (
                <button
                  onClick={() => setShowMeaning(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-100 py-1.5 text-sm font-medium text-slate-400"
                >
                  {tt(lang, "👆 뜻 보기", "👆 意味を見る")}
                </button>
              )}
            </div>

            {/* 예문 */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg leading-relaxed text-slate-700">
                  <Furigana tokens={word.example.tokens} showFurigana={showFurigana} />
                </p>
                <SpeakerButton text={tokensToText(word.example.tokens)} size={36} />
              </div>
              <div className="mt-2">
                {showKo ? (
                  <p className="text-sm text-slate-500">{word.example.ko}</p>
                ) : (
                  <button
                    onClick={() => setShowKo(true)}
                    className="w-full rounded-lg bg-white py-1.5 text-center text-xs font-medium text-slate-400 ring-1 ring-slate-200"
                  >
                    {tt(lang, "뜻 보기", "意味を見る")}
                  </button>
                )}
              </div>
            </div>

            {/* 레벨 + 쓰기 + 팁 */}
            <div className="flex items-center justify-between pt-1">
              <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-400">
                {word.level ?? "N5"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWriteMode(true)}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold"
                  style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)", color: "#92400e" }}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  {tt(lang, "쓰기", "書き取り")}
                </button>
                {hasExtras && (
                  <button
                    onClick={() => setFlipped(true)}
                    className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#2d3436,#1a1a2e)" }}
                  >
                    {tt(lang, "팁", "ヒント")}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
