"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import AuthModal from "./AuthModal";
import { useUiLang, tt } from "@/lib/i18n";

export default function AccountButton() {
  const { user, name, email, ready, configured, signOut } = useAuth();
  const lang = useUiLang();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Supabase 미설정이면 버튼 자체를 숨김 (게스트 전용 모드)
  if (!configured || !ready) return null;

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-full px-4 py-2 text-sm font-bold text-white shadow-md transition active:scale-95"
          style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}
        >
          {tt(lang, "로그인", "ログイン")}
        </button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  const initial = (name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
        style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}
        aria-label={tt(lang, "계정", "アカウント")}
      >
        {initial}
      </button>
      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div
            className="absolute right-0 top-12 z-50 w-56 rounded-2xl p-2 shadow-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-bold" style={{ color: "var(--text-1)" }}>{name}</p>
              <p className="truncate text-xs" style={{ color: "var(--text-3)" }}>{email}</p>
            </div>
            <div className="my-1 h-px" style={{ background: "var(--border)" }} />
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs" style={{ color: "var(--success, #10B981)" }}>
              <span>☁️</span><span>{tt(lang, "진도 자동 동기화 중", "進捗を自動同期中")}</span>
            </div>
            <button
              onClick={async () => { setShowMenu(false); await signOut(); }}
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold"
              style={{ color: "#EF4444" }}
            >
              {tt(lang, "로그아웃", "ログアウト")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
