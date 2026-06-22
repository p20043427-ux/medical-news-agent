"use client";

export type Tab = "home" | "learn" | "library" | "stats";

const ICONS: Record<Tab, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  learn: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  library: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  stats: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" />,
};

const LABEL: Record<Tab, string> = {
  home: "홈",
  learn: "학습",
  library: "단어장",
  stats: "분석",
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
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {(Object.keys(LABEL) as Tab[]).map((t) => {
          const on = tab === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition"
              style={{ color: on ? accentColor : "var(--text-3)" }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor"
                strokeWidth={on ? 2.3 : 1.8} strokeLinecap="round" strokeLinejoin="round">
                {ICONS[t]}
              </svg>
              <span className={`text-[11px] ${on ? "font-bold" : "font-medium"}`}>{LABEL[t]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
