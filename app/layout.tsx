import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ServiceWorker from "@/components/jp/ServiceWorker";

export const metadata: Metadata = {
  title: "LinguaFlow — 일본어 · 영어 학습",
  description: "SM-2 알고리즘 기반 일본어·영어 어휘·문법·회화를 체계적으로 학습하는 상업 수준 언어 앱.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LinguaFlow",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F1A" },
  ],
};

const themeInit = `(function(){try{var t=localStorage.getItem('app-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');var s=localStorage.getItem('app-text-scale');if(s)document.documentElement.style.fontSize=(s==='sm'?'15px':s==='lg'?'18px':'16px');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "var(--bg)", color: "var(--text-1)" }}>
        {children}
        <ServiceWorker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
