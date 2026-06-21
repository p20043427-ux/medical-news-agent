import type { Synonym } from "./types";

/** 한국어 품사명 → 짧은 약어 (카드의 품사 pill 용) */
export function posTag(pos: string): string {
  if (pos.includes("형용사")) return "adj";
  if (pos.includes("동사")) return "v";
  if (pos.includes("부사")) return "adv";
  if (pos.includes("대명사")) return "pron";
  if (pos.includes("수사")) return "num";
  if (pos.includes("의문")) return "int";
  if (pos.includes("명사")) return "n";
  if (pos.includes("감탄")) return "exp";
  return "exp"; // 인사 · 표현 등
}

interface Extra {
  synonyms?: Synonym[];
  tip?: string;
}

/**
 * 단어 id 별 유사어·팁. 본 데이터(vocab.ts)와 분리해 관리한다.
 * 없는 항목은 카드에서 자동으로 기본 팁을 보여 준다.
 */
export const EXTRAS: Record<string, Extra> = {
  g4: {
    synonyms: [
      { word: "どうも", reading: "どうも", meaning: "고마워요 (가벼운)", pos: "exp" },
      { word: "感謝", reading: "かんしゃ", meaning: "감사", pos: "n" },
    ],
    tip: "정중하게는 「ありがとうございます」. 친구 사이엔 「ありがとう」.",
  },
  g5: {
    synonyms: [
      { word: "失礼", reading: "しつれい", meaning: "실례", pos: "n" },
      { word: "ごめんなさい", reading: "ごめんなさい", meaning: "미안해요", pos: "exp" },
    ],
    tip: "사과·부탁·말 걸기에 모두 쓰는 만능 표현이에요.",
  },
  g6: {
    synonyms: [{ word: "失礼しました", reading: "しつれいしました", meaning: "실례했습니다", pos: "exp" }],
    tip: "「すみません」보다 가벼운 사과. 친한 사이에 사용해요.",
  },
  f1: {
    synonyms: [
      { word: "食事", reading: "しょくじ", meaning: "식사", pos: "n" },
      { word: "飯", reading: "めし", meaning: "밥 (격식 없음)", pos: "n" },
    ],
    tip: "「ご飯」은 ‘밥’이자 ‘식사’ 전체를 뜻하기도 해요.",
  },
  f7: {
    synonyms: [
      { word: "うまい", reading: "うまい", meaning: "맛있다 (구어)", pos: "adj" },
      { word: "美味", reading: "びみ", meaning: "맛이 좋음", pos: "n" },
    ],
    tip: "「うまい」는 남성적·구어체. 정중하게는 「おいしい」.",
  },
  a1: {
    synonyms: [{ word: "巨大", reading: "きょだい", meaning: "거대함", pos: "adj" }],
    tip: "반대말은 「小さい(작다)」.",
  },
  a2: {
    synonyms: [{ word: "細かい", reading: "こまかい", meaning: "잘다, 미세하다", pos: "adj" }],
    tip: "반대말은 「大きい(크다)」.",
  },
  a4: {
    synonyms: [{ word: "高価", reading: "こうか", meaning: "고가", pos: "adj" }],
    tip: "‘높다’와 ‘비싸다’ 둘 다 「高い」. 반대말은 「安い(싸다)」/「低い(낮다)」.",
  },
  a5: {
    synonyms: [{ word: "お手頃", reading: "おてごろ", meaning: "적당한 가격", pos: "adj" }],
    tip: "반대말은 「高い(비싸다)」.",
  },
  a6: {
    synonyms: [
      { word: "面白い", reading: "おもしろい", meaning: "재미있다", pos: "adj" },
      { word: "嬉しい", reading: "うれしい", meaning: "기쁘다", pos: "adj" },
    ],
    tip: "과거형은 「楽しかった(즐거웠다)」.",
  },
  a7: {
    synonyms: [{ word: "簡単", reading: "かんたん", meaning: "간단함", pos: "adj" }],
    tip: "반대말은 「易しい/簡単(쉽다)」.",
  },
  a9: {
    synonyms: [{ word: "大好き", reading: "だいすき", meaning: "아주 좋아함", pos: "adj" }],
    tip: "「〜が好きです」 형태로 ‘を’가 아닌 ‘が’를 써요.",
  },
  p1: {
    synonyms: [
      { word: "僕", reading: "ぼく", meaning: "나 (남성)", pos: "pron" },
      { word: "俺", reading: "おれ", meaning: "나 (남성·거침)", pos: "pron" },
    ],
    tip: "「私(わたし)」는 남녀·격식 모두 무난해요.",
  },
  t2: {
    synonyms: [{ word: "本日", reading: "ほんじつ", meaning: "오늘 (격식)", pos: "n" }],
    tip: "「本日」는 안내문·뉴스 등 격식 있는 표현이에요.",
  },
  d5: {
    synonyms: [{ word: "気候", reading: "きこう", meaning: "기후", pos: "n" }],
    tip: "날씨 인사: 「いい天気ですね(날씨 좋네요)」.",
  },
  av1: {
    synonyms: [
      { word: "非常に", reading: "ひじょうに", meaning: "매우 (격식)", pos: "adv" },
      { word: "すごく", reading: "すごく", meaning: "엄청 (구어)", pos: "adv" },
    ],
    tip: "구어로는 「すごく」, 격식체로는 「非常に」.",
  },
  av6: {
    synonyms: [{ word: "共に", reading: "ともに", meaning: "함께 (문어)", pos: "adv" }],
    tip: "「一緒に〜ませんか」는 권유 표현이에요.",
  },
};
