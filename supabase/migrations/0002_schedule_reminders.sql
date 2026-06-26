-- 매시간 send-reminders 엣지 함수 호출 (pg_cron + pg_net)
-- 사전 준비: dashboard 에서 pg_cron, pg_net 확장 활성화.
-- <PROJECT_REF> 와 <SERVICE_ROLE_KEY> 를 실제 값으로 교체해 실행.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'send-study-reminders',
  '0 * * * *',  -- 매시 정각
  $$
  select net.http_post(
    url := 'https://<PROJECT_REF>.functions.supabase.co/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <SERVICE_ROLE_KEY>'
    ),
    body := '{}'::jsonb
  );
  $$
);
