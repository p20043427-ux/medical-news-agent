"use client";

import { useState } from "react";
import { OSAKA } from "@/lib/travel/osaka";
import { FUKUOKA } from "@/lib/travel/fukuoka";
import type { CityGuide, TravelSpot, TravelFood } from "@/lib/travel/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const CITIES: CityGuide[] = [OSAKA, FUKUOKA];

type SubTab = "spots" | "food" | "shopping" | "tips";

const SUB_TABS: { key: SubTab; label: string; icon: string }[] = [
  { key: "spots", label: "관광지", icon: "🗺️" },
  { key: "food", label: "맛집", icon: "🍜" },
  { key: "shopping", label: "쇼핑", icon: "🛍️" },
  { key: "tips", label: "팁", icon: "💡" },
];

// ─── City gradient map ────────────────────────────────────────────────────────

const CITY_GRADIENT: Record<string, string> = {
  osaka:
    "linear-gradient(135deg, #c0392b 0%, #e67e22 50%, #f39c12 100%)",
  fukuoka:
    "linear-gradient(135deg, #8e44ad 0%, #e91e8c 50%, #f06292 100%)",
};

// ─── Rank badge color ─────────────────────────────────────────────────────────

function rankStyle(rank: number): {
  bg: string;
  color: string;
  border: string;
} {
  if (rank === 1)
    return { bg: "#fef3c7", color: "#92400e", border: "#f59e0b" };
  if (rank === 2)
    return { bg: "#f1f5f9", color: "#475569", border: "#94a3b8" };
  if (rank === 3)
    return { bg: "#fff7ed", color: "#9a3412", border: "#fb923c" };
  return { bg: "var(--surface)", color: "var(--text-3)", border: "var(--border)" };
}

// ─── Price range badge ────────────────────────────────────────────────────────

function PriceRangeBadge({ range }: { range: string }) {
  let bg = "var(--surface)";
  let color = "var(--text-3)";
  if (range === "¥") { bg = "#dcfce7"; color = "#166534"; }
  else if (range === "¥¥") { bg = "#fef9c3"; color = "#713f12"; }
  else if (range === "¥¥¥") { bg = "#fee2e2"; color = "#991b1b"; }
  else if (range === "무료") { bg = "#dbeafe"; color = "#1e40af"; }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: 99,
        background: bg,
        color,
        flexShrink: 0,
      }}
    >
      {range}
    </span>
  );
}

// ─── Tag Pill ─────────────────────────────────────────────────────────────────

function TagPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 99,
        background: "var(--surface)",
        color: "var(--text-2)",
        border: "1px solid var(--border)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 13,
      }}
    >
      <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
      <span style={{ fontWeight: 700, color: "var(--text-1)", fontSize: 14 }}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span style={{ color: "var(--text-3)", fontSize: 12 }}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </span>
  );
}

// ─── Spot Card (Tabelog style) ────────────────────────────────────────────────

