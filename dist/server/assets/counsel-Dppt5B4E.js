import { _ as keysBefore, d as formatLong, n as aspectAverages, o as scoreDay, r as averagesForRange, t as useAppStore, x as ASPECT_ICONS, y as todayKey } from "./store-BoIZToYY.js";
import { n as CardContent, t as Card } from "./card-BKyp8nd2.js";
import { n as buildQuest, r as localBriefing, t as buildInsights } from "./psychology-CLeDHHov.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "sonner";
//#region src/routes/counsel.tsx?tsr-split=component
function CounselPage() {
	const today = todayKey();
	const profile = useAppStore((s) => s.profile);
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const logs = useAppStore((s) => s.logs);
	const briefings = useAppStore((s) => s.briefings);
	useAppStore((s) => s.saveBriefing);
	const [pending, setPending] = useState(false);
	const quest = buildQuest(today, logs, metrics, aspects);
	const insights = buildInsights(today, profile.name, logs, metrics, aspects);
	scoreDay(today, logs[today], metrics, aspects);
	const week = aspectAverages(keysBefore(today, 7), logs, metrics, aspects);
	averagesForRange(keysBefore(today, 7), logs, metrics).filter((m) => m.n >= 1).sort((a, b) => a.avg - b.avg).slice(0, 3);
	const saved = briefings[today];
	const local = localBriefing(today, profile.name, logs, metrics, aspects);
	return /* @__PURE__ */ jsxs("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsxs("p", {
				className: "font-mono text-xs tracking-widest text-muted uppercase",
				children: ["Counsel · ", formatLong(today)]
			}), /* @__PURE__ */ jsx("h1", {
				className: "font-display mt-1 text-4xl tracking-wide",
				children: "One hinge. Not a pile of advice."
			})] }),
			quest ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "flex flex-col gap-3 p-5",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-mono text-xs tracking-widest text-muted uppercase",
						children: "The hinge"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-2xl font-medium",
						children: quest.metric.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted",
						children: quest.why
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm",
						children: quest.ifThen
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-subtle",
						children: quest.tiny
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm italic text-muted",
						children: quest.identity
					})
				]
			}) }) : null,
			/* @__PURE__ */ jsx("section", {
				className: "flex flex-col gap-3",
				children: insights.map((insight) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "p-5",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-mono text-xs tracking-widest text-muted uppercase",
							children: insight.kicker
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-display mt-1 text-xl font-medium",
							children: insight.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted",
							children: insight.body
						})
					]
				}) }, insight.id))
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-3 pb-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display text-xl font-medium",
							children: "Briefing"
						}), null]
					}),
					/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: saved?.text ?? local
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-4 text-xs text-subtle",
							children: saved?.source === "grok" ? "Written for this sheet today." : "Counsel from this sheet. No account required."
						})]
					}) }),
					/* @__PURE__ */ jsx("ul", {
						className: "flex flex-wrap gap-2",
						children: week.map((a) => {
							const Icon = ASPECT_ICONS[a.aspect.id];
							return /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-1.5 rounded-none px-3 py-1.5 font-mono text-xs text-muted shadow-border",
								children: [
									/* @__PURE__ */ jsx(Icon, { className: "size-3" }),
									a.aspect.name,
									" ",
									/* @__PURE__ */ jsxs("span", {
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
