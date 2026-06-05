"use server";

import { revalidatePath } from "next/cache";
import { runCrawl, type CrawlResult } from "@/lib/crawl";

export interface TriggerState {
  ok: boolean;
  message: string;
  result?: CrawlResult;
}

/** 대시보드의 '지금 수집' 버튼에서 호출하는 서버 액션 */
export async function triggerCrawl(): Promise<TriggerState> {
  try {
    const result = await runCrawl();
    revalidatePath("/");
    return {
      ok: true,
      message: `신규 ${result.inserted}건 수집 · ${result.summarized}건 요약 완료`,
      result,
    };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : String(e),
    };
  }
}
