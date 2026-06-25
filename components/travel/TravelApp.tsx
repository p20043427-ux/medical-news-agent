"use client";
import { useState } from "react";
import { AppShell, AppHeader, LangToggle, BottomNav, type NavTab } from "@/components/shell";
import AccountButton from "@/components/auth/AccountButton";
import { Sheet } from "@/components/ui/sheet";
import { Segmented } from "@/components/ui/segmented";
import { CITIES } from "@/lib/travel/cities";
import HomeView, { type TravelTab } from "./HomeView";
import CityView from "./CityView";
import EntryView from "./EntryView";
import TransportView from "./TransportView";
import PhraseView from "./PhraseView";
import PrepView from "./PrepView";
import PracticalView from "./PracticalView";

const TRAVEL_ACCENT = "#0EA5E9";

const TABS: NavTab<TravelTab>[] = [
  { key: "home", ko: "홈", ja: "ホーム", emoji: "🏠" },
  { key: "city", ko: "도시", ja: "都市", emoji: "🗺️" },
  { key: "move", ko: "이동", ja: "移動", emoji: "🚃" },
  { key: "phrase", ko: "회화", ja: "会話", emoji: "💬" },
  { key: "prep", ko: "준비", ja: "準備", emoji: "🎒" },
];

const SOS_CONTACTS = [
  { label: "경찰", number: "110" },
  { label: "구급·소방", number: "119" },
  { label: "관광경찰", number: "#9110" },
  { label: "한국영사관(오사카)", number: "06-2223-3151" },
  { label: "한국영사관(후쿠오카)", number: "092-771-0461" },
];

export default function TravelApp({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<TravelTab>("home");
  const [city, setCity] = useState<string>(CITIES[0].key);
  const [moveSub, setMoveSub] = useState<"entry" | "transport">("entry");
  const [prepSub, setPrepSub] = useState<"checklist" | "practical">("checklist");
  const [sos, setSos] = useState(false);

  const selectCity = (key: string) => { setCity(key); setTab("city"); };

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

      <main>
        {tab === "home" && <HomeView onNavigate={(t: TravelTab) => setTab(t)} onSelectCity={selectCity} />}
        {tab === "city" && <CityView cities={CITIES} selectedKey={city} onSelect={setCity} />}
        {tab === "move" && (
          <div>
            <div className="px-4 pt-3">
              <Segmented value={moveSub} onChange={setMoveSub} accent={TRAVEL_ACCENT}
                options={[{ value: "entry", label: "✈️ 입국·세관" }, { value: "transport", label: "🚃 교통" }]} />
            </div>
            {moveSub === "entry" ? <EntryView /> : <TransportView />}
          </div>
        )}
        {tab === "phrase" && <PhraseView />}
        {tab === "prep" && (
          <div>
            <div className="px-4 pt-3">
              <Segmented value={prepSub} onChange={setPrepSub} accent={TRAVEL_ACCENT}
                options={[{ value: "checklist", label: "🎒 준비물" }, { value: "practical", label: "💡 실용정보" }]} />
            </div>
            {prepSub === "checklist" ? <PrepView /> : <PracticalView />}
          </div>
        )}
      </main>

      <BottomNav tab={tab} tabs={TABS} onChange={setTab} accent={TRAVEL_ACCENT} />

      {tab !== "home" && (
        <button onClick={() => setSos(true)} aria-label="긴급 연락처"
          className="fixed right-4 z-40 grid place-items-center rounded-full text-[13px] font-extrabold text-white active:scale-95"
          style={{ bottom: "calc(76px + env(safe-area-inset-bottom))", height: 52, width: 52, background: "#E63946", boxShadow: "0 4px 12px rgba(230,57,70,0.45)" }}>
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
                    className="rounded-lg px-3 py-2 text-sm font-bold" style={{ background: "#E6394614", color: "#E63946" }}>
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
