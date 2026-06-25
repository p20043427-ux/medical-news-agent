"use client";

import { useMemo, useState } from "react";
import { HANGUL_CONSONANTS, HANGUL_TENSE, HANGUL_VOWELS, HANGUL_COMPOUND, ALL_JAMO, type Jamo } from "@/lib/ko/hangul";
import { speakKo } from "@/lib/ko/speech";
import { tt, type UiLang } from "@/lib/i18n";

const ACCENT = "#2563EB";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export default function KoHangulView({ lang }: { lang: UiLang }) {
  const [mode, setMode] = useState<"chart" | "quiz">("chart");
  const [sel, setSel] = useState<string | null>(null);

  function tap(j: Jamo) {
    setSel(j.char);
    speakKo(j.audio);
    window.setTimeout(() => setSel((s) => (s === j.char ? null : s)), 600);
  }

  function Cell({ j }: { j: Jamo }) {
    const on = sel === j.char;
    return (
      <button onClick={() => tap(j)}
        className="flex flex-col items-center justify-center rounded-xl py-2 transition active:scale-90"
        style={{ background: on ? ACCENT : "var(--card)", border: "1px solid var(--border)", color: on ? "#fff" : "var(--text-1)" }}>
        <span className="text-xl font-bold leading-none">{j.char}</span>
        <span className="mt-0.5 text-[10px]" style={{ color: on ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>{j.romaja}</span>
      </button>
    );
  }

  function Section({ title, items, cols }: { title: string; items: Jamo[]; cols: number }) {
    return (
      <div className="mb-5">
        <p className="mb-2 px-1 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>{title}</p>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {items.map((j) => <Cell key={j.char} j={j} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-3">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "한글 (기초)", "ハングル（基礎）")}</h1>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "탭하면 발음이 들려요", "タップで発音が聞けます")}</p>
        </div>
        <button onClick={() => setMode((m) => (m === "chart" ? "quiz" : "chart"))}
          className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          {mode === "chart" ? tt(lang, "📝 퀴즈", "📝 クイズ") : tt(lang, "📋 표 보기", "📋 表を見る")}
        </button>
      </div>

      {mode === "chart" ? (
        <>
          <Section title={tt(lang, "기본 자음 (14)", "基本子音（14）")} items={HANGUL_CONSONANTS} cols={5} />
          <Section title={tt(lang, "된소리 (5)", "濃音（5）")} items={HANGUL_TENSE} cols={5} />
          <Section title={tt(lang, "기본 모음 (10)", "基本母音（10）")} items={HANGUL_VOWELS} cols={5} />
          <Section title={tt(lang, "복합 모음 (11)", "複合母音（11）")} items={HANGUL_COMPOUND} cols={5} />
        </>
      ) : (
        <HangulQuiz lang={lang} />
      )}
    </div>
  );
}

function HangulQuiz({ lang }: { lang: UiLang }) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    const pool = shuffle(ALL_JAMO);
    const answer = pool[0];
    const options = shuffle([answer, ...pool.slice(1, 4)]);
    return { answer, options };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function pick(r: string) {
    if (picked) return;
    setPicked(r);
    setScore((s) => ({ ok: s.ok + (r === q.answer.romaja ? 1 : 0), total: s.total + 1 }));
    speakKo(q.answer.audio);
    window.setTimeout(() => { setPicked(null); setRound((x) => x + 1); }, 900);
  }

  return (
    <div className="flex flex-col items-center gap-5 pt-4">
      <p className="text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, `정답 ${score.ok} / ${score.total}`, `正解 ${score.ok} / ${score.total}`)}</p>
      <button onClick={() => speakKo(q.answer.audio)}
        className="flex h-32 w-32 items-center justify-center rounded-3xl text-6xl font-bold shadow-lg"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}>
        {q.answer.char}
      </button>
      <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "이 글자의 로마자는?", "この文字のローマ字は？")}</p>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3">
        {q.options.map((o) => {
          const isAns = o.romaja === q.answer.romaja;
          const isPick = picked === o.romaja;
          let bg = "var(--card)", color = "var(--text-1)";
          if (picked) {
            if (isAns) { bg = "#10B981"; color = "#fff"; }
            else if (isPick) { bg = "#EF4444"; color = "#fff"; }
          }
          return (
            <button key={o.char} onClick={() => pick(o.romaja)} disabled={!!picked}
              className="rounded-2xl py-4 text-lg font-bold transition active:scale-95"
              style={{ background: bg, color, border: "1px solid var(--border)" }}>
              {o.romaja}
            </button>
          );
        })}
      </div>
    </div>
  );
}
