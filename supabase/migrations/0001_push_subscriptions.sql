-- 웹 푸시 구독 저장 테이블
-- 적용: Supabase MCP apply_migration 또는 SQL 에디터에서 실행.

create table if not exists public.push_subscriptions (
  endpoint      text primary key,
  subscription  jsonb not null,
  user_id       uuid references auth.users(id) on delete cascade,
  lang          text not null default 'jp',
  "time"        text not null default '20:00',
  tz            text not null default 'UTC',
  enabled       boolean not null default true,
  last_sent     date,
  created_at    timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

-- 익명 사용자도 구독을 만들 수 있도록 허용(엔드포인트는 비밀이 아님).
-- 운영 정책에 따라 user_id 기반으로 더 좁힐 수 있다.
drop policy if exists "push_insert" on public.push_subscriptions;
create policy "push_insert" on public.push_subscriptions
  for insert with check (true);

drop policy if exists "push_update" on public.push_subscriptions;
create policy "push_update" on public.push_subscriptions
  for update using (true) with check (true);

-- 발송은 서비스 롤(엣지 함수)만 SELECT/DELETE 하면 되므로 별도 select 정책은 두지 않는다.
