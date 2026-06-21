"use client";

import { useState } from "react";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import type { Conversation } from "@/lib/jp/types";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import { speakJa } from "@/lib/jp/speech";

export default function ConversationView({
  showFurigana,
  onToggleFurigana,
}: {
  showFurigana: boolean;
  onToggleFurigana: () => void;
}) {
  const [active, setActive] = useState<Conversation | null>(null);
  const [showKo, setShowKo] = useState(true);

  if (active) {
    return (
      <div className="px-4 pb-24 pt-2">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setActive(null)}
            aria-label="뒤로"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {active.emoji} {active.title}
            </h2>
            <p className="truncate text-xs text-slate-400">{active.situation}</p>
          </div>
          <button
            onClick={() => setShowKo((s) => !s)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${showKo ? "bg-slate-900 text-white" : "border border-slate-300 bg-white text-slate-500"}`}
          >
            한글
          </button>
          <button
            onClick={onToggleFurigana}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${showFurigana ? "bg-slate-900 text-white" : "border border-slate-300 bg-white text-slate-500"}`}
          >
            ふり
          </button>
        </div>

        {/* 전체 듣기 */}
        <button
          onClick={() =>
            speakJa(active.lines.map((l) => tokensToText(l.tokens)).join(" 。 "))
          }
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 font-semibold text-white"
        >
          ▶ 대화 전체 듣기
        </button>

        <div className="space-y-3">
          {active.lines.map((line, i) => {
            const mine = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] ${mine ? "items-end" : "items-start"}`}>
                  <span className="mb-1 block px-1 text-xs text-slate-400">
                    {line.speaker}
                  </span>
                  <div
                    className={`rounded-3xl px-4 py-3 shadow-sm ${
                      mine
                        ? "rounded-br-md bg-slate-900 text-white"
                        : "rounded-bl-md bg-white text-slate-800"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <p className="text-lg leading-relaxed">
                        <Furigana tokens={line.tokens} showFurigana={showFurigana} />
                      </p>
                      <SpeakerButton
                        text={tokensToText(line.tokens)}
                        size={30}
                        className={mine ? "border-white/30 bg-white/15 text-white" : ""}
                      />
                    </div>
                    {showKo && (
                      <p
                        className={`mt-1.5 text-sm ${mine ? "text-white/70" : "text-slate-500"}`}
                      >
                        {line.ko}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-2">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">생활 회화</h1>
      <p className="mb-5 text-sm text-slate-400">
        상황별 필수 회화를 듣고 따라 말해 보세요.
      </p>
      <div className="space-y-3">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActive(c);
              setShowKo(true);
            }}
            className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition active:scale-[0.98]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              {c.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-slate-900">{c.title}</span>
              <span className="block truncate text-sm text-slate-400">
                {c.situation}
              </span>
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
