"use client";
import { useState } from "react";
import { OSAKA } from "@/lib/travel/osaka";
import { FUKUOKA } from "@/lib/travel/fukuoka";
import { TRAVEL_PHRASES } from "@/lib/travel/phrases";
import SpeakerButton from "@/components/jp/SpeakerButton";

interface Props {
  onNavigate: (tab: "home" | "guide" | "entry" | "transport" | "phrase" | "prep", city?: string) => void;
}

export default function HomeView({ onNavigate }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const emergencyPhrases = TRAVEL_PHRASES.find((s) => s.key === "emergency")?.phrases.slice(0, 5) ?? [];

  function copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  }

  return (
    <div style={styles.page}>
      {/* ── 1. 긴급 SOS 배너 ── */}
      <button
        onClick={() => onNavigate("prep")}
        style={styles.sosBanner}
        aria-label="긴급 정보 페이지로 이동"
      >
        <span style={styles.sosBannerText}>
          ⚠️ 긴급 시: 경찰 110 · 구급 119 · 관광경찰 #9110
        </span>
        <span style={styles.sosBannerArrow}>›</span>
      </button>

      {/* ── 2. 필수 회화 TOP 5 ── */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>💬 필수 회화 TOP 5</h2>
          <button
            onClick={() => onNavigate("phrase")}
            style={styles.moreBtn}
            aria-label="전체 회화 보기"
          >
            더 보기 ›
          </button>
        </div>

        <div style={styles.phraseScrollWrapper}>
          <div style={styles.phraseScroll}>
            {emergencyPhrases.map((phrase, i) => (
              <div key={i} style={styles.phraseCard}>
                <p style={styles.phraseKo}>{phrase.ko}</p>
                <p style={styles.phraseJp}>{phrase.jp}</p>
                <p style={styles.phraseReading}>{phrase.reading}</p>
                <div style={styles.phraseActions}>
                  <SpeakerButton text={phrase.jp} size={32} />
                  <button
                    onClick={() => copyToClipboard(phrase.jp, i)}
                    style={styles.copyBtn}
                    aria-label="일본어 복사"
                  >
                    {copiedIndex === i ? "✓ 복사됨" : "📋 복사"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 빠른 접근 4버튼 그리드 ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>빠른 메뉴</h2>
        <div style={styles.quickGrid}>
          {QUICK_MENUS.map((item) => (
            <button
              key={item.tab}
              onClick={() => onNavigate(item.tab)}
              style={{ ...styles.quickBtn, background: item.gradient }}
              aria-label={item.label}
            >
              <span style={styles.quickIcon}>{item.icon}</span>
              <span style={styles.quickLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 4. 도시 선택 hero 카드 ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🗺️ 여행지 선택</h2>
        <div style={styles.cityList}>
          {/* 오사카 카드 */}
          <button
            onClick={() => onNavigate("guide")}
            style={{ ...styles.cityCard, background: "linear-gradient(135deg, #E63946, #F4A261)" }}
            aria-label="오사카 가이드 보기"
          >
            <div style={styles.cityCardInner}>
              <div style={styles.cityCardTop}>
                <span style={styles.cityEmoji}>🏯</span>
                <span style={styles.cityName}>오사카</span>
                <span style={styles.cityNameJp}>大阪</span>
              </div>
              <div style={styles.cityStats}>
                <span style={styles.cityStat}>🏛 관광지 {OSAKA.spots.length}곳</span>
                <span style={styles.cityStat}>🍜 맛집 {OSAKA.food.length}종</span>
              </div>
              <div style={styles.cityHighlight}>
                <span style={styles.cityHighlightText}>인기 1위: 도톤보리</span>
                <span style={styles.cityRating}>⭐ 4.7</span>
              </div>
              <div style={styles.cityTagline}>{OSAKA.tagline}</div>
            </div>
            <span style={styles.cityArrow}>›</span>
          </button>

          {/* 후쿠오카 카드 */}
          <button
            onClick={() => onNavigate("guide")}
            style={{ ...styles.cityCard, background: "linear-gradient(135deg, #0369A1, #0891B2)" }}
            aria-label="후쿠오카 가이드 보기"
          >
            <div style={styles.cityCardInner}>
              <div style={styles.cityCardTop}>
                <span style={styles.cityEmoji}>🌸</span>
                <span style={styles.cityName}>후쿠오카</span>
                <span style={styles.cityNameJp}>福岡</span>
              </div>
              <div style={styles.cityStats}>
                <span style={styles.cityStat}>🏛 관광지 {FUKUOKA.spots.length}곳</span>
                <span style={styles.cityStat}>🍜 맛집 {FUKUOKA.food.length}종</span>
              </div>
              <div style={styles.cityHighlight}>
                <span style={styles.cityHighlightText}>인기 1위: 나카스 야타이</span>
                <span style={styles.cityRating}>⭐ 4.8</span>
              </div>
              <div style={styles.cityTagline}>{FUKUOKA.tagline}</div>
            </div>
            <span style={styles.cityArrow}>›</span>
          </button>
        </div>
      </section>

      {/* ── 5. 출발 전 체크리스트 미리보기 ── */}
      <section style={{ ...styles.section, marginBottom: "24px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>✅ 출발 전 필수 3가지</h2>
          <button
            onClick={() => onNavigate("prep")}
            style={styles.moreBtn}
            aria-label="전체 여행 준비 보기"
          >
            전체 보기 ›
          </button>
        </div>

        <button
          onClick={() => onNavigate("prep")}
          style={styles.checklistCard}
          aria-label="여행 준비 상세 보기"
        >
          {CHECKLIST_ITEMS.map((item, i) => (
            <div key={i} style={styles.checklistItem}>
              <span style={styles.checklistIcon}>{item.icon}</span>
              <div style={styles.checklistText}>
                <p style={styles.checklistTitle}>{item.title}</p>
                <p style={styles.checklistDesc}>{item.desc}</p>
              </div>
              <span style={styles.checklistArrow}>›</span>
            </div>
          ))}
        </button>
      </section>
    </div>
  );
}

// ── 데이터 ──

const QUICK_MENUS = [
  {
    tab: "entry",
    icon: "🛂",
    label: "입국 가이드",
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
  },
  {
    tab: "transport",
    icon: "🚃",
    label: "공항 교통",
    gradient: "linear-gradient(135deg, #0EA5E9, #06B6D4)",
  },
  {
    tab: "prep",
    icon: "📋",
    label: "여행 준비",
    gradient: "linear-gradient(135deg, #10B981, #34D399)",
  },
  {
    tab: "phrase",
    icon: "💬",
    label: "전체 회화",
    gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)",
  },
] as const;

const CHECKLIST_ITEMS = [
  {
    icon: "📕",
    title: "여권",
    desc: "유효기간 6개월 이상 남은 여권 확인",
  },
  {
    icon: "📱",
    title: "Visit Japan Web",
    desc: "입국심사·세관신고 사전 등록으로 입국 줄 단축",
  },
  {
    icon: "💴",
    title: "환전",
    desc: "현금 문화 강함 — 1인 1일 최소 1만~2만엔 준비",
  },
];

// ── 스타일 ──

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    overflowX: "hidden",
    backgroundColor: "var(--color-bg, #f8f9fa)",
  },

  /* SOS 배너 */
  sosBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "13px 16px",
    background: "linear-gradient(135deg, #DC2626, #EF4444)",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
  },
  sosBannerText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.2px",
    textAlign: "left",
    lineHeight: "1.4",
  },
  sosBannerArrow: {
    fontSize: "20px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
    flexShrink: 0,
    marginLeft: "8px",
  },

  /* 공통 섹션 */
  section: {
    padding: "20px 16px 0",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--color-text, #1a202c)",
    margin: "0 0 12px",
    letterSpacing: "-0.3px",
  },
  moreBtn: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--color-primary, #2563EB)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    marginBottom: "12px",
  },

  /* 회화 카드 스크롤 */
  phraseScrollWrapper: {
    margin: "0 -16px",
    overflow: "hidden",
  },
  phraseScroll: {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    overflowX: "auto",
    padding: "4px 16px 12px",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  } as React.CSSProperties,
  phraseCard: {
    flexShrink: 0,
    width: "220px",
    backgroundColor: "var(--card, #ffffff)",
    border: "1px solid var(--border, #e2e8f0)",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  phraseKo: {
    fontSize: "12px",
    color: "var(--color-muted, #64748b)",
    margin: 0,
    letterSpacing: "-0.1px",
  },
  phraseJp: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--color-text, #1a202c)",
    margin: 0,
    letterSpacing: "-0.3px",
    lineHeight: "1.3",
  },
  phraseReading: {
    fontSize: "11px",
    color: "var(--color-muted, #94a3b8)",
    margin: 0,
    letterSpacing: "0.2px",
  },
  phraseActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },
  copyBtn: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--color-primary, #2563EB)",
    backgroundColor: "var(--color-primary-light, #EFF6FF)",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer",
    letterSpacing: "-0.1px",
  },

  /* 빠른 접근 그리드 */
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "4px",
  },
  quickBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    transition: "transform 0.1s ease",
  },
  quickIcon: {
    fontSize: "26px",
    lineHeight: "1",
  },
  quickLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.2px",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },

  /* 도시 카드 */
  cityList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  cityCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "20px",
    borderRadius: "18px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
    textAlign: "left",
    transition: "transform 0.12s ease",
  },
  cityCardInner: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  cityCardTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cityEmoji: {
    fontSize: "28px",
    lineHeight: "1",
  },
  cityName: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.5px",
    textShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  cityNameJp: {
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "0.5px",
  },
  cityStats: {
    display: "flex",
    gap: "12px",
  },
  cityStat: {
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "3px 9px",
  },
  cityHighlight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cityHighlightText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.2px",
  },
  cityRating: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#FFD700",
    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
  },
  cityTagline: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.75)",
    letterSpacing: "-0.1px",
    marginTop: "2px",
  },
  cityArrow: {
    fontSize: "28px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    marginLeft: "12px",
    flexShrink: 0,
  },

  /* 체크리스트 카드 */
  checklistCard: {
    width: "100%",
    backgroundColor: "var(--card, #ffffff)",
    border: "1px solid var(--border, #e2e8f0)",
    borderRadius: "16px",
    padding: "4px 0",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    textAlign: "left",
    overflow: "hidden",
  },
  checklistItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderBottom: "1px solid var(--border, #f1f5f9)",
  },
  checklistIcon: {
    fontSize: "24px",
    flexShrink: 0,
    lineHeight: "1",
  },
  checklistText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  checklistTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "var(--color-text, #1a202c)",
    margin: 0,
    letterSpacing: "-0.2px",
  },
  checklistDesc: {
    fontSize: "12px",
    color: "var(--color-muted, #64748b)",
    margin: 0,
    letterSpacing: "-0.1px",
    lineHeight: "1.4",
  },
  checklistArrow: {
    fontSize: "18px",
    color: "var(--color-muted, #94a3b8)",
    flexShrink: 0,
  },
};
