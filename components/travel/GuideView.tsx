"use client";

import { useState } from "react";
import { OSAKA } from "@/lib/travel/osaka";
import { FUKUOKA } from "@/lib/travel/fukuoka";
import { CityGuide, TravelSpot, TravelFood } from "@/lib/travel/types";

// ─── City Tab ────────────────────────────────────────────────────────────────

const CITIES: CityGuide[] = [OSAKA, FUKUOKA];

// ─── Sub-tab keys ────────────────────────────────────────────────────────────

type SubTab = "spots" | "food" | "shopping" | "tips";

const SUB_TABS: { key: SubTab; label: string }[] = [
  { key: "spots", label: "관광지" },
  { key: "food", label: "음식" },
  { key: "shopping", label: "쇼핑" },
  { key: "tips", label: "팁" },
];

// ─── Spot Card ───────────────────────────────────────────────────────────────

function SpotCard({ spot }: { spot: TravelSpot }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "14px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 15,
              color: "var(--text-1)",
            }}
          >
            {spot.name}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 12,
              color: "var(--text-3)",
            }}
          >
            {spot.nameJp}
          </p>
        </div>
        <span
          style={{
            color: "var(--text-3)",
            fontSize: 18,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {open ? "▲" : "▼"}
        </span>
      </button>

      <div
        style={{
          padding: open ? "0 16px 16px" : "0 16px",
          maxHeight: open ? 1000 : 0,
          overflow: "hidden",
          transition: "max-height 0.25s ease, padding 0.2s ease",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 13,
            color: "var(--text-2)",
            lineHeight: 1.7,
          }}
        >
          {spot.desc}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {spot.access && (
            <InfoBadge icon="🚇" label="접근" value={spot.access} full />
          )}
          {spot.hours && (
            <InfoBadge icon="🕐" label="시간" value={spot.hours} />
          )}
          {spot.fee && (
            <InfoBadge icon="💴" label="요금" value={spot.fee} />
          )}
        </div>

        {spot.tips.length > 0 && (
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              실용 팁
            </p>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {spot.tips.map((tip, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                    marginBottom: i < spot.tips.length - 1 ? 4 : 0,
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Info Badge ──────────────────────────────────────────────────────────────

function InfoBadge({
  icon,
  label,
  value,
  full,
}: {
  icon: string;
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: full ? "1 / -1" : undefined,
        background: "var(--surface)",
        borderRadius: 8,
        padding: "8px 10px",
      }}
    >
      <p
        style={{
          margin: "0 0 2px",
          fontSize: 11,
          color: "var(--text-3)",
          fontWeight: 600,
        }}
      >
        {icon} {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: "var(--text-2)",
          lineHeight: 1.5,
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Food Card ───────────────────────────────────────────────────────────────

function FoodCard({ food }: { food: TravelFood }) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 15,
              color: "var(--text-1)",
            }}
          >
            {food.name}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 12,
              color: "var(--text-3)",
            }}
          >
            {food.nameJp}
          </p>
        </div>
        {food.avgPrice && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-2)",
              background: "var(--surface)",
              borderRadius: 6,
              padding: "3px 8px",
              whiteSpace: "nowrap",
              marginLeft: 8,
              flexShrink: 0,
            }}
          >
            {food.avgPrice}
          </span>
        )}
      </div>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: 13,
          color: "var(--text-2)",
          lineHeight: 1.7,
        }}
      >
        {food.desc}
      </p>

      {food.area && (
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--text-3)",
          }}
        >
          📍 {food.area}
        </p>
      )}
    </div>
  );
}

// ─── Shopping List ────────────────────────────────────────────────────────────

function ShoppingList({
  items,
}: {
  items: { name: string; nameJp: string; desc: string }[];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 10,
          }}
        >
          <p
            style={{
              margin: "0 0 2px",
              fontWeight: 700,
              fontSize: 15,
              color: "var(--text-1)",
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              color: "var(--text-3)",
            }}
          >
            {item.nameJp}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--text-2)",
              lineHeight: 1.7,
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Tips List ────────────────────────────────────────────────────────────────

