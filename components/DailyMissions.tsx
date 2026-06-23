"use client";

import { Progress } from "@/components/ui";

export interface Mission {
  emoji: string;
  label: string;
  done: number;
  goal: number;
}

// 오늘의 미션 카드 (JP·EN 홈 공용)
export default function DailyMissions({ missions, accent = "#E63946" }: { missions: Mission[]; accent?: string }) {
  const cleared = missions.filter((m) => m.done >= m.goal).length;
  const all = cleared === missions.length;

  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{all ? "🎉 오늘의 미션 완료!" : "🎯 오늘의 미션"}</span>
        <span className="text-xs font-bold" style={{ color: all ? "#10B981" : "var(--text-3)" }}>{cleared} / {missions.length}</span>
      </div>
      <div className="space-y-2">
        {missions.map((m) => {
          const ok = m.done >= m.goal;
          return (
            <div key={m.label} className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm"
                style={{ background: ok ? "#10B98118" : "var(--surface)" }}>{ok ? "✅" : m.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-semibold" style={{ color: ok ? "var(--text-3)" : "var(--text-1)", textDecoration: ok ? "line-through" : "none" }}>{m.label}</span>
                  <span className="shrink-0 text-[11px] font-bold" style={{ color: "var(--text-3)" }}>{Math.min(m.done, m.goal)}/{m.goal}</span>
                </div>
                <Progress value={Math.min((m.done / m.goal) * 100, 100)} className="mt-1 h-1.5" indicatorStyle={{ background: ok ? "#10B981" : accent }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
