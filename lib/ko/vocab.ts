import type { KoWord, KoCategory } from "./types";
import { KO_VOCAB_K1A } from "./vocab-k1a";
import { KO_VOCAB_K2 } from "./vocab-k2";

export const KO_CATEGORIES: KoCategory[] = [
  { key: "greeting", label: "인사·표현", labelJa: "あいさつ・表現", emoji: "👋" },
  { key: "people", label: "사람·가족", labelJa: "人・家族", emoji: "👨‍👩‍👧" },
  { key: "number", label: "숫자·수량", labelJa: "数・数量", emoji: "🔢" },
  { key: "time", label: "시간·날짜", labelJa: "時間・日付", emoji: "🕒" },
  { key: "food", label: "음식·식사", labelJa: "食べ物・食事", emoji: "🍚" },
  { key: "place", label: "장소·교통", labelJa: "場所・交通", emoji: "🚉" },
  { key: "daily", label: "생활·사물", labelJa: "生活・物", emoji: "🏠" },
  { key: "body", label: "신체·건강", labelJa: "体・健康", emoji: "🩺" },
  { key: "health", label: "건강·병원", labelJa: "健康・病院", emoji: "🏥" },
  { key: "emotion", label: "감정·성격", labelJa: "感情・性格", emoji: "❤️" },
  { key: "hobby", label: "취미·여가", labelJa: "趣味・余暇", emoji: "🎵" },
  { key: "work", label: "직장·학교", labelJa: "職場・学校", emoji: "💼" },
  { key: "verb-basic", label: "기초 동사", labelJa: "基礎動詞", emoji: "⚡" },
  { key: "verb", label: "동사", labelJa: "動詞", emoji: "🏃" },
  { key: "adjective", label: "형용사", labelJa: "形容詞", emoji: "✨" },
  { key: "adverb", label: "부사·기타", labelJa: "副詞・その他", emoji: "💬" },
];

// 표제어 기준 중복 제거(먼저 등장 유지)
const seen = new Set<string>();
export const KO_VOCAB: KoWord[] = [...KO_VOCAB_K1A, ...KO_VOCAB_K2]
  .filter((w) => (seen.has(w.word) ? false : (seen.add(w.word), true)));
