"use client";

import { useEffect, useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { useProgress, isKnown } from "@/lib/jp/progress";
import Home from "./Home";
import VocabStudy from "./VocabStudy";
import ReviewMode from "./ReviewMode";
import QuizMode from "./QuizMode";
import ConversationView from "./ConversationView";
import VerbView from "./VerbView";
import Stats from "./Stats";
import BottomNav, { type Tab } from "./BottomNav";

const FURIGANA_KEY = "jp-app-furigana";

type Mode = "skim" | "review" | "quiz";
interface Session { category: string; mode: Mode }

export default function JapaneseApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, markNew, grade, setGoalDate, reset, exportJson, importJson } = useProgress();
  const [tab, setTab] = useState<Tab>("home");
  const [session, setSession] = useState<Session | null>(null);
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
    const category = VOCAB_CATEGORIES.find((c) => c.key === session.category)!;
    const all = VOCAB.filter((w) => w.category === session.category);
    const learning = all.filter((w) => !isKnown(progress, w.id));
    const pool = learning.length > 0 ? learning : all;
    const go = (mode: Mode) => setSession({ category: session.category, mode });
    const exit = () => setSession(null);

    return (
      <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
        {session.mode === "skim" && (
          <VocabStudy
            category={category} words={all} showFurigana={showFurigana}
            onToggleFurigana={toggleFurigana} onSkim={markNew} onExit={exit}
            onReview={() => go("review")} onQuiz={() => go("quiz")}
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

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      {/* 헤더 — XP 바 + 뒤로가기 */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2" style={{ background: "var(--bg)" }}>
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              ←
            </button>
          )}
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: "#E63946" }}>
                🇯🇵 일본어
              </span>
              <span className="text-xs font-semibold" style={{ color: "var(--xp)" }}>
                ⚡ {progress.xp.toLocaleString()} XP
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill xp-bar-fill"
                style={{ width: `${Math.min((progress.xp % 1000) / 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {tab === "home" && (
        <Home progress={progress} onStudyCategory={(key) => setSession({ category: key, mode: "skim" })} onGo={(t) => setTab(t)} />
      )}
      {tab === "conversation" && (
        <ConversationView showFurigana={showFurigana} onToggleFurigana={toggleFurigana} />
      )}
      {tab === "verbs" && <VerbView showFurigana={showFurigana} />}
      {tab === "stats" && (
        <Stats progress={progress} onSetGoal={setGoalDate} onReset={reset} onExport={exportJson} onImport={importJson} />
      )}

      <BottomNav tab={tab} onChange={setTab} accentColor="#E63946" />
    </div>
  );
}
