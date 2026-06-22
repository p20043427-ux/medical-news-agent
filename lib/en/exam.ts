import { EN_VOCAB } from "./vocab";
import { PHRASAL_VERBS } from "./phrasal-verbs";

export type EnSection = "어휘" | "구동사" | "독해" | "청해";

export interface EnExamQuestion {
  key: string;
  section: EnSection;
  passage?: string;
  prompt: string;
  sub?: string;
  question: string;
  audio?: string;
  options: string[];
  answer: string;
}

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeShuffle(seed?: number) {
  const rnd = seed !== undefined ? mulberry32(seed) : Math.random;
  return function <T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
}

// 직접 작성한 원본 영어 지문 (A1~A2 수준, 저작권 없음)
const READINGS: { text: string; question: string; options: string[]; answer: string }[] = [
  { text: "Tom gets up at seven every morning. He has breakfast and goes to work by bus.", question: "Tom은 어떻게 출근합니까?", options: ["걸어서", "버스로", "자전거로", "차로"], answer: "버스로" },
  { text: "Mary likes coffee, but she doesn't drink it at night. She can't sleep well.", question: "Mary는 왜 밤에 커피를 마시지 않습니까?", options: ["맛이 없어서", "잠을 못 자서", "비싸서", "건강 때문에"], answer: "잠을 못 자서" },
  { text: "It was rainy yesterday, so I stayed home and read a book. It was very interesting.", question: "어제 무엇을 했습니까?", options: ["영화를 봤다", "집에서 책을 읽었다", "산책했다", "쇼핑했다"], answer: "집에서 책을 읽었다" },
  { text: "My sister works at a hospital. Her job is busy, but she enjoys it.", question: "누나의 일은 어떻습니까?", options: ["한가하다", "바쁘지만 즐겁다", "지루하다", "쉽다"], answer: "바쁘지만 즐겁다" },
  { text: "We are going to the beach this weekend. The weather will be sunny and warm.", question: "이번 주말에 어디에 갑니까?", options: ["산", "바다", "공원", "도서관"], answer: "바다" },
  { text: "This restaurant is cheap and the food is delicious. It is always full of people.", question: "이 식당은 어떻습니까?", options: ["비싸고 맛없다", "싸고 맛있다", "비싸지만 맛있다", "조용하다"], answer: "싸고 맛있다" },
  { text: "I study English every day. It is difficult, but it is also fun.", question: "이 사람에게 영어는 어떻습니까?", options: ["쉽고 지루하다", "어렵지만 재미있다", "쉽고 재미있다", "어렵고 지루하다"], answer: "어렵지만 재미있다" },
  { text: "Jack bought a new bag at the store. It was a little expensive, but he really likes it.", question: "Jack은 가방을 어떻게 생각합니까?", options: ["마음에 든다", "별로다", "너무 싸다", "색이 싫다"], answer: "마음에 든다" },
];

function smartOpt(answer: string, prefer: string[], full: string[], sh: <T>(a: T[]) => T[]): string[] {
  const seen = new Set([answer]); const d: string[] = [];
  for (const x of sh(prefer)) { if (!seen.has(x)) { seen.add(x); d.push(x); } if (d.length >= 3) break; }
  if (d.length < 3) for (const x of sh(full)) { if (!seen.has(x)) { seen.add(x); d.push(x); } if (d.length >= 3) break; }
  return sh([answer, ...d.slice(0, 3)]);
}

/** CEFR(A1~) 형식의 영어 모의시험. 앱 콘텐츠 기반 원본 문항. seed 로 회차 재현. */
export function buildEnExam(opts?: { seed?: number; count?: number }): EnExamQuestion[] {
  const count = opts?.count ?? 20;
  const sh = makeShuffle(opts?.seed);
  const meanings = EN_VOCAB.map((w) => w.meaning);
  const wordsArr = EN_VOCAB.map((w) => w.word);
  const pvMeanings = PHRASAL_VERBS.map((p) => p.meaning);

  const byCatMeaning: Record<string, string[]> = {};
  const byCatWord: Record<string, string[]> = {};
  EN_VOCAB.forEach((w) => { (byCatMeaning[w.category] ||= []).push(w.meaning); (byCatWord[w.category] ||= []).push(w.word); });

  const nVocab = Math.round(count * 0.45);
  const nPhrasal = Math.round(count * 0.2);
  const nReading = Math.min(3, READINGS.length, Math.max(2, Math.round(count * 0.15)));
  const nListen = Math.max(0, count - nVocab - nPhrasal - nReading);

  const qs: EnExamQuestion[] = [];

  sh(EN_VOCAB).slice(0, nVocab).forEach((w, i) => {
    if (i % 2 === 0) qs.push({ key: `v-m-${w.id}`, section: "어휘", prompt: w.word, sub: w.pronunciation, question: "뜻으로 알맞은 것은?", options: smartOpt(w.meaning, byCatMeaning[w.category] || [], meanings, sh), answer: w.meaning });
    else qs.push({ key: `v-w-${w.id}`, section: "어휘", prompt: w.meaning, question: "알맞은 단어는?", options: smartOpt(w.word, byCatWord[w.category] || [], wordsArr, sh), answer: w.word });
  });

  sh(PHRASAL_VERBS).slice(0, nPhrasal).forEach((p) => {
    qs.push({ key: `p-${p.id}`, section: "구동사", prompt: p.phrase, question: "구동사의 뜻은?", options: smartOpt(p.meaning, pvMeanings, pvMeanings, sh), answer: p.meaning });
  });

  sh(READINGS).slice(0, nReading).forEach((r, i) => {
    qs.push({ key: `r-${i}`, section: "독해", passage: r.text, prompt: "", question: r.question, options: sh(r.options), answer: r.answer });
  });

  sh(EN_VOCAB).slice(0, nListen).forEach((w, i) => {
    qs.push({ key: `l-${w.id}-${i}`, section: "청해", prompt: "🔊", audio: w.word, question: "들리는 단어의 뜻은?", options: smartOpt(w.meaning, byCatMeaning[w.category] || [], meanings, sh), answer: w.meaning });
  });

  return sh(qs);
}

export const EN_PASS_RATIO = 0.6;
