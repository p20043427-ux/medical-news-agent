"use client";

import { useState, useTransition } from "react";
import { triggerCrawl } from "@/app/actions";

export default function CrawlButton() {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function onClick() {
    setMsg(null);
    startTransition(async () => {
      const res = await triggerCrawl();
      setMsg({ ok: res.ok, text: res.message });
    });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onClick}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "수집·요약 중…" : "지금 수집"}
      </button>
      {msg && (
        <span
          className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}
        >
          {msg.text}
        </span>
      )}
    </div>
  );
}
