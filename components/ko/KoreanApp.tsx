"use client";

import { useState } from "react";
import { useKoProgress, koLearnedCount, koStreak, koDueIds, todayKey } from "@/lib/ko/progress";
import { KO_VOCAB, KO_CATEGORIES } from "@/lib/ko/vocab";
import { KO_CONVERSATIONS } from "@/lib/ko/conversations";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";
import { AppSkeleton, Progress } from "@/components/ui";
import AccountButton from "@/components/auth/AccountButton";
import KoStudyView from "./StudyView";
import KoGrammarView from "./GrammarView";
import KoConversationView from "./ConversationView";

type Tab = "home" | "study" | "grammar" | "talk";
const ACCENT = "#2563EB";

const NAV: { key: Tab; ko: string; ja: string; icon: React.ReactNode }[] = [
  { key: "home", ko: "홈", ja: "ホーム", icon: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /> },
  { key: "study", ko: "학습", ja: "学習", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></> },
  { key: "grammar", ko: "문법", ja: "文法", icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /> },
  { key: "talk", ko: "회화", ja: "会話", icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /> },
];

export default function KoreanApp({ onBack }: { onBack?: () => void }) {
  const { progress, ready, grade } = useKoProgress();
  const lang = useUiLang();
  const [tab, setTab] = useState<Tab>("home");

  if (!ready) return <AppSkeleton />;

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
        <div style={{ height: 1, background: "var(--border)" }} />
      </header>

      {tab === "home" && <KoHome progress={progress} lang={lang} onStudy={() => setTab("study")} />}
      {tab === "study" && <KoStudyView progress={progress} lang={lang} onGrade={grade} />}
      {tab === "grammar" && <KoGrammarView lang={lang} />}
      {tab === "talk" && <KoConversationView lang={lang} />}

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-stretch justify-around gap-1 px-2 pt-1.5" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}>
          {NAV.map((n) => {
            const on = tab === n.key;
            return (
              <button key={n.key} onClick={() => setTab(n.key)} aria-current={on ? "page" : undefined}
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

function KoHome({ progress, lang, onStudy }: { progress: ReturnType<typeof useKoProgress>["progress"]; lang: UiLang; onStudy: () => void }) {
  const learned = koLearnedCount(progress);
  const total = KO_VOCAB.length;
  const str = koStreak(progress);
  const due = koDueIds(progress).length;
  const today = progress.daily?.[todayKey()] ?? 0;

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
            <p className="text-2xl font-extrabold" style={{ color: s.c }}>{s.v}</p>
            <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "전체 진도", "全体の進捗")}</span>
          <span className="text-sm" style={{ color: "var(--text-3)" }}>{learned} / {total}</span>
        </div>
        <Progress value={total ? (learned / total) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#2563EB,#7C3AED)" }} />
        <p className="mt-2 text-xs" style={{ color: "var(--text-3)" }}>TOPIK 1~2 · {tt(lang, "회화", "会話")} {KO_CONVERSATIONS.length} · {tt(lang, "카테고리", "カテゴリー")} {KO_CATEGORIES.length}</p>
      </div>

      <button onClick={onStudy} className="mt-4 w-full rounded-2xl py-4 text-base font-extrabold text-white shadow-lg" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
        {due > 0 ? tt(lang, `오늘 복습 ${due}개 시작`, `今日の復習 ${due}個を始める`) : tt(lang, "학습 시작하기", "学習を始める")}
      </button>
    </div>
  );
}
