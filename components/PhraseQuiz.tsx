"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";

export interface PhraseQuizItem {
  audio: string;  // 들려줄 텍스트 (가나 읽기 또는 영어)
  ko: string;     // 정답(뜻)
  label: string;  // 결과 화면 표시용 원문
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

// 즐겨찾기 표현 복습 퀴즈: 발음을 듣고 알맞은 뜻 고르기.
export default function PhraseQuiz({
  items, distractors, speak, accent, onExit,
}: {
  items: PhraseQuizItem[];
  distractors: string[];   // 오답 보기 풀(전체 표현 뜻)
  speak: (t: string) => void;
  accent: string;
  onExit: () => void;
}) {
  const questions = useMemo(() => shuffle(items).slice(0, 10).map((it) => {
    const pool = shuffle(distractors.filter((k) => k !== it.ko)).slice(0, 3);
    return { ...it, options: shuffle([it.ko, ...pool]) };
  }), [items, distractors]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];

  if (!q) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-sm" style={{ color: "var(--text-3)" }}>퀴즈로 만들 표현이 부족해요.</p>
        <Button variant="surface" size="free" onClick={onExit} className="mt-4 px-6 py-3">돌아가기</Button>
      </div>
    );
  }

  if (idx >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="px-5 pb-28 pt-10 text-center">
        <div className="animate-reward text-6xl">{pct >= 80 ? "🎉" : "💪"}</div>
        <p className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{score} / {questions.length}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>즐겨찾기 표현 복습 완료 · {pct}점</p>
        <div className="mx-auto mt-6 grid max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={() => { setIdx(0); setPicked(null); setScore(0); }} className="py-3" style={{ background: accent }}>다시 풀기</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3">회화집으로</Button>
        </div>
      </div>
    );
  }

  function choose(o: string) {
    if (picked) return;
    setPicked(o);
    if (o === q.ko) setScore((s) => s + 1);
  }
  function next() { setPicked(null); setIdx((i) => i + 1); }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: accent }}>즐겨찾기 복습</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
      </div>

      <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>발음을 듣고 알맞은 뜻을 고르세요</p>
        <button onClick={() => speak(q.audio)} aria-label="다시 듣기"
          className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-full text-3xl text-white" style={{ background: accent }}>🔊</button>
        {picked && <p className="mt-3 text-base font-bold" style={{ color: "var(--text-1)" }}>{q.label}</p>}
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const isAns = o === q.ko;
          const show = picked !== null;
          const style = show
            ? isAns
              ? { borderColor: "#10B981", background: "#10B98112", color: "var(--text-1)" }
              : o === picked
                ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-1)" }
                : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-3)" }
            : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" };
          return (
            <button key={o} onClick={() => choose(o)} disabled={show}
              className="rounded-2xl border-2 px-5 py-4 text-left font-semibold transition active:scale-[0.99]" style={style}>
              {o}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={next} disabled={!picked} className="w-full py-4" style={{ background: accent }}>
          {idx + 1 >= questions.length ? "결과 보기" : "다음"}
        </Button>
      </div>
    </div>
  );
}
