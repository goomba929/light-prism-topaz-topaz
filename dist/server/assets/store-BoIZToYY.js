import { BookOpen, Dumbbell, Flame, Hammer, Users } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { persist } from "zustand/middleware";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/icons.ts
var ASPECT_ICONS = {
	body: Dumbbell,
	spirit: Flame,
	kin: Users,
	craft: Hammer,
	mind: BookOpen
};
//#endregion
//#region src/lib/dates.ts
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDays(key, n) {
	const d = parseKey(key);
	d.setDate(d.getDate() + n);
	return todayKey(d);
}
function weekday(key) {
	return parseKey(key).getDay();
}
function startOfIsoWeek(key) {
	const d = parseKey(key);
	const day = d.getDay();
	const diff = day === 0 ? -6 : 1 - day;
	d.setDate(d.getDate() + diff);
	return todayKey(d);
}
function keysBefore(end, count) {
	const out = [];
	for (let i = count - 1; i >= 0; i--) out.push(addDays(end, -i));
	return out;
}
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var MONTHS_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
var DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var DAYS_SHORT = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function formatLong(key) {
	const d = parseKey(key);
	return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function formatMedium(key) {
	const d = parseKey(key);
	return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
}
function formatWeekday(key) {
	return DAYS[parseKey(key).getDay()] ?? "";
}
function formatWeekdayShort(key) {
	return DAYS_SHORT[parseKey(key).getDay()] ?? "";
}
function isMonday(key) {
	return weekday(key) === 1;
}
function isSunday(key) {
	return weekday(key) === 0;
}
//#endregion
//#region src/lib/defaults.ts
var ASPECTS = [
	{
		id: "body",
		name: "Body",
		tagline: "The vessel that has to last.",
		order: 0
	},
	{
		id: "spirit",
		name: "Spirit",
		tagline: "Oriented toward God, not drift.",
		order: 1
	},
	{
		id: "kin",
		name: "Kin",
		tagline: "The people who actually get you.",
		order: 2
	},
	{
		id: "craft",
		name: "Craft",
		tagline: "Work that compounds. Money that obeys.",
		order: 3
	},
	{
		id: "mind",
		name: "Mind",
		tagline: "Still learning on purpose.",
		order: 4
	}
];
var METRICS = [
	{
		id: "training",
		aspectId: "body",
		name: "Training",
		prompt: "Did you train with intent, not leftover energy?",
		active: true,
		order: 0
	},
	{
		id: "sleep",
		aspectId: "body",
		name: "Sleep",
		prompt: "Did you protect the night as if tomorrow depends on it?",
		active: true,
		order: 1
	},
	{
		id: "nutrition",
		aspectId: "body",
		name: "Nutrition",
		prompt: "Did you eat like someone who wants this body for decades?",
		active: true,
		order: 2
	},
	{
		id: "recovery",
		aspectId: "body",
		name: "Recovery",
		prompt: "Did you let the body actually come down?",
		active: true,
		order: 3
	},
	{
		id: "prayer",
		aspectId: "spirit",
		name: "Prayer",
		prompt: "Did you actually pray, or only mean to?",
		active: true,
		order: 0
	},
	{
		id: "scripture",
		aspectId: "spirit",
		name: "Scripture",
		prompt: "Did the Word get a real sitting, not a leftover minute?",
		active: true,
		order: 1
	},
	{
		id: "integrity",
		aspectId: "spirit",
		name: "Integrity",
		prompt: "Did the private day match the public one?",
		active: true,
		order: 2
	},
	{
		id: "stillness",
		aspectId: "spirit",
		name: "Stillness",
		prompt: "Did you sit still long enough to hear yourself?",
		active: true,
		order: 3
	},
	{
		id: "family",
		aspectId: "kin",
		name: "Family",
		prompt: "Did the people under your roof get the real you?",
		active: true,
		order: 0
	},
	{
		id: "home",
		aspectId: "kin",
		name: "Home",
		prompt: "Did you tend the partnership, not just occupy the house?",
		active: true,
		order: 1
	},
	{
		id: "friendship",
		aspectId: "kin",
		name: "Friendship",
		prompt: "Did anyone outside the house feel chosen by you?",
		active: true,
		order: 2
	},
	{
		id: "service",
		aspectId: "kin",
		name: "Service",
		prompt: "Did you spend yourself on someone who could not pay you back?",
		active: true,
		order: 3
	},
	{
		id: "deep-work",
		aspectId: "craft",
		name: "Deep work",
		prompt: "Did you do the hard hour, not just the busy ones?",
		active: true,
		order: 0
	},
	{
		id: "money",
		aspectId: "craft",
		name: "Money",
		prompt: "Did money move with a plan, or just happen to you?",
		active: true,
		order: 1
	},
	{
		id: "building",
		aspectId: "craft",
		name: "Building",
		prompt: "Did the thing you are making get a real brick today?",
		active: true,
		order: 2
	},
	{
		id: "creating",
		aspectId: "craft",
		name: "Creating",
		prompt: "Did you make something that was not required?",
		active: true,
		order: 3
	},
	{
		id: "study",
		aspectId: "mind",
		name: "Study",
		prompt: "Did you sit with something difficult on purpose?",
		active: true,
		order: 0
	},
	{
		id: "reading",
		aspectId: "mind",
		name: "Reading",
		prompt: "Did a book get further than your feed?",
		active: true,
		order: 1
	},
	{
		id: "focus",
		aspectId: "mind",
		name: "Focus",
		prompt: "Did you stay with one thing long enough to finish a thought?",
		active: true,
		order: 2
	},
	{
		id: "curiosity",
		aspectId: "mind",
		name: "Curiosity",
		prompt: "Did you follow a question further than convenience?",
		active: true,
		order: 3
	}
];
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
var ASPECT_BASE = {
	body: 3.5,
	spirit: 2.7,
	kin: 3.8,
	craft: 3,
	mind: 3.6
};
function buildSeedLogs(metrics, today = todayKey()) {
	const logs = {};
	const miss = addDays(today, -7);
	for (let i = 14; i >= 1; i--) {
		const date = addDays(today, -i);
		if (date === miss) {
			logs[date] = {
				date,
				scores: {},
				rest: true,
				journal: "Sabbath."
			};
			continue;
		}
		const trend = (14 - i) / 14;
		const dip = date === addDays(today, -2) ? -1.1 : 0;
		const rebound = date === addDays(today, -1) ? .35 : 0;
		const scores = {};
		for (const m of metrics.filter((x) => x.active)) {
			const jitter = (hash(date + m.id) % 1e3 / 1e3 - .5) * 1.4;
			const raw = (ASPECT_BASE[m.aspectId] ?? 3) + trend * .6 + jitter + dip + rebound;
			scores[m.id] = Math.max(1, Math.min(5, Math.round(raw)));
		}
		logs[date] = {
			date,
			scores
		};
	}
	return logs;
}
var LEVEL_TITLES = [
	{
		min: 20,
		title: "Exemplar"
	},
	{
		min: 15,
		title: "Sovereign"
	},
	{
		min: 11,
		title: "Sentinel"
	},
	{
		min: 8,
		title: "Adept"
	},
	{
		min: 5,
		title: "Steward"
	},
	{
		min: 3,
		title: "Practitioner"
	},
	{
		min: 1,
		title: "Initiate"
	}
];
function titleForLevel(level) {
	for (const row of LEVEL_TITLES) if (level >= row.min) return row.title;
	return "Initiate";
}
//#endregion
//#region src/lib/scoring.ts
function clampScore(n) {
	return Math.max(1, Math.min(5, Math.round(n)));
}
function scoreDay(date, log, metrics, aspects) {
	const active = metrics.filter((m) => m.active);
	const scores = log?.scores ?? {};
	const ratedList = active.filter((m) => scores[m.id] != null);
	const rated = ratedList.length;
	const completion = active.length === 0 ? 0 : rated / active.length;
	const ratedSum = ratedList.reduce((s, m) => s + (scores[m.id] ?? 0), 0);
	const trueSum = active.reduce((s, m) => s + (scores[m.id] ?? 0), 0);
	const idealPct = rated === 0 ? 0 : Math.round(ratedSum / (rated * 5) * 1e3) / 10;
	const truePct = active.length === 0 ? 0 : Math.round(trueSum / (active.length * 5) * 1e3) / 10;
	const aspectPct = {};
	for (const a of aspects) {
		const group = active.filter((m) => m.aspectId === a.id);
		if (group.length === 0) {
			aspectPct[a.id] = 0;
			continue;
		}
		const sum = group.reduce((s, m) => s + (scores[m.id] ?? 0), 0);
		aspectPct[a.id] = Math.round(sum / (group.length * 5) * 1e3) / 10;
	}
	const xp = log?.rest ? 0 : Math.round(truePct * completion * 1.15);
	return {
		date,
		rated,
		active: active.length,
		completion,
		idealPct,
		truePct,
		aspectPct,
		xp,
		rest: Boolean(log?.rest)
	};
}
function streakEndingAt(end, logs, metrics) {
	const active = metrics.filter((m) => m.active);
	if (active.length === 0) return 0;
	const kept = (k) => {
		const log = logs[k];
		if (log?.rest) return true;
		return (log ? active.filter((m) => log.scores[m.id] != null).length : 0) > 0;
	};
	let k = end;
	if (!kept(k)) k = addDays(end, -1);
	let n = 0;
	for (let i = 0; i < 400; i++) {
		if (!kept(k)) break;
		n += 1;
		k = addDays(k, -1);
	}
	return n;
}
function totalXp(logs, metrics, aspects) {
	let xp = 0;
	for (const log of Object.values(logs)) xp += scoreDay(log.date, log, metrics, aspects).xp;
	return xp;
}
function levelFromXp(xp) {
	const per = 180;
	const level = Math.max(1, Math.floor(xp / per) + 1);
	const into = xp % per;
	return {
		level,
		title: titleForLevel(level),
		into,
		needed: per,
		progress: into / per
	};
}
function averagesForRange(keys, logs, metrics) {
	return metrics.filter((m) => m.active).map((metric) => {
		let sum = 0;
		let n = 0;
		for (const k of keys) {
			const v = logs[k]?.scores[metric.id];
			if (v != null) {
				sum += v;
				n += 1;
			}
		}
		return {
			metric,
			avg: n === 0 ? 0 : sum / n,
			n
		};
	});
}
function aspectAverages(keys, logs, metrics, aspects) {
	return aspects.map((aspect) => {
		const group = metrics.filter((m) => m.active && m.aspectId === aspect.id);
		let sum = 0;
		let n = 0;
		for (const k of keys) {
			const log = logs[k];
			if (!log) continue;
			for (const m of group) {
				const v = log.scores[m.id];
				if (v != null) {
					sum += v;
					n += 1;
				}
			}
		}
		return {
			aspect,
			pct: n === 0 ? 0 : Math.round(sum / (n * 5) * 1e3) / 10,
			n
		};
	});
}
function historySeries(end, days, logs, metrics, aspects) {
	return keysBefore(end, days).map((date) => scoreDay(date, logs[date], metrics, aspects));
}
function variance(values) {
	if (values.length < 2) return 0;
	const mean = values.reduce((a, b) => a + b, 0) / values.length;
	const v = values.reduce((s, x) => s + (x - mean) ** 2, 0) / (values.length - 1);
	return Math.sqrt(v);
}
//#endregion
//#region src/lib/store.ts
var empty = () => ({
	profile: {
		name: "",
		onboarded: false,
		startedAt: "",
		seeded: false
	},
	aspects: ASPECTS.map((a) => ({ ...a })),
	metrics: METRICS.map((m) => ({ ...m })),
	logs: {},
	briefings: {}
});
var memory = {};
var storage = {
	getItem: (name) => {
		if (typeof window === "undefined") return memory[name] ?? null;
		return window.localStorage.getItem(name);
	},
	setItem: (name, value) => {
		memory[name] = value;
		if (typeof window !== "undefined") window.localStorage.setItem(name, value);
	},
	removeItem: (name) => {
		delete memory[name];
		if (typeof window !== "undefined") window.localStorage.removeItem(name);
	}
};
var useAppStore = create()(persist((set, get) => ({
	...empty(),
	setName: (name) => set((s) => ({ profile: {
		...s.profile,
		name
	} })),
	toggleMetric: (id) => set((s) => ({ metrics: s.metrics.map((m) => m.id === id ? {
		...m,
		active: !m.active
	} : m) })),
	completeOnboarding: ({ name, seed }) => {
		const today = todayKey();
		const metrics = get().metrics;
		set({
			profile: {
				name: name.trim(),
				onboarded: true,
				startedAt: today,
				seeded: seed
			},
			logs: seed ? buildSeedLogs(metrics, today) : {},
			briefings: {}
		});
	},
	setScore: (date, metricId, value) => set((s) => {
		const log = s.logs[date] ?? {
			date,
			scores: {}
		};
		return { logs: {
			...s.logs,
			[date]: {
				...log,
				scores: {
					...log.scores,
					[metricId]: clampScore(value)
				}
			}
		} };
	}),
	clearScore: (date, metricId) => set((s) => {
		const log = s.logs[date];
		if (!log) return s;
		const scores = { ...log.scores };
		delete scores[metricId];
		return { logs: {
			...s.logs,
			[date]: {
				...log,
				scores
			}
		} };
	}),
	setJournal: (date, journal) => set((s) => {
		const log = s.logs[date] ?? {
			date,
			scores: {}
		};
		return { logs: {
			...s.logs,
			[date]: {
				...log,
				journal
			}
		} };
	}),
	setRest: (date, rest) => set((s) => {
		const log = s.logs[date] ?? {
			date,
			scores: {}
		};
		return { logs: {
			...s.logs,
			[date]: {
				...log,
				rest
			}
		} };
	}),
	addMetric: ({ name, aspectId, prompt }) => set((s) => {
		const order = s.metrics.filter((m) => m.aspectId === aspectId).length;
		const metric = {
			id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `m-${Date.now()}`,
			aspectId,
			name: name.trim() || "New mark",
			prompt: prompt?.trim() || "How fully did this show up today?",
			active: true,
			order
		};
		return { metrics: [...s.metrics, metric] };
	}),
	renameMetric: (id, name) => set((s) => ({ metrics: s.metrics.map((m) => m.id === id ? {
		...m,
		name: name.trim() || m.name
	} : m) })),
	removeMetric: (id) => set((s) => ({ metrics: s.metrics.filter((m) => m.id !== id) })),
	renameAspect: (id, name) => set((s) => ({ aspects: s.aspects.map((a) => a.id === id ? {
		...a,
		name: name.trim() || a.name
	} : a) })),
	saveBriefing: (date, briefing) => set((s) => ({ briefings: {
		...s.briefings,
		[date]: briefing
	} })),
	resetAll: () => set(empty()),
	clearHistory: () => set((s) => ({
		logs: {},
		briefings: {},
		profile: {
			...s.profile,
			seeded: false,
			startedAt: todayKey()
		}
	})),
	importSheet: (data) => set({
		profile: data.profile,
		aspects: data.aspects,
		metrics: data.metrics,
		logs: data.logs,
		briefings: data.briefings ?? {}
	})
}), {
	name: "arete-v1",
	storage: {
		getItem: (name) => {
			const raw = storage.getItem(name);
			if (!raw) return null;
			try {
				return JSON.parse(raw);
			} catch {
				return null;
			}
		},
		setItem: (name, value) => {
			storage.setItem(name, JSON.stringify(value));
		},
		removeItem: (name) => {
			storage.removeItem(name);
		}
	},
	version: 1,
	partialize: (s) => ({
		profile: s.profile,
		aspects: s.aspects,
		metrics: s.metrics,
		logs: s.logs,
		briefings: s.briefings
	})
}));
//#endregion
export { cn as S, keysBefore as _, levelFromXp as a, weekday as b, totalXp as c, formatLong as d, formatMedium as f, isSunday as g, isMonday as h, historySeries as i, variance as l, formatWeekdayShort as m, aspectAverages as n, scoreDay as o, formatWeekday as p, averagesForRange as r, streakEndingAt as s, useAppStore as t, addDays as u, startOfIsoWeek as v, ASPECT_ICONS as x, todayKey as y };
