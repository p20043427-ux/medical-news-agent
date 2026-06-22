"use client";

import { useMemo, useState } from "react";
import { CONVERSATIONS, CONVERSATION_CATEGORIES } from "@/lib/jp/conversations";
import type { Conversation, ConversationCategory } from "@/lib/jp/types";
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
  const [cat, setCat] = useState<ConversationCategory | "all">("all");

  // 실제 데이터에 존재하는 카테고리만 노출
  const cats = useMemo(
    () => CONVERSATION_CATEGORIES.filter((c) => CONVERSATIONS.some((v) => v.category === c.key)),
    [],
  );
  const list = useMemo(
    () => (cat === "all" ? CONVERSATIONS : CONVERSATIONS.filter((c) => c.category === cat)),
    [cat],
  );

  function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95"
        style={on ? { background: "#E63946", color: "#fff" } : { background: "var(--surface)", color: "var(--text-3)" }}
      >
        {children}
      </button>
    );
  }

  // ───── 상세 ─────
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

        {/* 대화 */}
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

        {/* 오늘의 핵심 표현 */}
        {active.keyPhrases && active.keyPhrases.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 px-1 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>
              ✏️ 오늘의 표현
            </p>
            <div className="space-y-2">
              {active.keyPhrases.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl p-3"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold" style={{ color: "var(--text-1)" }}>{p.jp}</p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>{p.ko}</p>
                  </div>
                  <SpeakerButton text={p.reading} size={32} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 문화 팁 */}
        {active.cultureTip && (
          <div className="mt-4 rounded-2xl p-4" style={{ background: "#E6394612" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              💡 {active.cultureTip}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ───── 목록 ─────
  return (
    <div className="px-4 pb-28 pt-2">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>생활 회화</h1>
      <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>
        상황별 필수 회화를 듣고 따라 말해 보세요.
      </p>

      {/* 카테고리 필터 */}
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
        <Chip on={cat === "all"} onClick={() => setCat("all")}>전체</Chip>
        {cats.map((c) => (
          <Chip key={c.key} on={cat === c.key} onClick={() => setCat(c.key)}>
            {c.emoji} {c.label}
          </Chip>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((c) => (
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
              <span className="flex items-center gap-1.5">
                <span className="truncate font-bold" style={{ color: "var(--text-1)" }}>{c.title}</span>
                <span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold"
                  style={{ background: "var(--surface)", color: "var(--text-3)" }}
                >
                  {c.level ?? "N5"}
                </span>
              </span>
              <span className="block truncate text-sm" style={{ color: "var(--text-3)" }}>{c.situation}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
