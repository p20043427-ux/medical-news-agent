"use client";

import { useMemo, useState } from "react";
import { KO_VOCAB } from "@/lib/ko/vocab";
import type { KoWord } from "@/lib/ko/types";
import type { KoGrade } from "@/lib/ko/progress";
import { speakKo } from "@/lib/ko/speech";
import { Button, Progress } from "@/components/ui";
import { tt, type UiLang } from "@/lib/i18n";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function meaningOf(w: KoWord, lang: UiLang): string {
  return lang === "ko" ? (w.meaningKo ?? w.meaning) : w.meaning;
}

interface Q { word: KoWord; options: string[]; answer: string }

function build(lang: UiLang): Q[] {
  const meanings = KO_VOCAB.map((w) => meaningOf(w, lang));
  return shuffle(KO_VOCAB).slice(0, 15).map((word) => {
    const answer = meaningOf(word, lang);
    const distractors = shuffle(meanings.filter((m) => m !== answer)).slice(0, 3);
    return { word, answer, options: shuffle([answer, ...distractors]) };
  });
}

export default function KoQuizView({ lang, onGrade, onExit }: {
  lang: UiLang;
  onGrade: (id: string, g: KoGrade) => void;
  onExit: () => void;
}) {
  const [questions, setQuestions] = useState<Q[]>(() => build(lang));
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[qi];

  function pick(opt: string) {
    if (picked || !q) return;
    setPicked(opt);
    const ok = opt === q.answer;
    onGrade(q.word.id, ok ? "good" : "again");
    if (ok) setCorrect((c) => c + 1);
  }
  function next() {
    if (qi + 1 >= questions.length) setFinished(true);
    else { setQi((i) => i + 1); setPicked(null); }
  }
  function restart() { setQuestions(build(lang)); setQi(0); setPicked(null); setCorrect(0); setFinished(false); }

  if (finished) {
    const score = Math.round((correct / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="animate-reward text-6xl">{score >= 80 ? "🏆" : score >= 50 ? "👍" : "💪"}</div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "퀴즈 결과", "クイズ結果")}</h2>
        <p className="text-5xl font-extrabold" style={{ color: "var(--text-1)" }}>
          {correct}<span className="text-2xl font-medium" style={{ color: "var(--text-3)" }}> / {questions.length}</span>
        </p>
        <p style={{ color: "var(--text-3)" }}>{tt(lang, `정답률 ${score}%`, `正答率 ${score}%`)}</p>
        <div className="mt-2 grid w-full max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={restart} className="py-3.5" style={{ background: "#2563EB" }}>{tt(lang, "다시 풀기", "もう一度")}</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">{tt(lang, "학습 메뉴로", "学習メニューへ")}</Button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>{tt(lang, "📝 단어 퀴즈", "📝 単語クイズ")}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{qi + 1} / {questions.length}</span>
      </div>
      <div className="mb-4">
        <Progress value={(qi / questions.length) * 100} indicatorStyle={{ background: "linear-gradient(90deg,#2563EB,#7C3AED)" }} />
      </div>

      <div className="flex flex-col items-center gap-3 rounded-3xl p-8 text-center shadow-lg" style={{ background: "var(--card)" }}>
        <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>{tt(lang, "알맞은 뜻을 고르세요", "正しい意味を選んでください")}</span>
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-extrabold" style={{ color: "#2563EB" }}>{q.word.word}</h2>
          <button onClick={() => speakKo(q.word.word)} aria-label={tt(lang, "발음", "発音")} className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>🔊</button>
        </div>
        <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>{q.word.romaja}</p>
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((opt) => {
          const isAnswer = opt === q.answer;
          const isPicked = picked === opt;
          let cls = { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" } as React.CSSProperties;
          if (picked) {
            if (isAnswer) cls = { borderColor: "#10B981", background: "#10B98112", color: "var(--text-1)" };
            else if (isPicked) cls = { borderColor: "#EF4444", background: "#EF444412", color: "var(--text-1)" };
            else cls = { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-3)" };
          }
          return (
            <button key={opt} onClick={() => pick(opt)} disabled={!!picked}
              className="flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-semibold shadow-sm transition" style={cls}>
              {opt}
              {picked && isAnswer && <span>✓</span>}
              {picked && isPicked && !isAnswer && <span>✕</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={next} disabled={!picked} className="w-full py-4" style={{ background: "#2563EB" }}>
          {qi + 1 >= questions.length ? tt(lang, "결과 보기", "結果を見る") : tt(lang, "다음", "次へ")}
        </Button>
      </div>
    </div>
  );
}
