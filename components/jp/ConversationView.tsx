"use client";

import { useState } from "react";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import type { Conversation } from "@/lib/jp/types";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import { speakJa } from "@/lib/jp/speech";
import { Button } from "@/components/ui";

const ACCENT = "linear-gradient(135deg,#E63946,#F4A261)";

export default function ConversationView({
  showFurigana,
  onToggleFurigana,
}: {
  showFurigana: boolean;
  onToggleFurigana: () => void;
}) {
  const [active, setActive] = useState<Conversation | null>(null);
  const [showKo, setShowKo] = useState(true);

  function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className="rounded-full px-3 py-1 text-xs font-bold transition active:scale-95"
        style={on ? { background: "#E63946", color: "#fff" } : { background: "var(--surface)", color: "var(--text-3)" }}
      >
        {children}
      </button>
    );
  }

  if (active) {
    return (
      <div className="px-4 pb-28 pt-2">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setActive(null)}
            aria-label="뒤로"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold" style={{ color: "var(--text-1)" }}>
              {active.emoji} {active.title}
            </h2>
            <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{active.situation}</p>
          </div>
          <Chip on={showKo} onClick={() => setShowKo((s) => !s)}>한글</Chip>
          <Chip on={showFurigana} onClick={onToggleFurigana}>ふり</Chip>
        </div>

        <Button
          variant="brand"
          size="free"
          onClick={() => speakJa(active.lines.map((l) => tokensToText(l.tokens)).join(" 。 "))}
          className="mb-4 w-full py-3"
        >
          ▶ 대화 전체 듣기
        </Button>

        <div className="space-y-3">
          {active.lines.map((line, i) => {
            const mine = i % 2 === 1;
            return (
              <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  <span className="mb-1 block px-1 text-xs" style={{ color: "var(--text-3)" }}>
                    {line.speaker}
                  </span>
                  <div
                    className="rounded-3xl px-4 py-3"
                    style={
                      mine
                        ? { background: ACCENT, color: "#fff", borderBottomRightRadius: 8 }
                        : { background: "var(--card)", color: "var(--text-1)", border: "1px solid var(--border)", borderBottomLeftRadius: 8 }
                    }
                  >
                    <div className="flex items-start gap-2">
                      <p className="text-lg leading-relaxed">
                        <Furigana tokens={line.tokens} showFurigana={showFurigana} />
                      </p>
                      <SpeakerButton
                        text={tokensToText(line.tokens)}
                        size={30}
                        className={mine ? "border-white/30 bg-white/20 text-white" : ""}
                      />
                    </div>
                    {showKo && (
                      <p className="mt-1.5 text-sm" style={{ color: mine ? "rgba(255,255,255,.8)" : "var(--text-3)" }}>
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
    <div className="px-4 pb-28 pt-2">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>생활 회화</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>
        상황별 필수 회화를 듣고 따라 말해 보세요.
      </p>
      <div className="space-y-3">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActive(c); setShowKo(true); }}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
              style={{ background: "var(--surface)" }}
            >
              {c.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
              <span className="block truncate text-sm" style={{ color: "var(--text-3)" }}>{c.situation}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
