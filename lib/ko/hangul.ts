// 한글 기초 데이터 (일본어 화자 대상) — 자음·모음 + 발음용 예시 음절

export interface Jamo {
  char: string;   // 자모 (예: "ㄱ")
  romaja: string; // 로마자 (예: "g/k")
  name: string;   // 명칭 (예: "기역")
  audio: string;  // TTS용 예시 음절 (예: "가") — 단독 자모는 발음이 어려워 음절로 들려줌
}

// 기본 자음 14
export const HANGUL_CONSONANTS: Jamo[] = [
  { char: "ㄱ", romaja: "g/k", name: "기역", audio: "가" },
  { char: "ㄴ", romaja: "n", name: "니은", audio: "나" },
  { char: "ㄷ", romaja: "d/t", name: "디귿", audio: "다" },
  { char: "ㄹ", romaja: "r/l", name: "리을", audio: "라" },
  { char: "ㅁ", romaja: "m", name: "미음", audio: "마" },
  { char: "ㅂ", romaja: "b/p", name: "비읍", audio: "바" },
  { char: "ㅅ", romaja: "s", name: "시옷", audio: "사" },
  { char: "ㅇ", romaja: "-/ng", name: "이응", audio: "아" },
  { char: "ㅈ", romaja: "j", name: "지읒", audio: "자" },
  { char: "ㅊ", romaja: "ch", name: "치읓", audio: "차" },
  { char: "ㅋ", romaja: "k", name: "키읔", audio: "카" },
  { char: "ㅌ", romaja: "t", name: "티읕", audio: "타" },
  { char: "ㅍ", romaja: "p", name: "피읖", audio: "파" },
  { char: "ㅎ", romaja: "h", name: "히읗", audio: "하" },
];

// 된소리(경음) 5
export const HANGUL_TENSE: Jamo[] = [
  { char: "ㄲ", romaja: "kk", name: "쌍기역", audio: "까" },
  { char: "ㄸ", romaja: "tt", name: "쌍디귿", audio: "따" },
  { char: "ㅃ", romaja: "pp", name: "쌍비읍", audio: "빠" },
  { char: "ㅆ", romaja: "ss", name: "쌍시옷", audio: "싸" },
  { char: "ㅉ", romaja: "jj", name: "쌍지읒", audio: "짜" },
];

// 기본 모음 10
export const HANGUL_VOWELS: Jamo[] = [
  { char: "ㅏ", romaja: "a", name: "아", audio: "아" },
  { char: "ㅑ", romaja: "ya", name: "야", audio: "야" },
  { char: "ㅓ", romaja: "eo", name: "어", audio: "어" },
  { char: "ㅕ", romaja: "yeo", name: "여", audio: "여" },
  { char: "ㅗ", romaja: "o", name: "오", audio: "오" },
  { char: "ㅛ", romaja: "yo", name: "요", audio: "요" },
  { char: "ㅜ", romaja: "u", name: "우", audio: "우" },
  { char: "ㅠ", romaja: "yu", name: "유", audio: "유" },
  { char: "ㅡ", romaja: "eu", name: "으", audio: "으" },
  { char: "ㅣ", romaja: "i", name: "이", audio: "이" },
];

// 복합 모음 11
export const HANGUL_COMPOUND: Jamo[] = [
  { char: "ㅐ", romaja: "ae", name: "애", audio: "애" },
  { char: "ㅒ", romaja: "yae", name: "얘", audio: "얘" },
  { char: "ㅔ", romaja: "e", name: "에", audio: "에" },
  { char: "ㅖ", romaja: "ye", name: "예", audio: "예" },
  { char: "ㅘ", romaja: "wa", name: "와", audio: "와" },
  { char: "ㅙ", romaja: "wae", name: "왜", audio: "왜" },
  { char: "ㅚ", romaja: "oe", name: "외", audio: "외" },
  { char: "ㅝ", romaja: "wo", name: "워", audio: "워" },
  { char: "ㅞ", romaja: "we", name: "웨", audio: "웨" },
  { char: "ㅟ", romaja: "wi", name: "위", audio: "위" },
  { char: "ㅢ", romaja: "ui", name: "의", audio: "의" },
];

// 퀴즈 풀 (기본 자음 + 기본 모음)
export const ALL_JAMO: Jamo[] = [...HANGUL_CONSONANTS, ...HANGUL_VOWELS];
