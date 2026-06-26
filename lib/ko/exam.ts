import { KO_VOCAB } from "./vocab";
import { KO_GRAMMAR } from "./grammar";
import { KO_CONVERSATIONS } from "./conversations";

// 한국어(일본어 화자 대상) TOPIK 1~2 모의시험 문항 빌더
// セクション: 어휘 / 문법 / 읽기 / 듣기
export type KoSection = "어휘" | "문법" | "읽기" | "듣기";

/** 합격 기준(모의): 60% 이상 */
export const KO_PASS_RATIO = 0.6;

export type KoDifficulty = "easy" | "normal" | "hard";

export interface KoExamQuestion {
  key: string;
  wordId?: string; // 오답노트 연동용 (KO_VOCAB id)
  section: KoSection;
  passage?: string; // 읽기 지문 (한국어)
  prompt: string; // 메인 표시 (예: 한국어 단어/문장)
  sub?: string; // 예: 로마자
  question: string; // 질문 (일본어 — 학습자는 일본어 화자)
  audio?: string; // 듣기용 TTS (한국어)
  options: string[];
  answer: string;
}

// ── 시드 기반 RNG (회차 재현용) — jp/exam.ts 와 동일한 mulberry32 방식 ──
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
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

// 정답 + 풀에서 뽑은 오답 3개로 4지선다 구성
function opt(answer: string, pool: string[], sh: <T>(a: T[]) => T[]): string[] {
  const distract = sh(pool.filter((x) => x !== answer)).slice(0, 3);
  return sh([answer, ...distract]);
}

// ── 읽기 지문 (직접 작성한 원본 · TOPIK 1~2 수준, 저작권 없음) ──
// 한국어 지문 + 일본어 질문 + 일본어 선택지
const KO_READINGS: { text: string; question: string; options: string[]; answer: string }[] = [
  {
    text: "저는 매일 아침 일곱 시에 일어나요. 그리고 여덟 시에 학교에 가요.",
    question: "この人は何時に学校へ行きますか。",
    options: ["7時", "8時", "9時", "6時"],
    answer: "8時",
  },
  {
    text: "어제는 비가 왔어요. 그래서 집에서 책을 읽었어요. 아주 재미있었어요.",
    question: "昨日この人は何をしましたか。",
    options: ["散歩をした", "家で本を読んだ", "映画を見た", "友達に会った"],
    answer: "家で本を読んだ",
  },
  {
    text: "우리 가족은 네 명이에요. 아버지, 어머니, 형, 그리고 저예요.",
    question: "この人の家族は何人ですか。",
    options: ["3人", "4人", "5人", "6人"],
    answer: "4人",
  },
  {
    text: "내일 친구하고 영화를 봐요. 열 시에 역 앞에서 만나요.",
    question: "明日何時に駅の前で会いますか。",
    options: ["9時", "10時", "11時", "12時"],
    answer: "10時",
  },
  {
    text: "이 식당은 음식이 싸고 맛있어요. 그래서 사람이 항상 많아요.",
    question: "この食堂はどうですか。",
    options: ["高くてまずい", "安くておいしい", "高いがおいしい", "安いがまずい"],
    answer: "安くておいしい",
  },
  {
    text: "저는 커피를 좋아해요. 하지만 밤에는 안 마셔요. 잠을 못 자니까요.",
    question: "この人はなぜ夜にコーヒーを飲みませんか。",
    options: ["味がまずいから", "眠れないから", "高いから", "お腹が痛いから"],
    answer: "眠れないから",
  },
  {
    text: "주말에 바다에 갔어요. 날씨가 좋아서 아주 즐거웠어요.",
    question: "週末にどこへ行きましたか。",
    options: ["山", "海", "公園", "学校"],
    answer: "海",
  },
  {
    text: "저는 매일 한국어를 공부해요. 어렵지만 재미있어요.",
    question: "この人にとって韓国語はどうですか。",
    options: ["易しくて退屈だ", "難しいが面白い", "易しくて面白い", "難しくて退屈だ"],
    answer: "難しいが面白い",
  },
  {
    text: "백화점에서 새 가방을 샀어요. 조금 비쌌지만 아주 마음에 들어요.",
    question: "この人は新しいカバンをどう思っていますか。",
    options: ["気に入っている", "あまり好きではない", "安すぎる", "色が嫌だ"],
    answer: "気に入っている",
  },
  {
    text: "누나는 병원에서 일해요. 일이 바쁘지만 즐겁다고 해요.",
    question: "姉の仕事はどうですか。",
    options: ["暇だ", "忙しいが楽しい", "忙しくてつらい", "易しい"],
    answer: "忙しいが楽しい",
  },
  {
    text: "오늘은 친구 생일이에요. 케이크를 만들고 선물도 줬어요.",
    question: "今日は何の日ですか。",
    options: ["試験の日", "友達の誕生日", "休みの日", "卒業式"],
    answer: "友達の誕生日",
  },
  {
    text: "제 방은 넓지 않아요. 하지만 밝고 조용해요. 그래서 공부하기 좋아요.",
    question: "この人の部屋はどうですか。",
    options: ["広くてうるさい", "狭いが明るくて静かだ", "暗い", "広くて明るい"],
    answer: "狭いが明るくて静かだ",
  },
];

