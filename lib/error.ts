// 에러 리포팅 단일 교체점(seam).
// 현재: Vercel Analytics 커스텀 이벤트로 전송 (DSN/계정 불필요).
// Sentry로 교체 시 이 파일만 수정.

import { track } from "@/lib/analytics";

export interface ErrorContext {
  componentStack?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export function reportError(error: unknown, ctx?: ErrorContext): void {
  try {
    const message =
      error instanceof Error ? error.message : String(error);
    const name =
      error instanceof Error ? error.name : "UnknownError";

    track("error", {
      name,
      message: message.slice(0, 200),
      ...(ctx?.componentStack
        ? { componentStack: ctx.componentStack.slice(0, 300) }
        : {}),
    });

    if (process.env.NODE_ENV === "development") {
      console.error("[reportError]", error, ctx);
    }
  } catch {
    /* reporting must never throw */
  }
}
