import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** 브라우저/서버 공용 읽기 클라이언트 (RLS 적용, 공개 읽기) */
export function getPublicClient(): SupabaseClient {
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/**
 * 서버 전용 쓰기 클라이언트 (service_role 키, RLS 우회).
 * 절대 클라이언트 번들로 노출되면 안 됨 — 서버 코드에서만 호출.
 */
export function getServiceClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface Article {
  id: string;
  source: string;
  source_url: string;
  title: string;
  original_summary: string | null;
  content: string | null;
  summary_ko: string | null;
  diseases: string[];
  category: string | null;
  published_at: string | null;
  language: string;
  llm_model: string | null;
  processed: boolean;
  created_at: string;
}
