import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 시맨틱 디자인 토큰 (globals.css 의 HSL CSS 변수와 연결) — 추가형, 기존 유틸과 공존
      colors: {
        background: "hsl(var(--ds-background) / <alpha-value>)",
        foreground: "hsl(var(--ds-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--ds-card) / <alpha-value>)",
          foreground: "hsl(var(--ds-card-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--ds-muted) / <alpha-value>)",
          foreground: "hsl(var(--ds-muted-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--ds-primary) / <alpha-value>)",
          foreground: "hsl(var(--ds-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--ds-secondary) / <alpha-value>)",
          foreground: "hsl(var(--ds-secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--ds-accent) / <alpha-value>)",
          foreground: "hsl(var(--ds-accent-foreground) / <alpha-value>)",
        },
        success: "hsl(var(--ds-success) / <alpha-value>)",
        warning: "hsl(var(--ds-warning) / <alpha-value>)",
        destructive: "hsl(var(--ds-destructive) / <alpha-value>)",
        border: "hsl(var(--ds-border) / <alpha-value>)",
        input: "hsl(var(--ds-input) / <alpha-value>)",
        ring: "hsl(var(--ds-ring) / <alpha-value>)",
      },
      // radius 는 표준 rounded-* 스케일을 덮어쓰지 않도록 별도 키로만 노출 (rounded-ds-*)
      borderRadius: {
        "ds-sm": "var(--radius-sm)",
        "ds-md": "var(--radius-md)",
        "ds-lg": "var(--radius-lg)",
        "ds-xl": "var(--radius-xl)",
      },
      boxShadow: {
        token: "var(--shadow-md)",
        "token-sm": "var(--shadow-sm)",
      },
    },
  },
  plugins: [],
};

export default config;
