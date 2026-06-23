"use client";

import { useEffect, useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { useProgress, isKnown, knownCount, daysUntilGoal } from "@/lib/jp/progress";
import AccountButton from "@/components/auth/AccountButton";
import Home from "./Home";
import VocabStudy from "./VocabStudy";
import ReviewMode from "./ReviewMode";
import QuizMode from "./QuizMode";
import ConversationView from "./ConversationView";
import VerbView from "./VerbView";
import Stats from "./Stats";
import BottomNav, { type Tab } from "./BottomNav";
import KanaView from "./KanaView";
import MockExam from "./MockExam";
import PhrasebookView from "./PhrasebookView";
import RoleplayView from "./RoleplayView";
import LearnHub, { type LearnView } from "./LearnHub";
import LibraryView from "./LibraryView";
import { useReminderScheduler } from "@/lib/reminder";

const FURIGANA_KEY = "jp-app-furigana";

type Mode = "skim" | "review" | "quiz";
interface Session { category: string; mode: Mode; wordIds?: string[] }

export default function JapaneseApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, markNew, grade, setGoalDate, setDailyGoal, reset, exportJson, importJson, toggleBookmark, addMistakes } = useProgress();
  useReminderScheduler();
  const [tab, setTab] = useState<Tab>("home");
  const [session, setSession] = useState<Session | null>(null);
  const [learnView, setLearnView] = useState<LearnView | null>(null);
  const [showFurigana, setShowFurigana] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(FURIGANA_KEY);
    if (saved !== null) setShowFurigana(saved === "1");
  }, []);

  const toggleFurigana = () =>
    setShowFurigana((s) => {
      const next = !s;
      window.localStorage.setItem(FURIGANA_KEY, next ? "1" : "0");
      return next;
    });

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200" style={{ borderTopColor: "#E63946" }} />
          <p className="text-sm" style={{ color: "var(--text-3)" }}>불러오는 중…</p>
        </div>
      </div>
    );
  }

  if (session) {
    const SPECIAL: Record<string, { key: string; label: string; emoji: string }> = {
      _wordbook: { key: "_wordbook", label: "단어장", emoji: "📚" },
      _mistakes: { key: "_mistakes", label: "오답노트", emoji: "🎯" },
    };
    const category = SPECIAL[session.category]
      ?? VOCAB_CATEGORIES.find((c) => c.key === session.category)!;
    const all = session.wordIds
      ? VOCAB.filter((w) => session.wordIds!.includes(w.id))
      : VOCAB.filter((w) => w.category === session.category);
    const learning = all.filter((w) => !isKnown(progress, w.id));
    const pool = learning.length > 0 ? learning : all;
    const go = (mode: Mode) => setSession({ ...session, mode });
    const exit = () => setSession(null);

    return (
      <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
        {session.mode === "skim" && (
          <VocabStudy
            category={category} words={all} showFurigana={showFurigana}
            onToggleFurigana={toggleFurigana} onSkim={markNew} onExit={exit}
            onReview={() => go("review")} onQuiz={() => go("quiz")}
            bookmarks={progress.bookmarks} onToggleBookmark={toggleBookmark}
          />
        )}
        {session.mode === "review" && (
          <ReviewMode
            category={category} words={pool} showFurigana={showFurigana}
            onGrade={grade} onExit={exit} onQuiz={() => go("quiz")}
          />
        )}
        {session.mode === "quiz" && (
          <QuizMode category={category} words={pool} onGrade={grade} onExit={exit} onReview={() => go("review")} />
        )}
        <BottomNav tab="home" onChange={(t) => { setSession(null); setTab(t); }} accentColor="#E63946" />
      </div>
    );
  }

  const totalWords = VOCAB.length;
  const knownPct = totalWords ? Math.round((knownCount(progress) / totalWords) * 100) : 0;
  const dday = daysUntilGoal(progress);
  const WD = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const studied = (d: Date) => (progress.daily[d.toISOString().slice(0, 10)] ?? 0) > 0;
  const r = 7, circ = 2 * Math.PI * r;

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      {/* 헤더 — 레벨 · 진도칩 · 아바타 · 주간 스트립 */}
      <header className="sticky top-0 z-30" style={{ background: "var(--bg)", paddingTop: "env(safe-area-inset-top)" }}>
        <div className="flex items-center gap-2 px-4 pb-2 pt-3">
          {onBack && (
            <button onClick={onBack} aria-label="뒤로" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}
          <button className="flex items-center gap-1 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
            JLPT
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-3)" }}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ border: "1px solid var(--border)" }}>
              <svg viewBox="0 0 18 18" className="h-4 w-4 -rotate-90">
                <circle cx="9" cy="9" r={r} fill="none" stroke="var(--surface)" strokeWidth="2.5" />
                <circle cx="9" cy="9" r={r} fill="none" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={circ} strokeDashoffset={circ - (knownPct / 100) * circ} />
              </svg>
              <span className="text-xs font-bold" style={{ color: "var(--text-2)" }}>{knownPct}%</span>
              {dday !== null && (
                <span className="text-xs font-extrabold" style={{ color: "var(--text-1)" }}>
                  {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY" : `D+${-dday}`}
                </span>
              )}
            </div>
            <AccountButton />
          </div>
        </div>

        {/* 주간 스트립 */}
        <div className="px-4 pb-2">
          <div className="grid grid-cols-7 text-center text-[11px]" style={{ color: "var(--text-3)" }}>
            {WD.map((w) => <span key={w}>{w}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 text-center">
            {week.map((d, i) => {
              const isToday = d.toDateString() === now.toDateString();
              const did = studied(d);
              return (
                <div key={i} className="flex flex-col items-center gap-1 py-0.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full text-sm"
                    style={{
                      background: isToday ? "#E63946" : "transparent",
                      color: isToday ? "#fff" : did ? "var(--text-1)" : "var(--text-3)",
                      fontWeight: isToday ? 800 : did ? 700 : 500,
                    }}>
                    {d.getDate()}
                  </span>
                  <span className="h-1 w-1 rounded-full" style={{ background: did && !isToday ? "#10B981" : "transparent" }} />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ height: 1, background: "var(--border)" }} />
      </header>

      {tab === "home" && (
        <Home progress={progress} onStudyCategory={(key) => setSession({ category: key, mode: "skim" })} />
      )}

      {tab === "learn" && (
        learnView ? (
          <div>
            <div className="px-4 pt-3">
              <button
                onClick={() => setLearnView(null)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{ background: "var(--surface)", color: "var(--text-2)" }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                학습 메뉴
              </button>
            </div>
            {learnView === "conversation" && <ConversationView showFurigana={showFurigana} onToggleFurigana={toggleFurigana} />}
            {learnView === "verbs" && <VerbView showFurigana={showFurigana} />}
            {learnView === "kana" && <KanaView />}
            {learnView === "phrasebook" && <PhrasebookView />}
            {learnView === "roleplay" && <RoleplayView />}
            {learnView === "exam" && <MockExam onExit={() => setLearnView(null)} onMistake={addMistakes} />}
          </div>
        ) : (
          <LearnHub onOpen={setLearnView} />
        )
      )}

      {tab === "library" && (
        <LibraryView
          bookmarks={progress.bookmarks}
          mistakes={progress.mistakes ?? []}
          showFurigana={showFurigana}
          onToggleBookmark={toggleBookmark}
          onStudyWordbook={(ids) => setSession({ category: "_wordbook", mode: "review", wordIds: ids })}
          onReviewMistakes={(ids) => setSession({ category: "_mistakes", mode: "review", wordIds: ids })}
          onQuizMistakes={(ids) => setSession({ category: "_mistakes", mode: "quiz", wordIds: ids })}
        />
      )}

      {tab === "stats" && (
        <Stats progress={progress} onSetGoal={setGoalDate} onSetDailyGoal={setDailyGoal} onReset={reset} onExport={exportJson} onImport={importJson} />
      )}

      <BottomNav tab={tab} onChange={(t) => { setLearnView(null); setTab(t); }} accentColor="#E63946" />
    </div>
  );
}