function TipsList({ tips }: { tips: string[] }) {
  return (
    <div>
      {tips.map((tip, i) => (
        <div
          key={i}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 10,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: 18,
              lineHeight: 1,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            💡
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--text-2)",
              lineHeight: 1.7,
            }}
          >
            {tip}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Header Card ─────────────────────────────────────────────────────────────

function HeaderCard({ guide }: { guide: CityGuide }) {
  const { basics } = guide;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <h2
          style={{
            margin: "0 0 2px",
            fontSize: 22,
            fontWeight: 800,
            color: "var(--text-1)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {guide.emoji} {guide.name}
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "var(--text-3)",
            }}
          >
            {guide.nameJp}
          </span>
        </h2>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-3)",
          }}
        >
          {guide.tagline}
        </p>
      </div>

      <p
        style={{
          margin: "0 0 16px",
          fontSize: 13,
          color: "var(--text-2)",
          lineHeight: 1.75,
        }}
      >
        {guide.overview}
      </p>

      <div
        style={{
          background: "var(--surface)",
          borderRadius: 10,
          padding: "12px 14px",
        }}
      >
        <p
          style={{
            margin: "0 0 10px",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          기본 정보
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <BasicRow icon="✈️" label="공항" value={`${basics.airport} (${basics.airportCode})`} />
          <BasicRow icon="⏰" label="시간대" value={basics.timezone} />
          <BasicRow icon="💴" label="통화" value={basics.currency} />
          <BasicRow icon="🗣️" label="언어" value={basics.language} />
          <BasicRow icon="🚨" label="긴급연락" value={basics.emergency} />
        </div>

        {basics.tips.length > 0 && (
          <>
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "12px 0",
              }}
            />
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              필수 팁
            </p>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {basics.tips.map((tip, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                    marginBottom: i < basics.tips.length - 1 ? 5 : 0,
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function BasicRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <span style={{ fontSize: 13, flexShrink: 0, lineHeight: 1.55 }}>
        {icon}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-3)",
          flexShrink: 0,
          lineHeight: 1.55,
          minWidth: 48,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "var(--text-2)",
          lineHeight: 1.55,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── City Content ─────────────────────────────────────────────────────────────

function CityContent({ guide }: { guide: CityGuide }) {
  const [subTab, setSubTab] = useState<SubTab>("spots");

  return (
    <div>
      <HeaderCard guide={guide} />

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 16,
          overflowX: "auto",
          paddingBottom: 2,
          scrollbarWidth: "none",
        }}
      >
        {SUB_TABS.map((tab) => {
          const active = subTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSubTab(tab.key)}
              style={{
                flexShrink: 0,
                padding: "7px 16px",
                borderRadius: 20,
                border: active
                  ? "1.5px solid var(--text-1)"
                  : "1.5px solid var(--border)",
                background: active ? "var(--text-1)" : "var(--card)",
                color: active ? "var(--bg)" : "var(--text-2)",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      {subTab === "spots" && (
        <div>
          {guide.spots.map((spot, i) => (
            <SpotCard key={i} spot={spot} />
          ))}
        </div>
      )}

      {subTab === "food" && (
        <div>
          {guide.food.map((food, i) => (
            <FoodCard key={i} food={food} />
          ))}
        </div>
      )}

      {subTab === "shopping" && <ShoppingList items={guide.shopping} />}

      {subTab === "tips" && <TipsList tips={guide.tips} />}
    </div>
  );
}

// ─── GuideView (main export) ─────────────────────────────────────────────────

export default function GuideView() {
  const [cityKey, setCityKey] = useState<string>(CITIES[0].key);

  const activeGuide = CITIES.find((c) => c.key === cityKey) ?? CITIES[0];

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* City selector */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          padding: "12px 16px 0",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {CITIES.map((city) => {
            const active = city.key === cityKey;
            return (
              <button
                key={city.key}
                onClick={() => setCityKey(city.key)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  background: "none",
                  border: "none",
                  borderBottom: active
                    ? "2px solid var(--text-1)"
                    : "2px solid transparent",
                  color: active ? "var(--text-1)" : "var(--text-3)",
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                  paddingBottom: 10,
                  marginBottom: -1,
                }}
              >
                {city.emoji} {city.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px 40px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <CityContent key={activeGuide.key} guide={activeGuide} />
      </div>
    </div>
  );
}
