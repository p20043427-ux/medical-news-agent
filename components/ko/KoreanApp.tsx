"use client";

import { useState } from "react";
import { useKoProgress, koLearnedCount, koStreak, koDueIds, todayKey } from "@/lib/ko/progress";
import { KO_VOCAB, KO_CATEGORIES } from "@/lib/ko/vocab";
import { KO_CONVERSATIONS } from "@/lib/ko/conversations";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";
import { AppSkeleton, Progress } from "@/components/ui";
import AccountButton from "@/components/auth/AccountButton";
import KoStudyView from "./StudyView";
import KoQuizView from "./QuizView";
import KoHangulView from "./HangulView";
import KoGrammarView from "./GrammarView";
import KoConversationView from "./ConversationView";
import KoRoleplayView from "./RoleplayView";
import KoDictationView from "./DictationView";
import KoPhrasebookView from "./PhrasebookView";
import KoMockExam from "./MockExam";
import KoPlacementView from "./PlacementView";
import KoLibraryView from "./LibraryView";
import KoStats from "./Stats";
import KoLearnHub, { type KoLearnView } from "./LearnHub";

type Tab = "home" | "learn" | "library" | "stats";
const ACCENT = "#2563EB";

const NAV: { key: Tab; ko: string; ja: string; icon: React.ReactNode }[] = [
  { key: "home", ko: "홈", ja: "ホーム", icon: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /> },
  { key: "learn", ko: "학습", ja: "学習", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></> },
  { key: "library", ko: "보관함", ja: "保管", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { key: "stats", ko: "통계", ja: "統計", icon: <><path d="M3 3v18h18" /><path d="M7 16v-5M12 16V8M17 16v-3" /></> },
];

export default function KoreanApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, grade, reset, toggleBookmark, addMistakes, clearMistake } = useKoProgress();
  const lang = useUiLang();
  const [tab, setTab] = useState<Tab>("home");
  const [learnView, setLearnView] = useState<KoLearnView | null>(null);

  if (!ready) return <AppSkeleton />;

  const learned = koLearnedCount(progress);
  const total = KO_VOCAB.length;
  const knownPct = total ? Math.round((learned / total) * 100) : 0;

  const WD = ["일", "월", "화", "수", "목", "금", "토"];
  const WD_JA = ["日", "月", "火", "水", "木", "金", "土"];
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now); d.setDate(now.getDate() - now.getDay() + i); return d;
  });
  const studied = (d: Date) => (progress.daily?.[todayKey(d)] ?? 0) > 0;
  const r = 7, circ = 2 * Math.PI * r;

  const openLearn = (v: KoLearnView) => { setTab("learn"); setLearnView(v); };

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      <header className="sticky top-0 z-30" style={{ background: "var(--bg)", paddingTop: "env(safe-area-inset-top)" }}>
        <div className="flex items-center gap-2 px-4 pb-2 pt-3">
          {onBack && (
            <button onClick={onBack} aria-label={tt(lang, "뒤로", "戻る")} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          )}
          <span className="text-xl font-extrabold" style={{ color: "var(--text-1)" }}>한국어 <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>韓国語</span></span>
          <div className="ml-auto flex items-center gap-2">
            {/* 진도 링 */}
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ border: "1px solid var(--border)" }}>
              <svg viewBox="0 0 18 18" className="h-4 w-4 -rotate-90">
                <circle cx="9" cy="9" r={r} fill="none" stroke="var(--surface)" strokeWidth="2.5" />
                <circle cx="9" cy="9" r={r} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={circ} strokeDashoffset={circ - (knownPct / 100) * circ} />
              </svg>
              <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-2)" }}>{knownPct}%</span>
            </div>
            {/* UI 언어 토글 */}
            <div className="flex rounded-full p-0.5" style={{ background: "var(--surface)" }}>
              {(["ko", "ja"] as UiLang[]).map((l) => (
                <button key={l} onClick={() => setUiLang(l)} className="rounded-full px-2.5 py-1 text-xs font-bold transition"
                  style={lang === l ? { background: ACCENT, color: "#fff" } : { color: "var(--text-3)" }}>{l === "ko" ? "한" : "日"}</button>
              ))}
            </div>
            <AccountButton />
          </div>
        </div>

        {/* 주간 스트립 */}
        <div className="px-4 pb-2">
          <div className="grid grid-cols-7 text-center text-[11px]" style={{ color: "var(--text-3)" }}>
            {(lang === "ja" ? WD_JA : WD).map((w) => <span key={w}>{w}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 text-center">
            {week.map((d, i) => {
              const isToday = d.toDateString() === now.toDateString();
              const did = studied(d);
              return (
                <div key={i} className="flex flex-col items-center gap-1 py-0.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full text-sm"
                    style={{ background: isToday ? ACCENT : "transparent", color: isToday ? "#fff" : did ? "var(--text-1)" : "var(--text-3)", fontWeight: isToday ? 800 : did ? 700 : 500 }}>
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

      {tab === "home" && <KoHome progress={progress} lang={lang} onStudy={() => openLearn("study")} onReview={() => openLearn("study")} onOpen={openLearn} />}

      {tab === "learn" && (
        learnView ? (
          <div>
            <div className="px-4 pt-3">
              <button onClick={() => setLearnView(null)} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                {tt(lang, "학습 메뉴", "学習メニュー")}
              </button>
            </div>
            {learnView === "study" && <KoStudyView progress={progress} lang={lang} onGrade={grade} />}
            {learnView === "quiz" && <KoQuizView lang={lang} onGrade={grade} onExit={() => setLearnView(null)} />}
            {learnView === "hangul" && <KoHangulView lang={lang} />}
            {learnView === "grammar" && <KoGrammarView lang={lang} />}
            {learnView === "conversation" && <KoConversationView lang={lang} />}
            {learnView === "roleplay" && <KoRoleplayView lang={lang} />}
            {learnView === "dictation" && <KoDictationView onExit={() => setLearnView(null)} />}
            {learnView === "phrasebook" && <KoPhrasebookView lang={lang} />}
            {learnView === "exam" && <KoMockExam lang={lang} onExit={() => setLearnView(null)} onMistake={addMistakes} />}
            {learnView === "placement" && <KoPlacementView lang={lang} onExit={() => setLearnView(null)} />}
          </div>
        ) : (
          <KoLearnHub lang={lang} onOpen={setLearnView} />
        )
      )}

      {tab === "library" && (
        <KoLibraryView lang={lang} bookmarks={progress.bookmarks} mistakes={progress.mistakes} onToggleBookmark={toggleBookmark} onClearMistake={clearMistake} />
      )}

      {tab === "stats" && <KoStats progress={progress} lang={lang} onReset={reset} />}

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-stretch justify-around gap-1 px-2 pt-1.5" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}>
          {NAV.map((n) => {
            const on = tab === n.key;
            return (
              <button key={n.key} onClick={() => { setLearnView(null); setTab(n.key); }} aria-current={on ? "page" : undefined}
                className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition active:scale-95"
                style={{ color: on ? ACCENT : "var(--text-3)", background: on ? `${ACCENT}14` : "transparent" }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={on ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                <span className={`text-[11px] leading-none ${on ? "font-extrabold" : "font-medium"}`}>{lang === "ja" ? n.ja : n.ko}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function KoHome({ progress, lang, onStudy, onReview, onOpen }: {
  progress: ReturnType<typeof useKoProgress>["progress"];
  lang: UiLang;
  onStudy: () => void;
  onReview: () => void;
  onOpen: (v: KoLearnView) => void;
}) {
  const learned = koLearnedCount(progress);
  const total = KO_VOCAB.length;
  const str = koStreak(progress);
  const due = koDueIds(progress).length;
  const today = progress.daily?.[todayKey()] ?? 0;

  const SHORTCUTS: { key: KoLearnView; emoji: string; label: [string, string] }[] = [
    { key: "quiz", emoji: "📝", label: ["단어 퀴즈", "単語クイズ"] },
    { key: "grammar", emoji: "📘", label: ["문법", "文法"] },
    { key: "conversation", emoji: "💬", label: ["생활 회화", "日常会話"] },
    { key: "roleplay", emoji: "🎭", label: ["롤플레이", "ロールプレイ"] },
  ];

  return (
    <div className="px-5 pb-28 pt-3">
      <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>{tt(lang, "안녕하세요! 👋", "アンニョンハセヨ！👋")}</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "오늘도 한국어를 배워볼까요?", "今日も韓国語を学びましょう。")}</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: `🔥${str}`, label: tt(lang, "연속", "連続"), c: "#F97316" },
          { v: learned, label: tt(lang, "학습 단어", "覚えた単語"), c: ACCENT },
          { v: today, label: tt(lang, "오늘", "今日"), c: "#10B981" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
            <p className="text-2xl font-extrabold tabular-nums" style={{ color: s.c }}>{s.v}</p>
            <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {due > 0 && (
        <button onClick={onReview} className="mt-4 flex w-full items-center justify-between rounded-3xl p-5 text-left shadow-sm" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
          <div>
            <p className="text-sm font-bold text-white/90">{tt(lang, "오늘 복습", "今日の復習")}</p>
            <p className="text-xl font-extrabold text-white">{tt(lang, `${due}개 카드`, `${due}枚のカード`)}</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-2xl">🔁</span>
        </button>
      )}

      <div className="mt-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "전체 진도", "全体の進捗")}</span>
          <span className="text-sm tabular-nums" style={{ color: "var(--text-3)" }}>{learned} / {total}</span>
        </div>
        <Progress value={total ? (learned / total) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#2563EB,#7C3AED)" }} />
        <p className="mt-2 text-xs" style={{ color: "var(--text-3)" }}>TOPIK 1~2 · {tt(lang, "회화", "会話")} {KO_CONVERSATIONS.length} · {tt(lang, "카테고리", "カテゴリー")} {KO_CATEGORIES.length}</p>
      </div>

      <button onClick={onStudy} className="mt-4 w-full rounded-2xl py-4 text-base font-extrabold text-white shadow-lg" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
        {tt(lang, "단어 학습 시작하기", "単語学習を始める")}
      </button>

      {/* 바로가기 */}
      <div className="mt-5 grid grid-cols-4 gap-2.5">
        {SHORTCUTS.map((s) => (
          <button key={s.key} onClick={() => onOpen(s.key)} className="flex flex-col items-center gap-1.5 rounded-2xl p-3 shadow-sm" style={{ background: "var(--card)" }}>
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] font-semibold leading-tight" style={{ color: "var(--text-2)" }}>{tt(lang, s.label[0], s.label[1])}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
