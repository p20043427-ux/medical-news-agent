import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "의료 뉴스 Agent — 최신 질병 정보 자동 수집·요약",
  description:
    "WHO · CDC · NIH · PubMed · Medical Xpress · Google News · Reuters 의 최신 의료/질병 뉴스를 자동 수집하고 openrouter/auto 로 한국어 요약합니다.",
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
