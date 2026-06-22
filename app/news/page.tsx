import Link from "next/link";
import { getPublicClient, type Article } from "@/lib/supabase";
import { SOURCES, TIERS, TIER_ORDER, getSourceTier } from "@/lib/sources";
import { CATEGORIES } from "@/lib/llm";
import ArticleCard from "@/components/ArticleCard";
import CrawlButton from "@/components/CrawlButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchParams {
  source?: string;
  category?: string;
}

function buildQuery(base: SearchParams, patch: Partial<SearchParams>): string {
  const next = { ...base, ...patch };
  const params = new URLSearchParams();
  if (next.source) params.set("source", next.source);
  if (next.category) params.set("category", next.category);
  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const supabase = getPublicClient();

  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(120);

  if (sp.source) query = query.eq("source", sp.source);
  if (sp.category) query = query.eq("category", sp.category);

  const { data, error } = await query;
  const articles = (data ?? []) as Article[];

  // 최근 수집 시각
  const { data: lastRun } = await supabase
    .from("crawl_runs")
    .select("finished_at, inserted_count, summarized_count")
    .eq("status", "success")
    .order("finished_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // 전체 통계
  const { count: total } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  const lastRunText = lastRun?.finished_at
    ? new Date(lastRun.finished_at).toLocaleString("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "아직 없음";

  const chip =
    "rounded-full px-3 py-1 text-sm font-medium transition border";
  const chipOn = "bg-blue-600 text-white border-blue-600";
  const chipOff =
    "bg-white text-slate-600 border-slate-200 hover:border-blue-400";

  // 신뢰도 높은 순으로 소스 정렬 (동점은 기존 순서 유지)
  const sortedSources = [...SOURCES].sort(
    (a, b) => TIERS[b.tier].score - TIERS[a.tier].score
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* 헤더 */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          🩺 의료 뉴스 Agent
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          WHO · CDC · NIH · PubMed · Medical Xpress · Google News · Reuters 의 최신
          질병 정보를 자동 수집하고 <code className="text-slate-700">openrouter/auto</code> 로
          한국어 요약합니다.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <span>
            총 <strong className="text-slate-800">{total ?? 0}</strong>건 수집
          </span>
          <span>
            마지막 수집: <strong className="text-slate-800">{lastRunText}</strong>
          </span>
          <CrawlButton />
        </div>
      </header>

      {/* 신뢰도 등급 범례 */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs">
        <span className="font-semibold text-slate-700">소스 신뢰도</span>
        {TIER_ORDER.map((t) => {
          const m = TIERS[t];
          return (
            <span key={t} className="flex items-center gap-1.5 text-slate-500">
              <span className={`rounded border px-1.5 py-0.5 font-medium ${m.badgeClass}`}>
                {m.short}
              </span>
              <span title={m.description}>{m.label}</span>
            </span>
          );
        })}
      </div>

      {/* 필터: 소스 (신뢰도 높은 순) */}
      <div className="mb-3 flex flex-wrap gap-2">
        <Link href={buildQuery(sp, { source: undefined })} className={`${chip} ${!sp.source ? chipOn : chipOff}`}>
          전체 소스
        </Link>
        {sortedSources.map((s) => {
          const tier = getSourceTier(s.key);
          const active = sp.source === s.key;
          return (
            <Link
              key={s.key}
              href={buildQuery(sp, { source: active ? undefined : s.key })}
              className={`${chip} flex items-center gap-1.5 ${active ? chipOn : chipOff}`}
            >
              {tier && (
                <span
                  className={`inline-block h-2 w-2 rounded-full ${tier.badgeClass}`}
                  aria-hidden
                />
              )}
              {s.label}
            </Link>
          );
        })}
      </div>

      {/* 필터: 카테고리 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link href={buildQuery(sp, { category: undefined })} className={`${chip} ${!sp.category ? chipOn : chipOff}`}>
          전체 분류
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={buildQuery(sp, { category: sp.category === c ? undefined : c })}
            className={`${chip} ${sp.category === c ? chipOn : chipOff}`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* 목록 */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          데이터를 불러오지 못했습니다: {error.message}
        </div>
      )}

      {!error && articles.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          아직 수집된 기사가 없습니다. 위의 <strong>지금 수집</strong> 버튼을 눌러
          첫 수집을 실행하세요.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
        자동 수집·요약 의료 뉴스 Agent · 데이터: Supabase · 요약: OpenRouter
        (openrouter/auto) · 배포: Vercel
      </footer>
    </main>
  );
}
