import { XMLParser } from "fast-xml-parser";
import type { FeedItem } from "./rss";

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

// 최근 질병/발병/감염병 관련 논문을 폭넓게 검색
const SEARCH_TERM =
  '("disease outbreak"[Title/Abstract] OR "emerging infectious"[Title/Abstract] OR epidemic[Title/Abstract] OR pandemic[Title/Abstract] OR "public health"[Title/Abstract])';

function textOf(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map(textOf).join(" ");
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("#text" in o) return String(o["#text"]);
    return Object.values(o).map(textOf).join(" ");
  }
  return "";
}

/** PubMed 최근 논문을 FeedItem 형태로 반환 */
export async function fetchPubMed(limit: number): Promise<FeedItem[]> {
  // 1) esearch: 최근 게재일순 PMID 목록
  const searchUrl =
    `${EUTILS}/esearch.fcgi?db=pubmed&retmode=json&sort=date&retmax=${limit}` +
    `&datetype=pdat&reldate=14&term=${encodeURIComponent(SEARCH_TERM)}`;
  const searchRes = await fetch(searchUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!searchRes.ok) throw new Error(`PubMed esearch HTTP ${searchRes.status}`);
  const searchJson = (await searchRes.json()) as {
    esearchresult?: { idlist?: string[] };
  };
  const ids = searchJson.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  // 2) efetch: 초록 포함 상세
  const fetchUrl = `${EUTILS}/efetch.fcgi?db=pubmed&retmode=xml&id=${ids.join(",")}`;
  const fetchRes = await fetch(fetchUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!fetchRes.ok) throw new Error(`PubMed efetch HTTP ${fetchRes.status}`);
  const xml = await fetchRes.text();
  const doc = parser.parse(xml) as Record<string, any>;

  const articles = doc?.PubmedArticleSet?.PubmedArticle;
  if (!articles) return [];
  const arr = Array.isArray(articles) ? articles : [articles];

  return arr
    .map((a: Record<string, any>): FeedItem | null => {
      const cit = a?.MedlineCitation;
      const pmid = textOf(cit?.PMID);
      const art = cit?.Article;
      if (!pmid || !art) return null;
      const title = textOf(art.ArticleTitle).trim();
      const abstract = textOf(art?.Abstract?.AbstractText).trim();

      // 게재일 추출
      const pd = art?.Journal?.JournalIssue?.PubDate;
      let publishedAt: string | null = null;
      if (pd) {
        const y = textOf(pd.Year);
        const m = textOf(pd.Month) || "Jan";
        const d = textOf(pd.Day) || "1";
        const parsed = new Date(`${m} ${d}, ${y}`);
        if (!isNaN(parsed.getTime())) publishedAt = parsed.toISOString();
      }

      return {
        title,
        link: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        description: abstract || null,
        publishedAt,
      };
    })
    .filter((x): x is FeedItem => x !== null && !!x.title);
}
