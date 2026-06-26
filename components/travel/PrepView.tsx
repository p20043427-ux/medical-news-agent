"use client";

import { useState } from "react";
import {
  CHECKLIST,
  EMERGENCY_CONTACTS,
  USEFUL_APPS,
  LOST_ITEMS_GUIDE,
} from "@/lib/travel/emergency";
import { kv } from "@/lib/platform/kv";

const CK_KEY = "travel-checklist";

/* ── 색상 상수 ────────────────────────────────────────────── */
const ACCENT = "#E63946";
const ACCENT_LIGHT = "#E6394612";

/* ── 탭 정의 ─────────────────────────────────────────────── */
type TabKey = "checklist" | "contacts" | "apps" | "lost";

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: "checklist", label: "체크리스트", emoji: "✅" },
  { key: "contacts",  label: "긴급연락처", emoji: "📞" },
  { key: "apps",      label: "유용한 앱",  emoji: "📱" },
  { key: "lost",      label: "분실·도난",  emoji: "🚨" },
];

/* ── 탭 바 ───────────────────────────────────────────────── */
function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-3 pt-1">
      {TABS.map(({ key, label, emoji }) => {
        const on = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={on}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition active:scale-[0.97]"
            style={
              on
                ? {
                    background: `linear-gradient(135deg, ${ACCENT}, #F4A261)`,
                    color: "#fff",
                    boxShadow: `0 3px 12px ${ACCENT}44`,
                  }
                : {
                    background: "var(--surface)",
                    color: "var(--text-2)",
                  }
            }
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   탭 1 — 체크리스트
   ════════════════════════════════════════════════════════════ */
function ChecklistTab() {
  /* 각 아이템 id → 체크 여부를 로컬 state로 관리 */
  const allIds = CHECKLIST.flatMap((g) => g.items.map((i) => i.id));
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const saved = kv.getJSON<Record<string, boolean>>(CK_KEY, {});
    return Object.fromEntries(allIds.map((id) => [id, saved[id] ?? false]));
  });

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      kv.setJSON(CK_KEY, next);
      return next;
    });

  /* 전체 진행률 */
  const total   = allIds.length;
  const done    = Object.values(checked).filter(Boolean).length;
  const pct     = Math.round((done / total) * 100);

  return (
    <div className="space-y-4 px-4 pb-28">
      {/* 진행률 바 */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-1)" }}
          >
            준비 완료도
          </span>
          <span
            className="text-sm font-extrabold"
            style={{ color: ACCENT }}
          >
            {done} / {total}
          </span>
        </div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${ACCENT}, #F4A261)`,
            }}
          />
        </div>
        <p
          className="mt-1.5 text-right text-xs"
          style={{ color: "var(--text-3)" }}
        >
          {pct}%
        </p>
      </div>

      {/* 그룹별 섹션 */}
      {CHECKLIST.map((group) => (
        <div key={group.title} className="space-y-2">
          {/* 그룹 헤더 */}
          <div className="flex items-center gap-2">
            <span className="text-lg">{group.emoji}</span>
            <h2
              className="text-sm font-extrabold"
              style={{ color: "var(--text-1)" }}
            >
              {group.title}
            </h2>
            <span
              className="ml-auto text-xs"
              style={{ color: "var(--text-3)" }}
            >
              {group.items.filter((i) => checked[i.id]).length}/
              {group.items.length}
            </span>
          </div>

          {/* 아이템 목록 */}
          <div className="space-y-1.5">
            {group.items.map((item) => {
              const isDone = checked[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-start gap-3 rounded-2xl p-3.5 text-left transition active:scale-[0.98]"
                  style={{
                    background: isDone ? `${ACCENT}0D` : "var(--card)",
                    border: item.critical
                      ? `1.5px solid ${isDone ? ACCENT + "66" : ACCENT}`
                      : "1px solid var(--border)",
                  }}
                >
                  {/* 체크박스 */}
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md transition-all duration-200"
                    style={{
                      background: isDone
                        ? `linear-gradient(135deg, ${ACCENT}, #F4A261)`
                        : "var(--surface)",
                      border: isDone ? "none" : "1.5px solid var(--border)",
                    }}
                  >
                    {isDone && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        fill="none"
                        stroke="#fff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m2 6 3 3 5-5" />
                      </svg>
                    )}
                  </span>

                  {/* 라벨 + detail */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {item.critical && (
                        <span
                          className="shrink-0 text-xs font-extrabold"
                          style={{ color: ACCENT }}
                        >
                          ★
                        </span>
                      )}
                      <p
                        className="text-sm font-semibold leading-snug"
                        style={{
                          color: isDone ? "var(--text-3)" : "var(--text-1)",
                          textDecoration: isDone ? "line-through" : "none",
                        }}
                      >
                        {item.label}
                      </p>
                    </div>
                    {item.detail && (
                      <p
                        className="mt-0.5 text-xs leading-relaxed"
                        style={{ color: "var(--text-3)" }}
                      >
                        {item.detail}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   탭 2 — 긴급연락처
   ════════════════════════════════════════════════════════════ */
function ContactsTab() {
  /* 저장 권장 번호: tel: 링크가 유효한 것만 */
  const recommended = EMERGENCY_CONTACTS.filter(
    (c) => !c.number.includes("보험") && !c.number.includes("확인")
  ).slice(0, 3);

  return (
    <div className="space-y-4 px-4 pb-28">
      {/* 저장 권장 강조 카드 */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}18, #F4A26118)`,
          border: `1.5px solid ${ACCENT}44`,
        }}
      >
        <p
          className="mb-2.5 text-sm font-extrabold"
          style={{ color: ACCENT }}
        >
          ★ 지금 바로 저장 권장 번호
        </p>
        <div className="space-y-2">
          {recommended.map((c) => (
            <a
              key={c.name}
              href={`tel:${c.number.replace(/\s/g, "")}`}
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 transition active:scale-[0.98]"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--text-1)" }}
                >
                  {c.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-3)" }}
                >
                  {c.note}
                </p>
              </div>
              <span
                className="text-lg font-extrabold tabular-nums"
                style={{ color: ACCENT }}
              >
                {c.number}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 전체 연락처 목록 */}
      <h2
        className="text-sm font-extrabold"
        style={{ color: "var(--text-1)" }}
      >
        전체 긴급 연락처
      </h2>
      <div className="space-y-2">
        {EMERGENCY_CONTACTS.map((c) => {
          const isTel =
            !c.number.includes("보험") && !c.number.includes("확인");
          const Content = (
            <div
              className="flex items-center gap-3 rounded-2xl p-4 shadow-sm transition active:scale-[0.98]"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* 전화 아이콘 */}
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-base"
                style={{
                  background: isTel ? ACCENT_LIGHT : "var(--surface)",
                }}
              >
                {isTel ? "📞" : "📋"}
              </span>

              {/* 텍스트 */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold leading-snug"
                  style={{ color: "var(--text-1)" }}
                >
                  {c.name}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-3)" }}
                >
                  {c.note}
                </p>
              </div>

              {/* 번호 */}
              <span
                className="shrink-0 text-base font-extrabold tabular-nums"
                style={{ color: isTel ? ACCENT : "var(--text-2)" }}
              >
                {c.number}
              </span>
            </div>
          );

          return isTel ? (
            <a
              key={c.name}
              href={`tel:${c.number.replace(/[\s()]/g, "")}`}
            >
              {Content}
            </a>
          ) : (
            <div key={c.name}>{Content}</div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   탭 3 — 유용한 앱
   ════════════════════════════════════════════════════════════ */
function AppsTab() {
  return (
    <div className="space-y-3 px-4 pb-28">
      {/* 상단 안내 */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: ACCENT_LIGHT,
          border: `1px solid ${ACCENT}22`,
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          <span className="font-bold" style={{ color: "var(--text-1)" }}>
            출발 전 설치 권장
          </span>{" "}
          — 일본 현지에서는 데이터 속도 제한이나 요금 문제가 생길 수 있으니 한국에서 미리 다운로드하세요.
        </p>
      </div>

      {/* 앱 카드 목록 */}
      <div className="space-y-2">
        {USEFUL_APPS.map((app, i) => (
          <div
            key={app.name}
            className="flex items-start gap-3.5 rounded-2xl p-4 shadow-sm"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* 번호 배지 */}
            <span
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #F4A261)`,
              }}
            >
              {i + 1}
            </span>

            {/* 내용 */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold leading-snug"
                style={{ color: "var(--text-1)" }}
              >
                {app.name}
              </p>
              <p
                className="mt-0.5 text-xs leading-relaxed"
                style={{ color: "var(--text-2)" }}
              >
                {app.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   탭 4 — 분실·도난
   ════════════════════════════════════════════════════════════ */
function LostTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 px-4 pb-28">
      {/* 상단 안내 카드 */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#F597031A",
          border: "1.5px solid #F59703",
        }}
      >
        <p
          className="mb-0.5 text-sm font-extrabold"
          style={{ color: "#B45309" }}
        >
          ⚠️ 침착하게, 순서대로
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
          분실·도난 시 패닉하지 말고 아래 상황에 맞는 단계를 순서대로 진행하세요.
        </p>
      </div>

      {/* 케이스별 아코디언 */}
      <div className="space-y-2">
        {LOST_ITEMS_GUIDE.steps.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.case}
              className="overflow-hidden rounded-2xl shadow-sm transition-shadow"
              style={{
                background: "var(--card)",
                border: `1px solid ${isOpen ? ACCENT + "66" : "var(--border)"}`,
              }}
            >
              {/* 아코디언 헤더 */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                {/* 번호 배지 */}
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white"
                  style={{
                    background: isOpen
                      ? `linear-gradient(135deg, ${ACCENT}, #F4A261)`
                      : "var(--surface)",
                    color: isOpen ? "#fff" : "var(--text-2)",
                    border: isOpen ? "none" : "1.5px solid var(--border)",
                  }}
                >
                  {idx + 1}
                </span>

                {/* 케이스 제목 */}
                <span
                  className="flex-1 text-sm font-bold leading-snug"
                  style={{ color: "var(--text-1)" }}
                >
                  {item.case}
                </span>

                {/* 화살표 */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                  style={{
                    color: "var(--text-3)",
                    transform: isOpen ? "rotate(180deg)" : "none",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* 아코디언 본문 — 단계별 번호 리스트 */}
              {isOpen && (
                <div className="px-4 pb-4">
                  <ol className="space-y-2.5">
                    {item.steps.map((step, si) => (
                      <li key={si} className="flex items-start gap-3">
                        {/* 단계 번호 */}
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
                          style={{ background: ACCENT }}
                        >
                          {si + 1}
                        </span>
                        {/* 단계 텍스트 */}
                        <p
                          className="flex-1 text-sm leading-relaxed"
                          style={{ color: "var(--text-2)" }}
                        >
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   메인 컴포넌트
   ════════════════════════════════════════════════════════════ */
export default function PrepView() {
  const [activeTab, setActiveTab] = useState<TabKey>("checklist");

  return (
    <div className="pt-3">
      {/* 페이지 헤더 */}
      <div className="px-4 pb-3">
        <h1
          className="mb-0.5 text-2xl font-extrabold"
          style={{ color: "var(--text-1)" }}
        >
          🗂️ 여행 준비
        </h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          체크리스트·긴급연락처·앱·분실 대처
        </p>
      </div>

      {/* 탭 바 */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* 탭 컨텐츠 */}
      {activeTab === "checklist" && <ChecklistTab />}
      {activeTab === "contacts"  && <ContactsTab />}
      {activeTab === "apps"      && <AppsTab />}
      {activeTab === "lost"      && <LostTab />}
    </div>
  );
}
