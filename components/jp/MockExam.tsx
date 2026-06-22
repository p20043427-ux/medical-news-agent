"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildExam, PASS_RATIO, type ExamQuestion, type Section } from "@/lib/jp/exam";
import { speakJa } from "@/lib/jp/speech";
import { Button } from "@/components/ui";

const SECTIONS: Section[] = ["문자·어휘", "문법", "독해", "청해"];

type Round = { id: string; label: string; seed?: number };
const ROUNDS: Round[] = [
  { id: "r1", label: "모의 1회", seed: 1001 },
  { id: "r2", label: "모의 2회", seed: 1002 },
  { id: "r3", label: "모의 3회", seed: 1003 },
  { id: "r4", label: "모의 4회", seed: 1004 },
  { id: "r5", label: "모의 5회", seed: 1005 },
  { id: "random", label: "랜덤 모의", seed: undefined },
];

const LIMIT_SEC = 15 * 60; // 제한 시간 15분

function fmt(sec: number) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function getBest(): Record<string, number> {
  try { return JSON.parse(window.localStorage.getItem("jp-exam-best") || "{}"); } catch { return {}; }
}
function saveBest(id: string, pct: number) {
  try {
    const b = getBest();
    if (!b[id] || pct > b[id]) { b[id] = pct; window.localStorage.setItem("jp-exam-best", JSON.stringify(b)); }
  } catch { /* ignore */ }
}

