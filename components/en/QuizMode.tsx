"use client";

import { useMemo, useState } from "react";
import type { EnWord } from "@/lib/en/types";
import type { EnGrade } from "@/lib/en/progress";
import { speakEn } from "@/lib/en/speech";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function EnQuizMode({
  words, onGrade, onExit, onReview,
}: {
  words: EnWord[];
  onGrade: (id: string, g: EnGrade) => void;
  onExit: () => void;
  onReview: () => void;
}) {
  const pool = useMemo(() => shuffle(words).slice(0, 20), [words]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const word = pool[idx];

  if (!word) {
    const total = pool.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
        <h2 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>퀴즈 완료!</h2>
        <div className="rounded-3xl p-6 w-full max-w-xs" style={{ background: "var(--card)" }}>
          <p className="text-5xl font-extrabold" style={{ color: "#4361EE" }}>{score}<span className="text-2xl text-slate-400">/{total}</span></p>
          <p className="mt-1 text-lg font-semibold" style={{ color: "var(--text-2)" }}>{pct}% 정답</p>
          {pct >= 80 && <p className="mt-2 text-sm text-emerald-500">완벽해요! 🎉</p>}
          {pct < 80 && <p className="mt-2 text-sm" style={{ color: "var(--text-3)" }}>복습을 통해 더 완벽하게!</p>}
        </div>
        <div className="grid w-full max-w-xs gap-2.5">
          <button onClick={onReview}
            className="ui-btn ui-btn-brand-en py-3.5">
            🔁 복습하기
          </button>
          <button onClick={onExit}
            className="ui-btn ui-btn-surface py-3.5">
            홈으로
          </button>
        </div>
      </div>
    );
  }

  // 4지선다 선택지 만들기
  const choices = useMemo(() => {
    const wrong = shuffle(words.filter((w) => w.id !== word.id)).slice(0, 3);
    return shuffle([word, ...wrong]);
  }, [word, words]);

  function handleSelect(w: EnWord) {
    if (selected) return;
    setSelected(w.id);
    const isCorrect = w.id === word.id;
    onGrade(word.id, isCorrect ? "good" : "again");
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => { setIdx((i) => i + 1); setSelected(null); }, 1200);
  }

  const pct = pool.length ? Math.round((idx / pool.length) * 100) : 0;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col" style={{ background: "var(--bg)" }}>
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
            📝 퀴즈
          </span>
          <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>
            {idx + 1}/{pool.length}
          </span>
        </div>
        <span className="text-xs font-bold px-2" style={{ color: "#10B981" }}>
          ✓ {score}
        </span>
      </div>

      <div className="px-5 pb-3">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
        </div>
      </div>

      {/* 문제 */}
      <div className="flex flex-1 flex-col px-4 gap-4">
        <div className="rounded-3xl p-6 text-center shadow-xl" style={{ background: "var(--card)" }}>
          <p className="text-xs mb-3" style={{ color: "var(--text-3)" }}>다음 단어의 한국어 뜻은?</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-4xl font-extrabold" style={{ color: "#4361EE" }}>{word.word}</h2>
            <button onClick={() => speakEn(word.word)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
              🔊
            </button>
          </div>
          <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>{word.pronunciation}</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{word.partOfSpeech} · {word.cefrLevel}</p>
        </div>

        {/* 선택지 */}
        <div className="grid grid-cols-2 gap-3 pb-28">
          {choices.map((c) => {
            const isCorrect = c.id === word.id;
            const isSelected = selected === c.id;
            const isWrong = selected && !isCorrect && isSelected;
            const showRight = selected && isCorrect;

            let bg = "var(--card)";
            let color = "var(--text-1)";
            if (showRight) { bg = "#10B981"; color = "white"; }
            else if (isWrong) { bg = "#EF4444"; color = "white"; }

            return (
              <button key={c.id} onClick={() => handleSelect(c)}
                className="rounded-2xl p-4 font-semibold text-sm text-left shadow-sm transition active:scale-95"
                style={{ background: bg, color }}>
                {c.meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
