"use client";
import { useState } from "react";
import {
  IC_CARD_GUIDE,
  OSAKA_AIRPORT_ROUTES,
  FUKUOKA_AIRPORT_ROUTES,
  CITY_TO_AIRPORT,
  BUS_TIPS,
  TAXI_TIPS,
} from "@/lib/travel/transport";
import type { TransportRoute, TransportOption } from "@/lib/travel/types";

// ─────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────

function parseFare(f: string): number {
  const n = parseInt(f.replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? Infinity : n;
}

function parseTime(t: string): number {
  const n = parseInt(t.replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? Infinity : n;
}

function cheapestOption(options: TransportOption[]): TransportOption {
  return options.reduce((prev, cur) =>
    parseFare(cur.fare) < parseFare(prev.fare) ? cur : prev
  );
}

function fastestOption(options: TransportOption[]): TransportOption {
  return options.reduce((prev, cur) =>
    parseTime(cur.time) < parseTime(prev.time) ? cur : prev
  );
}

// ─────────────────────────────────────────────
// 배지
// ─────────────────────────────────────────────

const BADGE_STYLES: Record<string, { bg: string; label: string }> = {
  fast:     { bg: "var(--badge-fast, #e17055)",    label: "⚡ 가장 빠름" },
  cheap:    { bg: "var(--badge-cheap, #00b894)",   label: "💰 가장 저렴" },
  ic:       { bg: "var(--badge-ic, #0984e3)",      label: "💳 IC카드 가능" },
  luggage:  { bg: "var(--badge-luggage, #6c5ce7)", label: "🧳 수하물 편리" },
};

function Badge({ type }: { type: keyof typeof BADGE_STYLES }) {
  const s = BADGE_STYLES[type];
  return (
    <span
      className="inline-flex items-center rounded-full px-[9px] py-0.5 text-[10px] font-bold tracking-[0.02em] whitespace-nowrap text-white"
      style={{ background: s.bg }}
    >
      {s.label}
    </span>
  );
}

function getOptionBadges(
  opt: TransportOption,
  isFast: boolean,
  isCheap: boolean
): (keyof typeof BADGE_STYLES)[] {
  const badges: (keyof typeof BADGE_STYLES)[] = [];
  if (isFast) badges.push("fast");
  if (isCheap) badges.push("cheap");
  if (opt.tip && opt.tip.includes("IC카드")) badges.push("ic");
  if (opt.tip && opt.tip.includes("수하물")) badges.push("luggage");
  return badges;
}

// ─────────────────────────────────────────────
// 노선 카드 (NAVITIME 스타일)
// ─────────────────────────────────────────────

function RouteCard({ route }: { route: TransportRoute }) {
  const cheap = cheapestOption(route.options);
  const fast = fastestOption(route.options);

  return (
    <div
      className="mb-5 overflow-hidden rounded-[18px] shadow-sm"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* 노선 헤더 */}
      <div
        className="flex items-center gap-2.5 px-[18px] pt-3.5 pb-3"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="text-[22px] leading-none">{route.emoji}</span>
        <div>
          <p className="mb-0.5 text-[11px] font-medium" style={{ color: "var(--text-3)" }}>
            {route.from}
          </p>
          <p className="text-[15px] font-extrabold" style={{ color: "var(--text-1)" }}>
            → {route.to}
          </p>
        </div>
      </div>

      {/* 옵션 목록 */}
      <div>
        {route.options.map((opt, i) => {
          const isFast = opt === fast;
          const isCheap = opt === cheap;
          const badges = getOptionBadges(opt, isFast, isCheap);
          const isLast = i === route.options.length - 1;

          return (
            <div
              key={i}
              className="px-[18px] py-3.5"
              style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
            >
              {/* 이름 + 배지 */}
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[13px] font-bold" style={{ color: "var(--text-1)" }}>
                  {opt.name}
                </span>
                {badges.map((b) => (
                  <Badge key={b} type={b} />
                ))}
              </div>

              {/* 메타 정보 행 */}
              <div
                className="flex flex-wrap gap-3.5"
                style={{ marginBottom: opt.tip ? "8px" : "0" }}
              >
                <MetaItem icon="⏱" value={opt.time} />
                <MetaItem icon="💴" value={opt.fare} />
                {opt.interval && <MetaItem icon="🔄" value={opt.interval} />}
              </div>

              {/* 팁 */}
              {opt.tip && (
                <div
                  className="rounded-[10px] px-3 py-2 text-[11px] leading-[1.65]"
                  style={{ background: "var(--surface)", color: "var(--text-2)" }}
                >
                  {opt.tip}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 유의사항 */}
      {route.tips.length > 0 && (
        <div
          className="px-[18px] py-3"
          style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
        >
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.06em]"
            style={{ color: "var(--text-3)" }}
          >
            유의사항
          </p>
          <ul className="m-0 list-none p-0">
            {route.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 text-[11px] leading-[1.6]"
                style={{
                  color: "var(--text-2)",
                  marginBottom: i < route.tips.length - 1 ? "4px" : 0,
                }}
              >
                <span className="flex-shrink-0" style={{ color: "var(--text-3)" }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MetaItem({ icon, value }: { icon: string; value: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[12px]"
      style={{ color: "var(--text-2)" }}
    >
      <span className="text-[13px]">{icon}</span>
      <span className="font-semibold" style={{ color: "var(--text-1)" }}>{value}</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// IC카드 탭
// ─────────────────────────────────────────────

function ICCardTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* 설명 */}
      <div
        className="rounded-2xl p-4 text-[13px] leading-[1.7]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-2)" }}
      >
        {IC_CARD_GUIDE.desc}
      </div>

      {/* 카드 종류 */}
      <section>
        <SectionTitle>카드 종류</SectionTitle>
        <div className="flex flex-col gap-2.5">
          {IC_CARD_GUIDE.types.map((card) => {
            const isWelcome = card.name === "Suica" && card.note?.includes("Welcome Suica");
            return (
              <div
                key={card.name}
                className="relative rounded-2xl px-4 py-3.5 shadow-sm"
                style={{
                  background: "var(--card)",
                  border: isWelcome
                    ? "2px solid var(--accent, #6c5ce7)"
                    : "1px solid var(--border)",
                }}
              >
                {isWelcome && (
                  <span
                    className="absolute right-3.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-[0.04em] text-white"
                    style={{ background: "var(--accent, #6c5ce7)" }}
                  >
                    외국인 전용
                  </span>
                )}

                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-[16px] font-extrabold" style={{ color: "var(--text-1)" }}>
                    {card.name}
                  </span>
                  <span className="text-[12px]" style={{ color: "var(--text-3)" }}>
                    {card.nameJp}
                  </span>
                </div>

                <div
                  className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]"
                  style={{ marginBottom: card.note ? "10px" : 0 }}
                >
                  <span className="whitespace-nowrap" style={{ color: "var(--text-3)" }}>사용지역</span>
                  <span style={{ color: "var(--text-1)" }}>{card.region}</span>
                  <span className="whitespace-nowrap" style={{ color: "var(--text-3)" }}>구매처</span>
                  <span style={{ color: "var(--text-1)" }}>{card.where}</span>
                  <span className="whitespace-nowrap" style={{ color: "var(--text-3)" }}>보증금</span>
                  <span style={{ color: "var(--text-1)" }}>{card.deposit}</span>
                </div>

                {card.note && (
                  <div
                    className="rounded-[10px] px-3 py-2 text-[11px] leading-[1.65]"
                    style={{ background: "var(--surface)", color: "var(--text-2)" }}
                  >
                    {card.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 사용법 단계 */}
      <section>
        <SectionTitle>사용법</SectionTitle>
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <ul className="m-0 list-none p-0">
            {IC_CARD_GUIDE.howToUse.map((step, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[12px] leading-[1.65]"
                style={{
                  color: "var(--text-2)",
                  marginBottom: i < IC_CARD_GUIDE.howToUse.length - 1 ? "10px" : 0,
                }}
              >
                <span
                  className="mt-px inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                  style={{ background: "var(--accent, #6c5ce7)" }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 환불 안내 */}
      <section>
        <SectionTitle>환불 안내</SectionTitle>
        <div
          className="rounded-2xl px-4 py-3.5 text-[12px] leading-[1.7]"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-2)" }}
        >
          <span className="mr-1.5">💴</span>
          {IC_CARD_GUIDE.refund}
        </div>
      </section>

      {/* 실용 팁 */}
      <section>
        <SectionTitle>실용 팁</SectionTitle>
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <ul className="m-0 list-none p-0">
            {IC_CARD_GUIDE.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 text-[12px] leading-[1.65]"
                style={{
                  color: "var(--text-2)",
                  marginBottom: i < IC_CARD_GUIDE.tips.length - 1 ? "8px" : 0,
                }}
              >
                <span className="flex-shrink-0" style={{ color: "#fdcb6e" }}>★</span>
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
    <div>
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

const CITY_LABEL: Record<string, string> = {
  osaka: "🏯 오사카",
  fukuoka: "🌸 후쿠오카",
};

function CityToAirportTab() {
  const cityKeys = Object.keys(CITY_TO_AIRPORT) as CityKey[];

  return (
    <div className="flex flex-col gap-6">
      {cityKeys.map((cityKey) => {
        const airportMap = CITY_TO_AIRPORT[cityKey] as Record<
          string,
          { title: string; tips: string[] }
        >;

        return (
          <section key={cityKey}>
            <h3 className="mb-3 text-[15px] font-extrabold" style={{ color: "var(--text-1)" }}>
              {CITY_LABEL[cityKey] ?? cityKey}
            </h3>
            <div className="flex flex-col gap-2.5">
              {Object.entries(airportMap).map(([apKey, data]) => (
                <div
                  key={apKey}
                  className="overflow-hidden rounded-2xl shadow-sm"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="px-4 py-[11px]"
                    style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
                  >
                    <p className="text-[13px] font-bold" style={{ color: "var(--text-1)" }}>
                      {data.title}
                    </p>
                  </div>
                  <ul className="m-0 list-none px-4 py-3.5">
                    {data.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[12px] leading-[1.65]"
                        style={{
                          color: "var(--text-2)",
                          marginBottom: i < data.tips.length - 1 ? "8px" : 0,
                        }}
                      >
                        <span
                          className="mt-[3px] flex-shrink-0 text-[10px]"
                          style={{ color: "#74b9ff" }}
                        >
                          ▶
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// 교통팁 탭
// ─────────────────────────────────────────────

function TipsTab() {
  return (
    <div className="flex flex-col gap-5">
      <TipSection title="🚌 버스 이용법" tips={BUS_TIPS} accentColor="#00cec9" />
      <TipSection title="🚕 택시 이용법" tips={TAXI_TIPS} accentColor="#fdcb6e" />
    </div>
  );
}

function TipSection({
  title,
  tips,
  accentColor,
}: {
  title: string;
  tips: string[];
  accentColor: string;
}) {
  return (
    <section>
      <h3 className="mb-2.5 text-[14px] font-extrabold" style={{ color: "var(--text-1)" }}>
        {title}
      </h3>
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <ul className="m-0 list-none p-0">
          {tips.map((tip, i) => {
            const colon = tip.indexOf(":");
            const label = colon !== -1 ? tip.slice(0, colon) : null;
            const body = colon !== -1 ? tip.slice(colon + 1).trim() : tip;

            return (
              <li
                key={i}
                className="flex gap-2.5 text-[12px] leading-[1.65]"
                style={{
                  color: "var(--text-2)",
                  marginBottom: i < tips.length - 1 ? "10px" : 0,
                  paddingBottom: i < tips.length - 1 ? "10px" : 0,
                  borderBottom:
                    i < tips.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: accentColor }}
                />
                <span>
                  {label && (
                    <span
                      className="mr-1 font-bold"
                      style={{ color: "var(--text-1)" }}
                    >
                      {label}:
                    </span>
                  )}
                  {body}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 공용 헬퍼
// ─────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2.5 text-[13px] font-bold" style={{ color: "var(--text-1)" }}>
      {children}
    </h3>
  );
}

// ─────────────────────────────────────────────
// 탭 바
// ─────────────────────────────────────────────

type TabKey = "ic" | "osaka" | "fukuoka" | "return" | "tips";

const TABS: { key: TabKey; label: string }[] = [
  { key: "ic",       label: "🎫 IC카드" },
  { key: "osaka",    label: "🏯 오사카공항" },
  { key: "fukuoka",  label: "🌸 후쿠오카공항" },
  { key: "return",   label: "🔄 시내→공항" },
  { key: "tips",     label: "💡 교통팁" },
];

function TabBar({
  tab,
  onSelect,
}: {
  tab: TabKey;
  onSelect: (t: TabKey) => void;
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 pb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {TABS.map((t) => {
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            className={`inline-flex flex-shrink-0 cursor-pointer items-center gap-[5px] whitespace-nowrap rounded-full px-3.5 py-[7px] text-[12px] shadow-sm transition-all duration-150 ${
              active ? "font-bold" : "font-medium"
            }`}
            style={{
              border: active ? "none" : "1px solid var(--border)",
              background: active
                ? "linear-gradient(135deg,#6c5ce7,#a29bfe)"
                : "var(--card)",
              color: active ? "#fff" : "var(--text-2)",
              boxShadow: active
                ? "0 3px 10px rgba(108,92,231,.35)"
                : "0 1px 3px rgba(0,0,0,.06)",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────

export default function TransportView() {
  const [tab, setTab] = useState<TabKey>("ic");

  return (
    <div className="pt-3 pb-28">
      {/* 헤더 */}
      <div className="mb-1 px-4">
        <h1 className="mb-1 text-[22px] font-black" style={{ color: "var(--text-1)" }}>
          일본 교통 안내
        </h1>
        <p className="text-[13px]" style={{ color: "var(--text-3)" }}>
          IC카드 · 공항 교통 · 시내 이동 한눈에
        </p>
      </div>

      {/* 탭 바 */}
      <div className="pt-3.5">
        <TabBar tab={tab} onSelect={setTab} />
      </div>

      {/* 탭 콘텐츠 */}
      <div className="px-4">
        {tab === "ic"       && <ICCardTab />}
        {tab === "osaka"    && <AirportTab routes={OSAKA_AIRPORT_ROUTES} />}
        {tab === "fukuoka"  && <AirportTab routes={FUKUOKA_AIRPORT_ROUTES} />}
        {tab === "return"   && <CityToAirportTab />}
        {tab === "tips"     && <TipsTab />}
      </div>
    </div>
  );
}
