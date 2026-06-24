"use client";

import { useEffect, useState } from "react";
import JapaneseApp from "@/components/jp/JapaneseApp";
import TravelApp from "@/components/travel/TravelApp";
import { AuthProvider } from "@/lib/auth";
import AccountButton from "@/components/auth/AccountButton";
import { track } from "@/lib/analytics";

type Lang = "jp" | "travel";

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

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("app-lang") as Lang | null;
    if (saved === "jp" || saved === "travel") setLang(saved);
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

  if (lang === "jp") return <JapaneseApp onBack={() => setLang(null)} />;
  if (lang === "travel") return <TravelApp onBack={() => setLang(null)} />;

  return <LandingPage onSelect={selectLang} />;
}

function LandingPage({ onSelect }: { onSelect: (l: Lang) => void }) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="absolute right-5" style={{ top: "max(env(safe-area-inset-top), 1.25rem)" }}>
        <AccountButton />
      </div>

      <div className="mb-12 text-center">
        <div className="mb-3 text-5xl">🇯🇵</div>
        <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-1)" }}>LinguaFlow</h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--text-3)" }}>일본어 학습 · 일본 여행 가이드</p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        {/* 일본어 학습 */}
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
                <p className="text-xl font-extrabold text-white">일본어 학습</p>
                <p className="text-xs text-white/70">Japanese · 日本語</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["JLPT N5·N4", "단어 700+", "회화", "SM-2"].map((t) => (
                <span key={t} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">단어 · 동사 · 문법 · 회화 · 쓰기</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>

        {/* 일본 여행 */}
        <button
          onClick={() => onSelect("travel")}
          className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #0369A1, #0891B2)" }}
        >
          <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">✈️</div>
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl">✈️</span>
              <div>
                <p className="text-xl font-extrabold text-white">일본 여행</p>
                <p className="text-xs text-white/70">Japan Travel Guide</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["오사카", "후쿠오카", "입국·세관", "교통", "긴급상황"].map((t) => (
                <span key={t} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">현지에서 바로 쓰는 실전 가이드</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>
      </div>

      <p className="mt-10 text-center text-xs" style={{ color: "var(--text-3)" }}>
        로그인하면 진도가 계정에 저장돼요
      </p>
    </div>
  );
}
