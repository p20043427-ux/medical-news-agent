"use client";

export type EnTab = "home" | "learn" | "review" | "grammar" | "stats";

const ICONS: Record<EnTab, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  learn: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  review: <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />,
  grammar: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  stats: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" />,
};

const LABEL: Record<EnTab, string> = {
  home: "홈",
  learn: "학습",
  review: "복습",
  grammar: "문법",
  stats: "분석",
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
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t backdrop-blur"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {(Object.keys(LABEL) as EnTab[]).map((t) => {
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
