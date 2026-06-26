"use client";

import { useState } from "react";
import { TRAVEL_PHRASEBOOK } from "@/lib/jp/phrasebook";
import { speakJa } from "@/lib/jp/speech";
import { useFavorites } from "@/lib/favorites";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import PhraseQuiz from "@/components/PhraseQuiz";
import { useUiLang, tt } from "@/lib/i18n";

const ALL_JP_KO = TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases).map((p) => p.ko);

export default function PhrasebookView() {
  const lang = useUiLang();
  const [active, setActive] = useState<string>("__fav");
  const [quiz, setQuiz] = useState(false);
  const { has, toggle, favs } = useFavorites("jp-phrase");
  const isFavTab = active === "__fav";
  const situation = TRAVEL_PHRASEBOOK.find((s) => s.key === active) ?? TRAVEL_PHRASEBOOK[0];
  const favPhrases = TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases).filter((p) => favs.includes(p.jp));
  const phrases = isFavTab ? favPhrases : (situation?.phrases ?? []);

  if (quiz) {
    return (
      <PhraseQuiz
        items={favPhrases.map((p) => ({ audio: p.reading || p.jp, ko: p.ko, label: p.jp }))}
        distractors={ALL_JP_KO} speak={speakJa} accent="#00b894" onExit={() => setQuiz(false)}
      />
    );
  }

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "여행 회화집", "旅行会話集")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "상황을 고르고, 문장을 눌러 발음을 들어보세요. 🔊", "場面を選んで、文をタップして発音を聞いてみましょう。🔊")}</p>
      </div>

      {/* 상황 탭 (가로 스크롤) */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        <Chip active={isFavTab} size="md" onClick={() => setActive("__fav")}
          activeGradient="linear-gradient(135deg,#f6c453,#f0932b)" activeShadow="0 3px 10px rgba(240,147,43,.35)">
          <span>⭐</span><span>{tt(lang, "즐겨찾기", "お気に入り")}{favs.length ? ` ${favs.length}` : ""}</span>
        </Chip>
        {TRAVEL_PHRASEBOOK.map((s) => (
          <Chip key={s.key} active={s.key === active} size="md" onClick={() => setActive(s.key)}
            activeGradient="linear-gradient(135deg,#00b894,#00cec9)" activeShadow="0 3px 10px rgba(0,184,148,.35)">
            <span>{s.emoji}</span><span>{s.title}</span>
          </Chip>
        ))}
      </div>

      {isFavTab && favPhrases.length > 0 && (
        <div className="px-4 pb-3">
          <button onClick={() => setQuiz(true)}
            className="w-full rounded-2xl py-3 text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#00b894,#00cec9)", boxShadow: "0 4px 12px rgba(0,184,148,.3)" }}>
            {tt(lang, `⭐ 즐겨찾기 복습 퀴즈 (${favPhrases.length})`, `⭐ お気に入り復習クイズ（${favPhrases.length}）`)}
          </button>
        </div>
      )}

      {/* 문장 리스트 */}
      {isFavTab && phrases.length === 0 ? (
        <EmptyState emoji="⭐" title={tt(lang, "즐겨찾기가 비어있어요", "お気に入りが空です")} description={tt(lang, "별(☆)을 눌러 자주 쓰는 표현을 모아 보세요.", "星（☆）を押してよく使う表現を集めましょう。")} />
      ) : (
        <div className="space-y-2.5 px-4">
          {phrases.map((p, i) => {
            const fav = has(p.jp);
            return (
              <div key={i} className="flex items-start gap-2 rounded-2xl p-4 shadow-sm"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <button onClick={() => speakJa(p.reading || p.jp)} className="min-w-0 flex-1 text-left">
                  <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{p.jp}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{p.reading}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{p.ko}</p>
                  {p.tip && (
                    <p className="mt-1.5 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: "#00b89414", color: "var(--text-2)" }}>💡 {p.tip}</p>
                  )}
                </button>
                <div className="flex flex-col items-center gap-1.5">
                  <button onClick={() => toggle(p.jp)} aria-label={tt(lang, "즐겨찾기", "お気に入り")} className="grid h-9 w-9 place-items-center rounded-full text-lg"
                    style={{ background: fav ? "#f0932b18" : "var(--surface)", color: fav ? "#f0932b" : "var(--text-3)" }}>{fav ? "★" : "☆"}</button>
                  <button onClick={() => speakJa(p.reading || p.jp)} aria-label={tt(lang, "발음", "発音")} className="grid h-9 w-9 place-items-center rounded-full text-lg"
                    style={{ background: "#00b89418", color: "#00b894" }}>🔊</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
