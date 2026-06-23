"use client";

import { useEffect, useState } from "react";
import JapaneseApp from "@/components/jp/JapaneseApp";
import EnglishApp from "@/components/en/EnglishApp";
import { AuthProvider } from "@/lib/auth";
import AccountButton from "@/components/auth/AccountButton";
import { track } from "@/lib/analytics";
import Onboarding, { shouldOnboard } from "@/components/Onboarding";

type Lang = "jp" | "en";

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
    if (saved === "jp" || saved === "en") setLang(saved);
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

  return <LandingPage onSelect={selectLang} />;
}

function LandingPage({ onSelect }: { onSelect: (l: Lang) => void }) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12"
      style={{ background: "var(--bg)" }}
    >
      <div className="absolute right-5" style={{ top: "max(env(safe-area-inset-top), 1.25rem)" }}>
        <AccountButton />
      </div>

      <div className="mb-10 text-center">
        <div className="mb-3 text-5xl">🎓</div>
        <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-1)" }}>
          LinguaFlow
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
          SM-2 알고리즘 기반 언어 학습
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        {/* 일본어 카드 */}
        <button
          onClick={() => onSelect("jp")}
          className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #E63946, #F4A261)" }}
        >
          <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">🇯🇵</div>
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl">🇯🇵</span>
              <div>
                <p className="text-xl font-extrabold text-white">일본어</p>
                <p className="text-xs text-white/70">Japanese</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["JLPT N5·N4", "800+ 단어", "회화 8개", "SM-2 복습"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">단어 · 동사 · 회화 · 문법</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>

        {/* 영어 카드 */}
        <button
          onClick={() => onSelect("en")}
          className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #4361EE, #7209B7)" }}
        >
          <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">🇺🇸</div>
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl">🇺🇸</span>
              <div>
                <p className="text-xl font-extrabold text-white">영어</p>
                <p className="text-xs text-white/70">English</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["CEFR A1→C1", "100+ 어휘", "구동사 40+", "문법 15개"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">어휘 · 문법 · 구동사 · IPA 발음</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>
      </div>

      <p className="mt-8 text-center text-xs" style={{ color: "var(--text-3)" }}>
        로그인하면 진도가 계정에 저장되어<br />어느 기기에서나 이어서 학습할 수 있어요
      </p>
    </div>
  );
}
