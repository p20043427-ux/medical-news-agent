"use client";
import { useState } from "react";
import { AppShell, AppHeader, LangToggle, BottomNav, type NavTab } from "@/components/shell";
import AccountButton from "@/components/auth/AccountButton";
import { Sheet } from "@/components/ui/sheet";
import HomeView from "./HomeView";
import GuideView from "./GuideView";
import EntryView from "./EntryView";
import TransportView from "./TransportView";
import PhraseView from "./PhraseView";
import PrepView from "./PrepView";
import PracticalView from "./PracticalView";

const TRAVEL_ACCENT = "#0EA5E9";

type Tab = "home" | "guide" | "entry" | "transport" | "phrase" | "prep" | "practical";

const TABS: NavTab<Tab>[] = [
  { key: "home", ko: "홈", ja: "ホーム", emoji: "🏠" },
  { key: "guide", ko: "도시", ja: "都市", emoji: "🗺️" },
  { key: "entry", ko: "입국", ja: "入国", emoji: "✈️" },
  { key: "transport", ko: "교통", ja: "交通", emoji: "🚃" },
  { key: "phrase", ko: "회화", ja: "会話", emoji: "💬" },
  { key: "prep", ko: "준비", ja: "準備", emoji: "📋" },
  { key: "practical", ko: "실용", ja: "実用", emoji: "💡" },
];

const SOS_CONTACTS = [
  { label: "경찰", number: "110" },
  { label: "구급·소방", number: "119" },
  { label: "관광경찰", number: "#9110" },
  { label: "한국영사관(오사카)", number: "06-2223-3151" },
  { label: "한국영사관(후쿠오카)", number: "092-771-0461" },
];

export default function TravelApp({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("home");
  const [sos, setSos] = useState(false);

  function handleNavigate(nextTab: Tab, city?: string) {
    setTab(nextTab);
    void city;
  }

  function renderTab() {
    switch (tab) {
      case "home": return <HomeView onNavigate={handleNavigate} />;
      case "guide": return <GuideView />;
      case "entry": return <EntryView />;
      case "transport": return <TransportView />;
      case "phrase": return <PhraseView />;
      case "prep": return <PrepView />;
      case "practical": return <PracticalView />;
      default: return null;
    }
  }

  return (
    <AppShell>
      <AppHeader
        onBack={onBack}
        title={
          <span className="flex items-center gap-1.5 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
            <span>✈️</span>일본 여행 <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>日本旅行</span>
          </span>
        }
        right={<><LangToggle accent={TRAVEL_ACCENT} /><AccountButton /></>}
      />

      <main className="pb-28">{renderTab()}</main>

      <BottomNav tab={tab} tabs={TABS} onChange={setTab} accent={TRAVEL_ACCENT} />

      {/* SOS 플로팅 버튼 — 홈 탭 제외 */}
      {tab !== "home" && (
        <button
          onClick={() => setSos(true)}
          aria-label="긴급 연락처"
          className="fixed right-4 z-40 grid h-13 w-13 place-items-center rounded-full text-[13px] font-extrabold text-white shadow-lg active:scale-95"
          style={{ bottom: "calc(76px + env(safe-area-inset-bottom))", height: 52, width: 52, background: "#E63946", boxShadow: "0 4px 12px rgba(230,57,70,0.45)" }}
        >
          SOS
        </button>
      )}

      <Sheet open={sos} onClose={() => setSos(false)}>
        <div className="px-4 pb-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>🚨 긴급 연락처</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {SOS_CONTACTS.map((c) => {
              const tel = c.number.replace(/[^0-9#+]/g, "");
              return (
                <li key={c.number} className="flex items-center justify-between rounded-xl px-3.5 py-3"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{c.label}</span>
                  <a href={`tel:${tel}`} aria-label={`${c.label} 전화걸기 ${c.number}`}
                    className="rounded-lg px-3 py-1.5 text-sm font-bold" style={{ background: "#E6394614", color: "#E63946" }}>
                    📞 {c.number}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3.5 text-center text-xs" style={{ color: "var(--text-3)" }}>번호를 탭하면 전화가 연결됩니다.</p>
        </div>
      </Sheet>
    </AppShell>
  );
}
