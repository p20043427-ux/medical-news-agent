"use client";

import { useMemo, useState } from "react";
import type { Word, Category } from "@/lib/jp/types";
import type { Grade } from "@/lib/jp/progress";
import Furigana from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import PronounceButton from "@/components/PronounceButton";
import { Button, Progress } from "@/components/ui";

const GRADE_CONFIG: Record<Grade, { label: string; sub: string; grad: [string, string]; xp: string; icon: string }> = {
  again: { label: "다시",   sub: "1일",   grad: ["#ff7675", "#d63031"], xp: "+2",  icon: "↺" },
  hard:  { label: "어려움", sub: "짧게",  grad: ["#fdcb6e", "#e17055"], xp: "+10", icon: "△" },
  good:  { label: "좋음",   sub: "며칠",  grad: ["#74b9ff", "#0984e3"], xp: "+15", icon: "○" },
  easy:  { label: "쉬움",   sub: "길게",  grad: ["#55efc4", "#00b894"], xp: "+20", icon: "✦" },
};

export default function ReviewMode({
  category, words, showFurigana, onGrade, onExit, onQuiz,
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
  const [lastXP, setLastXP] = useState<string | null>(null);

  const totalPlanned = initial.length;
  const id = queue[pos];
  const word = id ? byId.get(id) : undefined;

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full" style={{ background: "linear-gradient(135deg,#55efc4,#00b894)" }}>
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>복습 완료!</h2>
        <p style={{ color: "var(--text-3)" }}>
          {category.label} 카드 <strong style={{ color: "var(--text-1)" }}>{reviewed}회</strong> 복습했어요.
        </p>
        <div className="mt-2 grid w-full max-w-xs gap-2.5">
          <button onClick={onQuiz}
            className="flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-white shadow-md"
            style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            퀴즈로 점검
          </button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">
            홈으로
          </Button>
        </div>
      </div>
    );
  }

  function handleGrade(g: Grade) {
    if (!word) return;
    onGrade(word.id, g);
    setReviewed((r) => r + 1);
    setLastXP(GRADE_CONFIG[g].xp);
    setTimeout(() => setLastXP(null), 1200);
    if (g === "again") setQueue((q) => [...q, word.id]);
    setRevealed(false);
    setPos((p) => p + 1);
  }

  const remaining = queue.length - pos;
  const pct = totalPlanned ? Math.min((reviewed / totalPlanned) * 100, 100) : 0;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col" style={{ background: "var(--bg)" }}>
      {/* 헤더 */}
      <div className="flex items-center px-4 pb-2 pt-3">
        <button onClick={onExit} aria-label="뒤로"
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}
            strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="mx-auto flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#E63946,#c0392b)" }}>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            SM-2 복습
          </span>
          <span className="rounded-full px-2.5 py-1 text-sm font-bold"
            style={{ background: "var(--card)", color: "var(--text-3)", boxShadow: "0 1px 3px rgba(0,0,0,.1)" }}>
            남은 {remaining}장
          </span>
        </div>
        <span className="h-9 w-9" />
      </div>

      {/* 진행바 */}
      <div className="px-5 pb-2">
        <Progress value={pct} indicatorStyle={{ background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
      </div>

      {/* 카드 */}
      <div className="flex flex-1 items-start px-4 pt-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => !revealed && setRevealed(true)}
          className="flex min-h-[340px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center shadow-xl transition"
          style={{ background: "var(--card)" }}
        >
          <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>
            {revealed ? "뜻 · 예문" : "이 단어의 뜻은?"}
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-extrabold" style={{ color: "#E63946" }}>{word.word}</h2>
            <SpeakerButton text={word.reading} size={40} />
          </div>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>[{word.reading}]</p>
          <PronounceButton target={word.reading} lang="ja" accent="#E63946" />

          {revealed ? (
            <div className="mt-2 w-full space-y-4">
              <p className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>{word.meaning}</p>
              <div className="rounded-2xl p-4 text-left" style={{ background: "var(--surface)" }}>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
                  <Furigana tokens={word.example.tokens} showFurigana={showFurigana} />
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--text-3)" }}>{word.example.ko}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 rounded-2xl px-4 py-3"
              style={{ background: "var(--surface)", color: "var(--text-3)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#E63946" }} />
              </span>
              <span className="text-sm">탭하면 답이 보여요</span>
            </div>
          )}
        </div>
      </div>

      {/* XP 획득 알림 */}
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
          <div className="grid grid-cols-4 gap-2.5">
            {(["again", "hard", "good", "easy"] as Grade[]).map((g) => {
              const cfg = GRADE_CONFIG[g];
              return (
                <button key={g} onClick={() => handleGrade(g)}
                  className="relative flex flex-col items-center rounded-2xl px-1 py-3 shadow-lg active:scale-95 transition"
                  style={{ background: `linear-gradient(150deg,${cfg.grad[0]},${cfg.grad[1]})` }}>
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-white/30 px-1 py-px text-[8px] font-extrabold text-white">
                    {cfg.xp}
                  </span>
                  <span className="mb-0.5 text-base font-black text-white/90">{cfg.icon}</span>
                  <span className="text-sm font-bold leading-tight text-white">{cfg.label}</span>
                  <span className="mt-0.5 text-[10px] text-white/70">{cfg.sub}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <button onClick={() => setRevealed(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 font-bold text-white shadow-lg active:scale-[0.98] transition"
            style={{ background: "linear-gradient(135deg,#E63946 0%,#F4A261 100%)" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            답 확인
          </button>
        )}
      </div>
    </div>
  );
}
