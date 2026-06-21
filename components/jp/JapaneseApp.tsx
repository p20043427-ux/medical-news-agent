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
interface Session {
  category: string;
  mode: Mode;
}

export default function JapaneseApp() {
  const { progress, ready, markSkim, grade, setGoalDate, reset, exportJson, importJson } =
    useProgress();
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
      <div className="grid min-h-screen place-items-center text-slate-400">
        <div className="animate-pulse text-3xl">🌸</div>
      </div>
    );
  }

  // ───── 학습 세션 (스키밍 / 복습 / 퀴즈) ─────
  if (session) {
    const category = VOCAB_CATEGORIES.find((c) => c.key === session.category)!;
    const all = VOCAB.filter((w) => w.category === session.category);
    // 복습/퀴즈 풀: 아직 익히지 않은 단어 우선, 없으면 전체
    const learning = all.filter((w) => !isKnown(progress, w.id));
    const pool = learning.length > 0 ? learning : all;
    const go = (mode: Mode) => setSession({ category: session.category, mode });
    const exit = () => setSession(null);

    return (
      <main className="mx-auto min-h-screen max-w-md bg-[#f5f6f8]">
        {session.mode === "skim" && (
          <VocabStudy
            category={category}
            words={all}
            showFurigana={showFurigana}
            onToggleFurigana={toggleFurigana}
            onSkim={markSkim}
            onExit={exit}
            onReview={() => go("review")}
            onQuiz={() => go("quiz")}
          />
        )}
        {session.mode === "review" && (
          <ReviewMode
            category={category}
            words={pool}
            showFurigana={showFurigana}
            onGrade={grade}
            onExit={exit}
            onQuiz={() => go("quiz")}
          />
        )}
        {session.mode === "quiz" && (
          <QuizMode
            category={category}
            words={pool}
            onGrade={grade}
            onExit={exit}
            onReview={() => go("review")}
          />
        )}
        <BottomNav
          tab="home"
          onChange={(t) => {
            setSession(null);
            setTab(t);
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md bg-[#f5f6f8]">
      {tab === "home" && (
        <Home
          progress={progress}
          onStudyCategory={(key) => setSession({ category: key, mode: "skim" })}
          onGo={(t) => setTab(t)}
        />
      )}
      {tab === "conversation" && (
        <ConversationView showFurigana={showFurigana} onToggleFurigana={toggleFurigana} />
      )}
      {tab === "verbs" && <VerbView showFurigana={showFurigana} />}
      {tab === "stats" && (
        <Stats
          progress={progress}
          onSetGoal={setGoalDate}
          onReset={reset}
          onExport={exportJson}
          onImport={importJson}
        />
      )}

      <BottomNav tab={tab} onChange={setTab} />
    </main>
  );
}
