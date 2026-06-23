"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { useUiLang, tt } from "@/lib/i18n";

export interface PlacementQ { prompt: string; sub?: string; options: string[]; answer: string }
export interface PlacementResult { emoji: string; label: string; desc: string }

// 레벨 배치고사 — 쉬움→어려움 순 문항으로 추천 레벨 진단. (JP·EN 공용)
export default function PlacementTest({ questions, getResult, accent, onExit, onDone }: {
  questions: PlacementQ[];
  getResult: (correct: number, total: number) => PlacementResult;
  accent: string;
  onExit: () => void;
  onDone?: (r: PlacementResult) => void;
}) {
  const lang = useUiLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [savedResult, setSavedResult] = useState<PlacementResult | null>(null);
  const q = questions[idx];

  if (idx >= questions.length) {
    const r = savedResult ?? getResult(score, questions.length);
    if (!savedResult) { setSavedResult(r); onDone?.(r); }
    return (
      <div className="px-5 pb-28 pt-10 text-center">
        <div className="animate-reward text-6xl">{r.emoji}</div>
        <p className="mt-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "추천 시작 레벨", "おすすめ開始レベル")}</p>
        <p className="mt-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{r.label}</p>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{r.desc}</p>
        <p className="mt-3 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, `${score} / ${questions.length} 정답`, `${score} / ${questions.length} 正解`)}</p>
        <div className="mx-auto mt-6 grid max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={onExit} className="py-3" style={{ background: accent }}>{tt(lang, "학습 시작하기", "学習を始める")}</Button>
          <Button variant="surface" size="free" onClick={() => { setIdx(0); setPicked(null); setScore(0); setSavedResult(null); }} className="py-3">{tt(lang, "다시 진단", "もう一度診断")}</Button>
        </div>
      </div>
    );
  }

  function choose(o: string) { if (picked) return; setPicked(o); if (o === q.answer) setScore((s) => s + 1); }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: accent }}>{tt(lang, "레벨 진단", "レベル診断")}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%`, background: accent }} />
      </div>

      <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "뜻으로 알맞은 것은?", "正しい意味は？")}</p>
        <p className="mt-3 text-4xl font-extrabold" style={{ color: "var(--text-1)" }}>{q.prompt}</p>
        {q.sub && <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{q.sub}</p>}
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const show = picked !== null;
          const isAns = o === q.answer;
          const style = show
            ? isAns ? { borderColor: "#10B981", background: "#10B98112", color: "var(--text-1)" }
              : o === picked ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-1)" }
                : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-3)" }
            : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" };
          return (
            <button key={o} onClick={() => choose(o)} disabled={show}
              className="rounded-2xl border-2 px-5 py-4 text-left font-semibold transition active:scale-[0.99]" style={style}>{o}</button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={() => { setPicked(null); setIdx((i) => i + 1); }} disabled={picked === null} className="w-full py-4" style={{ background: accent }}>
          {idx + 1 >= questions.length ? tt(lang, "결과 보기", "結果を見る") : tt(lang, "다음", "次へ")}
        </Button>
      </div>
    </div>
  );
}
