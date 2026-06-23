"use client";

import { useEffect, useState } from "react";
import JapaneseApp from "@/components/jp/JapaneseApp";
import EnglishApp from "@/components/en/EnglishApp";
import KoreanApp from "@/components/ko/KoreanApp";
import { AuthProvider } from "@/lib/auth";
import AccountButton from "@/components/auth/AccountButton";
import { track } from "@/lib/analytics";
import Onboarding, { shouldOnboard } from "@/components/Onboarding";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";

type Lang = "jp" | "en" | "ko";

export default function Root() {
  return (
    <AuthProvider>
      <RootInner />
    </AuthProvider>
  );
}

function RootInner() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [mounted, setMounted] = useState(false);
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("app-lang") as Lang | null;
    if (saved === "jp" || saved === "en" || saved === "ko") setLang(saved);
    else if (shouldOnboard()) setOnboarding(true);
  }, []);

  function selectLang(l: Lang) {
    window.localStorage.setItem("app-lang", l);
    track("select_language", { lang: l });
    setLang(l);
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-4xl">✨</div>
      </div>
    );
  }

  if (onboarding) return <Onboarding onDone={() => setOnboarding(false)} />;
  if (lang === "jp") return <JapaneseApp onBack={() => setLang(null)} />;
  if (lang === "en") return <EnglishApp onBack={() => setLang(null)} />;
  if (lang === "ko") return <KoreanApp onBack={() => setLang(null)} />;

  return <LandingPage onSelect={selectLang} />;
}

function LandingPage({ onSelect }: { onSelect: (l: Lang) => void }) {
  const ui = useUiLang();
  const courses: { key: Lang; title: string; sub: string; flag: string; grad: string; tags: string[]; foot: string }[] = [
    { key: "jp", title: tt(ui, "일본어", "日本語"), sub: "Japanese", flag: "🇯🇵", grad: "linear-gradient(135deg, #E63946, #F4A261)", tags: ["JLPT N5·N4", "700+", tt(ui, "회화", "会話"), "SM-2"], foot: tt(ui, "단어 · 동사 · 회화 · 문법", "単語・動詞・会話・文法") },
    { key: "en", title: tt(ui, "영어", "英語"), sub: "English", flag: "🇺🇸", grad: "linear-gradient(135deg, #4361EE, #7209B7)", tags: ["CEFR A1→C1", "500+", tt(ui, "구동사", "句動詞"), tt(ui, "문법", "文法")], foot: tt(ui, "어휘 · 문법 · 구동사 · IPA", "語彙・文法・句動詞・IPA") },
    { key: "ko", title: tt(ui, "한국어", "韓国語"), sub: "Korean", flag: "🇰🇷", grad: "linear-gradient(135deg, #2563EB, #7C3AED)", tags: ["TOPIK 1·2", "330+", tt(ui, "회화", "会話"), tt(ui, "문법", "文法")], foot: tt(ui, "단어 · 문법 · 회화 · 발음", "単語・文法・会話・発音") },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12" style={{ background: "var(--bg)" }}>
      <div className="absolute left-5 flex rounded-full p-0.5" style={{ top: "max(env(safe-area-inset-top), 1.25rem)", background: "var(--surface)" }}>
        {(["ko", "ja"] as UiLang[]).map((l) => (
          <button key={l} onClick={() => setUiLang(l)} className="rounded-full px-3 py-1.5 text-xs font-bold transition"
            style={ui === l ? { background: "var(--text-1)", color: "var(--bg)" } : { color: "var(--text-3)" }}>{l === "ko" ? "한국어" : "日本語"}</button>
        ))}
      </div>
      <div className="absolute right-5" style={{ top: "max(env(safe-area-inset-top), 1.25rem)" }}>
        <AccountButton />
      </div>

      <div className="mb-10 text-center">
        <div className="mb-3 text-5xl">🎓</div>
        <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-1)" }}>LinguaFlow</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(ui, "SM-2 알고리즘 기반 언어 학습", "SM-2 アルゴリズムの語学学習")}</p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        {courses.map((c) => (
          <button key={c.key} onClick={() => onSelect(c.key)}
            className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]" style={{ background: c.grad }}>
            <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">{c.flag}</div>
            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-4xl">{c.flag}</span>
                <div>
                  <p className="text-xl font-extrabold text-white">{c.title}</p>
                  <p className="text-xs text-white/70">{c.sub}</p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/80">{c.foot}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-xs" style={{ color: "var(--text-3)" }}>
        {tt(ui, "로그인하면 진도가 계정에 저장돼요", "ログインすると進捗がアカウントに保存されます")}
      </p>
    </div>
  );
}
