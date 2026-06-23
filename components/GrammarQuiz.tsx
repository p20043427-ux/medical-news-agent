"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { useUiLang, tt } from "@/lib/i18n";

export interface GrammarQuizPoint {
  title: string;
  brief: string;
  examples: { text: string; audio: string; ko: string }[];
}

type Q =
  | { kind: "concept"; prompt: string; question: string; options: string[]; answer: string }
  | { kind: "example"; prompt: string; audio: string; question: string; options: string[]; answer: string };

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

// 문법 퀴즈 — 개념(제목→설명) + 예문(뜻→문장) 혼합. (JP·EN 공용)
export default function GrammarQuiz({ points, speak, accent, onExit }: {
  points: GrammarQuizPoint[];
  speak: (t: string) => void;
  accent: string;
  onExit: () => void;
}) {
  const lang = useUiLang();
  const questions = useMemo<Q[]>(() => {
    const briefs = points.map((p) => p.brief);
    const allEx = points.flatMap((p) => p.examples.map((e) => e.text));
    const chosen = shuffle(points).slice(0, 10);
    return chosen.map((p, i) => {
      if (i % 2 === 0) {
        const opts = shuffle([p.brief, ...shuffle(briefs.filter((b) => b !== p.brief)).slice(0, 3)]);
        return { kind: "concept", prompt: p.title, question: tt(lang, "이 문법의 설명으로 알맞은 것은?", "この文法の説明として正しいものは？"), options: opts, answer: p.brief };
      }
      const ex = p.examples[Math.floor(Math.random() * p.examples.length)] ?? p.examples[0];
      const opts = shuffle([ex.text, ...shuffle(allEx.filter((t) => t !== ex.text)).slice(0, 3)]);
      return { kind: "example", prompt: ex.ko, audio: ex.audio, question: tt(lang, "뜻에 맞는 문장은?", "意味に合う文は？"), options: opts, answer: ex.text };
    });
  }, [points, lang]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];

  if (idx >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="px-5 pb-28 pt-10 text-center">
        <div className="animate-reward text-6xl">{pct >= 80 ? "🎉" : "💪"}</div>
        <p className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{score} / {questions.length}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, `문법 퀴즈 완료 · ${pct}점`, `文法クイズ完了 · ${pct}点`)}</p>
        <div className="mx-auto mt-6 grid max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={() => { setIdx(0); setPicked(null); setScore(0); }} className="py-3" style={{ background: accent }}>{tt(lang, "다시 풀기", "もう一度")}</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3">{tt(lang, "문법으로", "文法へ")}</Button>
        </div>
      </div>
    );
  }

  function choose(o: string) { if (picked) return; setPicked(o); if (o === q.answer) setScore((s) => s + 1); }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: accent }}>{tt(lang, "문법 퀴즈", "文法クイズ")}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
      </div>

      <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>{q.question}</p>
        <p className="mt-2 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>{q.prompt}</p>
        {q.kind === "example" && (
          <button onClick={() => speak(q.audio)} aria-label={tt(lang, "듣기", "聞く")} className="mx-auto mt-3 grid h-14 w-14 place-items-center rounded-full text-2xl text-white" style={{ background: accent }}>🔊</button>
        )}
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
              className="rounded-2xl border-2 px-5 py-3.5 text-left text-sm font-semibold transition active:scale-[0.99]" style={style}>{o}</button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={() => { setPicked(null); setIdx((i) => i + 1); }} disabled={!picked} className="w-full py-4" style={{ background: accent }}>
          {idx + 1 >= questions.length ? tt(lang, "결과 보기", "結果を見る") : tt(lang, "다음", "次へ")}
        </Button>
      </div>
    </div>
  );
}
