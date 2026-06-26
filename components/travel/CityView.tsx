"use client";

import { useState } from "react";
import type { CityGuide, TravelSpot, TravelFood } from "@/lib/travel/types";

const ACCENT = "#0EA5E9";

function Stars({ rating, reviews }: { rating?: number; reviews?: number }) {
  if (rating == null) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--text-3)" }}>
      <span style={{ color: "#F59E0B" }}>★ {rating.toFixed(1)}</span>
      {reviews != null && <span>({reviews.toLocaleString()})</span>}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: `${ACCENT}14`, color: ACCENT }}>{children}</span>
  );
}

function SpotCard({ s }: { s: TravelSpot }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-start gap-2 text-left">
        {s.rank != null && <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: ACCENT }}>{s.rank}</span>}
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-snug" style={{ color: "var(--text-1)" }}>{s.name} <span className="text-xs font-normal" style={{ color: "var(--text-3)" }}>{s.nameJp}</span></p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Stars rating={s.rating} reviews={s.reviewCount} />
            {s.priceRange && <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>{s.priceRange}</span>}
            {s.timeFromStation && <span className="text-[11px]" style={{ color: "var(--text-3)" }}>🚉 {s.timeFromStation}</span>}
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform" style={{ color: "var(--text-3)", transform: open ? "rotate(180deg)" : "none" }} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {s.tags && s.tags.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{s.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
      {open && (
        <div className="mt-2 space-y-1.5 text-sm" style={{ color: "var(--text-2)" }}>
          <p className="leading-relaxed">{s.desc}</p>
          {s.access && <p className="text-xs"><b style={{ color: "var(--text-1)" }}>접근</b> {s.access}</p>}
          {s.hours && <p className="text-xs"><b style={{ color: "var(--text-1)" }}>시간</b> {s.hours}</p>}
          {s.fee && <p className="text-xs"><b style={{ color: "var(--text-1)" }}>요금</b> {s.fee}</p>}
          {s.tips?.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {s.tips.map((t, i) => <li key={i} className="text-xs leading-relaxed">💡 {t}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function FoodCard({ f }: { f: TravelFood }) {
  return (
    <div className="rounded-2xl p-3.5 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-start gap-2">
        {f.rank != null && <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: "#F97316" }}>{f.rank}</span>}
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-snug" style={{ color: "var(--text-1)" }}>{f.name} <span className="text-xs font-normal" style={{ color: "var(--text-3)" }}>{f.nameJp}</span></p>
          <p className="mt-0.5 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{f.desc}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Stars rating={f.rating} reviews={f.reviewCount} />
            {f.avgPrice && <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>{f.avgPrice}</span>}
            {f.area && <span className="text-[11px]" style={{ color: "var(--text-3)" }}>📍 {f.area}</span>}
          </div>
          {f.tags && f.tags.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1.5">{f.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
        </div>
      </div>
    </div>
  );
}

const SECTIONS = [
  { key: "spots", ko: "관광", emoji: "📸" },
  { key: "food", ko: "맛집", emoji: "🍜" },
  { key: "shopping", ko: "쇼핑", emoji: "🛍️" },
  { key: "tips", ko: "팁", emoji: "💡" },
] as const;
type Section = (typeof SECTIONS)[number]["key"];

export default function CityView({ cities, selectedKey, onSelect }: {
  cities: CityGuide[];
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  const [section, setSection] = useState<Section>("spots");
  const city = cities.find((c) => c.key === selectedKey) ?? cities[0];

  return (
    <div className="pb-28">
      {/* 도시 선택 칩 */}
      <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1 no-scrollbar">
        {cities.map((c) => {
          const on = c.key === city.key;
          return (
            <button key={c.key} onClick={() => onSelect(c.key)}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition active:scale-95"
              style={on ? { background: ACCENT, color: "#fff" } : { background: "var(--surface)", color: "var(--text-2)" }}>
              <span>{c.emoji}</span><span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* 도시 히어로 */}
      <div className="px-4 pt-2">
        <div className="overflow-hidden rounded-3xl p-5 text-white shadow-sm" style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}>
          <div className="text-4xl">{city.emoji}</div>
          <h1 className="mt-1 text-2xl font-extrabold">{city.name} <span className="text-base font-bold text-white/70">{city.nameJp}</span></h1>
          <p className="mt-0.5 text-sm font-semibold text-white/90">{city.tagline}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/85">{city.overview}</p>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="px-4 pt-3">
        <div className="grid grid-cols-2 gap-2">
          {[["✈️ 공항", `${city.basics.airport} (${city.basics.airportCode})`], ["💴 통화", city.basics.currency], ["🕐 시차", city.basics.timezone], ["🚨 긴급", city.basics.emergency]].map(([k, v]) => (
            <div key={k} className="rounded-xl p-3" style={{ background: "var(--surface)" }}>
              <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{k}</p>
              <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 탭 */}
      <div className="sticky top-[calc(env(safe-area-inset-top)+3.5rem)] z-10 mt-3 flex gap-1.5 px-4 py-2" style={{ background: "var(--bg)" }}>
        {SECTIONS.map((s) => {
          const on = s.key === section;
          return (
            <button key={s.key} onClick={() => setSection(s.key)}
              className="flex-1 rounded-xl py-2 text-xs font-bold transition"
              style={on ? { background: ACCENT, color: "#fff" } : { background: "var(--surface)", color: "var(--text-3)" }}>
              {s.emoji} {s.ko}
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5 px-4 pt-1">
        {section === "spots" && city.spots.map((s, i) => <SpotCard key={i} s={s} />)}
        {section === "food" && city.food.map((f, i) => <FoodCard key={i} f={f} />)}
        {section === "shopping" && city.shopping.map((sh, i) => (
          <div key={i} className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="font-bold" style={{ color: "var(--text-1)" }}>{sh.name} <span className="text-xs font-normal" style={{ color: "var(--text-3)" }}>{sh.nameJp}</span></p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{sh.desc}</p>
          </div>
        ))}
        {section === "tips" && (
          <>
            {city.dayTrip && city.dayTrip.length > 0 && (
              <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <p className="mb-2 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>🚆 당일치기</p>
                <div className="space-y-2">
                  {city.dayTrip.map((d, i) => (
                    <div key={i}>
                      <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{d.name}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{d.desc}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-3)" }}>🚉 {d.access}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="mb-2 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>💡 여행 팁</p>
              <ul className="space-y-1.5">
                {city.tips.map((t, i) => <li key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>· {t}</li>)}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
