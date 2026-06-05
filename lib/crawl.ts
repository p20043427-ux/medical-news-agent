import { getServiceClient } from "./supabase";
import { SOURCES, type SourceConfig } from "./sources";
import { fetchFirstWorkingFeed, type FeedItem } from "./rss";
import { fetchPubMed } from "./pubmed";
import { summarizeArticle } from "./llm";

export interface CrawlResult {
  runId: string | null;
  inserted: number;
  summarized: number;
  sourcesOk: string[];
  sourcesFailed: string[];
  durationMs: number;
}

/** 한 번의 수집 사이클에서 LLM 요약할 최대 기사 수 (서버리스 시간 제한 고려) */
const MAX_SUMMARIES_PER_RUN = 40;

/** 요약 동시 처리 개수 (처리량 향상). OpenRouter 동시 요청 한도 내. */
const SUMMARY_CONCURRENCY = 4;

/**
 * 소프트 데드라인(ms). 이 시간을 넘으면 새 요약을 시작하지 않고 정상 종료한다.
 * Vercel 함수 maxDuration(60s)보다 충분히 앞에 두어 FUNCTION_INVOCATION_TIMEOUT 방지.
 * 남은 미요약 기사는 다음 실행/수동 수집에서 이어서 처리된다.
 */
const SOFT_DEADLINE_MS = 45_000;

async function collectItems(src: SourceConfig): Promise<FeedItem[]> {
  if (src.type === "pubmed") {
    return (await fetchPubMed(src.limit)).slice(0, src.limit);
  }
  const { items } = await fetchFirstWorkingFeed(src.urls ?? []);
  return items.slice(0, src.limit);
}

/**
 * 전체 수집 파이프라인:
 * 1) 7개 소스에서 기사 수집 → 신규 기사만 Supabase upsert
 * 2) 미요약(processed=false) 기사들을 openrouter/auto 로 한국어 요약
 */
export async function runCrawl(): Promise<CrawlResult> {
  const startedAt = Date.now();
  const supabase = getServiceClient();

  // 실행 로그 시작
  const { data: runRow } = await supabase
    .from("crawl_runs")
    .insert({ status: "running" })
    .select("id")
    .single();
  const runId: string | null = runRow?.id ?? null;

  const sourcesOk: string[] = [];
  const sourcesFailed: string[] = [];
  let inserted = 0;

  // --- 1) 소스별 수집 (독립 실행, 일부 실패해도 계속) ---
  for (const src of SOURCES) {
    try {
      const items = await collectItems(src);
      if (items.length === 0) {
        sourcesFailed.push(src.key);
        continue;
      }

      const rows = items
        .filter((it) => it.link && it.title)
        .map((it) => ({
          source: src.key,
          source_url: it.link,
          title: it.title.slice(0, 1000),
          original_summary: it.description,
          published_at: it.publishedAt,
          processed: false,
        }));

      // source_url unique 인덱스로 중복 무시. ignoreDuplicates=true 이면
      // 기존 행은 그대로 두고 신규만 삽입.
      const { data, error } = await supabase
        .from("articles")
        .upsert(rows, {
          onConflict: "source_url",
          ignoreDuplicates: true,
        })
        .select("id");

      if (error) throw error;
      inserted += data?.length ?? 0;
      sourcesOk.push(src.key);
    } catch (e) {
      console.error(`[crawl] ${src.key} 실패:`, e);
      sourcesFailed.push(src.key);
    }
  }

  // --- 2) 미요약 기사 LLM 요약 ---
  let summarized = 0;
  const { data: pending } = await supabase
    .from("articles")
    .select("id, source, title, original_summary, content")
    .eq("processed", false)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(MAX_SUMMARIES_PER_RUN);

  // 동시 처리 워커 풀: SUMMARY_CONCURRENCY 개 워커가 큐에서 기사를 꺼내 요약
  const queue = [...(pending ?? [])];
  async function worker() {
    while (queue.length > 0) {
      // 시간 예산 초과 시 정상 종료 (나머지는 다음 실행에서 처리)
      if (Date.now() - startedAt > SOFT_DEADLINE_MS) return;
      const row = queue.shift();
      if (!row) return;
      try {
        const summary = await summarizeArticle({
          title: row.title,
          body: row.content || row.original_summary,
          source: row.source,
        });
        await supabase
          .from("articles")
          .update({
            summary_ko: summary.summary_ko,
            diseases: summary.diseases,
            category: summary.category,
            llm_model: summary.model,
            processed: true,
          })
          .eq("id", row.id);
        summarized += 1;
      } catch (e) {
        console.error(`[crawl] 요약 실패 (id=${row.id}):`, e);
        // 요약 실패 기사는 processed=false 로 남겨 다음 실행에서 재시도
      }
    }
  }
  await Promise.all(
    Array.from({ length: SUMMARY_CONCURRENCY }, () => worker())
  );

  const durationMs = Date.now() - startedAt;

  // 실행 로그 마감
  if (runId) {
    await supabase
      .from("crawl_runs")
      .update({
        finished_at: new Date().toISOString(),
        status: sourcesOk.length > 0 ? "success" : "failed",
        sources_ok: sourcesOk,
        sources_failed: sourcesFailed,
        inserted_count: inserted,
        summarized_count: summarized,
      })
      .eq("id", runId);
  }

  return { runId, inserted, summarized, sourcesOk, sourcesFailed, durationMs };
}
