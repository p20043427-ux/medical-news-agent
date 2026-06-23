"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildEnExam, EN_PASS_RATIO, type EnExamQuestion, type EnSection, type EnDifficulty } from "@/lib/en/exam";
import { speakEn } from "@/lib/en/speech";
import { getExamHistory, pushExamHistory } from "@/lib/exam-history";
import { bumpActivity } from "@/lib/daily-activity";
import { Button } from "@/components/ui";

const SECTIONS: EnSection[] = ["어휘", "구동사", "독해", "청해"];
const LIMIT_SEC = 15 * 60;
const GRAD = "linear-gradient(135deg,#4361EE,#7209B7)";

type Round = { id: string; label: string; seed?: number };
const ROUNDS: Round[] = [
  { id: "e1", label: "모의 1회", seed: 2001 },
  { id: "e2", label: "모의 2회", seed: 2002 },
  { id: "e3", label: "모의 3회", seed: 2003 },
  { id: "random", label: "랜덤 모의", seed: undefined },
];

const DIFFS: { key: EnDifficulty; label: string; desc: string }[] = [
  { key: "easy", label: "입문", desc: "12문항 · A1–A2" },
  { key: "normal", label: "표준", desc: "20문항 · 전 레벨" },
  { key: "hard", label: "도전", desc: "25문항 · B1+" },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
function getBest(): Record<string, number> { try { return JSON.parse(localStorage.getItem("en-exam-best") || "{}"); } catch { return {}; } }
function saveBest(id: string, pct: number) { try { const b = getBest(); if (!b[id] || pct > b[id]) { b[id] = pct; localStorage.setItem("en-exam-best", JSON.stringify(b)); } } catch { /* ignore */ } }
const getHistory = () => getExamHistory("en");

export default function EnMockExam({ onExit }: { onExit: () => void }) {
  const [round, setRound] = useState<Round | null>(null);
  const [difficulty, setDifficulty] = useState<EnDifficulty>("normal");
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<"select" | "run" | "result">("select");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState<Record<string, number>>({});
  const timer = useRef<number | null>(null);

  useEffect(() => { setBest(getBest()); }, [phase]);
  const questions = useMemo<EnExamQuestion[]>(() => (round ? buildEnExam({ seed: round.seed, difficulty }) : []), [round, attempt, difficulty]);

  useEffect(() => {
    if (phase === "run") { timer.current = window.setInterval(() => setElapsed((e) => e + 1), 1000); return () => { if (timer.current) window.clearInterval(timer.current); }; }
  }, [phase]);

  const q = questions[idx];
  useEffect(() => { if (phase === "run" && q?.audio) speakEn(q.audio); /* eslint-disable-next-line */ }, [idx, phase]);
  useEffect(() => { if (phase === "run" && elapsed >= LIMIT_SEC) finish(); /* eslint-disable-next-line */ }, [elapsed, phase]);

  function start(r: Round) { setRound(r); setIdx(0); setAnswers({}); setElapsed(0); setPhase("run"); }
  function pick(o: string) { setAnswers((a) => ({ ...a, [q.key]: o })); }
  function next() { if (idx + 1 >= questions.length) finish(); else setIdx((i) => i + 1); }
  function finish() {
    if (timer.current) window.clearInterval(timer.current);
    const correct = questions.filter((qq) => answers[qq.key] === qq.answer).length;
    if (round) {
      const pct = Math.round((correct / questions.length) * 100);
      saveBest(`${round.id}-${difficulty}`, pct);
      pushExamHistory("en", { t: Date.now(), round: round.id, diff: difficulty, pct });
    }
    bumpActivity("en", "exam");
    setPhase("result");
  }
  function retry() { setAttempt((a) => a + 1); setIdx(0); setAnswers({}); setElapsed(0); setPhase("run"); }
  function toSelect() { setRound(null); setPhase("select"); }

  if (phase === "select") {
    return (
      <div className="px-5 pb-28 pt-4">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>English Mock Test (CEFR)</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>난이도와 회차를 골라 풀어보세요 · 어휘/구동사/독해/청해</p>

        {/* 난이도 선택 */}
        <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-2xl p-1.5" style={{ background: "var(--surface)" }}>
          {DIFFS.map((d) => {
            const on = difficulty === d.key;
            return (
              <button key={d.key} onClick={() => setDifficulty(d.key)}
                className="rounded-xl px-2 py-2 text-center transition"
                style={{ background: on ? "var(--card)" : "transparent", boxShadow: on ? "0 1px 4px rgba(0,0,0,.12)" : "none" }}>
                <span className="block text-sm font-extrabold" style={{ color: on ? "#4361EE" : "var(--text-2)" }}>{d.label}</span>
                <span className="block text-[10px]" style={{ color: "var(--text-3)" }}>{d.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-2.5">
          {ROUNDS.map((r) => (
            <button key={r.id} onClick={() => start(r)} className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.98]" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white" style={{ background: GRAD }}>T</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold" style={{ color: "var(--text-1)" }}>{r.label}</span>
                <span className="block text-xs" style={{ color: "var(--text-3)" }}>{best[`${r.id}-${difficulty}`] !== undefined ? `최고 ${best[`${r.id}-${difficulty}`]}점` : "미응시"}</span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: "#4361EE12", color: "var(--text-2)" }}>※ 공식 시험 문제는 저작권상 수록할 수 없어, 앱 콘텐츠로 만든 <b>원본 모의문항</b>입니다.</p>
        <Button variant="surface" size="free" onClick={onExit} className="mt-3 w-full py-3.5">학습 메뉴로</Button>
      </div>
    );
  }

  if (phase === "result") {
    const correct = questions.filter((qq) => answers[qq.key] === qq.answer).length;
    const pct = Math.round((correct / questions.length) * 100);
    const passed = correct / questions.length >= EN_PASS_RATIO;
    const wrong = questions.filter((qq) => answers[qq.key] !== qq.answer);
    const bySection = SECTIONS.map((s) => { const list = questions.filter((qq) => qq.section === s); return { s, c: list.filter((qq) => answers[qq.key] === qq.answer).length, t: list.length }; }).filter((b) => b.t > 0);
    return (
      <div className="px-5 pb-28 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="animate-reward text-6xl">{passed ? "🎊" : "💪"}</div>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{passed ? "Great job!" : "Keep going!"}</h2>
          <p className="mt-1 text-5xl font-extrabold" style={{ color: passed ? "#10B981" : "#4361EE" }}>{pct}<span className="text-2xl" style={{ color: "var(--text-3)" }}>점</span></p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{round?.label} · {correct}/{questions.length} · 소요 {fmt(elapsed)} · 합격선 {Math.round(EN_PASS_RATIO * 100)}%</p>
        </div>
        <div className="mt-6 space-y-2.5">
          {bySection.map((b) => (
            <div key={b.s} className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{b.s}</span><span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{b.c}/{b.t}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}><div className="h-full rounded-full" style={{ width: `${b.t ? (b.c / b.t) * 100 : 0}%`, background: GRAD }} /></div>
            </div>
          ))}
        </div>
        {(() => {
          const hist = getHistory().filter((h) => h.round === round?.id && h.diff === difficulty).slice(-8);
          if (hist.length < 2) return null;
          return (
            <div className="mt-4 rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>점수 추이</span>
                <span className="text-xs" style={{ color: "var(--text-3)" }}>{round?.label} · 최근 {hist.length}회</span>
              </div>
              <div className="flex h-20 items-end justify-between gap-1.5">
                {hist.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] font-bold" style={{ color: "var(--text-3)" }}>{h.pct}</span>
                    <div className="w-full rounded-md" style={{ height: `${Math.max(h.pct, 4)}%`, background: i === hist.length - 1 ? GRAD : "var(--surface)" }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
        {wrong.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 px-1 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>오답 해설 ({wrong.length})</p>
            <div className="space-y-2">
              {wrong.map((qq) => (
                <div key={qq.key} className="rounded-2xl p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{qq.section} · {qq.question}</p>
                  {qq.passage && <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{qq.passage}</p>}
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
          <Button variant="accent" size="free" onClick={retry} className="py-3.5">다시 풀기</Button>
          <Button variant="surface" size="free" onClick={toSelect} className="py-3.5">다른 회차</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3.5">학습 메뉴로</Button>
        </div>
      </div>
    );
  }

  const selected = answers[q.key];
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "#4361EE" }}>{q.section}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
        {(() => { const rem = Math.max(0, LIMIT_SEC - elapsed); const low = rem <= 60; return (<span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: low ? "#E63946" : "var(--surface)", color: low ? "#fff" : "var(--text-2)" }}>⏱ {fmt(rem)}</span>); })()}
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}><div className="h-full rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%`, background: GRAD }} /></div>

      <div className="rounded-3xl p-6 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {q.passage && <p className="mb-4 rounded-2xl p-4 text-base leading-loose" style={{ background: "var(--surface)", color: "var(--text-1)" }}>{q.passage}</p>}
        <p className="text-center text-xs" style={{ color: "var(--text-3)" }}>{q.question}</p>
        {q.audio ? (
          <button onClick={() => speakEn(q.audio!)} aria-label="다시 듣기" className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-full text-3xl text-white" style={{ background: GRAD }}>🔊</button>
        ) : q.prompt ? (
          <>
            <p className="mt-3 text-center text-3xl font-extrabold" style={{ color: "var(--text-1)" }}>{q.prompt}</p>
            {q.sub && <p className="mt-1 text-center font-mono text-sm" style={{ color: "var(--text-3)" }}>{q.sub}</p>}
          </>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const on = selected === o;
          return (
            <button key={o} onClick={() => pick(o)} className="rounded-2xl border-2 px-5 py-4 text-left font-semibold transition active:scale-[0.99]" style={on ? { borderColor: "#4361EE", background: "#4361EE12", color: "var(--text-1)" } : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" }}>{o}</button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <Button variant="accent" size="free" onClick={next} disabled={!selected} className="w-full py-4">{idx + 1 >= questions.length ? "제출하고 결과 보기" : "다음"}</Button>
      </div>
    </div>
  );
}
