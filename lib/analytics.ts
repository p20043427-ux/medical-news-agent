import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/**
 * 사용 이벤트 추적 단일 seam.
 * 현재는 Vercel Web Analytics(커스텀 이벤트)로 전송.
 * 추후 PostHog 등으로 교체 시 이 파일만 수정하면 됨.
 * 실패는 조용히 무시(분석이 앱 동작을 막지 않도록).
 */
export function track(event: string, props?: Props): void {
  try {
    vercelTrack(event, props);
  } catch {
    /* no-op */
  }
}
