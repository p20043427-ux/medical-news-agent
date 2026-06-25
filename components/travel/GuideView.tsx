"use client";

import { useState } from "react";
import { OSAKA } from "@/lib/travel/osaka";
import { FUKUOKA } from "@/lib/travel/fukuoka";
import { TOKYO } from "@/lib/travel/tokyo";
import type { CityGuide, TravelSpot, TravelFood } from "@/lib/travel/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const CITIES: CityGuide[] = [TOKYO, OSAKA, FUKUOKA];

type SubTab = "spots" | "food" | "shopping" | "tips";

const SUB_TABS: { key: SubTab; label: string; icon: string }[] = [
  { key: "spots", label: "관광지", icon: "🗺️" },
  { key: "food", label: "맛집", icon: "🍜" },
  { key: "shopping", label: "쇼핑", icon: "🛍️" },
  { key: "tips", label: "팁", icon: "💡" },
];

// ─── City gradient map ────────────────────────────────────────────────────────

const CITY_GRADIENT: Record<string, string> = {
  tokyo:
    "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
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
      className="inline-flex flex-shrink-0 items-center rounded-full px-[7px] py-0.5 text-[11px] font-bold"
      style={{ background: bg, color }}
    >
      {range}
    </span>
  );
}

// ─── Tag Pill ─────────────────────────────────────────────────────────────────

function TagPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{
        background: "var(--surface)",
        color: "var(--text-2)",
        border: "1px solid var(--border)",
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
    <span className="inline-flex items-center gap-1 text-[13px]">
      <span className="text-[14px]" style={{ color: "#f59e0b" }}>★</span>
      <span className="text-[14px] font-bold" style={{ color: "var(--text-1)" }}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-[12px]" style={{ color: "var(--text-3)" }}>
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
      className="mb-3 overflow-hidden rounded-[14px] shadow-sm"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Main row */}
      <div className="px-4 pt-[14px]">
        {/* Top: rank + tags */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {/* Rank badge */}
          <span
            className="inline-flex h-[22px] min-w-[28px] items-center justify-center rounded-md px-1.5 text-[11px] font-extrabold tracking-tight"
            style={{
              background: rs.bg,
              color: rs.color,
              border: `1px solid ${rs.border}`,
            }}
          >
            #{displayRank}
          </span>
          {/* Tags */}
          {spot.tags?.map((tag, i) => <TagPill key={i} label={tag} />)}
        </div>

        {/* Name row */}
        <div className="mb-1.5 flex items-baseline gap-2">
          <h3
            className="m-0 text-[17px] font-extrabold leading-[1.3]"
            style={{ color: "var(--text-1)" }}
          >
            {spot.name}
          </h3>
          <span
            className="text-[13px] font-normal"
            style={{ color: "var(--text-3)" }}
          >
            {spot.nameJp}
          </span>
        </div>

        {/* Rating + price row */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {spot.rating !== undefined && (
            <StarRating rating={spot.rating} reviewCount={spot.reviewCount} />
          )}
          {spot.priceRange && (
            <>
              <span className="text-[12px]" style={{ color: "var(--border)" }}>·</span>
              <PriceRangeBadge range={spot.priceRange} />
            </>
          )}
        </div>

        {/* Station distance */}
        {spot.timeFromStation && (
          <p
            className="m-0 mb-2 flex items-center gap-1 text-[12px]"
            style={{ color: "var(--text-3)" }}
          >
            <span>📍</span>
            {spot.timeFromStation}
          </p>
        )}

        {/* Description (2-line clamp when closed) */}
        <p
          className="m-0 mb-2.5 overflow-hidden text-[13px] leading-[1.7]"
          style={{
            color: "var(--text-2)",
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
          className="flex gap-1.5 overflow-x-auto px-4 pb-2.5"
          style={{ scrollbarWidth: "none" }}
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
          className="mx-4 mb-[14px] rounded-[10px] px-3 py-2.5"
          style={{ background: "var(--surface)" }}
        >
          <p
            className="m-0 mb-[7px] text-[11px] font-bold uppercase tracking-[0.06em]"
            style={{ color: "var(--text-3)" }}
          >
            실용 팁
          </p>
          <ul className="m-0 pl-4">
            {spot.tips.map((tip, i) => (
              <li
                key={i}
                className="text-[12px] leading-[1.7]"
                style={{
                  color: "var(--text-2)",
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
        className="flex w-full cursor-pointer items-center justify-center gap-[5px] px-4 py-[9px] text-[12px] font-semibold transition-[background] duration-100"
        style={{
          background: "var(--surface)",
          border: "none",
          borderTop: "1px solid var(--border)",
          color: "var(--text-3)",
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
      className="inline-flex max-w-[200px] flex-shrink-0 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-2.5 py-[5px] text-[11px]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-2)",
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
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
      className="mb-2.5 rounded-[14px] px-4 py-[14px] shadow-sm"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Top row: rank + name + price badge */}
      <div className="mb-[7px] flex items-start gap-2.5">
        {/* Rank badge */}
        <span
          className="mt-0.5 inline-flex h-[22px] min-w-[28px] flex-shrink-0 items-center justify-center rounded-md px-1.5 text-[11px] font-extrabold"
          style={{
            background: rs.bg,
            color: rs.color,
            border: `1px solid ${rs.border}`,
          }}
        >
          #{displayRank}
        </span>

        {/* Name block */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-[7px]">
            <span
              className="text-[16px] font-extrabold"
              style={{ color: "var(--text-1)" }}
            >
              {food.name}
            </span>
            <span className="text-[13px]" style={{ color: "var(--text-3)" }}>
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
        <div className="mb-2 flex flex-wrap gap-[5px]">
          {food.tags.map((tag, i) => <TagPill key={i} label={tag} />)}
        </div>
      )}

      {/* Rating + avg price */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {food.rating !== undefined && (
          <StarRating rating={food.rating} reviewCount={food.reviewCount} />
        )}
        {food.avgPrice && (
          <>
            {food.rating !== undefined && (
              <span className="text-[12px]" style={{ color: "var(--border)" }}>·</span>
            )}
            <span
              className="rounded-md px-2 py-0.5 text-[12px] font-semibold"
              style={{
                color: "var(--text-2)",
                background: "var(--surface)",
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
        className="m-0 mb-2 text-[13px] leading-[1.7]"
        style={{ color: "var(--text-2)" }}
      >
        {food.desc}
      </p>

      {/* Area/recommended spots */}
      {food.area && (
        <p
          className="m-0 flex items-start gap-1 text-[12px]"
          style={{ color: "var(--text-3)" }}
        >
          <span className="flex-shrink-0">📍</span>
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
          className="mb-2.5 rounded-[14px] px-4 py-[14px] shadow-sm"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="mb-1 flex items-center gap-2.5">
            <span
              className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[15px]"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              🛍️
            </span>
            <div>
              <p
                className="m-0 text-[15px] font-extrabold"
                style={{ color: "var(--text-1)" }}
              >
                {item.name}
              </p>
              <p
                className="m-0 mt-px text-[12px]"
                style={{ color: "var(--text-3)" }}
              >
                {item.nameJp}
              </p>
            </div>
          </div>
          <p
            className="m-0 mt-2 text-[13px] leading-[1.7]"
            style={{ color: "var(--text-2)" }}
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
          className="mb-2.5 flex items-start gap-3 rounded-[14px] px-4 py-[14px] shadow-sm"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="mt-px flex-shrink-0 text-[18px] leading-none">
            {TIP_ICONS[i % TIP_ICONS.length]}
          </span>
          <p
            className="m-0 text-[13px] leading-[1.75]"
            style={{ color: "var(--text-2)" }}
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
    <div className="mb-[18px]">
      {/* Gradient hero */}
      <div
        className="relative mb-3 overflow-hidden rounded-2xl px-5 pb-5 pt-[22px]"
        style={{ background: gradient }}
      >
        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-[30px] -top-[30px] h-[120px] w-[120px] rounded-full"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-5 left-[60px] h-20 w-20 rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        <h2
          className="m-0 mb-1 text-[26px] font-black tracking-tight"
          style={{ color: "#fff" }}
        >
          {guide.emoji} {guide.name}
          <span className="ml-2.5 text-[16px] font-normal opacity-85">
            {guide.nameJp}
          </span>
        </h2>
        <p
          className="m-0 mb-4 text-[13px] font-semibold"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          {guide.tagline}
        </p>

        {/* Basics info row */}
        <div className="flex flex-wrap gap-2">
          <BasicBadge icon="✈️" text={basics.airportCode} />
          <BasicBadge icon="🕐" text={basics.timezone.split(" ")[0]} />
          <BasicBadge icon="💴" text={basics.currency.split("—")[0].trim()} />
          <BasicBadge icon="🆘" text={basics.emergency.split("/")[0].trim()} />
        </div>
      </div>

      {/* Overview */}
      <div
        className="mb-2.5 rounded-xl px-4 py-[14px]"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <p
          className="m-0 text-[13px] leading-[1.8]"
          style={{ color: "var(--text-2)" }}
        >
          {guide.overview}
        </p>
      </div>

      {/* Basics tips */}
      {basics.tips.length > 0 && (
        <div
          className="rounded-xl px-4 py-[14px]"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="m-0 mb-2.5 text-[11px] font-bold uppercase tracking-[0.06em]"
            style={{ color: "var(--text-3)" }}
          >
            필수 정보
          </p>
          <ul className="m-0 pl-[18px]">
            {basics.tips.map((tip, i) => (
              <li
                key={i}
                className="text-[12px] leading-[1.7]"
                style={{
                  color: "var(--text-2)",
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
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold backdrop-blur-[4px]"
      style={{
        background: "rgba(255,255,255,0.18)",
        color: "#fff",
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
        className="mb-[18px] flex gap-1.5 overflow-x-auto pb-0.5"
        style={{ scrollbarWidth: "none" }}
      >
        {SUB_TABS.map((tab) => {
          const active = subTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSubTab(tab.key)}
              className="flex flex-shrink-0 cursor-pointer items-center gap-[5px] rounded-full px-4 py-2 text-[13px] transition-all duration-150 ease-in-out"
              style={{
                border: active
                  ? "1.5px solid var(--primary, #2563eb)"
                  : "1.5px solid var(--border)",
                background: active
                  ? "var(--primary, #2563eb)"
                  : "var(--card)",
                color: active ? "#fff" : "var(--text-2)",
                fontWeight: active ? 700 : 500,
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
          <div className="mb-[14px] flex items-center gap-2">
            <span
              className="text-[13px] font-bold"
              style={{ color: "var(--text-1)" }}
            >
              🏆 인기 관광지 순위
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[12px]"
              style={{
                color: "var(--text-3)",
                background: "var(--surface)",
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
          <div className="mb-[14px] flex items-center gap-2">
            <span
              className="text-[13px] font-bold"
              style={{ color: "var(--text-1)" }}
            >
              🍴 인기 맛집 순위
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[12px]"
              style={{
                color: "var(--text-3)",
                background: "var(--surface)",
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
          <div className="mb-[14px] flex items-center gap-2">
            <span
              className="text-[13px] font-bold"
              style={{ color: "var(--text-1)" }}
            >
              🛍️ 쇼핑 명소
            </span>
          </div>
          <ShoppingList items={guide.shopping} />
        </>
      )}

      {subTab === "tips" && (
        <>
          <div className="mb-[14px] flex items-center gap-2">
            <span
              className="text-[13px] font-bold"
              style={{ color: "var(--text-1)" }}
            >
              💡 여행 팁
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[12px]"
              style={{
                color: "var(--text-3)",
                background: "var(--surface)",
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
      className="flex min-h-[100dvh] flex-col"
      style={{ background: "var(--bg)" }}
    >
      {/* City selector — sticky */}
      <div
        className="sticky top-0 z-10 px-4"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex">
          {CITIES.map((city) => {
            const active = city.key === cityKey;
            return (
              <button
                key={city.key}
                onClick={() => setCityKey(city.key)}
                className="-mb-px flex-1 cursor-pointer px-2 pb-3 pt-[13px] text-[14px] transition-all duration-150 ease-in-out"
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: active
                    ? "2.5px solid var(--primary, #2563eb)"
                    : "2.5px solid transparent",
                  color: active
                    ? "var(--primary, #2563eb)"
                    : "var(--text-3)",
                  fontWeight: active ? 800 : 500,
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
        className="flex-1 overflow-y-auto px-4 pb-[60px] pt-5"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <CityContent key={activeGuide.key} guide={activeGuide} />
      </div>
    </div>
  );
}
