"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

type Mode = "login" | "signup";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn, signUp } = useAuth();
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
          setError("이름을 입력해 주세요.");
          return;
        }
        const r = await signUp(email.trim(), password, name.trim());
        if (r.error) {
          setError(r.error);
          return;
        }
        if (r.needsConfirm) {
          setInfo("확인 이메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.");
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
            {mode === "login" ? "로그인" : "회원가입"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg"
            style={{ background: "var(--surface)", color: "var(--text-3)" }}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>
          진도가 계정에 저장되어 어느 기기에서나 이어서 학습할 수 있어요.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <Field
              label="이름"
              value={name}
              onChange={setName}
              type="text"
              placeholder="홍길동"
              autoComplete="name"
            />
          )}
          <Field
            label="이메일"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Field
            label="비밀번호"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="6자 이상"
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
            {busy ? "처리 중…" : mode === "login" ? "로그인" : "가입하고 시작하기"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm" style={{ color: "var(--text-3)" }}>
          {mode === "login" ? (
            <>
              계정이 없으신가요?{" "}
              <button onClick={() => { setMode("signup"); setError(null); setInfo(null); }} className="font-bold" style={{ color: "#4361EE" }}>
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <button onClick={() => { setMode("login"); setError(null); setInfo(null); }} className="font-bold" style={{ color: "#4361EE" }}>
                로그인
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
