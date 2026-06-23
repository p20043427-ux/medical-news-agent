"use client";

import { useUiLang, tt } from "@/lib/i18n";

export type EnTab = "home" | "learn" | "review" | "stats";

const ICONS: Record<EnTab, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  learn: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  review: <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />,
  stats: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" />,
};

const LABEL: Record<EnTab, [string, string]> = {
  home: ["홈", "ホーム"],
  learn: ["학습", "学習"],
  review: ["복습", "復習"],
  stats: ["분석", "分析"],
};

export default function EnBottomNav({
  tab,
  onChange,
  accentColor = "#4361EE",
}: {
  tab: EnTab;
  onChange: (t: EnTab) => void;
  accentColor?: string;
}) {
  const lang = useUiLang();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-stretch justify-around gap-1 px-2 pt-1.5"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
      >
        {(Object.keys(LABEL) as EnTab[]).map((t) => {
          const on = tab === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              aria-current={on ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition active:scale-95"
              style={{ color: on ? accentColor : "var(--text-3)", background: on ? `${accentColor}14` : "transparent" }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform" style={{ transform: on ? "translateY(-1px)" : "none" }}
                fill="none" stroke="currentColor" strokeWidth={on ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round">
                {ICONS[t]}
              </svg>
              <span className={`text-[11px] leading-none ${on ? "font-extrabold" : "font-medium"}`}>{tt(lang, LABEL[t][0], LABEL[t][1])}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