// 난이도별 문항 수
const DIFF_COUNT: Record<KoDifficulty, number> = {
  easy: 12,
  normal: 20,
  hard: 25,
};

/**
 * TOPIK 1~2 형식의 **모의시험** 문항을 앱 콘텐츠에서 생성(원본 문항).
 * 어휘 / 문법 / 읽기 / 듣기 4영역을 대략 균등 배분.
 * seed 로 회차 재현, difficulty(입문/표준/도전)로 문항 수 조절.
 */
export function buildKoExam(opts: { seed?: number; difficulty: KoDifficulty }): KoExamQuestion[] {
  const count = DIFF_COUNT[opts.difficulty];
  const sh = makeShuffle(opts.seed);

  // 영역별 분배 (대략 균등). 합이 count 가 되도록 듣기로 보충.
  const nVocab = Math.round(count * 0.3);
  const nGrammar = Math.round(count * 0.25);
  const nReading = Math.min(KO_READINGS.length, Math.round(count * 0.2));
  const nListen = Math.max(0, count - nVocab - nGrammar - nReading);

  // 풀 준비
  const meanings = KO_VOCAB.map((w) => w.meaning);
  const briefs = KO_GRAMMAR.map((g) => g.brief);
  const lines = KO_CONVERSATIONS.flatMap((c) => c.lines);
  const koLinePool = lines.map((l) => l.ko);

  const qs: KoExamQuestion[] = [];

  // ── 어휘: 한국어 단어 → 일본어 뜻 고르기 ──
  sh(KO_VOCAB)
    .slice(0, nVocab)
    .forEach((w, i) => {
      qs.push({
        key: `v-${w.id}-${i}`,
        wordId: w.id,
        section: "어휘",
        prompt: w.word,
        sub: w.romaja,
        question: "意味として正しいものは？",
        options: opt(w.meaning, meanings, sh),
        answer: w.meaning,
      });
    });

  // ── 문법: 예문을 보고 문법 포인트 설명(brief) 고르기 ──
  sh(KO_GRAMMAR)
    .slice(0, nGrammar)
    .forEach((g, i) => {
      const ex = g.examples[0];
      qs.push({
        key: `g-${g.id}-${i}`,
        section: "문법",
        prompt: ex.ko,
        sub: ex.romaja,
        question: "この文の文法ポイントの説明は？",
        options: opt(g.brief, briefs, sh),
        answer: g.brief,
      });
    });

  // ── 읽기: 한국어 지문 + 일본어 질문/선택지 ──
  sh(KO_READINGS)
    .slice(0, nReading)
    .forEach((r, i) => {
      qs.push({
        key: `r-${i}-${r.answer}`,
        section: "읽기",
        passage: r.text,
        prompt: "",
        question: r.question,
        options: sh(r.options),
        answer: r.answer,
      });
    });

  // ── 듣기: 한국어 대사를 듣고 같은 문장 고르기 ──
  sh(lines)
    .slice(0, nListen)
    .forEach((l, i) => {
      qs.push({
        key: `l-${i}-${l.ko}`,
        section: "듣기",
        prompt: "🔊",
        audio: l.ko,
        question: "聞こえた文はどれですか？",
        options: opt(l.ko, koLinePool, sh),
        answer: l.ko,
      });
    });

  return sh(qs);
}
