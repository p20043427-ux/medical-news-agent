"use client";

export type Tab = "home" | "conversation" | "verbs" | "stats";

const ICONS: Record<Tab, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  conversation: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  verbs: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />,
  stats: <path d="M3 3v18h18M8 16V9m5 7V5m5 11v-4" />,
};

const LABEL: Record<Tab, string> = {
  home: "홈",
  conversation: "회화",
  verbs: "동사",
  stats: "분석",
};

export default function BottomNav({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {(Object.keys(LABEL) as Tab[]).map((t) => {
          const on = tab === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition ${on ? "text-slate-900" : "text-slate-400"}`}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={on ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
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
