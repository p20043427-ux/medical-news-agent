"use client";

import { useEffect, useState } from "react";
import { CITIES } from "@/lib/travel/cities";
import { TRAVEL_PHRASES } from "@/lib/travel/phrases";
import { CHECKLIST } from "@/lib/travel/emergency";
import { speakJa } from "@/lib/jp/speech";
import { useFavorites } from "@/lib/favorites";
import { Progress } from "@/components/ui";
import { kv } from "@/lib/platform/kv";

const ACCENT = "#0EA5E9";
const ALL_PHRASES = TRAVEL_PHRASES.flatMap((s) => s.phrases);
const CHECK_TOTAL = CHECKLIST.flatMap((g) => g.items).length;

function dailyIndex(key: string, mod: number): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return mod > 0 ? h % mod : 0;
}

export type TravelTab = "home" | "city" | "move" | "phrase" | "prep";

const QUICK: { tab: TravelTab; emoji: string; label: string; sub: string; grad: string }[] = [
  { tab: "move", emoji: "✈️", label: "입국·교통", sub: "공항·IC카드·노선", grad: "linear-gradient(135deg,#6c5ce7,#0984e3)" },
  { tab: "phrase", emoji: "💬", label: "여행 회화", sub: "상황별 일본어", grad: "linear-gradient(135deg,#00b894,#00cec9)" },
  { tab: "prep", emoji: "🎒", label: "준비·실용", sub: "체크리스트·환전·매너", grad: "linear-gradient(135deg,#fdcb6e,#e17055)" },
];

export default function HomeView({ onNavigate, onSelectCity }: {
  onNavigate: (tab: TravelTab) => void;
  onSelectCity: (key: string) => void;
}) {
  const { has, toggle } = useFavorites("travel-phrase");
  const [done, setDone] = useState(0);
  useEffect(() => {
    const saved = kv.getJSON<Record<string, boolean>>("travel-checklist", {});
    setDone(Object.values(saved).filter(Boolean).length);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayPhrase = ALL_PHRASES[dailyIndex(today, ALL_PHRASES.length)];
  const prepPct = CHECK_TOTAL ? Math.round((done / CHECK_TOTAL) * 100) : 0;

  return (
    <div className="px-4 pb-28 pt-3">
      {/* 히어로 */}
      <div className="overflow-hidden rounded-3xl p-6 text-white shadow-sm" style={{ background: "linear-gradient(135deg,#0369A1,#0891B2)" }}>
        <div className="text-4xl">✈️</div>
        <h1 className="mt-1 text-2xl font-extrabold">일본 여행 가이드</h1>
        <p className="mt-1 text-sm text-white/85">도시를 고르고, 현지에서 바로 쓰는 정보를 확인하세요.</p>
      </div>

      {/* 빠른 메뉴 */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {QUICK.map((q) => (
          <button key={q.tab} onClick={() => onNavigate(q.tab)}
            className="flex min-h-[88px] flex-col items-start justify-between rounded-2xl p-3 text-left text-white shadow-sm transition active:scale-95"
            style={{ background: q.grad }}>
            <span className="text-2xl">{q.emoji}</span>
            <span>
              <span className="block text-sm font-extrabold leading-tight">{q.label}</span>
              <span className="block text-[10px] text-white/80">{q.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {/* 오늘의 여행 회화 */}
      {todayPhrase && (
        <div className="mt-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#00b89412,#00cec912)", border: "1px solid var(--border)" }}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-extrabold" style={{ color: "#00b894" }}>🗾 오늘의 여행 회화</span>
            <button onClick={() => toggle(todayPhrase.jp)} aria-label="즐겨찾기" className="text-lg" style={{ color: has(todayPhrase.jp) ? "#f0932b" : "var(--text-3)" }}>{has(todayPhrase.jp) ? "★" : "☆"}</button>
          </div>
          <button onClick={() => speakJa(todayPhrase.reading || todayPhrase.jp)} className="w-full text-left">
            <p className="text-lg font-extrabold leading-snug" style={{ color: "var(--text-1)" }}>{todayPhrase.jp}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{todayPhrase.reading}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{todayPhrase.ko} · 🔊 눌러 듣기</p>
          </button>
        </div>
      )}

      {/* 여행 준비 진행률 */}
      <button onClick={() => onNavigate("prep")} className="mt-3 block w-full rounded-2xl p-4 text-left" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>🎒 여행 준비</span>
          <span className="text-sm font-bold" style={{ color: prepPct >= 100 ? "#10B981" : "var(--text-2)" }}>{done}/{CHECK_TOTAL}</span>
        </div>
        <Progress value={prepPct} indicatorStyle={{ background: prepPct >= 100 ? "#10B981" : `linear-gradient(90deg,${ACCENT},#0369A1)` }} />
      </button>

      {/* 도시 선택 */}
      <div className="mt-5 mb-2 flex items-center justify-between">
        <h2 className="text-base font-extrabold" style={{ color: "var(--text-1)" }}>🗺️ 도시 선택</h2>
        <span className="text-xs" style={{ color: "var(--text-3)" }}>{CITIES.length}개 도시</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {CITIES.map((c) => (
          <button key={c.key} onClick={() => onSelectCity(c.key)}
            className="flex flex-col items-start rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.97]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span className="text-3xl">{c.emoji}</span>
            <span className="mt-1.5 text-base font-extrabold" style={{ color: "var(--text-1)" }}>{c.name}</span>
            <span className="text-[11px] font-bold" style={{ color: ACCENT }}>{c.nameJp}</span>
            <span className="mt-1 line-clamp-2 text-[11px] leading-snug" style={{ color: "var(--text-3)" }}>{c.tagline}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 rounded-xl p-3 text-center text-xs" style={{ background: `${ACCENT}12`, color: "var(--text-2)" }}>
        🚨 긴급 시 화면 우하단 SOS 버튼으로 영사관·119 연락처를 확인하세요.
      </p>
    </div>
  );
}
