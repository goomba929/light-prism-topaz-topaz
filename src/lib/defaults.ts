import type { Aspect, DayLog, Metric } from "@/lib/types";
import { addDays, todayKey } from "@/lib/dates";

export const ASPECTS: Aspect[] = [
  {
    id: "body",
    name: "Body",
    tagline: "The vessel that has to last.",
    order: 0,
  },
  {
    id: "spirit",
    name: "Spirit",
    tagline: "Oriented toward God, not drift.",
    order: 1,
  },
  {
    id: "kin",
    name: "Kin",
    tagline: "The people who actually get you.",
    order: 2,
  },
  {
    id: "craft",
    name: "Craft",
    tagline: "Work that compounds. Money that obeys.",
    order: 3,
  },
  {
    id: "mind",
    name: "Mind",
    tagline: "Still learning on purpose.",
    order: 4,
  },
];

export const METRICS: Metric[] = [
  {
    id: "training",
    aspectId: "body",
    name: "Training",
    prompt: "Did you train with intent, not leftover energy?",
    active: true,
    order: 0,
  },
  {
    id: "sleep",
    aspectId: "body",
    name: "Sleep",
    prompt: "Did you protect the night as if tomorrow depends on it?",
    active: true,
    order: 1,
  },
  {
    id: "nutrition",
    aspectId: "body",
    name: "Nutrition",
    prompt: "Did you eat like someone who wants this body for decades?",
    active: true,
    order: 2,
  },
  {
    id: "recovery",
    aspectId: "body",
    name: "Recovery",
    prompt: "Did you let the body actually come down?",
    active: true,
    order: 3,
  },
  {
    id: "prayer",
    aspectId: "spirit",
    name: "Prayer",
    prompt: "Did you actually pray, or only mean to?",
    active: true,
    order: 0,
  },
  {
    id: "scripture",
    aspectId: "spirit",
    name: "Scripture",
    prompt: "Did the Word get a real sitting, not a leftover minute?",
    active: true,
    order: 1,
  },
  {
    id: "integrity",
    aspectId: "spirit",
    name: "Integrity",
    prompt: "Did the private day match the public one?",
    active: true,
    order: 2,
  },
  {
    id: "stillness",
    aspectId: "spirit",
    name: "Stillness",
    prompt: "Did you sit still long enough to hear yourself?",
    active: true,
    order: 3,
  },
  {
    id: "family",
    aspectId: "kin",
    name: "Family",
    prompt: "Did the people under your roof get the real you?",
    active: true,
    order: 0,
  },
  {
    id: "home",
    aspectId: "kin",
    name: "Home",
    prompt: "Did you tend the partnership, not just occupy the house?",
    active: true,
    order: 1,
  },
  {
    id: "friendship",
    aspectId: "kin",
    name: "Friendship",
    prompt: "Did anyone outside the house feel chosen by you?",
    active: true,
    order: 2,
  },
  {
    id: "service",
    aspectId: "kin",
    name: "Service",
    prompt: "Did you spend yourself on someone who could not pay you back?",
    active: true,
    order: 3,
  },
  {
    id: "deep-work",
    aspectId: "craft",
    name: "Deep work",
    prompt: "Did you do the hard hour, not just the busy ones?",
    active: true,
    order: 0,
  },
  {
    id: "money",
    aspectId: "craft",
    name: "Money",
    prompt: "Did money move with a plan, or just happen to you?",
    active: true,
    order: 1,
  },
  {
    id: "building",
    aspectId: "craft",
    name: "Building",
    prompt: "Did the thing you are making get a real brick today?",
    active: true,
    order: 2,
  },
  {
    id: "creating",
    aspectId: "craft",
    name: "Creating",
    prompt: "Did you make something that was not required?",
    active: true,
    order: 3,
  },
  {
    id: "study",
    aspectId: "mind",
    name: "Study",
    prompt: "Did you sit with something difficult on purpose?",
    active: true,
    order: 0,
  },
  {
    id: "reading",
    aspectId: "mind",
    name: "Reading",
    prompt: "Did a book get further than your feed?",
    active: true,
    order: 1,
  },
  {
    id: "focus",
    aspectId: "mind",
    name: "Focus",
    prompt: "Did you stay with one thing long enough to finish a thought?",
    active: true,
    order: 2,
  },
  {
    id: "curiosity",
    aspectId: "mind",
    name: "Curiosity",
    prompt: "Did you follow a question further than convenience?",
    active: true,
    order: 3,
  },
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ASPECT_BASE: Record<string, number> = {
  body: 3.5,
  spirit: 2.7,
  kin: 3.8,
  craft: 3.0,
  mind: 3.6,
};

export function buildSeedLogs(
  metrics: Metric[],
  today: string = todayKey(),
): Record<string, DayLog> {
  const logs: Record<string, DayLog> = {};
  const miss = addDays(today, -7);

  for (let i = 14; i >= 1; i--) {
    const date = addDays(today, -i);
    if (date === miss) {
      logs[date] = { date, scores: {}, rest: true, journal: "Sabbath." };
      continue;
    }

    const trend = (14 - i) / 14;
    const dip = date === addDays(today, -2) ? -1.1 : 0;
    const rebound = date === addDays(today, -1) ? 0.35 : 0;
    const scores: Record<string, number> = {};

    for (const m of metrics.filter((x) => x.active)) {
      const n = (hash(date + m.id) % 1000) / 1000;
      const jitter = (n - 0.5) * 1.4;
      const raw = (ASPECT_BASE[m.aspectId] ?? 3) + trend * 0.6 + jitter + dip + rebound;
      scores[m.id] = Math.max(1, Math.min(5, Math.round(raw)));
    }

    logs[date] = { date, scores };
  }

  return logs;
}

export const LEVEL_TITLES: { min: number; title: string }[] = [
  { min: 20, title: "Exemplar" },
  { min: 15, title: "Sovereign" },
  { min: 11, title: "Sentinel" },
  { min: 8, title: "Adept" },
  { min: 5, title: "Steward" },
  { min: 3, title: "Practitioner" },
  { min: 1, title: "Initiate" },
];

export function titleForLevel(level: number): string {
  for (const row of LEVEL_TITLES) {
    if (level >= row.min) return row.title;
  }
  return "Initiate";
}
