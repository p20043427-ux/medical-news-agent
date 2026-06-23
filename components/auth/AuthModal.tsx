"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useUiLang, tt } from "@/lib/i18n";

type Mode = "login" | "signup";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn, signUp } = useAuth();
  const lang = useUiLang();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        if (name.trim().length < 1) {
          setError(tt(lang, "이름을 입력해 주세요.", "名前を入力してください。"));
          return;
        }
        const r = await signUp(email.trim(), password, name.trim());
        if (r.error) {
          setError(r.error);
          return;
        }
        if (r.needsConfirm) {
          setInfo(tt(lang, "확인 이메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.", "確認メールを送信しました。メール内のリンクを押してからログインしてください。"));
          setMode("login");
          return;
        }
        onClose(); // 즉시 로그인됨
      } else {
        const r = await signIn(email.trim(), password);
        if (r.error) {
          setError(r.error);
          return;
        }
        onClose();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl p-6 shadow-2xl sm:rounded-3xl"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-extrabold" style={{ color: "var(--text-1)" }}>
            {mode === "login" ? tt(lang, "로그인", "ログイン") : tt(lang, "회원가입", "新規登録")}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg"
            style={{ background: "var(--surface)", color: "var(--text-3)" }}
            aria-label={tt(lang, "닫기", "閉じる")}
          >
            ✕
          </button>
        </div>
        <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>
          {tt(lang, "진도가 계정에 저장되어 어느 기기에서나 이어서 학습할 수 있어요.", "進捗がアカウントに保存され、どの端末でも続けて学習できます。")}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <Field
              label={tt(lang, "이름", "名前")}
              value={name}
              onChange={setName}
              type="text"
              placeholder={tt(lang, "홍길동", "山田太郎")}
              autoComplete="name"
            />
          )}
          <Field
            label={tt(lang, "이메일", "メールアドレス")}
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Field
            label={tt(lang, "비밀번호", "パスワード")}
            value={password}
            onChange={setPassword}
            type="password"
            placeholder={tt(lang, "6자 이상", "6文字以上")}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          {error && (
            <p className="rounded-xl px-3 py-2 text-sm" style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}>
              {error}
            </p>
          )}
          {info && (
            <p className="rounded-xl px-3 py-2 text-sm" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 rounded-2xl py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}
          >
            {busy ? tt(lang, "처리 중…", "処理中…") : mode === "login" ? tt(lang, "로그인", "ログイン") : tt(lang, "가입하고 시작하기", "登録して始める")}
          </button>
        </form>

        <div className="mt-4 text-center text-sm" style={{ color: "var(--text-3)" }}>
          {mode === "login" ? (
            <>
              {tt(lang, "계정이 없으신가요? ", "アカウントをお持ちでないですか？ ")}
              <button onClick={() => { setMode("signup"); setError(null); setInfo(null); }} className="font-bold" style={{ color: "#4361EE" }}>
                {tt(lang, "회원가입", "新規登録")}
              </button>
            </>
          ) : (
            <>
              {tt(lang, "이미 계정이 있으신가요? ", "すでにアカウントをお持ちですか？ ")}
              <button onClick={() => { setMode("login"); setError(null); setInfo(null); }} className="font-bold" style={{ color: "#4361EE" }}>
                {tt(lang, "로그인", "ログイン")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type, placeholder, autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="rounded-xl border px-3 py-2.5 text-sm outline-none"
        style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-1)" }}
      />
    </label>
  );
}
