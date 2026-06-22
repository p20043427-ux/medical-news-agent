"use client";

import { useState } from "react";
import { EN_VOCAB } from "@/lib/en/vocab";
import type { EnCategory } from "@/lib/en/types";
import { type EnGrade, type EnProgress, dueIds } from "@/lib/en/progress";
import { speakEn } from "@/lib/en/speech";
import EnReviewMode from "./ReviewMode";
import EnQuizMode from "./QuizMode";

const ALL_CAT: EnCategory = { key: "all", label: "전체 복습", emoji: "🔁", cefrRange: "A1-C1" };
const WEAK_CAT: EnCategory = { key: "weak", label: "오답 단어", emoji: "🩹", cefrRange: "A1-C1" };

type View = "hub" | "all" | "allQuiz" | "weak" | "weakQuiz";

export default function EnReviewLibrary({
  progress, onGrade, onExit,
}: {
  progress: EnProgress;
  onGrade: (id: string, g: EnGrade) => void;
  onExit: () => void;
}) {
  const [view, setView] = useState<View>("hub");

  const weak = EN_VOCAB.filter((w) => (progress.cards[w.id]?.lapses ?? 0) > 0)
    .sort((a, b) => (progress.cards[b.id]?.lapses ?? 0) - (progress.cards[a.id]?.lapses ?? 0));
  const dueCount = dueIds(progress).length;

  if (view === "all")
    return <EnReviewMode category={ALL_CAT} words={EN_VOCAB} onGrade={onGrade} onExit={() => setView("hub")} onQuiz={() => setView("allQuiz")} progress={progress} />;
  if (view === "allQuiz")
    return <EnQuizMode words={EN_VOCAB} onGrade={onGrade} onExit={() => setView("hub")} onReview={() => setView("all")} />;
  if (view === "weak")
    return <EnReviewMode category={WEAK_CAT} words={weak} onGrade={onGrade} onExit={() => setView("hub")} onQuiz={() => setView("weakQuiz")} progress={progress} />;
  if (view === "weakQuiz")
    return <EnQuizMode words={weak} onGrade={onGrade} onExit={() => setView("hub")} onReview={() => setView("weak")} />;

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>복습</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>복습 예정과 오답 단어를 모아 봤어요.</p>

      {/* 오늘의 복습 */}
      <button onClick={() => setView("all")}
        className="mb-3 flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
          style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)", boxShadow: "0 4px 12px rgba(67,97,238,.35)" }}>🔁</div>
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ color: "var(--text-1)" }}>오늘의 복습</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{dueCount > 0 ? `복습할 단어 ${dueCount}개` : "예정된 복습이 없어요 · 전체 복습 가능"}</p>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* 오답 단어 */}
      <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
            style={{ background: "linear-gradient(135deg,#EF4444,#F97316)", boxShadow: "0 4px 12px rgba(239,68,68,.3)" }}>🩹</div>
          <div className="min-w-0 flex-1">
            <p className="font-bold" style={{ color: "var(--text-1)" }}>오답 단어</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>{weak.length > 0 ? `자주 틀린 단어 ${weak.length}개` : "아직 틀린 단어가 없어요"}</p>
          </div>
        </div>

        {weak.length > 0 && (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {weak.slice(0, 12).map((w) => (
                <button key={w.id} onClick={() => speakEn(w.word)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "var(--surface)", color: "var(--text-1)" }}>
                  <span>{w.word}</span>
                  <span className="text-[10px]" style={{ color: "var(--text-3)" }}>{w.meaning}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => setView("weak")}
                className="rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>오답 복습</button>
              <button onClick={() => setView("weakQuiz")}
                className="rounded-xl py-2.5 text-sm font-bold"
                style={{ background: "var(--surface)", color: "var(--text-1)" }}>오답 퀴즈</button>
            </div>
          </>
        )}
      </div>

      <button onClick={onExit} className="mt-5 w-full rounded-2xl py-3 text-sm font-semibold"
        style={{ background: "var(--surface)", color: "var(--text-2)" }}>홈으로</button>
    </div>
  );
}
