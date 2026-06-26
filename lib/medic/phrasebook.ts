// 의료교류 회화집 — 종합병원 전 부서 직종별 청크를 집계. (직원↔직원 교류 대화 전용)
// 임상/시스템 표현은 양 병원(은성·가마치) 실무진 감수 후 사용 권장.
import type { MedPhraseGroup } from "./types";
import { PHRASES_COMMON } from "./data/phrase_common";
import { PHRASES_DOCTOR } from "./data/phrase_doctor";
import { PHRASES_NURSE } from "./data/phrase_nurse";
import { PHRASES_EXAM } from "./data/phrase_exam";
import { PHRASES_PHARMACY } from "./data/phrase_pharmacy";
import { PHRASES_REHAB } from "./data/phrase_rehab";
import { PHRASES_INFECTION } from "./data/phrase_infection";
import { PHRASES_QPS } from "./data/phrase_qps";
import { PHRASES_AFFAIRS } from "./data/phrase_affairs";
import { PHRASES_FINANCE } from "./data/phrase_finance";
import { PHRASES_PURCHASING } from "./data/phrase_purchasing";
import { PHRASES_ADMIN } from "./data/phrase_admin";

export const MED_PHRASEBOOK: MedPhraseGroup[] = [
  ...PHRASES_COMMON,
  ...PHRASES_DOCTOR,
  ...PHRASES_NURSE,
  ...PHRASES_EXAM,
  ...PHRASES_PHARMACY,
  ...PHRASES_REHAB,
  ...PHRASES_INFECTION,
  ...PHRASES_QPS,
  ...PHRASES_AFFAIRS,
  ...PHRASES_FINANCE,
  ...PHRASES_PURCHASING,
  ...PHRASES_ADMIN,
];
