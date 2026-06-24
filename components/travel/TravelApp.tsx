"use client";
import { useState } from "react";
import HomeView from "./HomeView";
import GuideView from "./GuideView";
import EntryView from "./EntryView";
import TransportView from "./TransportView";
import PhraseView from "./PhraseView";
import PrepView from "./PrepView";
import PracticalView from "./PracticalView";

const TABS = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "guide", label: "도시", icon: "🗺️" },
  { key: "entry", label: "입국", icon: "✈️" },
  { key: "transport", label: "교통", icon: "🚃" },
  { key: "phrase", label: "회화", icon: "💬" },
  { key: "prep", label: "준비", icon: "📋" },
  { key: "practical", label: "실용", icon: "💡" },
] as const;
type Tab = (typeof TABS)[number]["key"];

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
    // city 파라미터는 GuideView 등에서 활용 가능하도록 확장 예정
    void city;
  }

  function renderTab() {
    switch (tab) {
      case "home":
        return <HomeView onNavigate={handleNavigate} />;
      case "guide":
        return <GuideView />;
      case "entry":
        return <EntryView />;
      case "transport":
        return <TransportView />;
      case "phrase":
        return <PhraseView />;
      case "prep":
        return <PrepView />;
      case "practical":
        return <PracticalView />;
      default:
        return null;
    }
  }

  return (
    <div style={styles.root}>
      {/* 상단 헤더 */}
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn} aria-label="뒤로가기">
          ←
        </button>
        <span style={styles.headerTitle}>일본 여행</span>
        <div style={styles.headerRight} />
      </header>

      {/* 탭 콘텐츠 */}
      <main style={styles.content}>{renderTab()}</main>

      {/* 하단 탭바 */}
      <nav style={styles.tabBar}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                ...styles.tabBtn,
              }}
              aria-current={active ? "page" : undefined}
            >
              <span style={styles.tabIcon}>{t.icon}</span>
              <span
                style={{
                  ...styles.tabLabel,
                  ...(active ? styles.tabLabelActive : {}),
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* SOS 플로팅 버튼 — 홈 탭 제외 */}
      {tab !== "home" && (
        <button
          onClick={() => setSos(true)}
          style={styles.sosBtn}
          aria-label="긴급 연락처"
        >
          SOS
        </button>
      )}

      {/* SOS 모달 */}
      {sos && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSos(false);
          }}
        >
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <span style={styles.modalTitle}>🚨 긴급 연락처</span>
              <button
                onClick={() => setSos(false)}
                style={styles.modalCloseBtn}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <ul style={styles.contactList}>
              {SOS_CONTACTS.map((c) => {
                const tel = c.number.replace(/[^0-9#+]/g, "");
                return (
                  <li key={c.number} style={styles.contactItem}>
                    <span style={styles.contactLabel}>{c.label}</span>
                    <a
                      href={`tel:${tel}`}
                      style={styles.contactNumber}
                      aria-label={`${c.label} 전화걸기 ${c.number}`}
                    >
                      📞 {c.number}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p style={styles.modalNote}>번호를 탭하면 전화가 연결됩니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    maxWidth: "430px",
    margin: "0 auto",
    backgroundColor: "var(--color-bg, #f8f9fa)",
    fontFamily:
      "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
    padding: "0 12px",
    backgroundColor: "var(--color-surface, #ffffff)",
    borderBottom: "1px solid var(--color-border, #e2e8f0)",
    flexShrink: 0,
    zIndex: 10,
  },
  backBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    background: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: "var(--color-text, #1a202c)",
    padding: 0,
  },
  headerTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "var(--color-text, #1a202c)",
    letterSpacing: "-0.3px",
  },
  headerRight: {
    width: "40px",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    height: "60px",
    backgroundColor: "var(--card, #ffffff)",
    borderTop: "1px solid var(--border, #e2e8f0)",
    flexShrink: 0,
    zIndex: 10,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
  tabBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2px",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "4px 0",
    borderRadius: 0,
  },
  tabIcon: {
    fontSize: "20px",
    lineHeight: "1",
  },
  tabLabel: {
    fontSize: "10px",
    fontWeight: "500",
    color: "var(--text-3, #94a3b8)",
    letterSpacing: "-0.2px",
  },
  tabLabelActive: {
    color: "#E63946",
    fontWeight: "700",
  },
  sosBtn: {
    position: "fixed",
    bottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
    right: "16px",
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#E63946",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(230, 57, 70, 0.45)",
    zIndex: 50,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },
  modalOverlay: {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 100,
    padding: "0 0 env(safe-area-inset-bottom, 0px)",
  },
  modalBox: {
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "var(--color-surface, #ffffff)",
    borderRadius: "20px 20px 0 0",
    padding: "20px 20px calc(20px + env(safe-area-inset-bottom, 0px))",
    boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--color-text, #1a202c)",
    letterSpacing: "-0.3px",
  },
  modalCloseBtn: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "var(--color-bg, #f1f5f9)",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    color: "var(--color-muted, #64748b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  contactList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    backgroundColor: "var(--color-bg, #f8fafc)",
    borderRadius: "12px",
    border: "1px solid var(--color-border, #e2e8f0)",
  },
  contactLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--color-text, #1a202c)",
  },
  contactNumber: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#E63946",
    textDecoration: "none",
    padding: "6px 12px",
    backgroundColor: "rgba(230,57,70,0.08)",
    borderRadius: "8px",
    letterSpacing: "0.3px",
  },
  modalNote: {
    fontSize: "12px",
    color: "var(--color-muted, #94a3b8)",
    textAlign: "center",
    marginTop: "14px",
    marginBottom: 0,
  },
};
