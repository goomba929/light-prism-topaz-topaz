import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ASPECTS, METRICS, buildSeedLogs } from "@/lib/defaults";
import { todayKey } from "@/lib/dates";
import { clampScore } from "@/lib/scoring";
import type { AppData, AspectId, Briefing, Metric } from "@/lib/types";

type Actions = {
  setName: (name: string) => void;
  toggleMetric: (id: string) => void;
  completeOnboarding: (opts: { name: string; seed: boolean }) => void;
  setScore: (date: string, metricId: string, value: number) => void;
  clearScore: (date: string, metricId: string) => void;
  setJournal: (date: string, journal: string) => void;
  setRest: (date: string, rest: boolean) => void;
  addMetric: (input: { name: string; aspectId: AspectId; prompt?: string }) => void;
  renameMetric: (id: string, name: string) => void;
  removeMetric: (id: string) => void;
  renameAspect: (id: AspectId, name: string) => void;
  saveBriefing: (date: string, briefing: Briefing) => void;
  resetAll: () => void;
  clearHistory: () => void;
  importSheet: (data: AppData) => void;
};

const empty = (): AppData => ({
  profile: {
    name: "",
    onboarded: false,
    startedAt: "",
    seeded: false,
  },
  aspects: ASPECTS.map((a) => ({ ...a })),
  metrics: METRICS.map((m) => ({ ...m })),
  logs: {},
  briefings: {},
});

const memory: Record<string, string> = {};

const storage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return memory[name] ?? null;
    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    memory[name] = value;
    if (typeof window !== "undefined") window.localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    delete memory[name];
    if (typeof window !== "undefined") window.localStorage.removeItem(name);
  },
};

export const useAppStore = create<AppData & Actions>()(
  persist(
    (set, get) => ({
      ...empty(),

      setName: (name) =>
        set((s) => ({ profile: { ...s.profile, name } })),

      toggleMetric: (id) =>
        set((s) => ({
          metrics: s.metrics.map((m) =>
            m.id === id ? { ...m, active: !m.active } : m,
          ),
        })),

      completeOnboarding: ({ name, seed }) => {
        const today = todayKey();
        const metrics = get().metrics;
        set({
          profile: {
            name: name.trim(),
            onboarded: true,
            startedAt: today,
            seeded: seed,
          },
          logs: seed ? buildSeedLogs(metrics, today) : {},
          briefings: {},
        });
      },

      setScore: (date, metricId, value) =>
        set((s) => {
          const log = s.logs[date] ?? { date, scores: {} };
          return {
            logs: {
              ...s.logs,
              [date]: {
                ...log,
                scores: { ...log.scores, [metricId]: clampScore(value) },
              },
            },
          };
        }),

      clearScore: (date, metricId) =>
        set((s) => {
          const log = s.logs[date];
          if (!log) return s;
          const scores = { ...log.scores };
          delete scores[metricId];
          return {
            logs: {
              ...s.logs,
              [date]: { ...log, scores },
            },
          };
        }),

      setJournal: (date, journal) =>
        set((s) => {
          const log = s.logs[date] ?? { date, scores: {} };
          return {
            logs: {
              ...s.logs,
              [date]: { ...log, journal },
            },
          };
        }),

      setRest: (date, rest) =>
        set((s) => {
          const log = s.logs[date] ?? { date, scores: {} };
          return {
            logs: {
              ...s.logs,
              [date]: { ...log, rest },
            },
          };
        }),

      addMetric: ({ name, aspectId, prompt }) =>
        set((s) => {
          const order =
            s.metrics.filter((m) => m.aspectId === aspectId).length;
          const metric: Metric = {
            id:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : `m-${Date.now()}`,
            aspectId,
            name: name.trim() || "New mark",
            prompt:
              prompt?.trim() || "How fully did this show up today?",
            active: true,
            order,
          };
          return { metrics: [...s.metrics, metric] };
        }),

      renameMetric: (id, name) =>
        set((s) => ({
          metrics: s.metrics.map((m) =>
            m.id === id ? { ...m, name: name.trim() || m.name } : m,
          ),
        })),

      removeMetric: (id) =>
        set((s) => ({
          metrics: s.metrics.filter((m) => m.id !== id),
        })),

      renameAspect: (id, name) =>
        set((s) => ({
          aspects: s.aspects.map((a) =>
            a.id === id ? { ...a, name: name.trim() || a.name } : a,
          ),
        })),

      saveBriefing: (date, briefing) =>
        set((s) => ({
          briefings: { ...s.briefings, [date]: briefing },
        })),

      resetAll: () => set(empty()),

      clearHistory: () =>
        set((s) => ({
          logs: {},
          briefings: {},
          profile: { ...s.profile, seeded: false, startedAt: todayKey() },
        })),

      importSheet: (data) =>
        set({
          profile: data.profile,
          aspects: data.aspects,
          metrics: data.metrics,
          logs: data.logs,
          briefings: data.briefings ?? {},
        }),
    }),
    {
      name: "arete-v1",
      storage: {
        getItem: (name) => {
          const raw = storage.getItem(name);
          if (!raw) return null;
          try {
            return JSON.parse(raw) as { state: AppData; version?: number };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          storage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          storage.removeItem(name);
        },
      },
      version: 1,
      partialize: (s) => ({
        profile: s.profile,
        aspects: s.aspects,
        metrics: s.metrics,
        logs: s.logs,
        briefings: s.briefings,
      }),
    },
  ),
);
