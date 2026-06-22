"use client";

import { useMemo, useState } from "react";
import type { Word, Category } from "@/lib/jp/types";
import type { Grade } from "@/lib/jp/progress";
import { VOCAB } from "@/lib/jp/vocab";
import SpeakerButton from "./SpeakerButton";
import { Button, Progress } from "@/components/ui";
import { shuffle } from "@/lib/learn/shuffle";
import { track } from "@/lib/analytics";

interface Q {
  word: Word;
  options: string[];
  answer: string;
}

function buildQuestions(words: Word[]): Q[] {
  return shuffle(words).map((word) => {
    const distractors = shuffle(
      VOCAB.filter((w) => w.id !== word.id && w.meaning !== word.meaning),
    )
      .slice(0, 3)
      .map((w) => w.meaning);
    return {
      word,
      answer: word.meaning,
      options: shuffle([word.meaning, ...distractors]),
    };
  });
}

export default function QuizMode({
  category,
  words,
  onGrade,
  onExit,
  onReview,
}: {
  category: Category;
  words: Word[];
  onGrade: (id: string, g: Grade) => void;
  onExit: () => void;
  onReview: () => void;
}) {
  const [pool, setPool] = useState<Word[]>(words);
  const questions = useMemo(() => buildQuestions(pool), [pool]);

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState<Word[]>([]);
  const [finished, setFinished] = useState(false);

  const q = questions[qi];

  function pick(opt: string) {
    if (picked || !q) return;
    setPicked(opt);
    const ok = opt === q.answer;
    onGrade(q.word.id, ok ? "good" : "again");
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => [...w, q.word]);
  }

  function next() {
    if (qi + 1 >= questions.length) {
      track("quiz_finish", { lang: "jp", category: category.key, score: correct, total: questions.length });
      setFinished(true);
    } else {
      setQi((i) => i + 1);
      setPicked(null);
    }
  }

  if (finished) {
    const score = Math.round((correct / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="animate-reward text-6xl">{score >= 80 ? "🏆" : score >= 50 ? "👍" : "💪"}</div>
        <h2 className="text-2xl font-bold text-slate-900">퀴즈 결과</h2>
        <p className="text-5xl font-extrabold text-slate-900">
          {correct}
          <span className="text-2xl font-medium text-slate-400"> / {questions.length}</span>
        </p>
        <p className="text-slate-500">정답률 {score}%</p>
        <div className="mt-2 grid w-full max-w-xs gap-2.5">
          {wrong.length > 0 && (
            <Button
              variant="destructive"
              size="free"
              onClick={() => {
                setPool(wrong);
                setQi(0);
                setPicked(null);
                setCorrect(0);
                setWrong([]);
                setFinished(false);
              }}
              className="py-3.5"
            >
              오답 {wrong.length}개 다시 풀기
            </Button>
          )}
          <Button variant="surface" size="free" onClick={onReview} className="py-3.5">
            🔁 복습 카드
          </Button>
          <button onClick={onExit} className="rounded-2xl py-2 text-sm font-semibold text-slate-400">
            홈으로
          </button>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="px-6 py-20 text-center text-slate-400">
        퀴즈를 만들 단어가 부족해요.
        <Button variant="brand" size="free" onClick={onExit} className="mt-4 w-full py-3">홈으로</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center px-4 pb-2 pt-2">
        <button onClick={onExit} aria-label="뒤로" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="mx-auto flex items-center gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#E63946,#c0392b)" }}>📝 퀴즈</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-sm font-bold text-slate-500 shadow-sm">
            {qi + 1} / {questions.length}
          </span>
        </div>
        <span className="h-9 w-9" />
      </div>

      <div className="px-5 pb-4">
        <Progress value={(qi / questions.length) * 100} indicatorStyle={{ background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
      </div>

      {/* 문제 */}
      <div className="px-4">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <span className="text-xs font-semibold text-slate-400">알맞은 뜻을 고르세요</span>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-extrabold" style={{ color: "#E63946" }}>{q.word.word}</h2>
            <SpeakerButton text={q.word.reading} size={40} />
          </div>
          <p className="text-sm text-slate-400">[{q.word.reading}]</p>
        </div>
      </div>

      {/* 보기 */}
      <div className="mt-5 grid gap-2.5 px-4">
        {q.options.map((opt) => {
          const isAnswer = opt === q.answer;
          const isPicked = picked === opt;
          let cls = "border-slate-200 bg-white text-slate-700";
          if (picked) {
            if (isAnswer) cls = "border-emerald-500 bg-emerald-50 text-emerald-700";
            else if (isPicked) cls = "border-rose-400 bg-rose-50 text-rose-600";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-semibold shadow-sm transition ${cls}`}
            >
              {opt}
              {picked && isAnswer && <span>✓</span>}
              {picked && isPicked && !isAnswer && <span>✕</span>}
            </button>
          );
        })}
      </div>

      {/* 다음 */}
      <div className="sticky bottom-16 z-10 mt-auto bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8] to-transparent px-4 pb-4 pt-6">
        <Button variant="brand" size="free" onClick={next} disabled={!picked} className="w-full py-4">
          {qi + 1 >= questions.length ? "결과 보기" : "다음"}
        </Button>
      </div>
    </div>
  );
}