export default function MockExam({
  onExit,
  onMistake,
}: {
  onExit: () => void;
  onMistake?: (ids: string[]) => void;
}) {
  const [round, setRound] = useState<Round | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<"select" | "intro" | "run" | "result">("select");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState<Record<string, number>>({});
  const timer = useRef<number | null>(null);

  useEffect(() => { setBest(getBest()); }, [phase]);

  const questions = useMemo<ExamQuestion[]>(
    () => (round ? buildExam({ seed: round.seed }) : []),
    [round, attempt],
  );

  useEffect(() => {
    if (phase === "run") {
      timer.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
      return () => { if (timer.current) window.clearInterval(timer.current); };
    }
  }, [phase]);

  // 제한 시간 초과 시 자동 제출
  useEffect(() => {
    if (phase === "run" && elapsed >= LIMIT_SEC) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, phase]);

  const q = questions[idx];
  useEffect(() => {
    if (phase === "run" && q?.audio) speakJa(q.audio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, phase]);

  function start(r: Round) { setRound(r); setIdx(0); setAnswers({}); setElapsed(0); setPhase("intro"); }
  function pick(opt: string) { setAnswers((a) => ({ ...a, [q.key]: opt })); }
  function next() { if (idx + 1 >= questions.length) finish(); else setIdx((i) => i + 1); }
  function finish() {
    if (timer.current) window.clearInterval(timer.current);
    const wrongIds = questions.filter((qq) => qq.wordId && answers[qq.key] !== qq.answer).map((qq) => qq.wordId!) as string[];
    if (wrongIds.length && onMistake) onMistake([...new Set(wrongIds)]);
    const correct = questions.filter((qq) => answers[qq.key] === qq.answer).length;
    if (round) saveBest(round.id, Math.round((correct / questions.length) * 100));
    setPhase("result");
  }
  function retry() { setAttempt((a) => a + 1); setIdx(0); setAnswers({}); setElapsed(0); setPhase("run"); }
  function toSelect() { setRound(null); setPhase("select"); }

  // ── 회차 선택 ──
  if (phase === "select") {
    return (
      <div className="px-5 pb-28 pt-4">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>JLPT N5 모의시험</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>회차를 골라 풀어보세요 · 20문항</p>
        <div className="mt-5 space-y-2.5">
          {ROUNDS.map((r) => (
            <button key={r.id} onClick={() => start(r)}
              className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.98]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white"
                style={{ background: "linear-gradient(135deg,#0984e3,#74b9ff)" }}>試</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold" style={{ color: "var(--text-1)" }}>{r.label}</span>
                <span className="block text-xs" style={{ color: "var(--text-3)" }}>
                  {best[r.id] !== undefined ? `최고 ${best[r.id]}점` : "미응시"}
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: "#E6394612", color: "var(--text-2)" }}>
          ※ 공식 기출문제는 저작권상 수록할 수 없어, 앱 콘텐츠로 만든 <b>원본 모의문항</b>입니다. (1·2·3회는 고정, 랜덤은 매번 새 문항)
        </p>
      </div>
    );
  }

  // ── 인트로 ──
  if (phase === "intro") {
    return (
      <div className="px-5 pb-28 pt-4">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{round?.label}</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{questions.length}문항 · 문자·어휘 / 문법 / 독해 / 청해</p>
        <div className="mt-5 space-y-2.5">
          {[["문자·어휘", "한자 읽기 · 표기 · 뜻 · 문맥 · 유의어"], ["문법", "동사 활용 · 조사 · 문 조립"], ["독해", "짧은 글 · 안내문(정보검색)"], ["청해", "단어 · 대화 듣고 뜻 고르기 (🔊 자동 재생)"]].map(([s, d]) => (
            <div key={s} className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="font-bold" style={{ color: "var(--text-1)" }}>{s}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2.5">
          <Button variant="brand" size="free" onClick={() => setPhase("run")} className="py-4 text-base">시험 시작</Button>
          <Button variant="surface" size="free" onClick={toSelect} className="py-3.5">회차 선택</Button>
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
      return { s, c: list.filter((qq) => answers[qq.key] === qq.answer).length, t: list.length };
    }).filter((b) => b.t > 0);

    return (
      <div className="px-5 pb-28 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="animate-reward text-6xl">{passed ? "🎊" : "💪"}</div>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{passed ? "합격 예상!" : "조금 더!"}</h2>
          <p className="mt-1 text-5xl font-extrabold" style={{ color: passed ? "#10B981" : "#E63946" }}>
            {pct}<span className="text-2xl" style={{ color: "var(--text-3)" }}>점</span>
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
            {round?.label} · {correct}/{questions.length} · 소요 {fmt(elapsed)} · 합격선 {Math.round(PASS_RATIO * 100)}%
          </p>
        </div>
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
          <p className="mt-4 text-center text-xs" style={{ color: "var(--text-3)" }}>틀린 단어는 오답노트에 담았어요.</p>
        )}

        {/* 오답 해설 */}
        {wrong.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 px-1 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>오답 해설 ({wrong.length})</p>
            <div className="space-y-2">
              {wrong.map((qq) => (
                <div key={qq.key} className="rounded-2xl p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{qq.section} · {qq.question}</p>
                  {qq.passage && <p className="mt-1 whitespace-pre-line text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{qq.passage}</p>}
                  {qq.prompt && qq.prompt !== "🔊" && <p className="mt-1 text-base font-bold" style={{ color: "var(--text-1)" }}>{qq.prompt}</p>}
                  {qq.audio && <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>🔊 {qq.audio}</p>}
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-sm font-semibold">
                    <span style={{ color: "#10B981" }}>정답: {qq.answer}</span>
                    <span style={{ color: "#E63946" }}>내 답: {answers[qq.key] ?? "미응답"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-2.5">
          <Button variant="brand" size="free" onClick={retry} className="py-3.5">다시 풀기</Button>
          <Button variant="surface" size="free" onClick={toSelect} className="py-3.5">다른 회차</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">학습 메뉴로</Button>
        </div>
      </div>
    );
  }

  // ── 시험 진행 ──
  const selected = answers[q.key];
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "#E63946" }}>{q.section}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
        {(() => {
          const rem = Math.max(0, LIMIT_SEC - elapsed);
          const low = rem <= 60;
          return (
            <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: low ? "#E63946" : "var(--surface)", color: low ? "#fff" : "var(--text-2)" }}>
              ⏱ {fmt(rem)}
            </span>
          );
        })()}
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
      </div>

      <div className="rounded-3xl p-6 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {q.passage && (
          <p className="mb-4 whitespace-pre-line rounded-2xl p-4 text-base leading-loose" style={{ background: "var(--surface)", color: "var(--text-1)" }}>
            {q.passage}
          </p>
        )}
        <p className="text-center text-xs" style={{ color: "var(--text-3)" }}>{q.question}</p>
        {q.audio ? (
          <button onClick={() => speakJa(q.audio!)} aria-label="다시 듣기"
            className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-full text-3xl text-white"
            style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>🔊</button>
        ) : q.prompt ? (
          <>
            <p className="mt-3 text-center text-4xl font-extrabold" style={{ color: "var(--text-1)" }}>{q.prompt}</p>
            {q.sub && <p className="mt-1 text-center text-sm" style={{ color: "var(--text-3)" }}>{q.sub}</p>}
          </>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const on = selected === o;
          return (
            <button key={o} onClick={() => pick(o)}
              className="rounded-2xl border-2 px-5 py-4 text-left font-semibold transition active:scale-[0.99]"
              style={on ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-1)" } : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" }}>
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
