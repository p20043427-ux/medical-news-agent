// 의료교류 플랫폼 공통 타입 — 모든 항목은 한국어·일본어 양국어 동시 표기.
// (은성의료재단 ↔ 가마치그룹 직원 상호방문용. 방향에 무관하게 양국어를 함께 노출)

export type MedRole =
  | "common" | "doctor" | "nurse" | "exam" | "pharmacy"
  | "rehab" | "infection" | "qps" | "affairs" | "finance" | "purchasing" | "admin";

export interface MedPhrase {
  ko: string;        // 한국어 문장
  koRomaja: string;  // 한국어 로마자 (개정 로마자 표기)
  koPron?: string;   // 한국어 발음을 일본어 가타카나로 표기 (일본 직원이 읽고 말하기용)
  ja: string;        // 일본어 문장 (한자 포함 가능)
  jaReading: string; // 일본어 전체 가나 읽기 (TTS·후리가나용)
  jaPron?: string;   // 일본어 발음을 한국어 한글로 표기 (한국 직원이 읽고 말하기용)
  noteKo?: string;   // 사용 메모 (한국어)
  noteJa?: string;   // 사용 메모 (일본어)
}

export interface MedPhraseGroup {
  key: string;       // 영문 슬러그 (예: "nurse-handover")
  role: MedRole;     // 직종
  titleKo: string;   // 상황 제목 (한국어)
  titleJa: string;   // 상황 제목 (일본어)
  emoji: string;
  phrases: MedPhrase[];
}

export interface MedTerm {
  ko: string;        // 한국어 용어
  koRomaja: string;  // 한국어 로마자
  koPron?: string;   // 한국어 발음을 가타카나로 표기
  ja: string;        // 일본어 용어
  jaReading: string; // 일본어 읽기 (가나)
  jaPron?: string;   // 일본어 발음을 한글로 표기
  exampleKo?: string; // 예문 (한국어, 선택)
  exampleJa?: string; // 예문 (일본어, 선택)
}

export interface MedTermCategory {
  key: string;
  titleKo: string;
  titleJa: string;
  emoji: string;
  terms: MedTerm[];
}

export interface MedCard {
  ko: string;        // 한국어 (크게 표시)
  koRomaja: string;
  koPron?: string;   // 한국어 발음을 가타카나로 표기
  ja: string;        // 일본어 (크게 표시)
  jaReading: string;
  jaPron?: string;   // 일본어 발음을 한글로 표기
  icon: string;      // 이모지 아이콘
  urgent?: boolean;  // 긴급 강조
}

export interface MedCardGroup {
  key: string;
  titleKo: string;
  titleJa: string;
  emoji: string;
  cards: MedCard[];
}
