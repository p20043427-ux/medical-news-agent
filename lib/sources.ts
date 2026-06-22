export type SourceKey =
  | "WHO"
  | "CDC"
  | "NIH"
  | "PubMed"
  | "MedicalXpress"
  | "GoogleNewsHealth"
  | "ReutersHealth";

/**
 * 의료 정보 소스의 신뢰도 등급.
 * - official : 정부·국제 보건기구의 1차 공식 발표 (최고 신뢰)
 * - academic : 동료심사를 거친 학술 논문
 * - wire     : 검증 체계를 갖춘 국제 통신사 보도
 * - media    : 의학 전문 매체·뉴스 포털 등 2차 보도
 */
export type CredibilityTier = "official" | "academic" | "wire" | "media";

export interface TierMeta {
  tier: CredibilityTier;
  /** 등급 전체 이름 */
  label: string;
  /** 배지에 쓰는 짧은 이름 */
  short: string;
  /** 등급 설명 (툴팁/범례용) */
  description: string;
  /** 신뢰도 점수 1(낮음)~5(높음). 필터/정렬용 */
  score: number;
  /** 배지 Tailwind 클래스 */
  badgeClass: string;
}

/** 등급별 메타데이터 (점수 높은 순) */
export const TIERS: Record<CredibilityTier, TierMeta> = {
  official: {
    tier: "official",
    label: "공식 기관",
    short: "공식",
    description: "정부·국제 보건기구의 1차 공식 발표 (WHO·CDC·NIH)",
    score: 5,
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  academic: {
    tier: "academic",
    label: "동료심사 학술",
    short: "학술",
    description: "동료심사를 거친 학술 논문 (PubMed)",
    score: 5,
    badgeClass: "bg-violet-100 text-violet-700 border-violet-200",
  },
  wire: {
    tier: "wire",
    label: "통신사",
    short: "통신",
    description: "검증 체계를 갖춘 국제 통신사 보도 (Reuters)",
    score: 4,
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  media: {
    tier: "media",
    label: "전문 매체·포털",
    short: "매체",
    description: "의학 전문 매체·뉴스 포털 등 2차 보도",
    score: 3,
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export interface SourceConfig {
  key: SourceKey;
  label: string;
  /** 'rss' = 여러 후보 URL 중 첫 성공 피드 사용, 'pubmed' = NCBI E-utilities */
  type: "rss" | "pubmed";
  /** 소스 신뢰도 등급 */
  tier: CredibilityTier;
  /** RSS 후보 URL (앞에서부터 시도, 항목이 나오면 채택) */
  urls?: string[];
  /** 소스당 가져올 최대 항목 수 */
  limit: number;
}

/**
 * Reuters/NIH 등 공식 RSS가 불안정한 소스는 Google News RSS 검색을
 * 폴백으로 사용한다 (site: 연산자로 도메인 한정).
 */
export const SOURCES: SourceConfig[] = [
  {
    key: "WHO",
    label: "WHO (세계보건기구)",
    type: "rss",
    tier: "official",
    urls: [
      "https://www.who.int/feeds/entity/csr/don/en/rss.xml",
      "https://www.who.int/rss-feeds/news-english.xml",
      "https://news.google.com/rss/search?q=site:who.int+when:14d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
  {
    key: "CDC",
    label: "CDC (미 질병통제예방센터)",
    type: "rss",
    tier: "official",
    urls: [
      "https://tools.cdc.gov/api/v2/resources/media/132608.rss",
      "https://tools.cdc.gov/api/v2/resources/media/403372.rss",
      "https://news.google.com/rss/search?q=site:cdc.gov+when:14d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
  {
    key: "NIH",
    label: "NIH (미 국립보건원)",
    type: "rss",
    tier: "official",
    urls: [
      "https://www.nih.gov/news-events/news-releases/feed.xml",
      "https://news.google.com/rss/search?q=site:nih.gov+when:14d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
  {
    key: "PubMed",
    label: "PubMed (최신 논문)",
    type: "pubmed",
    tier: "academic",
    limit: 15,
  },
  {
    key: "MedicalXpress",
    label: "Medical Xpress",
    type: "rss",
    tier: "media",
    urls: [
      "https://medicalxpress.com/rss-feed/",
      "https://medicalxpress.com/rss-feed/breaking/",
    ],
    limit: 15,
  },
  {
    key: "GoogleNewsHealth",
    label: "Google News — Health",
    type: "rss",
    tier: "media",
    urls: [
      "https://news.google.com/rss/headlines/section/topic/HEALTH?hl=en-US&gl=US&ceid=US:en",
      "https://news.google.com/rss/search?q=health+OR+disease+when:7d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
  {
    key: "ReutersHealth",
    label: "Reuters Health",
    type: "rss",
    tier: "wire",
    urls: [
      "https://news.google.com/rss/search?q=health+site:reuters.com+when:14d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
];

export const SOURCE_LABELS: Record<string, string> = Object.fromEntries(
  SOURCES.map((s) => [s.key, s.label])
);

/** 소스 키 → 신뢰도 등급 */
export const SOURCE_TIERS: Record<string, CredibilityTier> = Object.fromEntries(
  SOURCES.map((s) => [s.key, s.tier])
);

/** 소스 키로 등급 메타데이터 조회. 알 수 없는 소스는 null. */
export function getSourceTier(sourceKey: string): TierMeta | null {
  const tier = SOURCE_TIERS[sourceKey];
  return tier ? TIERS[tier] : null;
}

/** 등급 표시 순서 (점수 높은 순). 범례·필터 정렬용 */
export const TIER_ORDER: CredibilityTier[] = (
  Object.values(TIERS) as TierMeta[]
)
  .slice()
  .sort((a, b) => b.score - a.score)
  .map((t) => t.tier);
