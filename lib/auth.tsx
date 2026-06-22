"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "./supabase/client";
import { hydrateFromRemote, pushLocalIfRemoteEmpty } from "./sync";

interface AuthResult {
  error?: string;
  /** 회원가입 시 이메일 확인이 필요한 경우 true */
  needsConfirm?: boolean;
}

interface AuthState {
  user: User | null;
  name: string | null;
  email: string | null;
  ready: boolean;
  configured: boolean;
  signUp: (email: string, password: string, name: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setReady(true);
      return;
    }
    let active = true;

    sb.auth.getSession().then(({ data }) => {
      if (!active) return;
      const u = data.session?.user ?? null;
      setUser(u);
      setReady(true);
      if (u) void onLogin();
    });

    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") void onLogin();
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onLogin() {
    await pushLocalIfRemoteEmpty();
    await hydrateFromRemote();
  }

  const signUp = useCallback(
    async (email: string, password: string, name: string): Promise<AuthResult> => {
      const sb = getSupabase();
      if (!sb) return { error: "로그인 기능이 아직 설정되지 않았어요." };
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) return { error: translate(error.message) };
      // 세션이 없으면 이메일 확인이 필요한 상태
      return { needsConfirm: !data.session };
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const sb = getSupabase();
      if (!sb) return { error: "로그인 기능이 아직 설정되지 않았어요." };
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return { error: translate(error.message) };
      return {};
    },
    []
  );

  const signOut = useCallback(async () => {
    const sb = getSupabase();
    await sb?.auth.signOut();
    setUser(null);
  }, []);

  const name =
    (user?.user_metadata?.name as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <Ctx.Provider
      value={{
        user,
        name,
        email: user?.email ?? null,
        ready,
        configured,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Supabase 영문 오류를 한국어로 간단 변환
function translate(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "이메일 또는 비밀번호가 올바르지 않아요.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "이미 가입된 이메일이에요. 로그인해 주세요.";
  if (m.includes("password should be") || m.includes("at least 6"))
    return "비밀번호는 6자 이상이어야 해요.";
  if (m.includes("unable to validate email") || m.includes("invalid email"))
    return "이메일 형식이 올바르지 않아요.";
  if (m.includes("email not confirmed"))
    return "이메일 확인이 필요해요. 받은 편지함을 확인해 주세요.";
  return msg;
}
