"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildExam, PASS_RATIO, type ExamQuestion, type Section } from "@/lib/jp/exam";
import { speakJa } from "@/lib/jp/speech";
import { Button } from "@/components/ui";

const SECTIONS: Section[] = ["문자·어휘", "문법", "청해"];

function fmt(sec: number) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MockExam({
  onExit,
  onMistake,
}: {
  onExit: () => void;
  onMistake?: (ids: string[]) => void;
}) {
  const [round, setRound] = useState(0);
  const questions = useMemo<ExamQuestion[]>(() => buildExam(20), [round]);
  const [phase, setPhase] = useState<"intro" | "run" | "result">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "run") {
      timer.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
      return () => { if (timer.current) window.clearInterval(timer.current); };
    }
  }, [phase]);

  const q = questions[idx];

  // 청해 자동 재생
  useEffect(() => {
    if (phase === "run" && q?.audio) speakJa(q.audio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, phase]);

  function pick(opt: string) {
    setAnswers((a) => ({ ...a, [q.key]: opt }));
  }
  function next() {
    if (idx + 1 >= questions.length) finish();
    else setIdx((i) => i + 1);
  }
  function finish() {
    if (timer.current) window.clearInterval(timer.current);
    const wrongIds = questions
      .filter((qq) => qq.wordId && answers[qq.key] !== qq.answer)
      .map((qq) => qq.wordId!) as string[];
    if (wrongIds.length && onMistake) onMistake([...new Set(wrongIds)]);
    setPhase("result");
  }
  function restart() {
    setRound((r) => r + 1);
    setIdx(0); setAnswers({}); setElapsed(0); setPhase("intro");
  }

  // ── 인트로 ──
  if (phase === "intro") {
    return (
      <div className="px-5 pb-28 pt-4">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>JLPT N5 모의시험</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
          {questions.length}문항 · 문자·어휘 / 문법 / 청해
        </p>
        <div className="mt-5 space-y-2.5">
          {[
            { s: "문자·어휘", d: "한자 읽기 · 표기 · 뜻" },
            { s: "문법", d: "동사 활용(ます형)" },
            { s: "청해", d: "듣고 뜻 고르기 (🔊 자동 재생)" },
          ].map((x) => (
            <div key={x.s} className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text-1)" }}>{x.s}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: "#E6394612", color: "var(--text-2)" }}>
          ※ 공식 기출문제는 저작권이 있어 수록할 수 없습니다. 본 시험은 앱 콘텐츠로 만든 <b>원본 모의문항</b>입니다.
        </p>
        <div className="mt-5 grid gap-2.5">
          <Button variant="brand" size="free" onClick={() => setPhase("run")} className="py-4 text-base">
            시험 시작
          </Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">
            나가기
          </Button>
        </div>
      </div>
    );
  }

  // ── 결과 ──
  if (phase === "result") {
    const correct = questions.filter((qq) => answers[qq.key] === qq.answer).length;
    const pct = Math.round((correct / questions.length) * 100);
    const passed = correct / questions.length >= PASS_RATIO;
    const wrong = questions.filter((qq) => answers[qq.key] !== qq.answer);
    const bySection = SECTIONS.map((s) => {
      const list = questions.filter((qq) => qq.section === s);
      const c = list.filter((qq) => answers[qq.key] === qq.answer).length;
      return { s, c, t: list.length };
    });

    return (
      <div className="px-5 pb-28 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="animate-reward text-6xl">{passed ? "🎊" : "💪"}</div>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>
            {passed ? "합격 예상!" : "조금 더!"}
          </h2>
          <p className="mt-1 text-5xl font-extrabold" style={{ color: passed ? "#10B981" : "#E63946" }}>
            {pct}<span className="text-2xl" style={{ color: "var(--text-3)" }}>점</span>
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
            {correct} / {questions.length} 정답 · 소요 {fmt(elapsed)} · 합격선 {Math.round(PASS_RATIO * 100)}%
          </p>
        </div>

        {/* 영역별 */}
        <div className="mt-6 space-y-2.5">
          {bySection.map((b) => (
            <div key={b.s} className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{b.s}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{b.c}/{b.t}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
                <div className="h-full rounded-full" style={{ width: `${b.t ? (b.c / b.t) * 100 : 0}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
              </div>
            </div>
          ))}
        </div>

        {wrong.length > 0 && (
          <p className="mt-4 text-center text-xs" style={{ color: "var(--text-3)" }}>
            틀린 {wrong.length}문항의 단어를 오답노트에 담았어요.
          </p>
        )}

        <div className="mt-5 grid gap-2.5">
          <Button variant="brand" size="free" onClick={restart} className="py-3.5">새 모의시험</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">학습 메뉴로</Button>
        </div>
      </div>
    );
  }

  // ── 시험 진행 ──
  const selected = answers[q.key];
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-4 pt-3">
      {/* 상단: 진행·타이머 */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "#E63946" }}>{q.section}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>⏱ {fmt(elapsed)}</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
      </div>

      {/* 문제 */}
      <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>{q.question}</p>
        {q.audio ? (
          <button onClick={() => speakJa(q.audio!)} aria-label="다시 듣기"
            className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-full text-3xl text-white"
            style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
            🔊
          </button>
        ) : (
          <>
            <p className="mt-3 text-4xl font-extrabold" style={{ color: "var(--text-1)" }}>{q.prompt}</p>
            {q.sub && <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{q.sub}</p>}
          </>
        )}
      </div>

      {/* 보기 */}
      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const on = selected === o;
          return (
            <button key={o} onClick={() => pick(o)}
              className="rounded-2xl border-2 px-5 py-4 text-left font-semibold transition active:scale-[0.99]"
              style={on
                ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-1)" }
                : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" }}>
              {o}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={next} disabled={!selected} className="w-full py-4">
          {idx + 1 >= questions.length ? "제출하고 결과 보기" : "다음"}
        </Button>
      </div>
    </div>
  );
}
