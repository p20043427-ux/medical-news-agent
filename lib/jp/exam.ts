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

// ── 문 조립(문장 만들기) · 정보검색 — 직접 작성한 원본 N5 자료 ──
// parts: 올바른 순서의 4조각. ★(세 번째, index 2)에 오는 조각을 묻는다.
const KUMITATE: { parts: [string, string, string, string]; ko: string }[] = [
  { parts: ["わたしは", "まいあさ", "コーヒーを", "のみます"], ko: "나는 매일 아침 커피를 마십니다." },
  { parts: ["きのう", "ともだちと", "えいがを", "見ました"], ko: "어제 친구와 영화를 봤습니다." },
  { parts: ["この みせの", "ラーメンは", "とても", "おいしいです"], ko: "이 가게의 라멘은 매우 맛있습니다." },
  { parts: ["へやに", "だれも", "いま", "いません"], ko: "방에 아무도 지금 없습니다." },
  { parts: ["わたしは", "にほんごを", "すこし", "はなせます"], ko: "나는 일본어를 조금 말할 수 있습니다." },
  { parts: ["あした", "あめが", "ふるか", "どうか"], ko: "내일 비가 올지 어떨지." },
  { parts: ["がっこうまで", "じてんしゃで", "じゅっぷん", "かかります"], ko: "학교까지 자전거로 10분 걸립니다." },
  { parts: ["かぞくと", "いっしょに", "りょこうに", "行きたいです"], ko: "가족과 함께 여행을 가고 싶습니다." },
  { parts: ["この ほんは", "むずかしくて", "ぜんぜん", "わかりません"], ko: "이 책은 어려워서 전혀 모르겠습니다." },
  { parts: ["まいばん", "ねるまえに", "歯を", "みがきます"], ko: "매일 밤 자기 전에 이를 닦습니다." },
];

