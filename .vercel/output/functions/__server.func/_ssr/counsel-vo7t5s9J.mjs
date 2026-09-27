import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAppStore, a as ASPECT_ICONS, b as streakEndingAt, c as averagesForRange, f as formatWeekday, g as keysBefore, i as Button, s as aspectAverages, u as formatLong, v as scoreDay, x as todayKey } from "./router-s7Lg9xSA.mjs";
import { n as CardContent, t as Card } from "./card-COPtalQR.mjs";
import { n as buildQuest, r as localBriefing, t as buildInsights } from "./psychology-Dnv5utVP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/counsel-vo7t5s9J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var writeBriefing = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e3cf2edf94a5300c89d97e95bc464b40fbd4c8a1023ca2f8d16f8a1b73c044e8"));
function CounselPage() {
	const today = todayKey();
	const profile = useAppStore((s) => s.profile);
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const logs = useAppStore((s) => s.logs);
	const briefings = useAppStore((s) => s.briefings);
	const saveBriefing = useAppStore((s) => s.saveBriefing);
	const [pending, setPending] = (0, import_react.useState)(false);
	const quest = buildQuest(today, logs, metrics, aspects);
	const insights = buildInsights(today, profile.name, logs, metrics, aspects);
	const day = scoreDay(today, logs[today], metrics, aspects);
	const week = aspectAverages(keysBefore(today, 7), logs, metrics, aspects);
	const lowest = averagesForRange(keysBefore(today, 7), logs, metrics).filter((m) => m.n >= 1).sort((a, b) => a.avg - b.avg).slice(0, 3);
	const saved = briefings[today];
	const local = localBriefing(today, profile.name, logs, metrics, aspects);
	async function askGrok() {
		setPending(true);
		try {
			const result = await writeBriefing({ data: {
				name: profile.name,
				date: today,
				weekday: formatWeekday(today),
				truePct: day.truePct,
				completion: day.completion,
				streak: streakEndingAt(today, logs, metrics),
				journal: logs[today]?.journal,
				aspects: aspects.map((a) => ({
					name: a.name,
					pct: day.aspectPct[a.id] ?? 0
				})),
				weekAspects: week.map((a) => ({
					name: a.aspect.name,
					pct: a.pct
				})),
				lowest: lowest.map((m) => ({
					name: m.metric.name,
					aspect: aspects.find((a) => a.id === m.metric.aspectId)?.name ?? "",
					avg: m.avg
				})),
				quest: quest ? {
					name: quest.metric.name,
					aspect: quest.aspect.name,
					why: quest.why,
					ifThen: quest.ifThen,
					tiny: quest.tiny
				} : void 0
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			saveBriefing(today, {
				text: result.text,
				at: (/* @__PURE__ */ new Date()).toISOString(),
				source: "grok"
			});
		} catch {
			toast.error("Counsel could not be reached.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] tracking-[0.2em] text-muted uppercase",
				children: ["Counsel · ", formatLong(today)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl font-medium tracking-tight",
				children: "One hinge. Not a pile of advice."
			})] }),
			quest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-muted uppercase",
						children: "The hinge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium",
						children: quest.metric.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: quest.why
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: quest.ifThen
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: quest.tiny
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm italic text-muted",
						children: quest.identity
					})
				]
			}) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex flex-col gap-3",
				children: insights.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.18em] text-muted uppercase",
							children: insight.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-xl font-medium",
							children: insight.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: insight.body
						})
					]
				}) }, insight.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-medium",
							children: "Briefing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => void askGrok(),
							disabled: pending,
							children: pending ? "Writing…" : "Ask Grok to go deeper"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: saved?.text ?? local
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-subtle",
							children: saved?.source === "grok" ? "Written for this sheet today." : "Local counsel. Ask Grok when you want a second reading."
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: week.map((a) => {
							const Icon = ASPECT_ICONS[a.aspect.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted shadow-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }),
									a.aspect.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-fg",
										children: [a.pct, "%"]
									})
								]
							}, a.aspect.id);
						})
					})
				]
			})
		]
	});
}
//#endregion
export { CounselPage as component };
