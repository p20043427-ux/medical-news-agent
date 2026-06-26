-- 웹 푸시 구독 저장 테이블 (lib/push.ts + send-reminders 엣지 함수가 사용)
-- 적용: Supabase MCP apply_migration 또는 SQL 에디터에서 실행.

create table if not exists public.push_subscriptions (
  endpoint      text primary key,
  subscription  jsonb not null,
  user_id       uuid references auth.users(id) on delete cascade,
  lang          text,
  "time"        text,
  tz            text,
  enabled       boolean not null default true,
  last_sent     date,                                  -- 중복 발송 방지 (엣지 함수)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions(user_id);
create index if not exists push_subscriptions_enabled_idx  on public.push_subscriptions(enabled) where enabled;

-- updated_at 자동 갱신 (search_path 고정 + security invoker 로 린트 경고 회피)
create or replace function public.push_subscriptions_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_push_subscriptions_updated_at on public.push_subscriptions;
create trigger trg_push_subscriptions_updated_at
  before update on public.push_subscriptions
  for each row execute function public.push_subscriptions_set_updated_at();

-- RLS: user_progress 와 동일한 자기-행 원칙.
-- 익명 구독(user_id IS NULL)은 endpoint(추측 불가한 capability URL)로만 식별되며,
-- 발송 주체인 send-reminders 엣지 함수는 service_role 로 RLS 를 우회해 읽고 last_sent 를 갱신한다.
alter table public.push_subscriptions enable row level security;

-- 본인 또는 익명 구독 생성 허용 (남의 user_id 로는 삽입 불가)
drop policy if exists push_subs_insert on public.push_subscriptions;
create policy push_subs_insert on public.push_subscriptions
  for insert to anon, authenticated
  with check (user_id is null or auth.uid() = user_id);

-- 본인 또는 익명 구독 갱신 허용 (구독해제 시 enabled=false; endpoint 가 비밀 토큰 역할)
drop policy if exists push_subs_update on public.push_subscriptions;
create policy push_subs_update on public.push_subscriptions
  for update to anon, authenticated
  using (user_id is null or auth.uid() = user_id)
  with check (user_id is null or auth.uid() = user_id);

-- 조회·삭제는 로그인 사용자의 본인 행만 (익명 구독은 엣지 함수만 service_role 로 접근)
drop policy if exists push_subs_select_own on public.push_subscriptions;
create policy push_subs_select_own on public.push_subscriptions
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists push_subs_delete_own on public.push_subscriptions;
create policy push_subs_delete_own on public.push_subscriptions
  for delete to authenticated
  using (auth.uid() = user_id);
