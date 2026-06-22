"use client";

import { useMemo, useState } from "react";
import { CONVERSATIONS, CONVERSATION_CATEGORIES } from "@/lib/jp/conversations";
import type { Conversation, DialogueLine } from "@/lib/jp/types";
import { speakJa } from "@/lib/jp/speech";
import { Button } from "@/components/ui";

const text = (l: DialogueLine) => l.tokens.map((t) => t.t).join("");

// 모든 B(사용자 역) 대사 풀 — 오답 보기용
const ALL_B_LINES = Array.from(
  new Set(CONVERSATIONS.flatMap((c) => c.lines.filter((l) => l.speaker === "B").map(text))),
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function RoleplayView() {
  const [convo, setConvo] = useState<Conversation | null>(null);

  if (!convo) {
    return (
      <div className="px-4 pb-28 pt-3">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>회화 롤플레이</h1>
        <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>당신은 <b>B</b> 역할이에요. 상황에 맞는 일본어를 골라 대화를 완성하세요.</p>
        <div className="space-y-2.5">
          {CONVERSATIONS.map((c) => {
            const cat = CONVERSATION_CATEGORIES.find((k) => k.key === c.category);
            return (
              <button key={c.id} onClick={() => setConvo(c)}
                className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
                  style={{ background: "linear-gradient(135deg,#6c5ce7,#a29bfe)" }}>{c.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
                  <span className="block text-xs" style={{ color: "var(--text-3)" }}>{cat ? `${cat.emoji} ${cat.label}` : ""} · {c.level ?? "N5"}</span>
                </span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <RoleplayRunner key={convo.id} convo={convo} onExit={() => setConvo(null)} />;
}

function RoleplayRunner({ convo, onExit }: { convo: Conversation; onExit: () => void }) {
  const lines = convo.lines;
  const [revealed, setRevealed] = useState(0); // 공개된 대사 수
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  // 현재 B 턴의 보기(정답 + 오답 2)
  const cur = lines[revealed];
  const options = useMemo(() => {
    if (!cur || cur.speaker !== "B") return [];
    const answer = text(cur);
    const distractors = shuffle(ALL_B_LINES.filter((t) => t !== answer)).slice(0, 2);
    return shuffle([answer, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, convo.id]);

  const done = revealed >= lines.length;

  function advanceNpc() {
    const l = lines[revealed];
    if (l) speakJa(text(l));
    setRevealed((r) => r + 1);
  }
  function pick(opt: string) {
    if (!cur) return;
    if (opt === text(cur)) { speakJa(opt); setWrong(null); setRevealed((r) => r + 1); }
    else { setWrong(opt); setMistakes((m) => m + 1); }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{convo.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold" style={{ color: "var(--text-1)" }}>{convo.title}</p>
          <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{convo.situation}</p>
        </div>
        <span className="text-xs font-bold" style={{ color: "var(--text-3)" }}>{Math.min(revealed, lines.length)}/{lines.length}</span>
      </div>

      {/* 대화 버블 */}
      <div className="flex-1 space-y-2.5">
        {lines.slice(0, revealed).map((l, i) => {
          const mine = l.speaker === "B";
          return (
            <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <button onClick={() => speakJa(text(l))}
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-left"
                style={mine
                  ? { background: "linear-gradient(135deg,#6c5ce7,#a29bfe)", color: "#fff" }
                  : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}>
                <p className="text-[15px] font-semibold leading-snug">{text(l)}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: mine ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>{l.ko}</p>
              </button>
            </div>
          );
        })}
      </div>

      {/* 하단 컨트롤 */}
      <div className="mt-4">
        {done ? (
          <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="animate-reward text-5xl">{mistakes === 0 ? "🎉" : "👏"}</div>
            <p className="mt-2 text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{mistakes === 0 ? "완벽해요!" : "대화 완료!"}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>틀린 선택 {mistakes}회</p>
            <div className="mt-4 grid gap-2">
              <Button variant="brand" size="free" onClick={() => { setRevealed(0); setMistakes(0); setWrong(null); }} className="py-3">다시 하기</Button>
              <Button variant="surface" size="free" onClick={onExit} className="py-3">다른 상황</Button>
            </div>
          </div>
        ) : cur && cur.speaker !== "B" ? (
          <div className="rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>상대방의 말을 듣고…</p>
            <p className="mt-1 text-base font-bold" style={{ color: "var(--text-1)" }}>{text(cur)}</p>
            <p className="mt-0.5 text-sm" style={{ color: "var(--text-3)" }}>{cur.ko}</p>
            <Button variant="brand" size="free" onClick={advanceNpc} className="mt-3 w-full py-3">▶ 들려주고 다음</Button>
          </div>
        ) : cur ? (
          <div>
            <p className="mb-2 px-1 text-sm font-bold" style={{ color: "var(--text-2)" }}>이렇게 말해보세요: <span style={{ color: "var(--text-1)" }}>{cur.ko}</span></p>
            <div className="grid gap-2.5">
              {options.map((o) => {
                const isWrong = wrong === o;
                return (
                  <button key={o} onClick={() => pick(o)} disabled={isWrong}
                    className="rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition active:scale-[0.99]"
                    style={isWrong
                      ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-3)" }
                      : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" }}>
                    {o}{isWrong && <span className="ml-2 text-xs" style={{ color: "#E63946" }}>다시 골라보세요</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
