// 일본어 학습 앱 공용 타입

/** 후리가나가 달린 문장 토큰. r 이 있으면 ruby(후리가나)로 렌더링한다. */
export interface Token {
  /** 표시 텍스트 (한자 또는 가나) */
  t: string;
  /** 한자 위에 올라가는 후리가나(읽는 법). 없으면 가나/기호 그대로. */
  r?: string;
  /** 핵심어 강조 여부 (예문 속 표제어) */
  hl?: boolean;
}

/** 예문 한 문장 */
export interface Sentence {
  tokens: Token[];
  /** 한국어 번역 */
  ko: string;
}

/** 유사어 항목 */
export interface Synonym {
  word: string;
  reading: string;
  meaning: string;
  /** 품사 약어 (n / adj / v / adv ...) */
  pos: string;
}

/** 단어 카드 */
export interface Word {
  id: string;
  /** 표제어 (한자 포함 가능) */
  word: string;
  /** 읽는 법 (가나) */
  reading: string;
  /** 로마자 */
  romaji: string;
  /** 한국어 뜻 */
  meaning: string;
  /** 품사 (한국어) */
  pos: string;
  /** 카테고리 키 */
  category: string;
  /** 예문 */
  example: Sentence;
  /** JLPT 레벨 (예: N5). 미지정 시 N5 로 간주. */
  level?: string;
  /** 유사어 목록 */
  synonyms?: Synonym[];
  /** 학습 팁 (한국어) */
  tip?: string;
}

/** 동사 카드 */
export interface Verb {
  id: string;
  /** 사전형 (한자 포함 가능) */
  dict: string;
  /** 사전형 읽기 */
  reading: string;
  romaji: string;
  /** 한국어 뜻 */
  meaning: string;
  /** 동사 그룹: 1(5단/godan), 2(1단/ichidan), 3(불규칙) */
  group: 1 | 2 | 3;
  /** ます형 */
  masu: string;
  /** て형 */
  te: string;
  /** ない형 (부정) */
  nai: string;
  /** 예문 */
  example: Sentence;
}

/** 회화 대사 한 줄 */
export interface DialogueLine {
  /** 화자 (A/B 등) */
  speaker: string;
  tokens: Token[];
  ko: string;
  /** 표현 설명 (선택) */
  note?: string;
}

/** 회화 핵심 표현 */
export interface KeyPhrase {
  jp: string;
  reading: string;
  ko: string;
}

/** 회화 카테고리 */
export type ConversationCategory =
  | "greeting"
  | "food"
  | "shopping"
  | "transport"
  | "daily"
  | "medical"
  | "service";

/** 회화 시나리오 */
export interface Conversation {
  id: string;
  /** 제목 (한국어) */
  title: string;
  /** 상황 설명 (한국어) */
  situation: string;
  /** 이모지 아이콘 */
  emoji: string;
  lines: DialogueLine[];
  /** JLPT 레벨 (미지정 시 N5) */
  level?: "N5" | "N4";
  /** 카테고리 */
  category?: ConversationCategory;
  /** 오늘의 핵심 표현 */
  keyPhrases?: KeyPhrase[];
  /** 문화·매너 팁 (한국어) */
  cultureTip?: string;
}

export interface Category {
  key: string;
  label: string;
  labelJa?: string;
  emoji: string;
}
