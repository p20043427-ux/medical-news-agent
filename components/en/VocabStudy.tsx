"use client";

import { useState } from "react";
import type { EnWord, EnCategory } from "@/lib/en/types";
import type { EnProgress } from "@/lib/en/progress";
import { speakEn } from "@/lib/en/speech";
import { isLearned } from "@/lib/en/progress";
import { Button } from "@/components/ui";

const CEFR_COLORS: Record<string, string> = {
  A1: "#10B981", A2: "#3B82F6", B1: "#8B5CF6", B2: "#EC4899", C1: "#F59E0B", C2: "#EF4444",
};

export default function EnVocabStudy({
  category, words, onMarkNew, onExit, onReview, onQuiz, progress,
}: {
  category: EnCategory;
  words: EnWord[];
  onMarkNew: (id: string) => void;
  onExit: () => void;
  onReview: () => void;
  onQuiz: () => void;
  progress: EnProgress;
}) {
  const [idx, setIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [done, setDone] = useState(0);

  const sorted = [...words].sort((a, b) => {
    const al = isLearned(progress, a.id) ? 1 : 0;
    const bl = isLearned(progress, b.id) ? 1 : 0;
    return al - bl;
  });

  const word = sorted[idx];

  if (!word || idx >= sorted.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>단어 학습 완료!</h2>
        <p style={{ color: "var(--text-3)" }}>
          <strong style={{ color: "var(--text-1)" }}>{done}</strong>개 단어를 학습했어요.
        </p>
        <div className="grid w-full max-w-xs gap-2.5">
          <Button variant="accent" size="free" onClick={onReview}
            className="py-3.5">
            🔁 SM-2 복습하기
          </Button>
          <Button variant="accent" size="free" onClick={onQuiz}
            className="py-3.5">
            📝 퀴즈 도전
          </Button>
          <Button variant="surface" size="free" onClick={onExit}
            className="py-3.5">
            홈으로
          </Button>
        </div>
      </div>
    );
  }

  const pct = sorted.length ? Math.round((idx / sorted.length) * 100) : 0;

  function next() {
    if (idx < sorted.length - 1) {
      setIdx((i) => i + 1);
      setShowMeaning(false);
      setShowExtra(false);
    } else {
      setIdx(sorted.length); // 완료
    }
  }

  function handleKnow() {
    if (!isLearned(progress, word.id)) {
      onMarkNew(word.id);
      setDone((d) => d + 1);
    }
    next();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col" style={{ background: "var(--bg)" }}>
      {/* 헤더 */}
      <div className="flex items-center px-4 pb-2 pt-3">
        <button onClick={onExit}
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}
            strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="mx-auto flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: "var(--text-2)" }}>
            {category.emoji} {category.label}
          </span>
          <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
            style={{ background: CEFR_COLORS[word.cefrLevel] ?? "#4361EE" }}>
            {word.cefrLevel}
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--text-3)" }}>{idx + 1}/{sorted.length}</span>
      </div>

      {/* 진행바 */}
      <div className="px-5 pb-2">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
        </div>
      </div>

      {/* 메인 카드 */}
      <div className="flex-1 px-4 pt-2 overflow-y-auto">
        <div className="rounded-3xl p-6 shadow-xl" style={{ background: "var(--card)" }}>
          {/* 단어 헤더 */}
          <div className="flex items-start justify-between mb-1">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
              style={{ background: CEFR_COLORS[word.cefrLevel] ?? "#4361EE" }}>
              {word.cefrLevel}
            </span>
            <span className="text-xs rounded-full px-2 py-0.5"
              style={{ background: "var(--surface)", color: "var(--text-3)" }}>
              {word.partOfSpeech}
            </span>
          </div>

          {/* 단어 + 발음 */}
          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-4xl font-extrabold" style={{ color: "#4361EE" }}>{word.word}</h2>
            <button onClick={() => speakEn(word.word)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
              🔊
            </button>
          </div>
          <p className="mt-1 font-mono text-sm" style={{ color: "var(--text-3)" }}>{word.pronunciation}</p>

          {/* 뜻 토글 */}
          {showMeaning ? (
            <div className="mt-4 space-y-3">
              <p className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>{word.meaning}</p>

              {/* 예문 */}
              <div className="rounded-2xl p-4" style={{ background: "var(--surface)" }}>
                <p className="font-medium leading-relaxed" style={{ color: "var(--text-2)" }}>
                  "{word.example.en}"
                </p>
                <p className="mt-1.5 text-sm" style={{ color: "var(--text-3)" }}>{word.example.ko}</p>
                <button onClick={() => speakEn(word.example.en)} className="mt-2 text-xs font-semibold"
                  style={{ color: "#4361EE" }}>
                  🔊 예문 듣기
                </button>
              </div>

              {/* 추가 정보 토글 */}
              <button onClick={() => setShowExtra((s) => !s)}
                className="text-sm font-semibold"
                style={{ color: "#4361EE" }}>
                {showExtra ? "▲ 접기" : "▼ 더 보기 (파생어·동의어·콜로케이션)"}
              </button>

              {showExtra && (
                <div className="space-y-2.5">
                  {word.synonyms && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--text-3)" }}>동의어</p>
                      <div className="flex flex-wrap gap-1.5">
                        {word.synonyms.map((s) => (
                          <span key={s} className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ background: "var(--surface)", color: "var(--text-2)" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {word.antonyms && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--text-3)" }}>반의어</p>
                      <div className="flex flex-wrap gap-1.5">
                        {word.antonyms.map((a) => (
                          <span key={a} className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ background: "var(--surface)", color: "#EF4444" }}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {word.wordFamily && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--text-3)" }}>파생어</p>
                      <div className="flex flex-wrap gap-1.5">
                        {word.wordFamily.map((w) => (
                          <span key={w} className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ background: "var(--surface)", color: "#8B5CF6" }}>
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {word.collocations && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--text-3)" }}>자주 쓰이는 표현</p>
                      <div className="flex flex-wrap gap-1.5">
                        {word.collocations.map((c) => (
                          <span key={c} className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ background: "var(--surface)", color: "#10B981" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {word.tip && (
                    <div className="rounded-xl p-3" style={{ background: "#4361EE15" }}>
                      <p className="text-xs" style={{ color: "#4361EE" }}>💡 {word.tip}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowMeaning(true)}
              className="mt-5 rounded-xl px-4 py-2 text-sm"
              style={{ background: "var(--surface)", color: "var(--text-3)" }}>
              👆 탭하면 뜻이 보여요
            </button>
          )}
        </div>

        {/* 이미 학습한 단어 표시 */}
        {isLearned(progress, word.id) && (
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span className="text-xs" style={{ color: "#10B981" }}>✓ 이미 학습한 단어</span>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="sticky bottom-16 z-10 px-4 pb-4 pt-4"
        style={{ background: `linear-gradient(to top, var(--bg) 70%, transparent)` }}>
        {showMeaning ? (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="surface" size="free" onClick={next}
              className="py-4">
              다음 →
            </Button>
            <Button variant="success" size="free" onClick={handleKnow}
              className="py-4">
              ✓ 알고 있어요
            </Button>
          </div>
        ) : (
          <Button variant="accent" size="free" onClick={() => setShowMeaning(true)}
            className="w-full py-4">
            뜻 확인하기
          </Button>
        )}
      </div>
    </div>
  );
}
