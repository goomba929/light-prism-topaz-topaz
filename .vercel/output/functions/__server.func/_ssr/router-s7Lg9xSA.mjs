import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Flame, d as Compass, f as BookOpen, i as TriangleAlert, l as Feather, n as Waypoints, o as Layers, r as Users, s as Hammer, u as Dumbbell } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { m as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DDJgnM3-.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var ASPECT_ICONS = {
	body: Dumbbell,
	spirit: Flame,
	kin: Users,
	craft: Hammer,
	mind: BookOpen
};
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
function isMonday(key) {
	return weekday(key) === 1;
}
function isSunday(key) {
	return weekday(key) === 0;
}
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
		if (date === miss) continue;
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
	const xp = Math.round(truePct * completion * 1.15);
	return {
		date,
		rated,
		active: active.length,
		completion,
		idealPct,
		truePct,
		aspectPct,
		xp
	};
}
function streakEndingAt(end, logs, metrics) {
	const active = metrics.filter((m) => m.active);
	if (active.length === 0) return 0;
	let n = 0;
	let k = end;
	for (let i = 0; i < 400; i++) {
		const log = logs[k];
		if ((log ? active.filter((m) => log.scores[m.id] != null).length : 0) === 0) break;
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
	}))
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-s7Lg9xSA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground shadow-border hover:bg-elevated",
			ghost: "text-fg hover:bg-elevated",
			outline: "bg-transparent text-fg shadow-border hover:bg-elevated",
			destructive: "bg-bad/90 text-fg hover:bg-bad"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-elevated px-3 py-2 text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
	...props
}));
Label.displayName = Root.displayName;
function Onboarding() {
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const toggleMetric = useAppStore((s) => s.toggleMetric);
	const completeOnboarding = useAppStore((s) => s.completeOnboarding);
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const activeCount = (0, import_react.useMemo)(() => metrics.filter((m) => m.active).length, [metrics]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col px-6 py-10 md:justify-center md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-[0.28em] text-muted uppercase",
			children: "Arête"
		}), step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-medium tracking-tight sm:text-5xl",
					children: "The list of who you are becoming, kept."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "Twenty marks. Five aspects. Each day you rate how fully you showed up as the figure you already wrote down. Not a streak toy. A character sheet."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "What should the sheet call you?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Your name",
						autoComplete: "name",
						onKeyDown: (e) => {
							if (e.key === "Enter") setStep(1);
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: () => setStep(1),
					children: "Continue"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-8 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight sm:text-4xl",
					children: "Five aspects. Twenty marks."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Body, Spirit, Kin, Craft, Mind. Toggle anything that is not yours. You can rewrite the sheet later."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-6",
					children: aspects.map((aspect) => {
						const Icon = ASPECT_ICONS[aspect.id];
						const group = metrics.filter((m) => m.aspectId === aspect.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex flex-wrap items-baseline gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 text-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-medium",
									children: aspect.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: aspect.tagline
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: group.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleMetric(m.id),
								className: cn("h-10 rounded-full px-3 text-sm transition-[background-color,color,box-shadow] duration-150", m.active ? "bg-primary text-primary-foreground" : "text-muted shadow-border"),
								children: m.name
							}, m.id))
						})] }, aspect.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							disabled: activeCount === 0,
							onClick: () => completeOnboarding({
								name: name.trim(),
								seed: true
							}),
							children: "Begin with the twenty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "secondary",
							disabled: activeCount === 0,
							onClick: () => completeOnboarding({
								name: name.trim(),
								seed: false
							}),
							children: "Start from zero"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "The twenty includes a sample fortnight so the path has a past. Clear it anytime from the figure."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStep(0),
							className: "min-h-11 text-sm text-muted hover:text-fg",
							children: "Back"
						})
					]
				})
			]
		})]
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Today",
		icon: Compass
	},
	{
		to: "/path",
		label: "Path",
		icon: Waypoints
	},
	{
		to: "/counsel",
		label: "Counsel",
		icon: Feather
	},
	{
		to: "/figure",
		label: "Figure",
		icon: Layers
	}
];
function AppNav({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("flex", className),
		"aria-label": "Primary",
		children: ITEMS.map((item) => {
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 px-2 text-[11px] tracking-wide text-subtle transition-colors duration-150 hover:text-fg [&.active]:text-fg",
				activeOptions: { exact: item.to === "/" },
				activeProps: { className: "active" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.6
				}), item.label]
			}, item.to);
		})
	});
}
function SideNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "hidden w-52 shrink-0 flex-col gap-8 py-10 pr-6 md:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-medium tracking-tight",
			children: "Arête"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-subtle",
			children: "The practice of becoming."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex flex-col gap-1",
			"aria-label": "Primary",
			children: ITEMS.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg [&.active]:bg-elevated [&.active]:text-fg",
					activeOptions: { exact: item.to === "/" },
					activeProps: { className: "active" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4",
						strokeWidth: 1.6
					}), item.label]
				}, item.to);
			})
		})]
	});
}
function Toaster$1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "dark",
		position: "top-center",
		toastOptions: { classNames: {
			toast: "bg-surface text-fg shadow-border border-0 font-[Figtree,ui-sans-serif,system-ui,sans-serif]",
			title: "text-fg",
			description: "text-muted"
		} }
	});
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-sm bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-border", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
function AppFrame({ children }) {
	const onboarded = useAppStore((s) => s.profile.onboarded);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const finish = () => {
			if (alive) setReady(true);
		};
		const persist = useAppStore.persist;
		const t = window.setTimeout(finish, 50);
		try {
			const result = persist?.rehydrate?.();
			Promise.resolve(result).finally(finish);
		} catch {
			finish();
		}
		return () => {
			alive = false;
			window.clearTimeout(t);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 200,
		children: [ready && onboarded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-dvh bg-bg text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-10",
					children
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, { className: "h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]" })
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var styles_default = "/assets/styles-fp2ymN9h.css";
var APP_NAME = "Arête";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "A daily character sheet for the ideal you. Twenty marks. Five aspects."
			},
			{
				name: "theme-color",
				content: "#0c0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-Da_6nLJA.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./counsel-vo7t5s9J.mjs");
var Route$2 = createFileRoute("/counsel")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./figure-tCs86kbE.mjs");
var Route$1 = createFileRoute("/figure")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./path-tRBMUEPH.mjs");
var Route = createFileRoute("/path")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	CounselRoute: Route$2.update({
		id: "/counsel",
		path: "/counsel",
		getParentRoute: () => Route$4
	}),
	FigureRoute: Route$1.update({
		id: "/figure",
		path: "/figure",
		getParentRoute: () => Route$4
	}),
	PathRoute: Route.update({
		id: "/path",
		path: "/path",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useAppStore as C, totalXp as S, weekday as T, levelFromXp as _, ASPECT_ICONS as a, streakEndingAt as b, averagesForRange as c, formatMedium as d, formatWeekday as f, keysBefore as g, isSunday as h, Button as i, cn as l, isMonday as m, Label as n, addDays as o, historySeries as p, Input as r, aspectAverages as s, router_exports as t, formatLong as u, scoreDay as v, variance as w, todayKey as x, startOfIsoWeek as y };
