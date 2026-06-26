import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LinguaFlow",
    short_name: "LinguaFlow",
    description: "일본어 · 영어 SM-2 언어 학습 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F1A",
    theme_color: "#0F0F1A",
    lang: "ko",
    orientation: "portrait",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
