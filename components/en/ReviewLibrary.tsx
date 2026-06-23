"use client";

import { useMemo, useState } from "react";
import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import type { EnCategory } from "@/lib/en/types";
import { type EnGrade, type EnProgress, dueIds } from "@/lib/en/progress";
import { speakEn } from "@/lib/en/speech";
import EnReviewMode from "./ReviewMode";
import EnQuizMode from "./QuizMode";

const ALL_CAT: EnCategory = { key: "all", label: "전체 복습", emoji: "🔁", cefrRange: "A1-C1" };
const WEAK_CAT: EnCategory = { key: "weak", label: "오답 단어", emoji: "🩹", cefrRange: "A1-C1" };

type View = "hub" | "all" | "allQuiz" | "weak" | "weakQuiz" | "search";

export default function EnReviewLibrary({
  progress, onGrade, onExit,
}: {
  progress: EnProgress;
  onGrade: (id: string, g: EnGrade) => void;
  onExit: () => void;
}) {
  const [view, setView] = useState<View>("hub");

  const weak = EN_VOCAB.filter((w) => (progress.cards[w.id]?.lapses ?? 0) > 0)
    .sort((a, b) => (progress.cards[b.id]?.lapses ?? 0) - (progress.cards[a.id]?.lapses ?? 0));
  const dueCount = dueIds(progress).length;

  if (view === "all")
    return <EnReviewMode category={ALL_CAT} words={EN_VOCAB} onGrade={onGrade} onExit={() => setView("hub")} onQuiz={() => setView("allQuiz")} progress={progress} />;
  if (view === "allQuiz")
    return <EnQuizMode words={EN_VOCAB} onGrade={onGrade} onExit={() => setView("hub")} onReview={() => setView("all")} />;
  if (view === "weak")
    return <EnReviewMode category={WEAK_CAT} words={weak} onGrade={onGrade} onExit={() => setView("hub")} onQuiz={() => setView("weakQuiz")} progress={progress} />;
  if (view === "weakQuiz")
    return <EnQuizMode words={weak} onGrade={onGrade} onExit={() => setView("hub")} onReview={() => setView("weak")} />;
  if (view === "search")
    return <EnWordSearch onExit={() => setView("hub")} />;

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>복습</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>복습 예정과 오답 단어를 모아 봤어요.</p>

      {/* 오늘의 복습 */}
      <button onClick={() => setView("all")}
        className="mb-3 flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
          style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)", boxShadow: "0 4px 12px rgba(67,97,238,.35)" }}>🔁</div>
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ color: "var(--text-1)" }}>오늘의 복습</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{dueCount > 0 ? `복습할 단어 ${dueCount}개` : "예정된 복습이 없어요 · 전체 복습 가능"}</p>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* 오답 단어 */}
      <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
            style={{ background: "linear-gradient(135deg,#EF4444,#F97316)", boxShadow: "0 4px 12px rgba(239,68,68,.3)" }}>🩹</div>
          <div className="min-w-0 flex-1">
            <p className="font-bold" style={{ color: "var(--text-1)" }}>오답 단어</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>{weak.length > 0 ? `자주 틀린 단어 ${weak.length}개` : "아직 틀린 단어가 없어요"}</p>
          </div>
        </div>

        {weak.length > 0 && (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {weak.slice(0, 12).map((w) => (
                <button key={w.id} onClick={() => speakEn(w.word)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "var(--surface)", color: "var(--text-1)" }}>
                  <span>{w.word}</span>
                  <span className="text-[10px]" style={{ color: "var(--text-3)" }}>{w.meaning}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => setView("weak")}
                className="rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>오답 복습</button>
              <button onClick={() => setView("weakQuiz")}
                className="rounded-xl py-2.5 text-sm font-bold"
                style={{ background: "var(--surface)", color: "var(--text-1)" }}>오답 퀴즈</button>
            </div>
          </>
        )}
      </div>

      {/* 단어 찾기 */}
      <button onClick={() => setView("search")}
        className="mt-3 flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
          style={{ background: "linear-gradient(135deg,#00b894,#00cec9)", boxShadow: "0 4px 12px rgba(0,184,148,.3)" }}>🔍</div>
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ color: "var(--text-1)" }}>단어 찾기</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{EN_VOCAB.length}개 어휘를 검색해 발음·뜻 확인</p>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      <button onClick={onExit} className="mt-5 w-full rounded-2xl py-3 text-sm font-semibold"
        style={{ background: "var(--surface)", color: "var(--text-2)" }}>홈으로</button>
    </div>
  );
}

function EnWordSearch({ onExit }: { onExit: () => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const q = query.trim().toLowerCase();

  const results = useMemo(() => EN_VOCAB.filter((w) =>
    (cat === null || w.category === cat) &&
    (q === "" || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q) || w.pronunciation.toLowerCase().includes(q)),
  ), [q, cat]);

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <button onClick={onExit} className="mb-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          복습 메뉴
        </button>
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="word·뜻·발음 검색"
            className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--text-1)" }} />
          {query && <button onClick={() => setQuery("")} className="text-sm" style={{ color: "var(--text-3)" }}>✕</button>}
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button onClick={() => setCat(null)} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold"
            style={cat === null ? { background: "#4361EE", color: "#fff" } : { background: "var(--surface)", color: "var(--text-2)" }}>전체</button>
          {EN_CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCat(cat === c.key ? null : c.key)}
              className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold"
              style={cat === c.key ? { background: "#4361EE", color: "#fff" } : { background: "var(--surface)", color: "var(--text-2)" }}>
              <span>{c.emoji}</span><span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="px-6 py-16 text-center text-sm" style={{ color: "var(--text-3)" }}>🔍 검색 결과가 없어요.</p>
      ) : (
        <ul className="mt-2">
          {results.map((w) => (
            <li key={w.id}>
              <button onClick={() => speakEn(w.word)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:opacity-60" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-bold" style={{ color: "var(--text-1)" }}>{w.word} <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>{w.cefrLevel}</span></p>
                  <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{w.pronunciation}　{w.meaning}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg" style={{ background: "#4361EE18", color: "#4361EE" }}>🔊</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
