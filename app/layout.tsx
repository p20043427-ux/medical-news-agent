import type { Metadata } from "next";
import "./globals.css";
import ServiceWorker from "@/components/jp/ServiceWorker";

export const metadata: Metadata = {
  title: "일본어 회화 — JLPT N5 단어·생활 회화 학습",
  description:
    "JLPT N5 단어와 생활 회화, 필수 동사를 카드와 음성(TTS)으로 학습하는 일본어 공부 웹앱.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "일본어 N5",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

// 다크 모드 깜빡임(FOUC) 방지: 페인트 전에 테마 클래스 적용
const themeInit = `(function(){try{var t=localStorage.getItem('jp-app-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen text-slate-800 antialiased">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