const INFO: { text: string; question: string; options: string[]; answer: string }[] = [
  { text: "＜図書館の あんない＞\n・あいている 時間：あさ 9時～ゆうがた 6時\n・休み：まいしゅう 月曜日\n・本は 2週間 かりられます。", question: "図書館は 何曜日が 休みですか。", options: ["月曜日", "火曜日", "日曜日", "土曜日"], answer: "月曜日" },
  { text: "＜カフェ メニュー＞\n・コーヒー 300円\n・こうちゃ 350円\n・ケーキ 400円\n※ コーヒーと ケーキの セットは 600円。", question: "コーヒーと ケーキを セットで かうと いくらですか。", options: ["600円", "700円", "650円", "750円"], answer: "600円" },
  { text: "＜日本語 クラス＞\nまいしゅう 火曜日と 木曜日\nごご 7時から 8時半まで\nばしょ：202きょうしつ", question: "クラスは 何時に はじまりますか。", options: ["ごご 7時", "ごご 8時", "ごご 6時", "ごご 8時半"], answer: "ごご 7時" },
  { text: "＜バスの 時間＞\n駅ゆき：8:00 / 8:30 / 9:00\nびょういんゆき：8:15 / 8:45\n※ 日曜日は バスが ありません。", question: "びょういんゆきの バスは 何時に ありますか。", options: ["8:15と 8:45", "8:00と 8:30", "9:00だけ", "8:30だけ"], answer: "8:15と 8:45" },
  { text: "＜スーパー セール＞\nきょうだけ！\n・やさい ぜんぶ 半分\n・くだもの 100円びき\n・あさ 10時から ごご 8時まで", question: "きょう やさいは どうなりますか。", options: ["はんがくに なる", "100円 やすくなる", "かわらない", "高くなる"], answer: "はんがくに なる" },
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

export type Difficulty = "easy" | "normal" | "hard";

// 난이도별 구성(문항 수·고난도 유형 비중·청해 대화 비율·어휘 모드)
const DIFF_CONF: Record<Difficulty, { count: number; syn: number; kumi: number; info: number; dialog: number; mode: Difficulty }> = {
  easy: { count: 15, syn: 0, kumi: 0, info: 0, dialog: 0, mode: "easy" },
  normal: { count: 20, syn: 2, kumi: 2, info: 1, dialog: 0.5, mode: "normal" },
  hard: { count: 25, syn: 3, kumi: 3, info: 1, dialog: 0.6, mode: "hard" },
};

const EASY_CATS = new Set(["greeting", "number", "time", "food", "people", "color", "body", "daily"]);
const isKanjiWord = (w: { word: string }) => /[一-龯]/.test(w.word);

/**
 * JLPT N5 형식의 **모의시험** 문항을 앱 콘텐츠에서 생성(원본 문항, 기출 원문 아님).
 * 문자·어휘 / 문법(동사 활용·조사·문조립) / 독해(정보검색) / 청해(단어·대화).
 * seed 로 회차 재현, difficulty(입문/표준/도전)로 난이도 조절.
 */
export function buildExam(opts?: { seed?: number; count?: number; difficulty?: Difficulty }): ExamQuestion[] {
  const conf = DIFF_CONF[opts?.difficulty ?? "normal"];
  const count = opts?.count ?? conf.count;
  const sh = makeShuffle(opts?.seed);

  const readings = VOCAB.map((w) => w.reading);
  const meanings = VOCAB.map((w) => w.meaning);
  const words = VOCAB.map((w) => w.word);
  const masus = VERBS.map((v) => v.masu);
  const kanjiWords = VOCAB.filter((w) => /[一-龯]/.test(w.word));

  // 난이도별 어휘 풀: 입문=짧고 기초적인 단어, 도전=한자·긴 읽기 단어
  const orEmpty = <T,>(filtered: T[], full: T[]) => (filtered.length >= 8 ? filtered : full);
  const vocabBase =
    conf.mode === "easy"
      ? orEmpty(VOCAB.filter((w) => w.reading.length <= 5 && (EASY_CATS.has(w.category) || !isKanjiWord(w))), VOCAB)
      : conf.mode === "hard"
        ? orEmpty(VOCAB.filter((w) => isKanjiWord(w) && w.reading.length >= 3), VOCAB)
        : VOCAB;
  const kanjiBase =
    conf.mode === "easy"
      ? orEmpty(kanjiWords.filter((w) => w.reading.length <= 3), kanjiWords)
      : conf.mode === "hard"
        ? orEmpty(kanjiWords.filter((w) => w.reading.length >= 4), kanjiWords)
        : kanjiWords;

  // 회화 대사 풀 (청해 대화형)
  const lines = CONVERSATIONS.flatMap((c) => c.lines);
  const koPool = lines.map((l) => l.ko);

  // 조사 빈칸 후보 (예문에 단일 조사 토큰이 있는 단어)
  const particleCands = VOCAB.map((w) => {
    const i = w.example.tokens.findIndex((t) => PARTICLES.includes(t.t));
    return i >= 0 ? { w, i } : null;
  }).filter((x): x is { w: (typeof VOCAB)[number]; i: number } => x !== null);

  const nVocabTotal = Math.round(count * 0.4);
  const nGrammarTotal = Math.round(count * 0.2);
  const nReadingTotal = Math.min(3, READINGS.length, Math.max(2, Math.round(count * 0.15)));
  const nListen = Math.max(0, count - nVocabTotal - nGrammarTotal - nReadingTotal);

  // 유의어 단어 풀 (curated synonyms 보유 단어)
  const synPool = VOCAB.filter((w) => w.synonyms && w.synonyms.length > 0);
  const nSyn = Math.min(conf.syn, synPool.length, Math.max(0, nVocabTotal - 2));
  const nVocab = nVocabTotal - nSyn;

  const nKumi = Math.min(conf.kumi, KUMITATE.length, Math.max(0, nGrammarTotal - 1));
  const nGrammar = nGrammarTotal - nKumi;

  const nInfo = Math.min(conf.info, INFO.length, Math.max(0, nReadingTotal - 1));
  const nReading = nReadingTotal - nInfo;

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
  const kanji = sh(kanjiBase);
  const vshuf = sh(vocabBase);
  for (let i = 0; i < nVocab; i++) {
    // 난이도별 모드 분포: 입문=뜻·읽기, 표준=4종 순환, 도전=문맥·표기 비중↑
    const mode =
      conf.mode === "easy"
        ? (i % 2 === 0 ? 1 : 0)
        : conf.mode === "hard"
          ? (contextCands.length ? [3, 2, 3, 1, 0][i % 5] : i % 3)
          : (contextCands.length ? i % 4 : i % 3);
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

  // 유의어 (비슷한 뜻 고르기) — curated synonyms
  sh(synPool).slice(0, nSyn).forEach((w, i) => {
    const ans = w.synonyms![0].word;
    qs.push({ key: `v-s-${w.id}-${i}`, wordId: w.id, section: "문자·어휘", prompt: w.word, sub: `[${w.reading}] · ${w.meaning}`, question: "뜻이 가장 가까운 말은?", options: smartOpt(ans, catWords[w.category] || [], words, sh), answer: ans });
  });

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

  // 문 조립 (문장 만들기) — 네 조각을 바른 순서로, ★(세 번째)에 오는 것
  sh(KUMITATE).slice(0, nKumi).forEach((k, i) => {
    const bank = sh(k.parts);
    const passage = `뜻: ${k.ko}\n[ ${bank.join(" / ")} ]\n①＿＿ ②＿＿ ③★ ④＿＿`;
    qs.push({ key: `g-k-${i}-${k.parts[2]}`, section: "문법", passage, prompt: "", question: "★(세 번째)에 들어갈 말은?", options: sh(k.parts), answer: k.parts[2] });
  });

  // 독해
  sh(READINGS).slice(0, nReading).forEach((r, i) => {
    qs.push({ key: `r-${i}-${r.answer}`, section: "독해", passage: r.text, prompt: "", question: r.question, options: sh(r.options), answer: r.answer });
  });

  // 정보검색 (안내문·시간표 읽고 답하기)
  sh(INFO).slice(0, nInfo).forEach((r, i) => {
    qs.push({ key: `i-${i}-${r.answer}`, section: "독해", passage: r.text, prompt: "", question: r.question, options: sh(r.options), answer: r.answer });
  });

  // 청해 (단어 듣기 + 대화 듣기) — 난이도별 대화 비율
  const nDialog = Math.min(Math.round(nListen * conf.dialog), lines.length);
  const nWordListen = nListen - nDialog;
  sh(vocabBase).slice(0, nWordListen).forEach((w, i) => {
    qs.push({ key: `l-w-${w.id}-${i}`, wordId: w.id, section: "청해", prompt: "🔊", audio: w.reading, question: "들리는 단어의 뜻은?", options: opt(w.meaning, meanings, sh), answer: w.meaning });
  });
  sh(lines).slice(0, nDialog).forEach((l, i) => {
    qs.push({ key: `l-d-${i}`, section: "청해", prompt: "🔊", audio: tokensToText(l.tokens), question: "들은 대화의 뜻은?", options: opt(l.ko, koPool, sh), answer: l.ko });
  });

  return sh(qs);
}

/** N5 합격 기준(모의): 60% 이상 */
export const PASS_RATIO = 0.6;
