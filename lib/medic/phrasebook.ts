// 의료교류 회화집 — 직종별 청크를 집계. (직원↔직원 교류 대화 전용)
// 임상/시스템 표현은 양 병원(은성·가마치) 실무진 감수 후 사용 권장.
import type { MedPhraseGroup } from "./types";
import { PHRASES_COMMON } from "./data/phrase_common";
import { PHRASES_DOCTOR } from "./data/phrase_doctor";
import { PHRASES_NURSE } from "./data/phrase_nurse";
import { PHRASES_EXAM } from "./data/phrase_exam";
import { PHRASES_PHARMACY } from "./data/phrase_pharmacy";
import { PHRASES_ADMIN } from "./data/phrase_admin";

export const MED_PHRASEBOOK: MedPhraseGroup[] = [
  ...PHRASES_COMMON,
  ...PHRASES_DOCTOR,
  ...PHRASES_NURSE,
  ...PHRASES_EXAM,
  ...PHRASES_PHARMACY,
  ...PHRASES_ADMIN,
];
