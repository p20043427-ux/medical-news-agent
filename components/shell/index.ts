// 공통 셸 디자인 시스템 — 일본어 카테고리 디자인을 규칙으로 추출.
// 카테고리 액센트: 일본어 #E63946 · 한국어 #2563EB · 의료교류 #0D9488 · 일본여행 #0EA5E9
export { AppShell } from "./AppShell";
export { AppHeader, HeaderTitle, ProgressChip, LangToggle, WeekStrip } from "./AppHeader";
export { BottomNav, type NavTab } from "./BottomNav";

export const CATEGORY_ACCENT = {
  jp: "#E63946",
  ko: "#2563EB",
  medic: "#0D9488",
  travel: "#0EA5E9",
} as const;
