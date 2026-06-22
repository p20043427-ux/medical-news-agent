"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Progress,
  Switch,
  Avatar,
} from "@/components/ui";

/**
 * 디자인 시스템 v2 쇼케이스 — 토큰 + 프리미티브 검증용.
 * /ui-demo 에서 라이트/다크 모두 확인 가능.
 */
export default function UiDemo() {
  const [dark, setDark] = useState(false);
  const [sw, setSw] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-background px-5 py-8 text-foreground">
        <div className="mx-auto max-w-md space-y-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">디자인 시스템 v2</h1>
              <p className="text-sm text-muted-foreground">토큰 · 프리미티브 쇼케이스</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">다크</span>
              <Switch checked={dark} onCheckedChange={setDark} aria-label="다크 모드" />
            </div>
          </header>

          {/* Button */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground">Button</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="brand">Brand</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="surface">Surface</Button>
              <Button variant="success">Success</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
            <Button block variant="brand">전체 너비 (block)</Button>
          </section>

          {/* Badge */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground">Badge</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>N5</Badge>
              <Badge variant="primary">명사</Badge>
              <Badge variant="accent">A1</Badge>
              <Badge variant="success">완료</Badge>
              <Badge variant="warning">복습</Badge>
              <Badge variant="muted">미학습</Badge>
              <Badge variant="outline">outline</Badge>
            </div>
          </section>

          {/* Progress */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground">Progress</h2>
            <Progress value={32} />
            <Progress value={68} indicatorClassName="bg-accent" />
            <Progress value={100} indicatorClassName="bg-success" />
          </section>

          {/* Card */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground">Card</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar fallback="あ" />
                  <div className="flex-1">
                    <CardTitle>인사 · 표현</CardTitle>
                    <CardDescription>10개 단어 · 약 3분</CardDescription>
                  </div>
                  <Badge variant="primary">N5</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={45} />
              </CardContent>
              <CardFooter>
                <Button block variant="brand">바로 시작</Button>
              </CardFooter>
            </Card>
          </section>

          {/* Switch */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground">Switch</h2>
            <div className="flex items-center justify-between rounded-ds-lg border border-border bg-card p-4">
              <span className="text-sm font-medium">후리가나 표시</span>
              <Switch checked={sw} onCheckedChange={setSw} aria-label="후리가나" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
