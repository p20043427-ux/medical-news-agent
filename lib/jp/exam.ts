import { VOCAB } from "./vocab";
import { VERBS } from "./verbs";
import { shuffle } from "@/lib/learn/shuffle";

export type Section = "문자·어휘" | "문법" | "청해";

export interface ExamQuestion {
  key: string;
  wordId?: string;        // 오답노트 연동용
  section: Section;
  prompt: string;         // 큰 표시(문제 단어/문장)
  sub?: string;           // 보조(읽기 등)
  question: string;       // 질문 라벨
  audio?: string;         // 청해용 TTS 텍스트
  options: string[];
  answer: string;
}

function opts(answer: string, pool: string[]): string[] {
  const distract = shuffle(pool.filter((x) => x !== answer)).slice(0, 3);
  return shuffle([answer, ...distract]);
}

/**
 * JLPT N5 형식의 **모의시험** 문항을 앱 콘텐츠에서 생성한다(원본 문항, 기출 원문 아님).
 * 문자·어휘 / 문법(동사 활용) / 청해(듣고 뜻 고르기) 3영역.
 */
export function buildExam(count = 20): ExamQuestion[] {
  const readings = VOCAB.map((w) => w.reading);
  const meanings = VOCAB.map((w) => w.meaning);
  const words = VOCAB.map((w) => w.word);
  const masus = VERBS.map((v) => v.masu);

  const kanjiWords = VOCAB.filter((w) => /[一-龯]/.test(w.word));

  // 영역별 문항 수 (대략 N5 비중)
  const nVocab = Math.round(count * 0.5);
  const nGrammar = Math.round(count * 0.25);
  const nListen = count - nVocab - nGrammar;

  const qs: ExamQuestion[] = [];

  // 문자·어휘: 읽기 / 뜻 / 표기 섞기
  shuffle(VOCAB).slice(0, nVocab).forEach((w, i) => {
    const mode = i % 3;
    if (mode === 0) {
      qs.push({ key: `v-r-${w.id}`, wordId: w.id, section: "문자·어휘", prompt: w.word, question: "읽는 법으로 알맞은 것은?", options: opts(w.reading, readings), answer: w.reading });
    } else if (mode === 1) {
      qs.push({ key: `v-m-${w.id}`, wordId: w.id, section: "문자·어휘", prompt: w.word, sub: `[${w.reading}]`, question: "뜻으로 알맞은 것은?", options: opts(w.meaning, meanings), answer: w.meaning });
    } else {
      const kw = kanjiWords.includes(w) ? w : kanjiWords[i % kanjiWords.length];
      qs.push({ key: `v-k-${kw.id}`, wordId: kw.id, section: "문자·어휘", prompt: kw.reading, question: "한자 표기로 알맞은 것은?", options: opts(kw.word, words), answer: kw.word });
    }
  });

  // 문법: 동사 활용(ます형)
  shuffle(VERBS).slice(0, nGrammar).forEach((v) => {
    qs.push({ key: `g-${v.id}`, section: "문법", prompt: v.dict, sub: `[${v.reading}] · ${v.meaning}`, question: "ます형으로 알맞은 것은?", options: opts(v.masu, masus), answer: v.masu });
  });

  // 청해: 듣고 뜻 고르기
  shuffle(VOCAB).slice(0, nListen).forEach((w) => {
    qs.push({ key: `l-${w.id}`, wordId: w.id, section: "청해", prompt: "🔊", audio: w.reading, question: "들리는 단어의 뜻은?", options: opts(w.meaning, meanings), answer: w.meaning });
  });

  return shuffle(qs);
}

/** N5 합격 기준(모의): 60% 이상 */
export const PASS_RATIO = 0.6;
