"use client";

import { useState } from "react";
import { useEnProgress, learnedCount, todayKey } from "@/lib/en/progress";
import AccountButton from "@/components/auth/AccountButton";
import EnHome from "./Home";
import EnVocabStudy from "./VocabStudy";
import EnReviewMode from "./ReviewMode";
import EnQuizMode from "./QuizMode";
import EnGrammarView from "./GrammarView";
import EnMockExam from "./MockExam";
import EnPhrasebookView from "./PhrasebookView";
import EnRoleplayView from "./RoleplayView";
import EnConversationView from "./ConversationView";
import EnReviewLibrary from "./ReviewLibrary";
import EnStats from "./Stats";
import EnBottomNav, { type EnTab } from "./BottomNav";
import EnLearnHub, { type EnLearnView } from "./LearnHub";
import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import { useReminderScheduler } from "@/lib/reminder";

export default function EnglishApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, markNew, grade, setGoalDate, reset, exportJson, importJson } = useEnProgress();
  useReminderScheduler();
  const [tab, setTab] = useState<EnTab>("home");
  const [learnSub, setLearnSub] = useState<EnLearnView | null>(null);
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

  const totalWords = EN_VOCAB.length;
  const knownPct = totalWords ? Math.round((learnedCount(progress) / totalWords) * 100) : 0;
  const dday = progress.goalDate
    ? Math.round((new Date(progress.goalDate).getTime() - new Date(todayKey()).getTime()) / 86400000)
    : null;
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
            CEFR
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-3)" }}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ border: "1px solid var(--border)" }}>
              <svg viewBox="0 0 18 18" className="h-4 w-4 -rotate-90">
                <circle cx="9" cy="9" r={r} fill="none" stroke="var(--surface)" strokeWidth="2.5" />
                <circle cx="9" cy="9" r={r} fill="none" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round"
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
                      background: isToday ? "#4361EE" : "transparent",
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
        <EnHome progress={progress} onStudyCategory={startStudy} onGrammar={() => { setTab("learn"); setLearnSub("grammar"); }} onReviewDue={() => setTab("review")} />
      )}
      {tab === "learn" && (
        learnSub === "exam" ? (
          <EnMockExam onExit={() => setLearnSub(null)} />
        ) : learnSub ? (
          <div>
            <div className="px-4 pt-3">
              <button
                onClick={() => setLearnSub(null)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{ background: "var(--surface)", color: "var(--text-2)" }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                학습 메뉴
              </button>
            </div>
            {learnSub === "vocab" && (
              <EnVocabStudy
                category={EN_CATEGORIES[0]} words={EN_VOCAB}
                onMarkNew={markNew} onExit={() => setLearnSub(null)}
                onReview={() => { setTab("review"); setLearnSub(null); }}
                onQuiz={() => { setTab("quiz" as EnTab); }}
                progress={progress}
              />
            )}
            {learnSub === "grammar" && <EnGrammarView />}
            {learnSub === "phrasebook" && <EnPhrasebookView />}
            {learnSub === "roleplay" && <EnRoleplayView />}
            {learnSub === "conversation" && <EnConversationView />}
          </div>
        ) : (
          <EnLearnHub onOpen={setLearnSub} />
        )
      )}
      {tab === "review" && (
        <EnReviewLibrary progress={progress} onGrade={grade} onExit={() => setTab("home")} />
      )}
      {tab === "stats" && (
        <EnStats
          progress={progress}
          onSetGoal={setGoalDate}
          onReset={reset}
          onExport={exportJson}
          onImport={importJson}
        />
      )}

      <EnBottomNav tab={tab} onChange={(t) => { setLearnSub(null); setTab(t); }} accentColor="#4361EE" />
    </div>
  );
}
