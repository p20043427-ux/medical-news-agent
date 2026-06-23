// 한국어 학습 과정(일본어 화자 대상) 공용 타입

export type Topik = 1 | 2;

/** 예문: 한국어 + 일본어역 */
export interface KoExample {
  ko: string;   // 한국어 예문
  ja: string;   // 일본어 번역
}

/** 단어 카드 */
export interface KoWord {
  id: string;
  word: string;          // 한국어 표제어
  romaja: string;        // 로마자 (예: "annyeong")
  pos: string;           // 품사 (한국어: 명사/동사/형용사/부사/조사 등)
  topik: Topik;          // TOPIK 급수 (1 또는 2)
  category: string;      // 카테고리 키
  meaning: string;       // 일본어 뜻 (主 설명 언어)
  example: KoExample;    // 예문
}

export interface KoCategory {
  key: string;
  label: string;     // 한국어 라벨
  labelJa: string;   // 일본어 라벨
  emoji: string;
}

/** 문법 예문 */
export interface KoGrammarExample {
  ko: string;       // 한국어 예문
  romaja: string;   // 로마자
  ja: string;       // 일본어역
  note?: string;    // 포인트(일본어)
}

/** 문법 포인트 */
export interface KoGrammarPoint {
  id: string;
  title: string;     // 일본어 제목 (예: "助詞 은/는 (主題)")
  topik: Topik;
  brief: string;     // 한 줄 설명 (일본어)
  rule: string;      // 핵심 규칙 (일본어, 한국어 패턴 포함 가능)
  examples: KoGrammarExample[];
  commonMistake?: string; // 흔한 실수 (일본어)
  tip?: string;           // 팁 (일본어)
}

/** 회화 대사 */
export interface KoDialogueLine {
  speaker: "A" | "B";
  ko: string;        // 한국어 대사
  romaja: string;    // 로마자
  ja: string;        // 일본어역
}

/** 회화 시나리오 */
export interface KoConversation {
  id: string;
  title: string;     // 일본어 제목
  situation: string; // 일본어 상황 설명
  emoji: string;
  topik: Topik;
  lines: KoDialogueLine[];
}
