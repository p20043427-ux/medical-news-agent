"use client";

import { useState } from "react";
import { EN_TRAVEL_PHRASEBOOK } from "@/lib/en/phrasebook";
import { speakEn } from "@/lib/en/speech";
import { useFavorites } from "@/lib/favorites";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import PhraseQuiz from "@/components/PhraseQuiz";

const ALL_EN_KO = EN_TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases).map((p) => p.ko);

export default function EnPhrasebookView() {
  const [active, setActive] = useState<string>("__fav");
  const [quiz, setQuiz] = useState(false);
  const { has, toggle, favs } = useFavorites("en-phrase");
  const isFavTab = active === "__fav";
  const situation = EN_TRAVEL_PHRASEBOOK.find((s) => s.key === active) ?? EN_TRAVEL_PHRASEBOOK[0];
  const favPhrases = EN_TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases).filter((p) => favs.includes(p.en));
  const phrases = isFavTab ? favPhrases : (situation?.phrases ?? []);

  if (quiz) {
    return (
      <PhraseQuiz
        items={favPhrases.map((p) => ({ audio: p.en, ko: p.ko, label: p.en }))}
        distractors={ALL_EN_KO} speak={speakEn} accent="#4361EE" onExit={() => setQuiz(false)}
      />
    );
  }

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>여행 회화집</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>상황을 고르고, 문장을 눌러 발음을 들어보세요. 🔊</p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        <Chip active={isFavTab} size="md" onClick={() => setActive("__fav")}
          activeGradient="linear-gradient(135deg,#f6c453,#f0932b)" activeShadow="0 3px 10px rgba(240,147,43,.35)">
          <span>⭐</span><span>즐겨찾기{favs.length ? ` ${favs.length}` : ""}</span>
        </Chip>
        {EN_TRAVEL_PHRASEBOOK.map((s) => (
          <Chip key={s.key} active={s.key === active} size="md" onClick={() => setActive(s.key)}
            activeGradient="linear-gradient(135deg,#4361EE,#7209B7)" activeShadow="0 3px 10px rgba(67,97,238,.35)">
            <span>{s.emoji}</span><span>{s.title}</span>
          </Chip>
        ))}
      </div>

      {isFavTab && favPhrases.length > 0 && (
        <div className="px-4 pb-3">
          <button onClick={() => setQuiz(true)}
            className="w-full rounded-2xl py-3 text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)", boxShadow: "0 4px 12px rgba(67,97,238,.3)" }}>
            ⭐ 즐겨찾기 복습 퀴즈 ({favPhrases.length})
          </button>
        </div>
      )}

      {isFavTab && phrases.length === 0 ? (
        <EmptyState emoji="⭐" title="즐겨찾기가 비어있어요" description="별(☆)을 눌러 자주 쓰는 표현을 모아 보세요." />
      ) : (
        <div className="space-y-2.5 px-4">
          {phrases.map((p, i) => {
            const fav = has(p.en);
            return (
              <div key={i} className="flex items-start gap-2 rounded-2xl p-4 shadow-sm"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <button onClick={() => speakEn(p.en)} className="min-w-0 flex-1 text-left">
                  <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{p.en}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{p.pronunciation}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{p.ko}</p>
                  {p.tip && (
                    <p className="mt-1.5 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: "#4361EE14", color: "var(--text-2)" }}>💡 {p.tip}</p>
                  )}
                </button>
                <div className="flex flex-col items-center gap-1.5">
                  <button onClick={() => toggle(p.en)} aria-label="즐겨찾기" className="grid h-9 w-9 place-items-center rounded-full text-lg"
                    style={{ background: fav ? "#f0932b18" : "var(--surface)", color: fav ? "#f0932b" : "var(--text-3)" }}>{fav ? "★" : "☆"}</button>
                  <button onClick={() => speakEn(p.en)} aria-label="발음" className="grid h-9 w-9 place-items-center rounded-full text-lg"
                    style={{ background: "#4361EE18", color: "#4361EE" }}>🔊</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