function SpotCard({ spot, index }: { spot: TravelSpot; index: number }) {
  const [open, setOpen] = useState(false);

  const displayRank = spot.rank ?? index + 1;
  const rs = rankStyle(displayRank);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Main row */}
      <div style={{ padding: "14px 16px 0" }}>
        {/* Top: rank + tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          {/* Rank badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 28,
              height: 22,
              borderRadius: 6,
              background: rs.bg,
              color: rs.color,
              border: `1px solid ${rs.border}`,
              fontSize: 11,
              fontWeight: 800,
              padding: "0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            #{displayRank}
          </span>
          {/* Tags */}
          {spot.tags?.map((tag, i) => <TagPill key={i} label={tag} />)}
        </div>

        {/* Name row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 800,
              color: "var(--text-1)",
              lineHeight: 1.3,
            }}
          >
            {spot.name}
          </h3>
          <span
            style={{
              fontSize: 13,
              color: "var(--text-3)",
              fontWeight: 400,
            }}
          >
            {spot.nameJp}
          </span>
        </div>

        {/* Rating + price row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          {spot.rating !== undefined && (
            <StarRating rating={spot.rating} reviewCount={spot.reviewCount} />
          )}
          {spot.priceRange && (
            <>
              <span style={{ color: "var(--border)", fontSize: 12 }}>·</span>
              <PriceRangeBadge range={spot.priceRange} />
            </>
          )}
        </div>

        {/* Station distance */}
        {spot.timeFromStation && (
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              color: "var(--text-3)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>📍</span>
            {spot.timeFromStation}
          </p>
        )}

        {/* Description (2-line clamp when closed) */}
        <p
          style={{
            margin: "0 0 10px",
            fontSize: 13,
            color: "var(--text-2)",
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: open ? undefined : 2,
            WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"],
            overflow: open ? "visible" : "hidden",
          }}
        >
          {spot.desc}
        </p>
      </div>

      {/* Info chips row */}
      {(spot.access || spot.hours || spot.fee) && (
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: "0 16px 10px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {spot.access && (
            <InfoChip icon="🚇" text={spot.access} />
          )}
          {spot.hours && (
            <InfoChip icon="🕐" text={spot.hours} />
          )}
          {spot.fee && (
            <InfoChip icon="💴" text={spot.fee} />
          )}
        </div>
      )}

      {/* Expandable: tips */}
      {open && spot.tips.length > 0 && (
        <div
          style={{
            margin: "0 16px 14px",
            background: "var(--surface)",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <p
            style={{
              margin: "0 0 7px",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
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
                  lineHeight: 1.7,
                  marginBottom: i < spot.tips.length - 1 ? 4 : 0,
                }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* More toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          padding: "9px 16px",
          background: "var(--surface)",
          border: "none",
          borderTop: "1px solid var(--border)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-3)",
          transition: "background 0.1s",
        }}
      >
        {open ? "▲ 접기" : "▼ 더보기"}
      </button>
    </div>
  );
}

// ─── Info Chip ────────────────────────────────────────────────────────────────

function InfoChip({ icon, text }: { icon: string; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "5px 10px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 99,
        fontSize: 11,
        color: "var(--text-2)",
        whiteSpace: "nowrap",
        flexShrink: 0,
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </span>
  );
}

// ─── Food Card (Tabelog style) ────────────────────────────────────────────────

function FoodCard({ food, index }: { food: TravelFood; index: number }) {
  const displayRank = food.rank ?? index + 1;
  const rs = rankStyle(displayRank);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top row: rank + name + price badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 7,
        }}
      >
        {/* Rank badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 28,
            height: 22,
            borderRadius: 6,
            background: rs.bg,
            color: rs.color,
            border: `1px solid ${rs.border}`,
            fontSize: 11,
            fontWeight: 800,
            padding: "0 6px",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          #{displayRank}
        </span>

        {/* Name block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 7,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--text-1)",
              }}
            >
              {food.name}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-3)" }}>
              {food.nameJp}
            </span>
          </div>
        </div>

        {/* Price range badge */}
        {food.priceRange && (
          <PriceRangeBadge range={food.priceRange} />
        )}
      </div>

      {/* Tags */}
      {food.tags && food.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          {food.tags.map((tag, i) => <TagPill key={i} label={tag} />)}
        </div>
      )}

      {/* Rating + avg price */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
          flexWrap: "wrap",
        }}
      >
        {food.rating !== undefined && (
          <StarRating rating={food.rating} reviewCount={food.reviewCount} />
        )}
        {food.avgPrice && (
          <>
            {food.rating !== undefined && (
              <span style={{ color: "var(--border)", fontSize: 12 }}>·</span>
            )}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-2)",
                background: "var(--surface)",
                borderRadius: 6,
                padding: "2px 8px",
                border: "1px solid var(--border)",
              }}
            >
              {food.avgPrice}
            </span>
          </>
        )}
      </div>

      {/* Description */}
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

      {/* Area/recommended spots */}
      {food.area && (
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--text-3)",
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <span style={{ flexShrink: 0 }}>📍</span>
          <span>{food.area}</span>
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
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              🛍️
            </span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 15,
                  color: "var(--text-1)",
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  margin: "1px 0 0",
                  fontSize: 12,
                  color: "var(--text-3)",
                }}
              >
                {item.nameJp}
              </p>
            </div>
          </div>
          <p
            style={{
              margin: "8px 0 0",
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

const TIP_ICONS = ["💡", "🎯", "💳", "🗺️", "⏰", "🍱", "🚇", "📱"];

function TipsList({ tips }: { tips: string[] }) {
  return (
    <div>
      {tips.map((tip, i) => (
        <div
          key={i}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
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
            {TIP_ICONS[i % TIP_ICONS.length]}
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--text-2)",
              lineHeight: 1.75,
            }}
          >
            {tip}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Header Card (city gradient) ─────────────────────────────────────────────

function HeaderCard({ guide }: { guide: CityGuide }) {
  const { basics } = guide;
  const gradient =
    CITY_GRADIENT[guide.key] ?? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  return (
    <div style={{ marginBottom: 18 }}>
      {/* Gradient hero */}
      <div
        style={{
          background: gradient,
          borderRadius: 16,
          padding: "22px 20px 20px",
          marginBottom: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: 60,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 26,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          {guide.emoji} {guide.name}
          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginLeft: 10,
              opacity: 0.85,
            }}
          >
            {guide.nameJp}
          </span>
        </h2>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 600,
          }}
        >
          {guide.tagline}
        </p>

        {/* Basics info row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <BasicBadge icon="✈️" text={basics.airportCode} />
          <BasicBadge icon="🕐" text={basics.timezone.split(" ")[0]} />
          <BasicBadge icon="💴" text={basics.currency.split("—")[0].trim()} />
          <BasicBadge icon="🆘" text={basics.emergency.split("/")[0].trim()} />
        </div>
      </div>

      {/* Overview */}
      <div
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
            margin: 0,
            fontSize: 13,
            color: "var(--text-2)",
            lineHeight: 1.8,
          }}
        >
          {guide.overview}
        </p>
      </div>

      {/* Basics tips */}
      {basics.tips.length > 0 && (
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            필수 정보
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {basics.tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  fontSize: 12,
                  color: "var(--text-2)",
                  lineHeight: 1.7,
                  marginBottom: i < basics.tips.length - 1 ? 5 : 0,
                }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BasicBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 10px",
        background: "rgba(255,255,255,0.18)",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        color: "#fff",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      {icon} {text}
    </span>
  );
}

// ─── Sort helper ──────────────────────────────────────────────────────────────

function sortByRank<T extends { rank?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ra = a.rank ?? Infinity;
    const rb = b.rank ?? Infinity;
    return ra - rb;
  });
}

