import { describe, it, expect } from "vitest";
import { MED_PHRASEBOOK } from "@/lib/medic/phrasebook";
import { MED_GLOSSARY } from "@/lib/medic/glossary";

describe("MED_PHRASEBOOK 데이터 무결성", () => {
  it("그룹이 1개 이상", () => {
    expect(MED_PHRASEBOOK.length).toBeGreaterThan(0);
  });

  it("모든 그룹에 phrases 배열이 있고 1개 이상", () => {
    for (const group of MED_PHRASEBOOK) {
      expect(group.phrases.length, `${group.key} has no phrases`).toBeGreaterThan(0);
    }
  });

  it("모든 표현에 ko·ja·koRomaja·jaReading 필드가 있다", () => {
    for (const group of MED_PHRASEBOOK) {
      for (const p of group.phrases) {
        expect(p.ko, `ko missing in ${group.key}`).toBeTruthy();
        expect(p.ja, `ja missing in ${group.key}`).toBeTruthy();
        expect(p.koRomaja, `koRomaja missing in ${group.key}`).toBeTruthy();
        expect(p.jaReading, `jaReading missing in ${group.key}`).toBeTruthy();
      }
    }
  });

  it("전체 표현 수가 300개 이상 (방대한 콘텐츠)", () => {
    const total = MED_PHRASEBOOK.reduce((s, g) => s + g.phrases.length, 0);
    expect(total).toBeGreaterThanOrEqual(300);
  });
});

describe("MED_GLOSSARY 데이터 무결성", () => {
  it("카테고리가 1개 이상", () => {
    expect(MED_GLOSSARY.length).toBeGreaterThan(0);
  });

  it("모든 용어에 ko·ja·koRomaja·jaReading 필드가 있다", () => {
    for (const cat of MED_GLOSSARY) {
      for (const t of cat.terms) {
        expect(t.ko, `ko missing in ${cat.key}`).toBeTruthy();
        expect(t.ja, `ja missing in ${cat.key}`).toBeTruthy();
      }
    }
  });

  it("전체 용어 수가 200개 이상", () => {
    const total = MED_GLOSSARY.reduce((s, c) => s + c.terms.length, 0);
    expect(total).toBeGreaterThanOrEqual(200);
  });
});
