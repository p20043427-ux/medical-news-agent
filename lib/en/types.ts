// 영어 학습 앱 공용 타입

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface EnExample {
  en: string;
  ko: string;
}

export interface EnWord {
  id: string;
  word: string;
  pronunciation: string;   // IPA (예: /ˈhæpɪ/)
  partOfSpeech: string;    // noun · verb · adj · adv · phrase
  cefrLevel: CefrLevel;
  category: string;
  meaning: string;         // 한국어 뜻
  example: EnExample;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[]; // 자주 함께 쓰이는 표현
  tip?: string;            // 학습 팁
  wordFamily?: string[];   // 파생어 (예: happy → happily, happiness)
}

export interface PhrasalVerb {
  id: string;
  phrase: string;          // 예: "give up"
  cefrLevel: CefrLevel;
  meaning: string;         // 한국어 뜻
  example: EnExample;
  separable: boolean;      // 목적어가 중간에 들어올 수 있는지
}

export interface GrammarPoint {
  id: string;
  title: string;           // 한국어 제목
  cefrLevel: CefrLevel;
  brief: string;           // 한 줄 설명
  rule: string;            // 핵심 규칙
  examples: (EnExample & { note?: string })[];
  commonMistake?: string;  // 흔한 실수
  tip?: string;
}

export interface EnCategory {
  key: string;
  label: string;           // 한국어
  labelJa?: string;        // 일본어
  emoji: string;
  cefrRange: string;
}
