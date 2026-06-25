"use client";
import { useState } from "react";
import { OSAKA } from "@/lib/travel/osaka";
import { FUKUOKA } from "@/lib/travel/fukuoka";
import { TRAVEL_PHRASES } from "@/lib/travel/phrases";
import SpeakerButton from "@/components/jp/SpeakerButton";

interface Props {
  onNavigate: (tab: "home" | "guide" | "entry" | "transport" | "phrase" | "prep", city?: string) => void;
}

export default function HomeView({ onNavigate }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const emergencyPhrases = TRAVEL_PHRASES.find((s) => s.key === "emergency")?.phrases.slice(0, 5) ?? [];

  function copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  }

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden" style={{ background: "var(--bg)" }}>
      {/* ── 1. 긴급 SOS 배너 ── */}
      <button
        onClick={() => onNavigate("prep")}
        className="flex w-full shrink-0 cursor-pointer items-center justify-between border-none px-4 py-[13px]"
        style={{ background: "linear-gradient(135deg, #DC2626, #EF4444)" }}
        aria-label="긴급 정보 페이지로 이동"
      >
        <span className="text-left text-[13px] font-bold leading-snug tracking-[-0.2px] text-white">
          ⚠️ 긴급 시: 경찰 110 · 구급 119 · 관광경찰 #9110
        </span>
        <span className="ml-2 shrink-0 text-xl font-bold text-white/80">›</span>
      </button>

      {/* ── 2. 필수 회화 TOP 5 ── */}
      <section className="px-4 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="m-0 mb-3 text-base font-bold tracking-[-0.3px]" style={{ color: "var(--text-1)" }}>
            💬 필수 회화 TOP 5
          </h2>
          <button
            onClick={() => onNavigate("phrase")}
            className="mb-3 cursor-pointer border-none bg-none px-0 py-1 text-[13px] font-semibold"
            style={{ color: "#0EA5E9" }}
            aria-label="전체 회화 보기"
          >
            더 보기 ›
          </button>
        </div>

        <div className="-mx-4 overflow-hidden">
          <div className="flex flex-row gap-3 overflow-x-auto px-4 pb-3 pt-1 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none]">
            {emergencyPhrases.map((phrase, i) => (
              <div
                key={i}
                className="flex w-[220px] shrink-0 flex-col gap-1.5 rounded-2xl p-3.5 shadow-sm"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <p className="m-0 text-xs tracking-[-0.1px]" style={{ color: "var(--text-2)" }}>{phrase.ko}</p>
                <p className="m-0 text-lg font-bold leading-tight tracking-[-0.3px]" style={{ color: "var(--text-1)" }}>{phrase.jp}</p>
                <p className="m-0 text-[11px] tracking-[0.2px]" style={{ color: "var(--text-3)" }}>{phrase.reading}</p>
                <div className="mt-1 flex items-center gap-2">
                  <SpeakerButton text={phrase.jp} size={32} />
                  <button
                    onClick={() => copyToClipboard(phrase.jp, i)}
                    className="cursor-pointer rounded-lg border-none px-2.5 py-[5px] text-xs font-semibold tracking-[-0.1px]"
                    style={{ color: "#0EA5E9", background: "var(--surface)" }}
                    aria-label="일본어 복사"
                  >
                    {copiedIndex === i ? "✓ 복사됨" : "📋 복사"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 빠른 접근 4버튼 그리드 ── */}
      <section className="px-4 pt-5">
        <h2 className="m-0 mb-3 text-base font-bold tracking-[-0.3px]" style={{ color: "var(--text-1)" }}>빠른 메뉴</h2>
        <div className="mb-1 grid grid-cols-2 gap-3">
          {QUICK_MENUS.map((item) => (
            <button
              key={item.tab}
              onClick={() => onNavigate(item.tab)}
              className="flex min-h-10 cursor-pointer flex-col items-start gap-1.5 rounded-2xl border-none p-4 shadow-md transition-transform duration-100 ease-out"
              style={{ background: item.gradient }}
              aria-label={item.label}
            >
              <span className="text-[26px] leading-none">{item.icon}</span>
              <span className="text-[13px] font-bold tracking-[-0.2px] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 4. 도시 선택 hero 카드 ── */}
      <section className="px-4 pt-5">
        <h2 className="m-0 mb-3 text-base font-bold tracking-[-0.3px]" style={{ color: "var(--text-1)" }}>🗺️ 여행지 선택</h2>
        <div className="flex flex-col gap-3.5">
          {/* 오사카 카드 */}
          <button
            onClick={() => onNavigate("guide")}
            className="flex w-full cursor-pointer items-center justify-between rounded-[18px] border-none p-5 text-left shadow-lg transition-transform duration-100 ease-out"
            style={{ background: "linear-gradient(135deg, #E63946, #F4A261)" }}
            aria-label="오사카 가이드 보기"
          >
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[28px] leading-none">🏯</span>
                <span className="text-[22px] font-extrabold tracking-[-0.5px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.2)]">오사카</span>
                <span className="text-sm font-medium tracking-[0.5px] text-white/80">大阪</span>
              </div>
              <div className="flex gap-3">
                <span className="rounded-[20px] bg-white/20 px-[9px] py-[3px] text-xs font-semibold text-white/90">🏛 관광지 {OSAKA.spots.length}곳</span>
                <span className="rounded-[20px] bg-white/20 px-[9px] py-[3px] text-xs font-semibold text-white/90">🍜 맛집 {OSAKA.food.length}종</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold tracking-[-0.2px] text-white">인기 1위: 도톤보리</span>
                <span className="text-[13px] font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.15)]" style={{ color: "#FFD700" }}>⭐ 4.7</span>
              </div>
              <div className="mt-0.5 text-[11px] tracking-[-0.1px] text-white/75">{OSAKA.tagline}</div>
            </div>
            <span className="ml-3 shrink-0 text-[28px] font-bold text-white/70">›</span>
          </button>

          {/* 후쿠오카 카드 */}
          <button
            onClick={() => onNavigate("guide")}
            className="flex w-full cursor-pointer items-center justify-between rounded-[18px] border-none p-5 text-left shadow-lg transition-transform duration-100 ease-out"
            style={{ background: "linear-gradient(135deg, #0369A1, #0891B2)" }}
            aria-label="후쿠오카 가이드 보기"
          >
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[28px] leading-none">🌸</span>
                <span className="text-[22px] font-extrabold tracking-[-0.5px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.2)]">후쿠오카</span>
                <span className="text-sm font-medium tracking-[0.5px] text-white/80">福岡</span>
              </div>
              <div className="flex gap-3">
                <span className="rounded-[20px] bg-white/20 px-[9px] py-[3px] text-xs font-semibold text-white/90">🏛 관광지 {FUKUOKA.spots.length}곳</span>
                <span className="rounded-[20px] bg-white/20 px-[9px] py-[3px] text-xs font-semibold text-white/90">🍜 맛집 {FUKUOKA.food.length}종</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold tracking-[-0.2px] text-white">인기 1위: 나카스 야타이</span>
                <span className="text-[13px] font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.15)]" style={{ color: "#FFD700" }}>⭐ 4.8</span>
              </div>
              <div className="mt-0.5 text-[11px] tracking-[-0.1px] text-white/75">{FUKUOKA.tagline}</div>
            </div>
            <span className="ml-3 shrink-0 text-[28px] font-bold text-white/70">›</span>
          </button>
        </div>
      </section>

      {/* ── 5. 출발 전 체크리스트 미리보기 ── */}
      <section className="px-4 pb-6 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="m-0 mb-3 text-base font-bold tracking-[-0.3px]" style={{ color: "var(--text-1)" }}>✅ 출발 전 필수 3가지</h2>
          <button
            onClick={() => onNavigate("prep")}
            className="mb-3 cursor-pointer border-none bg-none px-0 py-1 text-[13px] font-semibold"
            style={{ color: "#0EA5E9" }}
            aria-label="전체 여행 준비 보기"
          >
            전체 보기 ›
          </button>
        </div>

        <button
          onClick={() => onNavigate("prep")}
          className="flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl py-1 text-left shadow-sm"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          aria-label="여행 준비 상세 보기"
        >
          {CHECKLIST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span className="shrink-0 text-2xl leading-none">{item.icon}</span>
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="m-0 text-sm font-bold tracking-[-0.2px]" style={{ color: "var(--text-1)" }}>{item.title}</p>
                <p className="m-0 text-xs leading-snug tracking-[-0.1px]" style={{ color: "var(--text-2)" }}>{item.desc}</p>
              </div>
              <span className="shrink-0 text-lg" style={{ color: "var(--text-3)" }}>›</span>
            </div>
          ))}
        </button>
      </section>
    </div>
  );
}

// ── 데이터 ──

const QUICK_MENUS = [
  {
    tab: "entry",
    icon: "🛂",
    label: "입국 가이드",
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
  },
  {
    tab: "transport",
    icon: "🚃",
    label: "공항 교통",
    gradient: "linear-gradient(135deg, #0EA5E9, #06B6D4)",
  },
  {
    tab: "prep",
    icon: "📋",
    label: "여행 준비",
    gradient: "linear-gradient(135deg, #10B981, #34D399)",
  },
  {
    tab: "phrase",
    icon: "💬",
    label: "전체 회화",
    gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)",
  },
] as const;

const CHECKLIST_ITEMS = [
  {
    icon: "📕",
    title: "여권",
    desc: "유효기간 6개월 이상 남은 여권 확인",
  },
  {
    icon: "📱",
    title: "Visit Japan Web",
    desc: "입국심사·세관신고 사전 등록으로 입국 줄 단축",
  },
  {
    icon: "💴",
    title: "환전",
    desc: "현금 문화 강함 — 1인 1일 최소 1만~2만엔 준비",
  },
];
