/** @type {import('next').NextConfig} */

// 모든 응답에 적용할 보안 헤더.
// localStorage 클라이언트 암호화는 복호화 키도 번들에 실려 XSS 를 막지 못하는
// "보안 연극"이므로 채택하지 않고, 실효성 있는 표준 헤더로 방어한다.
const securityHeaders = [
  // 클릭재킹 방지 — 외부 사이트가 iframe 으로 감싸지 못하게.
  { key: "X-Frame-Options", value: "DENY" },
  // MIME 스니핑 방지.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 레퍼러 최소 노출.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HTTPS 강제(2년, 서브도메인 포함). Vercel 이 HTTPS 종단.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // 사용하지 않는 강력 기능 차단(마이크·카메라·위치·결제). TTS 는 권한 불필요.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
