"use client";

import { useMemo, useState } from "react";
import type { EnWord, EnCategory } from "@/lib/en/types";
import type { EnGrade, EnProgress } from "@/lib/en/progress";
import { dueIds } from "@/lib/en/progress";
import { speakEn } from "@/lib/en/speech";
import PronounceButton from "@/components/PronounceButton";
import { Button, Progress } from "@/components/ui";

const GRADE_CONFIG: Record<EnGrade, { label: string; sub: string; bg: string; xp: string }> = {
  again: { label: "다시",   sub: "1일",    bg: "#EF4444", xp: "+2" },
  hard:  { label: "어려움", sub: "짧게",   bg: "#F97316", xp: "+10" },
  good:  { label: "좋음",   sub: "며칠 뒤", bg: "#3B82F6", xp: "+15" },
  easy:  { label: "쉬움",   sub: "길게",   bg: "#10B981", xp: "+20" },
};

export default function EnReviewMode({
  category, words, onGrade, onExit, onQuiz, progress,
}: {
  category: EnCategory;
  words: EnWord[];
  onGrade: (id: string, g: EnGrade) => void;
  onExit: () => void;
  onQuiz: () => void;
  progress: EnProgress;
}) {
  const dueList = useMemo(() => dueIds(progress, words.map((w) => w.id)), [progress, words]);
  const byId = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);

  const [queue, setQueue] = useState<string[]>(() => {
    const pool = dueList.length > 0 ? dueList : words.map((w) => w.id);
    return pool;
  });
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [lastXP, setLastXP] = useState<string | null>(null);

  const totalPlanned = queue.length;
  const word = queue[pos] ? byId.get(queue[pos]) : undefined;

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>복습 완료!</h2>
        <p style={{ color: "var(--text-3)" }}>총 <strong style={{ color: "var(--text-1)" }}>{reviewed}개</strong> 복습했어요.</p>
        <div className="grid w-full max-w-xs gap-2.5">
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

  function handleGrade(g: EnGrade) {
    onGrade(word!.id, g);
    setReviewed((r) => r + 1);
    setLastXP(GRADE_CONFIG[g].xp);
    setTimeout(() => setLastXP(null), 1200);
    if (g === "again") setQueue((q) => [...q, word!.id]);
    setRevealed(false);
    setPos((p) => p + 1);
  }

  const remaining = queue.length - pos;
  const pct = totalPlanned ? Math.min((reviewed / totalPlanned) * 100, 100) : 0;

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
          <span className="rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
            🔁 SM-2 복습
          </span>
          <span className="rounded-full px-2.5 py-1 text-sm font-bold"
            style={{ background: "var(--card)", color: "var(--text-3)" }}>
            남은 {remaining}장
          </span>
        </div>
        <span className="h-9 w-9" />
      </div>

      <div className="px-5 pb-2">
        <Progress value={pct} indicatorStyle={{ background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
      </div>

      {/* 카드 */}
      <div className="flex flex-1 items-start px-4 pt-2">
        <div
          role="button"
          tabIndex={0}
          aria-label={revealed ? undefined : "탭하면 답 보기"}
          onClick={() => !revealed && setRevealed(true)}
          onKeyDown={(e) => { if (!revealed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setRevealed(true); } }}
          className="flex min-h-[340px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center shadow-xl"
          style={{ background: "var(--card)" }}
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold"
              style={{ background: "var(--surface)", color: "var(--text-3)" }}>
              {word.partOfSpeech}
            </span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>{word.cefrLevel}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-extrabold" style={{ color: "#4361EE" }}>{word.word}</h2>
            <button onClick={(e) => { e.stopPropagation(); speakEn(word.word); }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
              🔊
            </button>
          </div>
          <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>{word.pronunciation}</p>
          <PronounceButton target={word.word} lang="en" accent="#4361EE" />

          {revealed ? (
            <div className="mt-2 w-full space-y-3">
              <p className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>{word.meaning}</p>
              <div className="rounded-2xl p-4 text-left" style={{ background: "var(--surface)" }}>
                <p className="leading-relaxed" style={{ color: "var(--text-2)" }}>"{word.example.en}"</p>
                <p className="mt-1.5 text-sm" style={{ color: "var(--text-3)" }}>{word.example.ko}</p>
              </div>
              {word.synonyms && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {word.synonyms.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-full px-2 py-0.5 text-xs"
                      style={{ background: "var(--surface)", color: "var(--text-3)" }}>
                      = {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-4 rounded-full px-4 py-2 text-sm"
              style={{ background: "var(--surface)", color: "var(--text-3)" }}>
              👆 탭하면 답이 보여요
            </p>
          )}
        </div>
      </div>

      {lastXP && (
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-50">
          <span className="animate-bounce rounded-full px-5 py-2 text-lg font-extrabold text-white shadow-xl"
            style={{ background: "var(--xp)" }}>
            {lastXP} XP
          </span>
        </div>
      )}

      {/* 채점 버튼 */}
      <div className="sticky bottom-16 z-10 px-4 pb-4 pt-6"
        style={{ background: `linear-gradient(to top, var(--bg) 70%, transparent)` }}>
        {revealed ? (
          <div className="grid grid-cols-4 gap-2">
            {(["again", "hard", "good", "easy"] as EnGrade[]).map((g) => {
              const cfg = GRADE_CONFIG[g];
              return (
                <button key={g} onClick={() => handleGrade(g)}
                  className="rounded-2xl py-3.5 font-bold text-white shadow-sm active:scale-95 transition"
                  style={{ background: cfg.bg }}>
                  <span className="block text-sm">{cfg.label}</span>
                  <span className="block text-[10px] font-medium text-white/70">{cfg.sub}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <Button variant="accent" size="free" onClick={() => setRevealed(true)}
            className="w-full py-4">
            답 확인
          </Button>
        )}
      </div>
    </div>
  );
}
