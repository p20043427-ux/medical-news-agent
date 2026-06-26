-- LinguaFlow: 회원가입(이메일/이름/비밀번호) + 개인별 학습 진도 저장
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣어 실행하세요.

-- ───────────────────────────── profiles ─────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  name       text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 회원가입 시 프로필 자동 생성 (이름은 메타데이터에서 가져옴)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────── user_progress ──────────────────────────
-- 사용자 × 언어 1행. 진도 전체를 jsonb 로 저장 (SM-2 카드/XP/통계 포함)
create table if not exists public.user_progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  lang       text not null check (lang in ('jp','en')),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);

alter table public.user_progress enable row level security;

drop policy if exists "progress_select_own" on public.user_progress;
create policy "progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.user_progress;
create policy "progress_delete_own" on public.user_progress
  for delete using (auth.uid() = user_id);
