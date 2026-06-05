export type SourceKey =
  | "WHO"
  | "CDC"
  | "NIH"
  | "PubMed"
  | "MedicalXpress"
  | "GoogleNewsHealth"
  | "ReutersHealth";

export interface SourceConfig {
  key: SourceKey;
  label: string;
  /** 'rss' = 여러 후보 URL 중 첫 성공 피드 사용, 'pubmed' = NCBI E-utilities */
  type: "rss" | "pubmed";
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
    limit: 15,
  },
  {
    key: "MedicalXpress",
    label: "Medical Xpress",
    type: "rss",
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
    urls: [
      "https://news.google.com/rss/search?q=health+site:reuters.com+when:14d&hl=en-US&gl=US&ceid=US:en",
    ],
    limit: 15,
  },
];

export const SOURCE_LABELS: Record<string, string> = Object.fromEntries(
  SOURCES.map((s) => [s.key, s.label])
);
