import { VOCAB } from "./vocab";
import { VERBS } from "./verbs";
import { CONVERSATIONS } from "./conversations";
import type { Token } from "./types";

export type Section = "문자·어휘" | "문법" | "독해" | "청해";

export interface ExamQuestion {
  key: string;
  wordId?: string;        // 오답노트 연동용
  section: Section;
  passage?: string;       // 독해 지문
  prompt: string;
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

const PARTICLES = ["を", "に", "が", "は", "で", "へ", "と", "も"];
const tokensToText = (t: Token[]) => t.map((x) => x.t).join("");

// ── 독해 지문 (직접 작성한 원본 · N5 수준, 저작권 없음) ──
const READINGS: { text: string; question: string; options: string[]; answer: string }[] = [
  { text: "わたしは まいあさ 六時に おきます。七時に あさごはんを たべて、八時に 学校へ 行きます。", question: "이 사람은 몇 시에 학교에 갑니까?", options: ["6시", "7시", "8시", "9시"], answer: "8시" },
  { text: "きのうは 雨でした。だから、わたしは 家で 本を 読みました。とても おもしろかったです。", question: "어제 이 사람은 무엇을 했습니까?", options: ["산책을 했다", "집에서 책을 읽었다", "영화를 봤다", "친구를 만났다"], answer: "집에서 책을 읽었다" },
  { text: "わたしの かぞくは 四人です。父と 母と 兄が います。兄は 大学生です。", question: "이 사람의 가족은 몇 명입니까?", options: ["3명", "4명", "5명", "6명"], answer: "4명" },
  { text: "あした 友だちと えいがを 見に 行きます。十時に 駅の 前で 会います。", question: "내일 몇 시에 역 앞에서 만납니까?", options: ["9시", "10시", "11시", "12시"], answer: "10시" },
  { text: "この みせの ラーメンは 安くて おいしいです。いつも 人が おおいです。", question: "이 가게의 라멘은 어떻습니까?", options: ["비싸고 맛없다", "싸고 맛있다", "비싸지만 맛있다", "싸지만 맛없다"], answer: "싸고 맛있다" },
  { text: "わたしは コーヒーが すきです。でも、夜は 飲みません。ねむれませんから。", question: "이 사람은 왜 밤에 커피를 마시지 않습니까?", options: ["맛이 없어서", "잠을 못 자서", "비싸서", "배가 아파서"], answer: "잠을 못 자서" },
  { text: "週末に 海へ 行きました。天気が よくて、とても たのしかったです。", question: "주말에 어디에 갔습니까?", options: ["산", "바다", "공원", "학교"], answer: "바다" },
  { text: "わたしは 毎日 日本語を 勉強します。むずかしいですが、おもしろいです。", question: "이 사람에게 일본어는 어떻습니까?", options: ["쉽고 지루하다", "어렵지만 재미있다", "쉽고 재미있다", "어렵고 지루하다"], answer: "어렵지만 재미있다" },
  { text: "デパートで あたらしい かばんを 買いました。すこし たかかったですが、とても きにいって います。", question: "이 사람은 가방을 어떻게 생각합니까?", options: ["마음에 든다", "별로다", "너무 싸다", "색이 싫다"], answer: "마음에 든다" },
  { text: "あねは びょういんで はたらいて います。しごとは いそがしいですが、たのしいと 言って います。", question: "누나의 일은 어떻습니까?", options: ["한가하다", "바쁘지만 즐겁다", "바쁘고 힘들다", "쉽다"], answer: "바쁘지만 즐겁다" },
  { text: "きょうは ともだちの たんじょうびです。ケーキを 作って、プレゼントを わたしました。", question: "오늘은 무슨 날입니까?", options: ["시험날", "친구 생일", "휴일", "졸업식"], answer: "친구 생일" },
  { text: "わたしの へやは ひろくないですが、あかるくて しずかです。だから べんきょうに いいです。", question: "이 사람의 방은 어떻습니까?", options: ["넓고 시끄럽다", "좁지만 밝고 조용하다", "어둡다", "넓고 밝다"], answer: "좁지만 밝고 조용하다" },
];

function opt(answer: string, pool: string[], sh: <T>(a: T[]) => T[]): string[] {
  return sh([answer, ...sh(pool.filter((x) => x !== answer)).slice(0, 3)]);
}

/** 변별력 강화: 같은 카테고리(유사어군)에서 오답을 우선 뽑고, 부족하면 전체로 보충 */
function smartOpt(answer: string, prefer: string[], full: string[], sh: <T>(a: T[]) => T[]): string[] {
  const seen = new Set([answer]);
  const distract: string[] = [];
  for (const x of sh(prefer)) { if (!seen.has(x)) { seen.add(x); distract.push(x); } if (distract.length >= 3) break; }
  if (distract.length < 3) for (const x of sh(full)) { if (!seen.has(x)) { seen.add(x); distract.push(x); } if (distract.length >= 3) break; }
  return sh([answer, ...distract.slice(0, 3)]);
}

/**
 * JLPT N5 형식의 **모의시험** 문항을 앱 콘텐츠에서 생성(원본 문항, 기출 원문 아님).
 * 문자·어휘 / 문법(동사 활용·조사) / 독해 / 청해(단어·대화). seed 로 회차를 재현.
 */
export function buildExam(opts?: { seed?: number; count?: number }): ExamQuestion[] {
  const count = opts?.count ?? 20;
  const sh = makeShuffle(opts?.seed);

  const readings = VOCAB.map((w) => w.reading);
  const meanings = VOCAB.map((w) => w.meaning);
  const words = VOCAB.map((w) => w.word);
  const masus = VERBS.map((v) => v.masu);
  const kanjiWords = VOCAB.filter((w) => /[一-龯]/.test(w.word));

  // 회화 대사 풀 (청해 대화형)
  const lines = CONVERSATIONS.flatMap((c) => c.lines);
  const koPool = lines.map((l) => l.ko);

  // 조사 빈칸 후보 (예문에 단일 조사 토큰이 있는 단어)
  const particleCands = VOCAB.map((w) => {
    const i = w.example.tokens.findIndex((t) => PARTICLES.includes(t.t));
    return i >= 0 ? { w, i } : null;
  }).filter((x): x is { w: (typeof VOCAB)[number]; i: number } => x !== null);

  const nVocab = Math.round(count * 0.4);
  const nGrammar = Math.round(count * 0.2);
  const nReading = Math.min(3, READINGS.length, Math.max(2, Math.round(count * 0.15)));
  const nListen = Math.max(0, count - nVocab - nGrammar - nReading);

  const qs: ExamQuestion[] = [];

  // 같은 카테고리(유사어군) 풀 — 오답 변별력 강화용
  const byCat = (sel: (w: (typeof VOCAB)[number]) => string) => {
    const m: Record<string, string[]> = {};
    VOCAB.forEach((w) => { (m[w.category] ||= []).push(sel(w)); });
    return m;
  };
  const catMeanings = byCat((w) => w.meaning);
  const catReadings = byCat((w) => w.reading);
  const catWords = byCat((w) => w.word);
  const contextCands = sh(VOCAB.filter((w) => w.example.tokens.some((t) => t.hl)));

  // 문자·어휘 (읽기·표기는 한자 단어만, 뜻·문맥규정은 전체)
  const kanji = sh(kanjiWords);
  const vshuf = sh(VOCAB);
  for (let i = 0; i < nVocab; i++) {
    const mode = (contextCands.length ? i % 4 : i % 3);
    if (mode === 1) {
      const w = vshuf[i % vshuf.length];
      qs.push({ key: `v-m-${w.id}-${i}`, wordId: w.id, section: "문자·어휘", prompt: w.word, sub: `[${w.reading}]`, question: "뜻으로 알맞은 것은?", options: smartOpt(w.meaning, catMeanings[w.category] || [], meanings, sh), answer: w.meaning });
    } else if (mode === 0) {
      const w = kanji[i % kanji.length];
      qs.push({ key: `v-r-${w.id}-${i}`, wordId: w.id, section: "문자·어휘", prompt: w.word, question: "읽는 법으로 알맞은 것은?", options: smartOpt(w.reading, catReadings[w.category] || [], readings, sh), answer: w.reading });
    } else if (mode === 2) {
      const w = kanji[(i + 1) % kanji.length];
      qs.push({ key: `v-k-${w.id}-${i}`, wordId: w.id, section: "문자·어휘", prompt: w.reading, question: "한자 표기로 알맞은 것은?", options: smartOpt(w.word, catWords[w.category] || [], words, sh), answer: w.word });
    } else {
      // 문맥규정: 예문에서 표제어를 비우고 알맞은 단어 고르기
      const w = contextCands[i % contextCands.length];
      let blanked = false;
      const sentence = w.example.tokens.map((t) => (t.hl ? (blanked ? "" : ((blanked = true), "（　）")) : t.t)).join("");
      qs.push({ key: `v-c-${w.id}-${i}`, wordId: w.id, section: "문자·어휘", passage: sentence, prompt: "", question: "（　）에 들어갈 말은?", options: smartOpt(w.word, catWords[w.category] || [], words, sh), answer: w.word });
    }
  }

  // 문법 (동사 활용 + 조사 빈칸)
  const nParticle = Math.min(Math.floor(nGrammar / 2), particleCands.length);
  const nVerb = nGrammar - nParticle;
  sh(VERBS).slice(0, nVerb).forEach((v, i) => {
    qs.push({ key: `g-v-${v.id}-${i}`, section: "문법", prompt: v.dict, sub: `[${v.reading}] · ${v.meaning}`, question: "ます형으로 알맞은 것은?", options: opt(v.masu, masus, sh), answer: v.masu });
  });
  sh(particleCands).slice(0, nParticle).forEach(({ w, i }, k) => {
    const ans = w.example.tokens[i].t;
    const sentence = w.example.tokens.map((t, ti) => (ti === i ? "（　）" : t.t)).join("");
    qs.push({ key: `g-p-${w.id}-${k}`, section: "문법", passage: sentence, prompt: "", question: "（　）에 들어갈 말은?", options: opt(ans, PARTICLES, sh), answer: ans });
  });

  // 독해
  sh(READINGS).slice(0, nReading).forEach((r, i) => {
    qs.push({ key: `r-${i}-${r.answer}`, section: "독해", passage: r.text, prompt: "", question: r.question, options: sh(r.options), answer: r.answer });
  });

  // 청해 (단어 듣기 + 대화 듣기)
  const nDialog = Math.min(Math.floor(nListen / 2), lines.length);
  const nWordListen = nListen - nDialog;
  sh(VOCAB).slice(0, nWordListen).forEach((w, i) => {
    qs.push({ key: `l-w-${w.id}-${i}`, wordId: w.id, section: "청해", prompt: "🔊", audio: w.reading, question: "들리는 단어의 뜻은?", options: opt(w.meaning, meanings, sh), answer: w.meaning });
  });
  sh(lines).slice(0, nDialog).forEach((l, i) => {
    qs.push({ key: `l-d-${i}`, section: "청해", prompt: "🔊", audio: tokensToText(l.tokens), question: "들은 대화의 뜻은?", options: opt(l.ko, koPool, sh), answer: l.ko });
  });

  return sh(qs);
}

/** N5 합격 기준(모의): 60% 이상 */
export const PASS_RATIO = 0.6;
