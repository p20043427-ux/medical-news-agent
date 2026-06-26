// 학습 리마인더 웹 푸시 발송 (Supabase Edge Function, Deno)
//
// 배포:
//   supabase functions deploy send-reminders --no-verify-jwt
// 시크릿:
//   supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:you@example.com
// 스케줄(매시간): pg_cron + pg_net 로 본 함수 URL 을 호출 (아래 0002 마이그레이션 참고)
//
// 동작: enabled 구독 중 사용자의 현지 시각이 설정 시각을 지났고 오늘 아직 안 보낸 경우 푸시.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  webpush.setVapidDetails(
    Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com",
    Deno.env.get("VAPID_PUBLIC_KEY")!,
    Deno.env.get("VAPID_PRIVATE_KEY")!,
  );

  const { data, error } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("enabled", true);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const now = new Date();
  let sent = 0;

  for (const row of data ?? []) {
    const tz = row.tz || "UTC";
    const localTime = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
    const localDate = new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(now); // yyyy-mm-dd

    if (localTime.slice(0, 5) >= (row.time || "20:00") && row.last_sent !== localDate) {
      try {
        await webpush.sendNotification(
          row.subscription,
          JSON.stringify({ title: "오늘의 학습 시간이에요 📚", body: "잠깐이면 충분해요. 오늘 목표를 채워볼까요?", url: "/" }),
        );
        sent++;
        await supabase.from("push_subscriptions").update({ last_sent: localDate }).eq("endpoint", row.endpoint);
      } catch (e) {
        const msg = String(e);
        if (msg.includes("410") || msg.includes("404")) {
          await supabase.from("push_subscriptions").delete().eq("endpoint", row.endpoint);
        }
      }
    }
  }

  return new Response(JSON.stringify({ sent }), { headers: { "content-type": "application/json" } });
});
