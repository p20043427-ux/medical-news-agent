"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/error";

export default function GlobalError({
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
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0F0F1A", color: "#e2e8f0", display: "flex", minHeight: "100svh", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚠️</div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.75rem" }}>
            앱에서 오류가 발생했어요
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginTop: "0.5rem" }}>
            일시적인 오류입니다. 아래 버튼을 눌러 다시 시도하세요.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.25rem" }}>
              참조 코드: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", borderRadius: "1rem", background: "#E63946", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.9rem" }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
