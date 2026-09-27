export type AspectId = "body" | "spirit" | "kin" | "craft" | "mind";

export type Aspect = {
  id: AspectId;
  name: string;
  tagline: string;
  order: number;
};

export type Metric = {
  id: string;
  aspectId: AspectId;
  name: string;
  prompt: string;
  active: boolean;
  order: number;
};

export type DayLog = {
  date: string;
  scores: Record<string, number>;
  journal?: string;
  rest?: boolean;
};

export type Briefing = {
  text: string;
  at: string;
  source: "grok" | "local";
};

export type Profile = {
  name: string;
  onboarded: boolean;
  startedAt: string;
  seeded: boolean;
};

export type AppData = {
  profile: Profile;
  aspects: Aspect[];
  metrics: Metric[];
  logs: Record<string, DayLog>;
  briefings: Record<string, Briefing>;
};
