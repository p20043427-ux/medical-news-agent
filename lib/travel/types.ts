// lib/travel/types.ts

export interface TravelSpot {
  name: string;      // 한국어 명칭
  nameJp: string;    // 일본어 명칭
  desc: string;      // 설명 (2-3문장)
  access?: string;   // 접근 방법
  hours?: string;    // 운영시간
  fee?: string;      // 입장료
  tips: string[];    // 실용 팁 2-4개
}

export interface TravelFood {
  name: string;
  nameJp: string;
  desc: string;
  avgPrice?: string;
  area?: string;     // 추천 지역/가게
}

export interface CityBasics {
  airport: string;
  airportCode: string;
  timezone: string;
  currency: string;
  language: string;
  emergency: string;
  tips: string[];
}

export interface CityGuide {
  key: string;
  name: string;
  nameJp: string;
  emoji: string;
  tagline: string;
  overview: string;
  basics: CityBasics;
  spots: TravelSpot[];
  food: TravelFood[];
  shopping: { name: string; nameJp: string; desc: string; }[];
  dayTrip?: { name: string; desc: string; access: string; }[];
  tips: string[];
}

export interface EntryDialogue {
  speaker: "officer" | "traveler";
  jp: string;
  reading: string;
  ko: string;
}

export interface EntrySection {
  key: string;
  title: string;
  emoji: string;
  desc: string;
  steps: {
    no: number;
    title: string;
    body: string;
    caution?: string;
    dialogue?: EntryDialogue[];
  }[];
  tips: string[];
}

export interface TransportOption {
  name: string;
  nameJp: string;
  time: string;
  fare: string;
  interval?: string;
  tip?: string;
}

export interface TransportRoute {
  key: string;
  from: string;
  to: string;
  emoji: string;
  options: TransportOption[];
  tips: string[];
}

export interface TravelPhrase {
  ko: string;
  jp: string;
  reading: string;
  note?: string;
}

export interface PhraseSection {
  key: string;
  title: string;
  emoji: string;
  phrases: TravelPhrase[];
}
