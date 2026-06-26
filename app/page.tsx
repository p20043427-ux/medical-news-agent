"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/lib/auth";
import AccountButton from "@/components/auth/AccountButton";
import { track } from "@/lib/analytics";
import Onboarding, { shouldOnboard } from "@/components/Onboarding";
import { useUiLang, setUiLang, tt, type UiLang } from "@/lib/i18n";

// 카테고리 앱은 진입 시점에만 로드한다(코드 스플리팅).
// 랜딩 화면 초기 번들에서 4개 앱 + 대용량 데이터(회화/단어/도시)를 제외해
// First Load JS를 대폭 줄인다. ssr:false → 정적 PWA, 클라이언트 전용.
const loading = () => (
  <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
    <div className="animate-pulse text-4xl">✨</div>
  </div>
);
const JapaneseApp = dynamic(() => import("@/components/jp/JapaneseApp"), { ssr: false, loading });
const KoreanApp = dynamic(() => import("@/components/ko/KoreanApp"), { ssr: false, loading });
const MedicApp = dynamic(() => import("@/components/medic/MedicApp"), { ssr: false, loading });
const TravelApp = dynamic(() => import("@/components/travel/TravelApp"), { ssr: false, loading });

type Lang = "jp" | "ko" | "medic" | "travel";

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
    if (saved === "jp" || saved === "ko" || saved === "medic" || saved === "travel") setLang(saved);
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
  if (lang === "ko") return <KoreanApp onBack={() => setLang(null)} />;
  if (lang === "medic") return <MedicApp onBack={() => setLang(null)} />;
  if (lang === "travel") return <TravelApp onBack={() => setLang(null)} />;

  return <LandingPage onSelect={selectLang} />;
}

function LandingPage({ onSelect }: { onSelect: (l: Lang) => void }) {
  const ui = useUiLang();
  const courses: { key: Lang; title: string; sub: string; flag: string; grad: string; tags: string[]; foot: string }[] = [
    { key: "jp", title: tt(ui, "일본어", "日本語"), sub: "Japanese", flag: "🇯🇵", grad: "linear-gradient(135deg, #E63946, #F4A261)", tags: ["JLPT N5·N4", "700+", tt(ui, "회화", "会話"), "SM-2"], foot: tt(ui, "단어 · 동사 · 회화 · 문법", "単語・動詞・会話・文法") },
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
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(ui, "SM-2 알고리즘 기반 언어 학습 · 의료교류 · 일본 여행", "SM-2 語学学習 · 医療交流 · 日本旅行")}</p>
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

        {/* 의료교류 플랫폼 */}
        <button onClick={() => onSelect("medic")}
          className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #0D9488, #0EA5E9)" }}>
          <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">🏥</div>
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl">🏥</span>
              <div>
                <p className="text-xl font-extrabold text-white">{tt(ui, "의료교류", "医療交流")}</p>
                <p className="text-xs text-white/70">{tt(ui, "은성의료재단 ↔ 가마치그룹", "恩成医療財団 ↔ 蒲池グループ")}</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {[tt(ui, "전문 회화", "専門会話"), tt(ui, "의료용어", "医療用語"), tt(ui, "긴급카드", "緊急カード"), tt(ui, "방문실무", "訪問実務")].map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">{tt(ui, "직원 상호방문 지원 도구", "職員相互訪問サポート")}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>

        {/* 일본 여행 가이드 */}
        <button onClick={() => onSelect("travel")}
          className="group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl transition active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #0369A1, #0891B2)" }}>
          <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">✈️</div>
          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl">✈️</span>
              <div>
                <p className="text-xl font-extrabold text-white">{tt(ui, "일본 여행", "日本旅行")}</p>
                <p className="text-xs text-white/70">Japan Travel Guide</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {[tt(ui, "도쿄", "東京"), tt(ui, "오사카", "大阪"), tt(ui, "후쿠오카", "福岡"), tt(ui, "교통", "交通"), tt(ui, "긴급", "緊急")].map((tag) => (
                <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">{tt(ui, "현지에서 바로 쓰는 실전 가이드", "現地ですぐ使える実践ガイド")}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">→</span>
            </div>
          </div>
        </button>
      </div>

      <p className="mt-8 text-center text-xs" style={{ color: "var(--text-3)" }}>
        {tt(ui, "로그인하면 진도가 계정에 저장돼요", "ログインすると進捗がアカウントに保存されます")}
      </p>
    </div>
  );
}
