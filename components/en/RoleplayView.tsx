"use client";

import { useEffect, useMemo, useState } from "react";
import { EN_CONVERSATIONS, type EnConversation } from "@/lib/en/conversations";
import { speakEn } from "@/lib/en/speech";
import { useRoleplay } from "@/lib/roleplay-progress";
import { bumpActivity } from "@/lib/daily-activity";
import { Button } from "@/components/ui";
import PronounceButton from "@/components/PronounceButton";
import { useUiLang, tt } from "@/lib/i18n";

const ALL_B_LINES = Array.from(
  new Set(EN_CONVERSATIONS.flatMap((c) => c.lines.filter((l) => l.speaker === "B").map((l) => l.en))),
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function EnRoleplayView() {
  const lang = useUiLang();
  const [convo, setConvo] = useState<EnConversation | null>(null);
  const { data, record } = useRoleplay("en-roleplay");

  if (!convo) {
    return (
      <div className="px-4 pb-28 pt-3">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "회화 롤플레이", "会話ロールプレイ")}</h1>
        <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "당신은 ", "あなたは ")}<b>B</b>{tt(lang, " 역할이에요. 상황에 맞는 영어를 골라 대화를 완성하세요.", " 役です。場面に合った英語を選んで会話を完成させましょう。")}</p>
        <div className="space-y-2.5">
          {EN_CONVERSATIONS.map((c) => {
            const done = data[c.id] !== undefined;
            return (
              <button key={c.id} onClick={() => setConvo(c)}
                className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
                  style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
                  {c.emoji}
                  {done && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "#10B981", border: "2px solid var(--card)" }}>✓</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
                  <span className="block text-xs" style={{ color: "var(--text-3)" }}>
                    {c.situation} · {c.level}
                    {done && <span style={{ color: "#10B981" }}> · {data[c.id] === 0 ? tt(lang, "완벽 클리어 🎉", "パーフェクト 🎉") : tt(lang, `최소 실수 ${data[c.id]}`, `最少ミス ${data[c.id]}`)}</span>}
                  </span>
                </span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <Runner key={convo.id} convo={convo} onExit={() => setConvo(null)} onComplete={(m) => record(convo.id, m)} />;
}

function Runner({ convo, onExit, onComplete }: { convo: EnConversation; onExit: () => void; onComplete: (mistakes: number) => void }) {
  const lang = useUiLang();
  const lines = convo.lines;
  const [revealed, setRevealed] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const cur = lines[revealed];
  const options = useMemo(() => {
    if (!cur || cur.speaker !== "B") return [];
    const answer = cur.en;
    const distractors = shuffle(ALL_B_LINES.filter((t) => t !== answer)).slice(0, 2);
    return shuffle([answer, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, convo.id]);

  const done = revealed >= lines.length;
  useEffect(() => { if (done) { onComplete(mistakes); bumpActivity("en", "roleplay"); } /* eslint-disable-next-line */ }, [done]);

  function advanceNpc() { const l = lines[revealed]; if (l) speakEn(l.en); setRevealed((r) => r + 1); }
  function pick(opt: string) {
    if (!cur) return;
    if (opt === cur.en) { speakEn(opt); setWrong(null); setRevealed((r) => r + 1); }
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

      <div className="flex-1 space-y-2.5">
        {lines.slice(0, revealed).map((l, i) => {
          const mine = l.speaker === "B";
          return (
            <div key={i} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <button onClick={() => speakEn(l.en)}
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-left"
                style={mine
                  ? { background: "linear-gradient(135deg,#4361EE,#7209B7)", color: "#fff" }
                  : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-1)" }}>
                <p className="text-[15px] font-semibold leading-snug">{l.en}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: mine ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>{l.ko}</p>
              </button>
              <div className="mt-1 px-1"><PronounceButton target={l.en} lang="en" accent="#4361EE" /></div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        {done ? (
          <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="animate-reward text-5xl">{mistakes === 0 ? "🎉" : "👏"}</div>
            <p className="mt-2 text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{mistakes === 0 ? "Perfect!" : "Well done!"}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, `틀린 선택 ${mistakes}회`, `間違い ${mistakes}回`)}</p>
            <div className="mt-4 grid gap-2">
              <Button variant="accent" size="free" onClick={() => { setRevealed(0); setMistakes(0); setWrong(null); }} className="py-3">{tt(lang, "다시 하기", "もう一度")}</Button>
              <Button variant="surface" size="free" onClick={onExit} className="py-3">{tt(lang, "다른 상황", "別の場面")}</Button>
            </div>
          </div>
        ) : cur && cur.speaker !== "B" ? (
          <div className="rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "상대방의 말을 듣고…", "相手の言葉を聞いて…")}</p>
            <p className="mt-1 text-base font-bold" style={{ color: "var(--text-1)" }}>{cur.en}</p>
            <p className="mt-0.5 text-sm" style={{ color: "var(--text-3)" }}>{cur.ko}</p>
            <Button variant="accent" size="free" onClick={advanceNpc} className="mt-3 w-full py-3">{tt(lang, "▶ 들려주고 다음", "▶ 聞いて次へ")}</Button>
          </div>
        ) : cur ? (
          <div>
            <p className="mb-2 px-1 text-sm font-bold" style={{ color: "var(--text-2)" }}>{tt(lang, "이렇게 말해보세요: ", "こう言ってみましょう: ")}<span style={{ color: "var(--text-1)" }}>{cur.ko}</span></p>
            <div className="grid gap-2.5">
              {options.map((o) => {
                const isWrong = wrong === o;
                return (
                  <button key={o} onClick={() => pick(o)} disabled={isWrong}
                    className="rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition active:scale-[0.99]"
                    style={isWrong
                      ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-3)" }
                      : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" }}>
                    {o}{isWrong && <span className="ml-2 text-xs" style={{ color: "#E63946" }}>{tt(lang, "다시 골라보세요", "もう一度選んでください")}</span>}
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
