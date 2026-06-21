import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "일본어 회화 — JLPT N5 단어·생활 회화 학습",
  description:
    "JLPT N5 단어와 생활 회화, 필수 동사를 카드와 음성(TTS)으로 학습하는 일본어 공부 웹앱.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f6f8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen text-slate-800 antialiased">{children}</body>
    </html>
  );
}
