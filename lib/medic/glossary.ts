// 의료교류 용어사전 — 분류별 청크를 집계. (한↔일 대역 의료용어)
// 임상 용어 짝은 양 병원 실무진 감수 후 사용 권장.
import type { MedTermCategory } from "./types";
import { GLOSSARY_1 } from "./data/glossary_1";
import { GLOSSARY_2 } from "./data/glossary_2";
import { GLOSSARY_3 } from "./data/glossary_3";
import { GLOSSARY_4 } from "./data/glossary_4";

export const MED_GLOSSARY: MedTermCategory[] = [
  ...GLOSSARY_1,
  ...GLOSSARY_2,
  ...GLOSSARY_3,
  ...GLOSSARY_4,
];
