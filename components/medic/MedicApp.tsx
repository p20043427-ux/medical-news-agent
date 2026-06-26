"use client";

import { useState } from "react";
import { useUiLang, tt } from "@/lib/i18n";
import AccountButton from "@/components/auth/AccountButton";
import { AppShell, AppHeader, LangToggle, BottomNav, type NavTab } from "@/components/shell";
import MedicHomeView from "./HomeView";
import MedicPhrasebookView from "./PhrasebookView";
import MedicGlossaryView from "./GlossaryView";
import MedicCardsView from "./CardsView";
import MedicVisitView from "./VisitView";
import type { MedRole } from "@/lib/medic/types";
import { MED_ACCENT } from "./common";

type Tab = "home" | "phrase" | "glossary" | "cards" | "visit";

const NAV: NavTab<Tab>[] = [
  { key: "home", ko: "홈", ja: "ホーム", icon: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /> },
  { key: "phrase", ko: "회화", ja: "会話", icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></> },
  { key: "glossary", ko: "용어", ja: "用語", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { key: "cards", ko: "카드", ja: "カード", icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></> },
  { key: "visit", ko: "실무", ja: "実務", icon: <><path d="M9 11l3 3 8-8" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
];

export default function MedicApp({ onBack }: { onBack?: () => void }) {
  const lang = useUiLang();
  const [tab, setTab] = useState<Tab>("home");
  const [roleFocus, setRoleFocus] = useState<MedRole | null>(null);

  const goRole = (r: MedRole) => { setRoleFocus(r); setTab("phrase"); };

  const title = (
    <span className="flex items-center gap-1.5 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
      <span>🏥</span>{tt(lang, "의료교류", "医療交流")} <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>{tt(lang, "医療交流", "의료교류")}</span>
    </span>
  );

  const notice = (
    <div className="flex flex-wrap items-center gap-1.5">
      <p className="flex-1 rounded-xl px-3 py-1.5 text-[11px] leading-snug" style={{ background: `${MED_ACCENT}12`, color: "var(--text-2)" }}>
        {tt(lang, "은성의료재단 ↔ 가마치그룹 직원 상호방문 지원", "蒲池グループ ↔ 恩成医療財団 職員相互訪問サポート")}
      </p>
      <span className="shrink-0 rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: "#F59E0B22", color: "#B45309" }}>
        {tt(lang, "⚠ 감수 전 초안", "⚠ 監修前ドラフト")}
      </span>
    </div>
  );

  return (
    <AppShell>
      <AppHeader
        onBack={onBack}
        title={title}
        right={<><LangToggle accent={MED_ACCENT} /><AccountButton /></>}
        below={notice}
      />

      {tab === "home" && <MedicHomeView uiLang={lang} onTab={setTab} onRole={goRole} />}
      {tab === "phrase" && <MedicPhrasebookView uiLang={lang} focusRole={roleFocus} />}
      {tab === "glossary" && <MedicGlossaryView uiLang={lang} />}
      {tab === "cards" && <MedicCardsView uiLang={lang} />}
      {tab === "visit" && <MedicVisitView uiLang={lang} />}

      <BottomNav tab={tab} tabs={NAV} onChange={setTab} accent={MED_ACCENT} />
    </AppShell>
  );
}
