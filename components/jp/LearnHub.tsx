"use client";

import { CONVERSATIONS } from "@/lib/jp/conversations";
import { VERBS } from "@/lib/jp/verbs";
import { TRAVEL_PHRASEBOOK } from "@/lib/jp/phrasebook";
import { JP_GRAMMAR } from "@/lib/jp/grammar";
import { useUiLang, tt, type UiLang } from "@/lib/i18n";

export type LearnView = "conversation" | "verbs" | "kana" | "exam" | "phrasebook" | "roleplay" | "grammar" | "dictation";

type N = { conv: number; verb: number; sit: number };
// 아이콘은 통일감을 위해 일본어 글자(흰색 볼드)로 표기 — 会(会話)·動(動詞)·あ(かな)
const CARDS: { key: LearnView; glyph: string; title: [string, string]; desc: (n: N, l: UiLang) => string; grad: string; shadow: string }[] = [
  { key: "conversation", glyph: "会", title: ["생활 회화", "日常会話"], desc: (n, l) => tt(l, `${n.conv}개 상황 · 핵심표현`, `${n.conv}個の場面・重要表現`), grad: "linear-gradient(135deg,#a29bfe,#6c5ce7)", shadow: "rgba(108,92,231,.35)" },
  { key: "roleplay", glyph: "話", title: ["회화 롤플레이", "会話ロールプレイ"], desc: (n, l) => tt(l, `${n.conv}개 상황 · 골라서 대화 완성`, `${n.conv}個の場面・選んで会話完成`), grad: "linear-gradient(135deg,#6c5ce7,#0984e3)", shadow: "rgba(108,92,231,.35)" },
  { key: "phrasebook", glyph: "旅", title: ["여행 회화집", "旅行フレーズ集"], desc: (n, l) => tt(l, `${n.sit}개 상황별 즉석 표현`, `${n.sit}個の場面別フレーズ`), grad: "linear-gradient(135deg,#00b894,#00cec9)", shadow: "rgba(0,184,148,.35)" },
  { key: "grammar", glyph: "文", title: ["N5 문법", "N5 文法"], desc: (_n, l) => tt(l, `${JP_GRAMMAR.length}개 · 조사·활용·표현`, `${JP_GRAMMAR.length}個・助詞・活用・表現`), grad: "linear-gradient(135deg,#fdcb6e,#e17055)", shadow: "rgba(225,112,85,.35)" },
  { key: "verbs", glyph: "動", title: ["필수 동사", "必須動詞"], desc: (n, l) => tt(l, `${n.verb}개 · 활용형(ます·て·ない)`, `${n.verb}個・活用形(ます・て・ない)`), grad: "linear-gradient(135deg,#fd79a8,#e84393)", shadow: "rgba(232,67,147,.35)" },
  { key: "kana", glyph: "あ", title: ["가나 (히라가나·가타카나)", "かな（ひらがな・カタカナ）"], desc: (_n, l) => tt(l, "기초 문자 · 발음 · 퀴즈", "基礎文字・発音・クイズ"), grad: "linear-gradient(135deg,#E63946,#F4A261)", shadow: "rgba(230,57,70,.35)" },
  { key: "dictation", glyph: "聴", title: ["받아쓰기", "ディクテーション"], desc: (_n, l) => tt(l, "문장 듣고 고르기 · 청해 훈련", "文を聞いて選ぶ・聴解訓練"), grad: "linear-gradient(135deg,#0984e3,#74b9ff)", shadow: "rgba(9,132,227,.35)" },
  { key: "exam", glyph: "試", title: ["JLPT N5 모의시험", "JLPT N5 模擬試験"], desc: (_n, l) => tt(l, "문자·어휘 / 문법 / 청해 · 합격 판정", "文字語彙/文法/聴解・合否判定"), grad: "linear-gradient(135deg,#0984e3,#74b9ff)", shadow: "rgba(9,132,227,.35)" },
];

export default function LearnHub({ onOpen }: { onOpen: (v: LearnView) => void }) {
  const lang = useUiLang();
  const counts = { conv: CONVERSATIONS.length, verb: VERBS.length, sit: TRAVEL_PHRASEBOOK.length };
  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "학습", "学習")}</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "회화 · 동사 · 문자를 골라 학습해요.", "会話・動詞・文字を選んで学習します。")}</p>
      <div className="space-y-3">
        {CARDS.map((c) => (
          <button
            key={c.key}
            onClick={() => onOpen(c.key)}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold"
              style={{ background: c.grad, boxShadow: `0 4px 12px ${c.shadow}`, color: "#fff" }}>
              {c.glyph}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, c.title[0], c.title[1])}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{c.desc(counts, lang)}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
