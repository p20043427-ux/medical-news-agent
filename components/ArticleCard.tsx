import type { Article } from "@/lib/supabase";
import { SOURCE_LABELS } from "@/lib/sources";

const CATEGORY_STYLE: Record<string, string> = {
  "감염병/발병": "bg-red-100 text-red-700",
  연구: "bg-indigo-100 text-indigo-700",
  "정책/지침": "bg-amber-100 text-amber-700",
  "의약품/백신": "bg-emerald-100 text-emerald-700",
  공중보건: "bg-sky-100 text-sky-700",
  기타: "bg-slate-100 text-slate-600",
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  const catStyle = CATEGORY_STYLE[article.category ?? "기타"] ?? CATEGORY_STYLE["기타"];

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded bg-slate-800 px-2 py-0.5 font-medium text-white">
          {SOURCE_LABELS[article.source] ?? article.source}
        </span>
        {article.category && (
          <span className={`rounded px-2 py-0.5 font-medium ${catStyle}`}>
            {article.category}
          </span>
        )}
        {article.published_at && (
          <span className="text-slate-400">{formatDate(article.published_at)}</span>
        )}
      </div>

      <h2 className="mb-2 text-base font-semibold leading-snug text-slate-900">
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline"
        >
          {article.title}
        </a>
      </h2>

      <p className="mb-3 flex-1 text-sm leading-relaxed text-slate-600">
        {article.summary_ko ? (
          article.summary_ko
        ) : (
          <span className="italic text-slate-400">요약 대기 중…</span>
        )}
      </p>

      {article.diseases && article.diseases.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {article.diseases.map((d) => (
            <span
              key={d}
              className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-600"
            >
              #{d}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