// ─── City Content ─────────────────────────────────────────────────────────────

function CityContent({ guide }: { guide: CityGuide }) {
  const [subTab, setSubTab] = useState<SubTab>("spots");

  const sortedSpots = sortByRank(guide.spots);
  const sortedFood = sortByRank(guide.food);

  return (
    <div>
      <HeaderCard guide={guide} />

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 18,
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
                padding: "8px 16px",
                borderRadius: 99,
                border: active
                  ? "1.5px solid var(--primary, #2563eb)"
                  : "1.5px solid var(--border)",
                background: active
                  ? "var(--primary, #2563eb)"
                  : "var(--card)",
                color: active ? "#fff" : "var(--text-2)",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section header */}
      {subTab === "spots" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              🏆 인기 관광지 순위
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                background: "var(--surface)",
                borderRadius: 99,
                padding: "2px 8px",
                border: "1px solid var(--border)",
              }}
            >
              {sortedSpots.length}개
            </span>
          </div>
          {sortedSpots.map((spot, i) => (
            <SpotCard key={spot.name} spot={spot} index={i} />
          ))}
        </>
      )}

      {subTab === "food" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              🍴 인기 맛집 순위
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                background: "var(--surface)",
                borderRadius: 99,
                padding: "2px 8px",
                border: "1px solid var(--border)",
              }}
            >
              {sortedFood.length}개
            </span>
          </div>
          {sortedFood.map((food, i) => (
            <FoodCard key={food.name} food={food} index={i} />
          ))}
        </>
      )}

      {subTab === "shopping" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              🛍️ 쇼핑 명소
            </span>
          </div>
          <ShoppingList items={guide.shopping} />
        </>
      )}

      {subTab === "tips" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              💡 여행 팁
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                background: "var(--surface)",
                borderRadius: 99,
                padding: "2px 8px",
                border: "1px solid var(--border)",
              }}
            >
              {guide.tips.length}개
            </span>
          </div>
          <TipsList tips={guide.tips} />
        </>
      )}
    </div>
  );
}

// ─── GuideView (main export) ──────────────────────────────────────────────────

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
      {/* City selector — sticky */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex" }}>
          {CITIES.map((city) => {
            const active = city.key === cityKey;
            return (
              <button
                key={city.key}
                onClick={() => setCityKey(city.key)}
                style={{
                  flex: 1,
                  padding: "13px 8px 12px",
                  background: "none",
                  border: "none",
                  borderBottom: active
                    ? "2.5px solid var(--primary, #2563eb)"
                    : "2.5px solid transparent",
                  color: active
                    ? "var(--primary, #2563eb)"
                    : "var(--text-3)",
                  fontSize: 14,
                  fontWeight: active ? 800 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  marginBottom: -1,
                  letterSpacing: active ? "0" : "0",
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
          padding: "20px 16px 60px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <CityContent key={activeGuide.key} guide={activeGuide} />
      </div>
    </div>
  );
}
