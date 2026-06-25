// 도시 가이드 집계 — 도시 중심 IA의 단일 소스.
import type { CityGuide } from "./types";
import { TOKYO } from "./tokyo";
import { OSAKA } from "./osaka";
import { KYOTO } from "./kyoto";
import { FUKUOKA } from "./fukuoka";
import { SAPPORO } from "./sapporo";

export const CITIES: CityGuide[] = [TOKYO, KYOTO, OSAKA, FUKUOKA, SAPPORO];
