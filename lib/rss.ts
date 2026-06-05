import { XMLParser } from "fast-xml-parser";

export interface FeedItem {
  title: string;
  link: string;
  description: string | null;
  publishedAt: string | null;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const UA =
  "Mozilla/5.0 (compatible; MedicalNewsAgent/1.0; +https://github.com/) Safari/537.36";

function stripHtml(s: string | null | undefined): string | null {
  if (!s) return null;
  const text = String(s)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text.length ? text : null;
}

function asText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("#text" in o) return String(o["#text"]);
  }
  return "";
}

function pickLink(item: Record<string, unknown>): string {
  // RSS: <link>url</link>
  if (typeof item.link === "string") return item.link;
  // Atom: <link href="..." rel="alternate"/> (배열일 수 있음)
  const link = item.link as unknown;
  if (Array.isArray(link)) {
    const alt =
      link.find(
        (l) => (l as Record<string, unknown>)["@_rel"] === "alternate"
      ) ?? link[0];
    return String((alt as Record<string, unknown>)?.["@_href"] ?? "");
  }
  if (link && typeof link === "object") {
    return String((link as Record<string, unknown>)["@_href"] ?? "");
  }
  if (typeof item.guid === "string") return item.guid;
  return asText(item.guid);
}

function normalizeDate(v: unknown): string | null {
  const raw = asText(v) || (typeof v === "string" ? v : "");
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

/** RSS 2.0 또는 Atom 피드 XML을 통일된 FeedItem[]로 파싱 */
export function parseFeed(xml: string): FeedItem[] {
  const doc = parser.parse(xml) as Record<string, any>;

  // RSS 2.0
  const rssItems = doc?.rss?.channel?.item;
  if (rssItems) {
    const arr = Array.isArray(rssItems) ? rssItems : [rssItems];
    return arr
      .map((it: Record<string, unknown>) => ({
        title: stripHtml(asText(it.title)) ?? "",
        link: pickLink(it),
        description: stripHtml(
          asText(it.description) || asText((it as any)["content:encoded"])
        ),
        publishedAt: normalizeDate(it.pubDate ?? (it as any)["dc:date"]),
      }))
      .filter((i) => i.title && i.link);
  }

  // Atom
  const atomEntries = doc?.feed?.entry;
  if (atomEntries) {
    const arr = Array.isArray(atomEntries) ? atomEntries : [atomEntries];
    return arr
      .map((it: Record<string, unknown>) => ({
        title: stripHtml(asText(it.title)) ?? "",
        link: pickLink(it),
        description: stripHtml(asText(it.summary) || asText(it.content)),
        publishedAt: normalizeDate(it.updated ?? it.published),
      }))
      .filter((i) => i.title && i.link);
  }

  return [];
}

/** URL에서 피드를 받아 파싱. 실패 시 throw. */
export async function fetchFeed(url: string): Promise<FeedItem[]> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml, */*" },
    // 캐시 무시 (항상 최신)
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const xml = await res.text();
  return parseFeed(xml);
}

/** 후보 URL을 순서대로 시도, 항목이 나오는 첫 피드를 반환 */
export async function fetchFirstWorkingFeed(
  urls: string[]
): Promise<{ items: FeedItem[]; usedUrl: string }> {
  let lastErr: unknown = null;
  for (const url of urls) {
    try {
      const items = await fetchFeed(url);
      if (items.length > 0) return { items, usedUrl: url };
    } catch (e) {
      lastErr = e;
    }
  }
  if (lastErr) throw lastErr;
  return { items: [], usedUrl: urls[0] ?? "" };
}
