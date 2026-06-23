"use client";

import { useUiLang, tt } from "@/lib/i18n";

export type Tab = "home" | "learn" | "library" | "stats";

const ICONS: Record<Tab, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  learn: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  library: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  stats: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" />,
};

const LABEL: Record<Tab, [string, string]> = {
  home: ["홈", "ホーム"],
  learn: ["학습", "学習"],
  library: ["단어장", "単語帳"],
  stats: ["분석", "分析"],
};

export default function BottomNav({
  tab,
  onChange,
  accentColor = "#1A1A2E",
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
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
        {(Object.keys(LABEL) as Tab[]).map((t) => {
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
