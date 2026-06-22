"use client";

import { useMemo, useState } from "react";
import { GOJUON, DAKUON, YOON, ALL_KANA, type Kana } from "@/lib/jp/kana";
import { speakJa } from "@/lib/jp/speech";
import { track } from "@/lib/analytics";

type Script = "h" | "k";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export default function KanaView({ onBack }: { onBack?: () => void }) {
  const [script, setScript] = useState<Script>("h");
  const [showRomaji, setShowRomaji] = useState(true);
  const [mode, setMode] = useState<"chart" | "quiz">("chart");
  const [sel, setSel] = useState<string | null>(null);

  function tap(k: Kana) {
    setSel(k.r);
    speakJa(k.h);
    window.setTimeout(() => setSel((s) => (s === k.r ? null : s)), 600);
  }

  function Cell({ k }: { k: Kana | null }) {
    if (!k) return <span />;
    const on = sel === k.r;
    return (
      <button
        onClick={() => tap(k)}
        className="flex flex-col items-center justify-center rounded-xl py-2 transition active:scale-90"
        style={{
          background: on ? "#E63946" : "var(--card)",
          border: "1px solid var(--border)",
          color: on ? "#fff" : "var(--text-1)",
        }}
      >
        <span className="text-xl font-bold leading-none">{script === "h" ? k.h : k.k}</span>
        {showRomaji && (
          <span className="mt-0.5 text-[10px]" style={{ color: on ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>
            {k.r}
          </span>
        )}
      </button>
    );
  }

  function Section({ title, rows, cols }: { title: string; rows: (Kana | null)[][]; cols: number }) {
    return (
      <div className="mb-5">
        <p className="mb-2 px-1 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>{title}</p>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {rows.flat().map((k, i) => <Cell key={i} k={k} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-2">
      {/* 헤더 */}
      <div className="mb-3 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="뒤로"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>가나 (かな)</h1>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>탭하면 발음이 들려요</p>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex rounded-xl p-1" style={{ background: "var(--surface)" }}>
          {([["h", "히라가나"], ["k", "가타카나"]] as [Script, string][]).map(([s, label]) => (
            <button
              key={s}
              onClick={() => setScript(s)}
              className="rounded-lg px-3 py-1.5 text-xs font-bold transition"
              style={script === s ? { background: "#E63946", color: "#fff" } : { color: "var(--text-3)" }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowRomaji((r) => !r)}
          className="rounded-full px-3 py-1.5 text-xs font-bold transition"
          style={showRomaji ? { background: "var(--text-1)", color: "var(--card)" } : { background: "var(--surface)", color: "var(--text-3)" }}
        >
          romaji
        </button>
        <button
          onClick={() => setMode((m) => {
            const nx = m === "chart" ? "quiz" : "chart";
            if (nx === "quiz") track("kana_quiz_open", { script });
            return nx;
          })}
          className="ml-auto rounded-full px-3 py-1.5 text-xs font-bold"
          style={{ background: "var(--surface)", color: "var(--text-2)" }}
        >
          {mode === "chart" ? "📝 퀴즈" : "📋 표 보기"}
        </button>
      </div>

      {mode === "chart" ? (
        <>
          <Section title="청음 (五十音)" rows={GOJUON} cols={5} />
          <Section title="탁음 · 반탁음" rows={DAKUON} cols={5} />
          <Section title="요음 (拗音)" rows={YOON} cols={3} />
        </>
      ) : (
        <KanaQuiz script={script} />
      )}
    </div>
  );
}

function KanaQuiz({ script }: { script: Script }) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  const q = useMemo(() => {
    const pool = shuffle(ALL_KANA);
    const answer = pool[0];
    const options = shuffle([answer, ...pool.slice(1, 4)]);
    return { answer, options };
    // round 가 바뀔 때마다 새 문제
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function pick(r: string) {
    if (picked) return;
    setPicked(r);
    setScore((s) => ({ ok: s.ok + (r === q.answer.r ? 1 : 0), total: s.total + 1 }));
    speakJa(q.answer.h);
    window.setTimeout(() => { setPicked(null); setRound((x) => x + 1); }, 900);
  }

  return (
    <div className="flex flex-col items-center gap-5 pt-4">
      <p className="text-sm" style={{ color: "var(--text-3)" }}>정답 {score.ok} / {score.total}</p>
      <button
        onClick={() => speakJa(q.answer.h)}
        className="flex h-32 w-32 items-center justify-center rounded-3xl text-6xl font-bold shadow-lg"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}
      >
        {script === "h" ? q.answer.h : q.answer.k}
      </button>
      <p className="text-xs" style={{ color: "var(--text-3)" }}>이 글자의 로마자는?</p>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3">
        {q.options.map((o) => {
          const isAns = o.r === q.answer.r;
          const isPick = picked === o.r;
          let bg = "var(--card)", color = "var(--text-1)";
          if (picked) {
            if (isAns) { bg = "#10B981"; color = "#fff"; }
            else if (isPick) { bg = "#EF4444"; color = "#fff"; }
          }
          return (
            <button
              key={o.r}
              onClick={() => pick(o.r)}
              disabled={!!picked}
              className="rounded-2xl py-4 text-lg font-bold transition active:scale-95"
              style={{ background: bg, color, border: "1px solid var(--border)" }}
            >
              {o.r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
