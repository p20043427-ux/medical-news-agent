"use client";

import { useState } from "react";
import {
  IC_CARD_GUIDE,
  TRANSPORT_TYPES,
  OSAKA_AIRPORT_ROUTES,
  FUKUOKA_AIRPORT_ROUTES,
  CITY_TO_AIRPORT,
} from "@/lib/travel/transport";
import { TransportRoute, TransportOption } from "@/lib/travel/types";
import { Chip } from "@/components/ui/chip";

// ─────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────

function cheapestOption(options: TransportOption[]): TransportOption {
  return options.reduce((prev, cur) => {
    const parseFare = (f: string) => parseInt(f.replace(/[^0-9]/g, ""), 10) || Infinity;
    return parseFare(cur.fare) < parseFare(prev.fare) ? cur : prev;
  });
}

function fastestOption(options: TransportOption[]): TransportOption {
  return options.reduce((prev, cur) => {
    const parseTime = (t: string) => parseInt(t.replace(/[^0-9]/g, ""), 10) || Infinity;
    return parseTime(cur.time) < parseTime(prev.time) ? cur : prev;
  });
}

// ─────────────────────────────────────────────
// 배지
// ─────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// 교통 옵션 테이블 (모바일: 카드 / 데스크탑: 테이블)
// ─────────────────────────────────────────────

