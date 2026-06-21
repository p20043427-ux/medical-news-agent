// 일본어 학습 앱 공용 타입

/** 후리가나가 달린 문장 토큰. r 이 있으면 ruby(후리가나)로 렌더링한다. */
export interface Token {
  /** 표시 텍스트 (한자 또는 가나) */
  t: string;
  /** 한자 위에 올라가는 후리가나(읽는 법). 없으면 가나/기호 그대로. */
  r?: string;
}

/** 예문 한 문장 */
export interface Sentence {
  tokens: Token[];
  /** 한국어 번역 */
  ko: string;
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
}

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
}

export interface Category {
  key: string;
  label: string;
  emoji: string;
}
