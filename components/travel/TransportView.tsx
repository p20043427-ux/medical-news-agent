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
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: s.bg,
        color: "#fff",
        borderRadius: "999px",
        padding: "2px 9px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
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
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,.07)",
        marginBottom: "20px",
      }}
    >
      {/* 노선 헤더 */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 18px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "22px", lineHeight: 1 }}>{route.emoji}</span>
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              fontWeight: 500,
              marginBottom: "2px",
            }}
          >
            {route.from}
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-1)",
              fontWeight: 800,
            }}
          >
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
              style={{
                padding: "14px 18px",
                borderBottom: isLast ? "none" : "1px solid var(--border)",
              }}
            >
              {/* 이름 + 배지 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-1)",
                  }}
                >
                  {opt.name}
                </span>
                {badges.map((b) => (
                  <Badge key={b} type={b} />
                ))}
              </div>

              {/* 메타 정보 행 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  marginBottom: opt.tip ? "8px" : "0",
                }}
              >
                <MetaItem icon="⏱" value={opt.time} />
                <MetaItem icon="💴" value={opt.fare} />
                {opt.interval && <MetaItem icon="🔄" value={opt.interval} />}
              </div>

              {/* 팁 */}
              {opt.tip && (
                <div
                  style={{
                    background: "var(--surface)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    fontSize: "11px",
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                  }}
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
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "12px 18px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "8px",
            }}
          >
            유의사항
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {route.tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "11px",
                  color: "var(--text-2)",
                  lineHeight: 1.6,
                  marginBottom: i < route.tips.length - 1 ? "4px" : 0,
                }}
              >
                <span style={{ color: "var(--text-3)", flexShrink: 0 }}>•</span>
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        color: "var(--text-2)",
      }}
    >
      <span style={{ fontSize: "13px" }}>{icon}</span>
      <span style={{ fontWeight: 600, color: "var(--text-1)" }}>{value}</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// IC카드 탭
// ─────────────────────────────────────────────

function ICCardTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 설명 */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
          fontSize: "13px",
          color: "var(--text-2)",
          lineHeight: 1.7,
        }}
      >
        {IC_CARD_GUIDE.desc}
      </div>

      {/* 카드 종류 */}
      <section>
        <SectionTitle>카드 종류</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {IC_CARD_GUIDE.types.map((card) => {
            const isWelcome = card.name === "Suica" && card.note?.includes("Welcome Suica");
            return (
              <div
                key={card.name}
                style={{
                  background: "var(--card)",
                  border: isWelcome
                    ? "2px solid var(--accent, #6c5ce7)"
                    : "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "14px 16px",
                  boxShadow: "0 1px 6px rgba(0,0,0,.06)",
                  position: "relative",
                }}
              >
                {isWelcome && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "14px",
                      background: "var(--accent, #6c5ce7)",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 800,
                      borderRadius: "999px",
                      padding: "2px 8px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    외국인 전용
                  </span>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "var(--text-1)",
                    }}
                  >
                    {card.name}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-3)" }}
                  >
                    {card.nameJp}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "4px 12px",
                    fontSize: "12px",
                    marginBottom: card.note ? "10px" : 0,
                  }}
                >
                  <span style={{ color: "var(--text-3)", whiteSpace: "nowrap" }}>사용지역</span>
                  <span style={{ color: "var(--text-1)" }}>{card.region}</span>
                  <span style={{ color: "var(--text-3)", whiteSpace: "nowrap" }}>구매처</span>
                  <span style={{ color: "var(--text-1)" }}>{card.where}</span>
                  <span style={{ color: "var(--text-3)", whiteSpace: "nowrap" }}>보증금</span>
                  <span style={{ color: "var(--text-1)" }}>{card.deposit}</span>
                </div>

                {card.note && (
                  <div
                    style={{
                      background: "var(--surface)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      fontSize: "11px",
                      color: "var(--text-2)",
                      lineHeight: 1.65,
                    }}
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
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {IC_CARD_GUIDE.howToUse.map((step, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "12px",
                  color: "var(--text-2)",
                  lineHeight: 1.65,
                  marginBottom: i < IC_CARD_GUIDE.howToUse.length - 1 ? "10px" : 0,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "var(--accent, #6c5ce7)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 800,
                    marginTop: "1px",
                  }}
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
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "14px 16px",
            fontSize: "12px",
            color: "var(--text-2)",
            lineHeight: 1.7,
          }}
        >
          <span style={{ marginRight: "6px" }}>💴</span>
          {IC_CARD_GUIDE.refund}
        </div>
      </section>

      {/* 실용 팁 */}
      <section>
        <SectionTitle>실용 팁</SectionTitle>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {IC_CARD_GUIDE.tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "12px",
                  color: "var(--text-2)",
                  lineHeight: 1.65,
                  marginBottom: i < IC_CARD_GUIDE.tips.length - 1 ? "8px" : 0,
                }}
              >
                <span style={{ color: "#fdcb6e", flexShrink: 0 }}>★</span>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {cityKeys.map((cityKey) => {
        const airportMap = CITY_TO_AIRPORT[cityKey] as Record<
          string,
          { title: string; tips: string[] }
        >;

        return (
          <section key={cityKey}>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "var(--text-1)",
                marginBottom: "12px",
              }}
            >
              {CITY_LABEL[cityKey] ?? cityKey}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(airportMap).map(([apKey, data]) => (
                <div
                  key={apKey}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 1px 6px rgba(0,0,0,.06)",
                  }}
                >
                  <div
                    style={{
                      background: "var(--surface)",
                      borderBottom: "1px solid var(--border)",
                      padding: "11px 16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--text-1)",
                      }}
                    >
                      {data.title}
                    </p>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "14px 16px",
                      margin: 0,
                    }}
                  >
                    {data.tips.map((tip, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "8px",
                          fontSize: "12px",
                          color: "var(--text-2)",
                          lineHeight: 1.65,
                          marginBottom: i < data.tips.length - 1 ? "8px" : 0,
                        }}
                      >
                        <span
                          style={{
                            color: "#74b9ff",
                            flexShrink: 0,
                            fontSize: "10px",
                            marginTop: "3px",
                          }}
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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 800,
          color: "var(--text-1)",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tips.map((tip, i) => {
            const colon = tip.indexOf(":");
            const label = colon !== -1 ? tip.slice(0, colon) : null;
            const body = colon !== -1 ? tip.slice(colon + 1).trim() : tip;

            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "12px",
                  color: "var(--text-2)",
                  lineHeight: 1.65,
                  marginBottom: i < tips.length - 1 ? "10px" : 0,
                  paddingBottom: i < tips.length - 1 ? "10px" : 0,
                  borderBottom:
                    i < tips.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: accentColor,
                    marginTop: "6px",
                  }}
                />
                <span>
                  {label && (
                    <span
                      style={{
                        fontWeight: 700,
                        color: "var(--text-1)",
                        marginRight: "4px",
                      }}
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
    <h3
      style={{
        fontSize: "13px",
        fontWeight: 700,
        color: "var(--text-1)",
        marginBottom: "10px",
      }}
    >
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
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        padding: "0 16px 16px",
        scrollbarWidth: "none",
      }}
    >
      {TABS.map((t) => {
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "7px 14px",
              borderRadius: "999px",
              border: active ? "none" : "1px solid var(--border)",
              background: active
                ? "linear-gradient(135deg,#6c5ce7,#a29bfe)"
                : "var(--card)",
              color: active ? "#fff" : "var(--text-2)",
              fontSize: "12px",
              fontWeight: active ? 700 : 500,
              cursor: "pointer",
              boxShadow: active
                ? "0 3px 10px rgba(108,92,231,.35)"
                : "0 1px 3px rgba(0,0,0,.06)",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
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
    <div
      style={{
        paddingTop: "12px",
        paddingBottom: "112px",
      }}
    >
      {/* 헤더 */}
      <div style={{ padding: "0 16px", marginBottom: "4px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 900,
            color: "var(--text-1)",
            marginBottom: "4px",
          }}
        >
          일본 교통 안내
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
          IC카드 · 공항 교통 · 시내 이동 한눈에
        </p>
      </div>

      {/* 탭 바 */}
      <div style={{ paddingTop: "14px" }}>
        <TabBar tab={tab} onSelect={setTab} />
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ padding: "0 16px" }}>
        {tab === "ic"       && <ICCardTab />}
        {tab === "osaka"    && <AirportTab routes={OSAKA_AIRPORT_ROUTES} />}
        {tab === "fukuoka"  && <AirportTab routes={FUKUOKA_AIRPORT_ROUTES} />}
        {tab === "return"   && <CityToAirportTab />}
        {tab === "tips"     && <TipsTab />}
      </div>
    </div>
  );
}