function OptionTable({
  options,
  cheapest,
  fastest,
}: {
  options: TransportOption[];
  cheapest: TransportOption;
  fastest: TransportOption;
}) {
  return (
    <>
      {/* 모바일 카드 */}
      <div className="space-y-3 md:hidden">
        {options.map((opt, i) => {
          const isCheap = opt === cheapest;
          const isFast = opt === fastest;
          return (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 6px rgba(0,0,0,.06)",
              }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
                  {opt.name}
                </span>
                {isCheap && <Badge label="최저가" color="#00b894" />}
                {isFast && <Badge label="최속" color="#e17055" />}
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-xs">
                <span style={{ color: "var(--text-3)" }}>소요시간</span>
                <span style={{ color: "var(--text-1)" }}>{opt.time}</span>
                <span style={{ color: "var(--text-3)" }}>요금</span>
                <span style={{ color: "var(--text-1)" }}>{opt.fare}</span>
                {opt.interval && (
                  <>
                    <span style={{ color: "var(--text-3)" }}>배차간격</span>
                    <span style={{ color: "var(--text-1)" }}>{opt.interval}</span>
                  </>
                )}
              </div>
              {opt.tip && (
                <p
                  className="mt-2 rounded-xl px-3 py-2 text-[11px] leading-relaxed"
                  style={{ background: "var(--surface)", color: "var(--text-2)" }}
                >
                  💡 {opt.tip}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 데스크탑 테이블 */}
      <div
        className="hidden overflow-hidden rounded-2xl md:block"
        style={{ border: "1px solid var(--border)" }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr style={{ background: "var(--surface)" }}>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "var(--text-2)" }}
              >
                교통수단
              </th>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "var(--text-2)" }}
              >
                소요시간
              </th>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "var(--text-2)" }}
              >
                요금
              </th>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "var(--text-2)" }}
              >
                팁
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt, i) => {
              const isCheap = opt === cheapest;
              const isFast = opt === fastest;
              return (
                <tr
                  key={i}
                  style={{
                    borderTop: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-medium" style={{ color: "var(--text-1)" }}>
                        {opt.name}
                      </span>
                      {isCheap && <Badge label="최저가" color="#00b894" />}
                      {isFast && <Badge label="최속" color="#e17055" />}
                    </div>
                    {opt.nameJp && (
                      <span className="text-xs" style={{ color: "var(--text-3)" }}>
                        {opt.nameJp}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-1)" }}>
                    {opt.time}
                    {opt.interval && (
                      <div className="text-xs" style={{ color: "var(--text-3)" }}>
                        {opt.interval}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--text-1)" }}>
                    {opt.fare}
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {opt.tip ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// 노선 카드 (공항탭 공통)
// ─────────────────────────────────────────────

function RouteCard({ route }: { route: TransportRoute }) {
  const cheap = cheapestOption(route.options);
  const fast = fastestOption(route.options);
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{route.emoji}</span>
        <div>
          <p className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>
            {route.from}
          </p>
          <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
            → {route.to}
          </p>
        </div>
      </div>

      <OptionTable options={route.options} cheapest={cheap} fastest={fast} />

      {route.tips.length > 0 && (
        <div
          className="mt-3 rounded-2xl p-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="mb-2 text-xs font-bold" style={{ color: "var(--text-2)" }}>
            유의사항
          </p>
          <ul className="space-y-1.5">
            {route.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span className="shrink-0 text-[10px]" style={{ color: "var(--text-3)" }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// IC카드 탭
// ─────────────────────────────────────────────

function ICCardTab() {
  return (
    <div className="space-y-5">
      {/* 설명 */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          {IC_CARD_GUIDE.desc}
        </p>
      </div>

      {/* IC카드 종류 테이블 — 모바일 카드 */}
      <section>
        <h3 className="mb-3 text-sm font-bold" style={{ color: "var(--text-1)" }}>
          IC카드 종류
        </h3>

        {/* 모바일 카드 */}
        <div className="space-y-3 md:hidden">
          {IC_CARD_GUIDE.types.map((card) => (
            <div
              key={card.name}
              className="rounded-2xl p-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 6px rgba(0,0,0,.06)",
              }}
            >
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-base font-extrabold" style={{ color: "var(--text-1)" }}>
                  {card.name}
                </span>
                <span className="text-xs" style={{ color: "var(--text-3)" }}>
                  {card.nameJp}
                </span>
                <span
                  className="ml-auto text-xs font-semibold"
                  style={{ color: "var(--text-3)" }}
                >
                  {card.deposit}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                <span style={{ color: "var(--text-3)" }}>사용지역</span>
                <span style={{ color: "var(--text-1)" }}>{card.region}</span>
                <span style={{ color: "var(--text-3)" }}>구매처</span>
                <span style={{ color: "var(--text-1)" }}>{card.where}</span>
              </div>
              {card.note && (
                <p
                  className="mt-2 rounded-xl px-3 py-1.5 text-[11px] leading-relaxed"
                  style={{ background: "var(--surface)", color: "var(--text-2)" }}
                >
                  💡 {card.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 데스크탑 테이블 */}
        <div
          className="hidden overflow-hidden rounded-2xl md:block"
          style={{ border: "1px solid var(--border)" }}
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ background: "var(--surface)" }}>
                {["이름", "사용지역", "구매처", "특이사항"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: "var(--text-2)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IC_CARD_GUIDE.types.map((card) => (
                <tr
                  key={card.name}
                  style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}
                >
                  <td className="px-4 py-3">
                    <p className="font-bold" style={{ color: "var(--text-1)" }}>
                      {card.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>
                      {card.nameJp} · {card.deposit}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-2)" }}>
                    {card.region}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-2)" }}>
                    {card.where}
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {card.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 사용법 */}
      <section>
        <h3 className="mb-3 text-sm font-bold" style={{ color: "var(--text-1)" }}>
          사용법
        </h3>
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <ul className="space-y-2">
            {IC_CARD_GUIDE.usage.map((u, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: "var(--accent, #6c5ce7)" }}
                >
                  {i + 1}
                </span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 팁 */}
      <section>
        <h3 className="mb-3 text-sm font-bold" style={{ color: "var(--text-1)" }}>
          실용 팁
        </h3>
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <ul className="space-y-2">
            {IC_CARD_GUIDE.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span className="shrink-0" style={{ color: "#fdcb6e" }}>★</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// 공항 탭 (오사카 / 후쿠오카)
// ─────────────────────────────────────────────

function AirportTab({ routes }: { routes: TransportRoute[] }) {
  return (
    <div className="space-y-2">
      {routes.map((route) => (
        <RouteCard key={route.key} route={route} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 시내 → 공항 탭
// ─────────────────────────────────────────────

type CityKey = keyof typeof CITY_TO_AIRPORT;
type AirportEntry = {
  from: string;
  boarding: Record<string, string>;
  tips: string[];
};

function CityToAirportTab() {
  const cityKeys = Object.keys(CITY_TO_AIRPORT) as CityKey[];

  const cityLabel: Record<CityKey, string> = {
    osaka: "오사카",
    fukuoka: "후쿠오카",
    tokyo: "도쿄",
  };

  return (
    <div className="space-y-6">
      {cityKeys.map((cityKey) => {
        const airportMap = CITY_TO_AIRPORT[cityKey] as Record<string, AirportEntry>;
        return (
          <section key={cityKey}>
            <h3
              className="mb-3 text-base font-extrabold"
              style={{ color: "var(--text-1)" }}
            >
              {cityLabel[cityKey] ?? cityKey}
            </h3>
            <div className="space-y-4">
              {Object.entries(airportMap).map(([apKey, data]) => {
                const entry = data as AirportEntry;
                return (
                  <div
                    key={apKey}
                    className="rounded-2xl p-4"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 6px rgba(0,0,0,.06)",
                    }}
                  >
                    <p
                      className="mb-3 text-sm font-bold"
                      style={{ color: "var(--text-1)" }}
                    >
                      {entry.from}
                    </p>

                    {/* 탑승 포인트 */}
                    <div
                      className="mb-3 rounded-xl p-3"
                      style={{ background: "var(--surface)" }}
                    >
                      <p
                        className="mb-2 text-[11px] font-bold uppercase tracking-wide"
                        style={{ color: "var(--text-3)" }}
                      >
                        탑승 포인트
                      </p>
                      <ul className="space-y-1.5">
                        {Object.entries(entry.boarding).map(([bKey, bVal]) => (
                          <li key={bKey} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                            <span className="shrink-0 font-semibold" style={{ color: "var(--text-1)" }}>
                              {bKey}
                            </span>
                            <span style={{ color: "var(--text-3)" }}>—</span>
                            <span>{bVal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 팁 리스트 */}
                    <ul className="space-y-2">
                      {entry.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-xs leading-relaxed"
                          style={{ color: "var(--text-2)" }}
                        >
                          <span
                            className="mt-0.5 shrink-0 text-[10px]"
                            style={{ color: "#74b9ff" }}
                          >
                            ▶
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────

type TabKey = "ic" | "osaka" | "fukuoka" | "city";

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: "ic", label: "IC카드", emoji: "💳" },
  { key: "osaka", label: "오사카공항", emoji: "✈️" },
  { key: "fukuoka", label: "후쿠오카공항", emoji: "✈️" },
  { key: "city", label: "시내→공항", emoji: "🏙️" },
];

export default function TransportView() {
  const [tab, setTab] = useState<TabKey>("ic");

  return (
    <div className="pb-28 pt-3">
      {/* 헤더 */}
      <div className="px-4">
        <h1
          className="mb-1 text-2xl font-extrabold"
          style={{ color: "var(--text-1)" }}
        >
          일본 교통 안내
        </h1>
        <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>
          IC카드 · 공항 교통 · 시내 이동 한눈에
        </p>
      </div>

      {/* 탭 바 */}
      <div
        className="flex gap-2 overflow-x-auto px-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {TABS.map((t) => (
          <Chip
            key={t.key}
            active={tab === t.key}
            size="md"
            onClick={() => setTab(t.key)}
            activeGradient="linear-gradient(135deg,#6c5ce7,#a29bfe)"
            activeShadow="0 3px 10px rgba(108,92,231,.35)"
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </Chip>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="px-4">
        {tab === "ic" && <ICCardTab />}
        {tab === "osaka" && <AirportTab routes={OSAKA_AIRPORT_ROUTES} />}
        {tab === "fukuoka" && <AirportTab routes={FUKUOKA_AIRPORT_ROUTES} />}
        {tab === "city" && <CityToAirportTab />}
      </div>
    </div>
  );
}
