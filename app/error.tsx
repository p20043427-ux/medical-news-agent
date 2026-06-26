"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/error";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { digest: error.digest ?? null });
  }, [error]);

  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--bg)", color: "var(--text-1)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>⚠️</div>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 800, marginTop: "0.75rem" }}>
          오류가 발생했어요
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-3)", marginTop: "0.5rem" }}>
          {error.message || "일시적인 오류입니다. 잠시 후 다시 시도해 주세요."}
        </p>
        <button
          onClick={reset}
          style={{ marginTop: "1.25rem", padding: "0.65rem 1.25rem", borderRadius: "0.875rem", background: "#E63946", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
