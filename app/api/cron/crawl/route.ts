import { NextRequest, NextResponse } from "next/server";
import { runCrawl } from "@/lib/crawl";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vercel Cron 엔드포인트 (하루 1회, vercel.json 참조).
 * CRON_SECRET 이 설정되어 있으면 Bearer 인증 필수.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await runCrawl();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[cron/crawl] 실패:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
