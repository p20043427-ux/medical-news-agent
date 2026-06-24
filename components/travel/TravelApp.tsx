"use client";

import { useState } from "react";
import AccountButton from "@/components/auth/AccountButton";
import GuideView from "./GuideView";
import EntryView from "./EntryView";
import TransportView from "./TransportView";
import PhraseView from "./PhraseView";

export const TRAVEL_ACCENT = "#E63946";

type Tab = "guide" | "entry" | "transport" | "phrase";

const NAV: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "guide",
    label: "도시가이드",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    key: "entry",
    label: "입국·세관",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M9 16l2 2 4-4" />
      </>
    ),
  },
  {
    key: "transport",
    label: "교통",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M3 15h18" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="7.5" cy="19" r="1" />
        <circle cx="16.5" cy="19" r="1" />
      </>
    ),
  },
  {
    key: "phrase",
    label: "회화",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
];

export default function TravelApp({ onBack }: { onBack?: () => void }) {
  const [tab, setTab] = useState<Tab>("guide");

  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      <header
        className="sticky top-0 z-30"
        style={{ background: "var(--bg)", paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center gap-2 px-4 pb-2 pt-3">
          {onBack && (
            <button
              onClick={onBack}
              aria-label="뒤로"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          <span
            className="flex items-center gap-1.5 text-xl font-extrabold"
            style={{ color: "var(--text-1)" }}
          >
            <span>🗾</span>일본 여행
          </span>
          <div className="ml-auto flex items-center gap-2">
            <AccountButton />
          </div>
        </div>
        <div className="px-4 pb-2">
          <p
            className="rounded-xl px-3 py-1.5 text-[11px] leading-snug"
            style={{ background: `${TRAVEL_ACCENT}12`, color: "var(--text-2)" }}
          >
            일본 여행 필수 정보 — 가이드·입국·교통·회화
          </p>
        </div>
        <div style={{ height: 1, background: "var(--border)" }} />
      </header>

      {tab === "guide" && <GuideView />}
      {tab === "entry" && <EntryView />}
      {tab === "transport" && <TransportView />}
      {tab === "phrase" && <PhraseView />}

      <nav
        className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div
          className="flex items-stretch justify-around gap-1 px-2 pt-1.5"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
        >
          {NAV.map((n) => {
            const on = tab === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setTab(n.key)}
                aria-current={on ? "page" : undefined}
                className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition active:scale-95"
                style={{
                  color: on ? TRAVEL_ACCENT : "var(--text-3)",
                  background: on ? `${TRAVEL_ACCENT}14` : "transparent",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={on ? 2.4 : 1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {n.icon}
                </svg>
                <span
                  className={`text-[11px] leading-none ${on ? "font-extrabold" : "font-medium"}`}
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
