"use client";

import { useEffect, useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { useProgress, isKnown, knownCount, daysUntilGoal, dueIds } from "@/lib/jp/progress";
import AccountButton from "@/components/auth/AccountButton";
import Home from "./Home";
import VocabStudy from "./VocabStudy";
import ReviewMode from "./ReviewMode";
import QuizMode from "./QuizMode";
import ConversationView from "./ConversationView";
import VerbView from "./VerbView";
import Stats from "./Stats";
import { AppShell, AppHeader, ProgressChip, WeekStrip, BottomNav, type NavTab } from "@/components/shell";
import KanaView from "./KanaView";
import MockExam from "./MockExam";
import PhrasebookView from "./PhrasebookView";
import RoleplayView from "./RoleplayView";
import GrammarView from "./GrammarView";
import DictationView from "./DictationView";
import LearnHub, { type LearnView } from "./LearnHub";
import LibraryView from "./LibraryView";
import { useReminderScheduler } from "@/lib/reminder";
import { AppSkeleton } from "@/components/ui";
import { useUiLang, tt } from "@/lib/i18n";

const FURIGANA_KEY = "jp-app-furigana";
const JP_ACCENT = "#E63946";

type Tab = "home" | "learn" | "library" | "stats";
const JP_TABS: NavTab<Tab>[] = [
  { key: "home", ko: "홈", ja: "ホーム", icon: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /> },
  { key: "learn", ko: "학습", ja: "学習", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></> },
  { key: "library", ko: "단어장", ja: "単語帳", icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> },
  { key: "stats", ko: "분석", ja: "分析", icon: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" /> },
];

type Mode = "skim" | "review" | "quiz";
interface Session { category: string; mode: Mode; wordIds?: string[] }

export default function JapaneseApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, markNew, grade, setGoalDate, setDailyGoal, reset, exportJson, importJson, toggleBookmark, addMistakes } = useProgress();
  useReminderScheduler();
  const lang = useUiLang();
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

  if (!ready) return <AppSkeleton />;

  if (session) {
    const SPECIAL: Record<string, { key: string; label: string; labelJa: string; emoji: string }> = {
      _wordbook: { key: "_wordbook", label: "단어장", labelJa: "単語帳", emoji: "📚" },
      _mistakes: { key: "_mistakes", label: "오답노트", labelJa: "間違いノート", emoji: "🎯" },
      _due: { key: "_due", label: "오늘 복습", labelJa: "今日の復習", emoji: "🔁" },
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
      <AppShell>
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
        <BottomNav tab="home" tabs={JP_TABS} onChange={(t) => { setSession(null); setTab(t); }} accent={JP_ACCENT} />
      </AppShell>
    );
  }

  const totalWords = VOCAB.length;
  const knownPct = totalWords ? Math.round((knownCount(progress) / totalWords) * 100) : 0;
  const dday = daysUntilGoal(progress);
  const studied = (d: Date) => (progress.daily[d.toISOString().slice(0, 10)] ?? 0) > 0;

  const title = (
    <button className="flex items-center gap-1 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
      JLPT
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-3)" }}><path d="m6 9 6 6 6-6" /></svg>
    </button>
  );

  return (
    <AppShell>
      <AppHeader
        onBack={onBack}
        title={title}
        right={<><ProgressChip pct={knownPct} dday={dday} accent={JP_ACCENT} /><AccountButton /></>}
        below={<WeekStrip accent={JP_ACCENT} studied={studied} />}
      />

      {tab === "home" && (
        <Home
          progress={progress}
          onStudyCategory={(key) => setSession({ category: key, mode: "skim" })}
          onReviewDue={() => setSession({ category: "_due", mode: "review", wordIds: dueIds(progress) })}
        />
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
                {tt(lang, "학습 메뉴", "学習メニュー")}
              </button>
            </div>
            {learnView === "conversation" && <ConversationView showFurigana={showFurigana} onToggleFurigana={toggleFurigana} />}
            {learnView === "verbs" && <VerbView showFurigana={showFurigana} />}
            {learnView === "kana" && <KanaView />}
            {learnView === "phrasebook" && <PhrasebookView />}
            {learnView === "roleplay" && <RoleplayView />}
            {learnView === "grammar" && <GrammarView />}
            {learnView === "dictation" && <DictationView onExit={() => setLearnView(null)} />}
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

      <BottomNav tab={tab} tabs={JP_TABS} onChange={(t) => { setLearnView(null); setTab(t); }} accent={JP_ACCENT} />
    </AppShell>
  );
}
