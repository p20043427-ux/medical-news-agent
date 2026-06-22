import * as React from "react";
import { cn } from "@/lib/ui/cn";

type Variant = "brand" | "accent" | "dark" | "surface" | "success" | "destructive" | "ghost";
type Size = "sm" | "md" | "lg" | "icon" | "free";

const VARIANT: Record<Variant, string> = {
  brand: "bg-primary text-primary-foreground shadow-token active:shadow-none",
  accent: "bg-accent text-accent-foreground shadow-token active:shadow-none",
  dark: "bg-foreground text-background shadow-token",
  surface: "bg-card text-foreground border border-border shadow-token-sm",
  success: "bg-success text-white shadow-token-sm",
  destructive: "bg-destructive text-white shadow-token-sm",
  ghost: "bg-transparent text-muted-foreground hover:bg-muted",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-13 px-5 text-base",
  icon: "h-10 w-10",
  free: "", // 치수를 className 으로 직접 제어 (기존 화면 마이그레이션용)
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** 전체 너비 */
  block?: boolean;
}

/**
 * 공통 Button — 디자인 토큰 기반, RN Reusables `Button` 과 1:1 매핑 가능한 구조.
 * 접근성: focus-visible 링은 globals.css 전역 규칙으로 처리.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "brand", size = "md", block, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 rounded-ds-lg font-bold transition active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        block && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
