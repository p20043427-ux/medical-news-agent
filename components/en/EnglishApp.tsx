"use client";

import { useState } from "react";
import { useEnProgress } from "@/lib/en/progress";
import EnHome from "./Home";
import EnVocabStudy from "./VocabStudy";
import EnReviewMode from "./ReviewMode";
import EnQuizMode from "./QuizMode";
import EnGrammarView from "./GrammarView";
import EnStats from "./Stats";
import EnBottomNav, { type EnTab } from "./BottomNav";
import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";

export default function EnglishApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, markNew, grade, setGoalDate, reset, exportJson, importJson } = useEnProgress();
  const [tab, setTab] = useState<EnTab>("home");
  const [studyCategory, setStudyCategory] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<"learn" | "review" | "quiz">("learn");

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200" style={{ borderTopColor: "#4361EE" }} />
          <p className="text-sm" style={{ color: "var(--text-3)" }}>불러오는 중…</p>
        </div>
      </div>
    );
  }

  function startStudy(key: string, mode: "learn" | "review" | "quiz" = "learn") {
    setStudyCategory(key);
    setStudyMode(mode);
  }

  function exitStudy() {
    setStudyCategory(null);
    setTab("home");
  }

  if (studyCategory) {
    const category = EN_CATEGORIES.find((c) => c.key === studyCategory)!;
    const words = EN_VOCAB.filter((w) => w.category === studyCategory);

    return (
      <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
        {studyMode === "learn" && (
          <EnVocabStudy
            category={category} words={words}
            onMarkNew={markNew} onExit={exitStudy}
            onReview={() => setStudyMode("review")}
            onQuiz={() => setStudyMode("quiz")}
            progress={progress}
          />
        )}
        {studyMode === "review" && (
          <EnReviewMode
            category={category} words={words}
            onGrade={grade} onExit={exitStudy}
            onQuiz={() => setStudyMode("quiz")}
            progress={progress}
          />
        )}
        {studyMode === "quiz" && (
          <EnQuizMode
            words={words} onGrade={grade} onExit={exitStudy}
            onReview={() => setStudyMode("review")}
          />
        )}
        <EnBottomNav tab="home" onChange={(t) => { exitStudy(); setTab(t); }} accentColor="#4361EE" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      {/* 헤더 XP 바 */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2" style={{ background: "var(--bg)" }}>
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              ←
            </button>
          )}
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: "#4361EE" }}>🇺🇸 영어</span>
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
        <EnHome progress={progress} onStudyCategory={startStudy} />
      )}
      {tab === "learn" && (
        <EnVocabStudy
          category={EN_CATEGORIES[0]} words={EN_VOCAB}
          onMarkNew={markNew} onExit={() => setTab("home")}
          onReview={() => { setTab("review"); }}
          onQuiz={() => { setTab("quiz" as EnTab); }}
          progress={progress}
        />
      )}
      {tab === "review" && (
        <EnReviewMode
          category={{ key: "all", label: "전체 복습", emoji: "🔁", cefrRange: "A1-C1" }}
          words={EN_VOCAB}
          onGrade={grade}
          onExit={() => setTab("home")}
          onQuiz={() => setTab("quiz" as EnTab)}
          progress={progress}
        />
      )}
      {tab === "grammar" && <EnGrammarView />}
      {tab === "stats" && (
        <EnStats
          progress={progress}
          onSetGoal={setGoalDate}
          onReset={reset}
          onExport={exportJson}
          onImport={importJson}
        />
      )}

      <EnBottomNav tab={tab} onChange={setTab} accentColor="#4361EE" />
    </div>
  );
}
