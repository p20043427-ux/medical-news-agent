import { VOCAB } from "./vocab";
import { VERBS } from "./verbs";

export type Section = "문자·어휘" | "문법" | "독해" | "청해";

export interface ExamQuestion {
  key: string;
  wordId?: string;        // 오답노트 연동용
  section: Section;
  passage?: string;       // 독해 지문
  prompt: string;         // 큰 표시
  sub?: string;
  question: string;
  audio?: string;         // 청해용 TTS
  options: string[];
  answer: string;
}

// ── 시드 기반 RNG (회차 재현용) ──
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
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}

// ── 독해 지문 (직접 작성한 원본 · N5 수준, 저작권 없음) ──
const READINGS: { text: string; question: string; options: string[]; answer: string }[] = [
  { text: "わたしは まいあさ 六時に おきます。七時に あさごはんを たべて、八時に 学校へ 行きます。",
    question: "이 사람은 몇 시에 학교에 갑니까?", options: ["6시", "7시", "8시", "9시"], answer: "8시" },
  { text: "きのうは 雨でした。だから、わたしは 家で 本を 読みました。とても おもしろかったです。",
    question: "어제 이 사람은 무엇을 했습니까?", options: ["산책을 했다", "집에서 책을 읽었다", "영화를 봤다", "친구를 만났다"], answer: "집에서 책을 읽었다" },
  { text: "わたしの かぞくは 四人です。父と 母と 兄が います。兄は 大学生です。",
    question: "이 사람의 가족은 몇 명입니까?", options: ["3명", "4명", "5명", "6명"], answer: "4명" },
  { text: "あした 友だちと えいがを 見に 行きます。十時に 駅の 前で 会います。",
    question: "내일 몇 시에 역 앞에서 만납니까?", options: ["9시", "10시", "11시", "12시"], answer: "10시" },
  { text: "この みせの ラーメンは 安くて おいしいです。いつも 人が おおいです。",
    question: "이 가게의 라멘은 어떻습니까?", options: ["비싸고 맛없다", "싸고 맛있다", "비싸지만 맛있다", "싸지만 맛없다"], answer: "싸고 맛있다" },
  { text: "わたしは コーヒーが すきです。でも、夜は 飲みません。ねむれませんから。",
    question: "이 사람은 왜 밤에 커피를 마시지 않습니까?", options: ["맛이 없어서", "잠을 못 자서", "비싸서", "배가 아파서"], answer: "잠을 못 자서" },
  { text: "週末に 海へ 行きました。天気が よくて、とても たのしかったです。",
    question: "주말에 어디에 갔습니까?", options: ["산", "바다", "공원", "학교"], answer: "바다" },
  { text: "わたしは 毎日 日本語を 勉強します。むずかしいですが、おもしろいです。",
    question: "이 사람에게 일본어는 어떻습니까?", options: ["쉽고 지루하다", "어렵지만 재미있다", "쉽고 재미있다", "어렵고 지루하다"], answer: "어렵지만 재미있다" },
];

/**
 * JLPT N5 형식의 **모의시험** 문항을 앱 콘텐츠에서 생성(원본 문항, 기출 원문 아님).
 * 문자·어휘 / 문법 / 독해 / 청해. seed 를 주면 회차가 매번 동일하게 재현된다.
 */
export function buildExam(opts?: { seed?: number; count?: number }): ExamQuestion[] {
  const count = opts?.count ?? 20;
  const sh = makeShuffle(opts?.seed);

  const readings = VOCAB.map((w) => w.reading);
  const meanings = VOCAB.map((w) => w.meaning);
  const words = VOCAB.map((w) => w.word);
  const masus = VERBS.map((v) => v.masu);
  const kanjiWords = VOCAB.filter((w) => /[一-龯]/.test(w.word));

  const opt = (answer: string, pool: string[]) => sh([answer, ...sh(pool.filter((x) => x !== answer)).slice(0, 3)]);

  const nVocab = Math.round(count * 0.5);
  const nGrammar = Math.round(count * 0.2);
  const nReading = Math.min(3, READINGS.length, Math.round(count * 0.15));
  const nListen = count - nVocab - nGrammar - nReading;

  const qs: ExamQuestion[] = [];

  sh(VOCAB).slice(0, nVocab).forEach((w, i) => {
    const mode = i % 3;
    if (mode === 0) qs.push({ key: `v-r-${w.id}`, wordId: w.id, section: "문자·어휘", prompt: w.word, question: "읽는 법으로 알맞은 것은?", options: opt(w.reading, readings), answer: w.reading });
    else if (mode === 1) qs.push({ key: `v-m-${w.id}`, wordId: w.id, section: "문자·어휘", prompt: w.word, sub: `[${w.reading}]`, question: "뜻으로 알맞은 것은?", options: opt(w.meaning, meanings), answer: w.meaning });
    else { const kw = kanjiWords.includes(w) ? w : kanjiWords[i % kanjiWords.length]; qs.push({ key: `v-k-${kw.id}`, wordId: kw.id, section: "문자·어휘", prompt: kw.reading, question: "한자 표기로 알맞은 것은?", options: opt(kw.word, words), answer: kw.word }); }
  });

  sh(VERBS).slice(0, nGrammar).forEach((v) => {
    qs.push({ key: `g-${v.id}`, section: "문법", prompt: v.dict, sub: `[${v.reading}] · ${v.meaning}`, question: "ます형으로 알맞은 것은?", options: opt(v.masu, masus), answer: v.masu });
  });

  sh(READINGS).slice(0, nReading).forEach((r, i) => {
    qs.push({ key: `r-${i}-${r.answer}`, section: "독해", passage: r.text, prompt: "", question: r.question, options: sh(r.options), answer: r.answer });
  });

  sh(VOCAB).slice(0, Math.max(0, nListen)).forEach((w) => {
    qs.push({ key: `l-${w.id}`, wordId: w.id, section: "청해", prompt: "🔊", audio: w.reading, question: "들리는 단어의 뜻은?", options: opt(w.meaning, meanings), answer: w.meaning });
  });

  return sh(qs);
}

/** N5 합격 기준(모의): 60% 이상 */
export const PASS_RATIO = 0.6;
