"use client";

import { KO_VOCAB, KO_CATEGORIES } from "@/lib/ko/vocab";
import { KO_CONVERSATIONS } from "@/lib/ko/conversations";
import { KO_GRAMMAR } from "@/lib/ko/grammar";
import { tt, type UiLang } from "@/lib/i18n";

export type KoLearnView = "study" | "quiz" | "grammar" | "conversation" | "roleplay" | "dictation" | "placement";

const CARDS: { key: KoLearnView; glyph: string; title: [string, string]; desc: [string, string]; grad: string; shadow: string }[] = [
  { key: "study", glyph: "단", title: ["단어 학습", "単語学習"], desc: [`${KO_VOCAB.length}개 · ${KO_CATEGORIES.length}개 카테고리`, `${KO_VOCAB.length}語 · ${KO_CATEGORIES.length}カテゴリー`], grad: "linear-gradient(135deg,#2563EB,#7C3AED)", shadow: "rgba(37,99,235,.35)" },
  { key: "quiz", glyph: "퀴", title: ["단어 퀴즈", "単語クイズ"], desc: ["4지선다 · 뜻 맞히기", "四択 · 意味当て"], grad: "linear-gradient(135deg,#7C3AED,#a855f7)", shadow: "rgba(124,58,237,.35)" },
  { key: "grammar", glyph: "문", title: ["문법", "文法"], desc: [`${KO_GRAMMAR.length}개 · TOPIK 1~2 + 퀴즈`, `${KO_GRAMMAR.length}個 · TOPIK 1〜2 + クイズ`], grad: "linear-gradient(135deg,#fdcb6e,#e17055)", shadow: "rgba(225,112,85,.35)" },
  { key: "conversation", glyph: "회", title: ["생활 회화", "日常会話"], desc: [`${KO_CONVERSATIONS.length}개 상황 · 듣고 따라하기`, `${KO_CONVERSATIONS.length}場面 · 聞いて練習`], grad: "linear-gradient(135deg,#a29bfe,#6c5ce7)", shadow: "rgba(108,92,231,.35)" },
  { key: "roleplay", glyph: "롤", title: ["회화 롤플레이", "会話ロールプレイ"], desc: [`${KO_CONVERSATIONS.length}개 상황 · 골라서 대화 완성`, `${KO_CONVERSATIONS.length}場面 · 選んで会話完成`], grad: "linear-gradient(135deg,#6c5ce7,#0984e3)", shadow: "rgba(108,92,231,.35)" },
  { key: "dictation", glyph: "듣", title: ["받아쓰기", "ディクテーション"], desc: ["문장 듣고 고르기 · 청해 훈련", "文を聞いて選ぶ · 聴解訓練"], grad: "linear-gradient(135deg,#0984e3,#74b9ff)", shadow: "rgba(9,132,227,.35)" },
  { key: "placement", glyph: "레", title: ["레벨 테스트", "レベル診断"], desc: ["12문항 · 추천 시작 레벨 진단", "12問 · おすすめレベル診断"], grad: "linear-gradient(135deg,#10B981,#059669)", shadow: "rgba(16,185,129,.35)" },
];

export default function KoLearnHub({ lang, onOpen }: { lang: UiLang; onOpen: (v: KoLearnView) => void }) {
  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "학습", "学習")}</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "단어 · 문법 · 회화를 골라 학습해요.", "単語・文法・会話を選んで学習します。")}</p>
      <div className="space-y-3">
        {CARDS.map((c) => (
          <button
            key={c.key}
            onClick={() => onOpen(c.key)}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-extrabold"
              style={{ background: c.grad, boxShadow: `0 4px 12px ${c.shadow}`, color: "#fff" }}>
              {c.glyph}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, c.title[0], c.title[1])}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, c.desc[0], c.desc[1])}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
