import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as useAppStore, T as weekday, a as ASPECT_ICONS, c as averagesForRange, d as formatMedium, g as keysBefore, l as cn, o as addDays, p as historySeries, s as aspectAverages, x as todayKey } from "./router-s7Lg9xSA.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-COPtalQR.mjs";
import { t as AspectBars } from "./aspect-bars-Dlu7wW6J.mjs";
import { a as ResponsiveContainer, i as Line, n as YAxis, o as Tooltip, r as XAxis, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-tRBMUEPH.js
var import_jsx_runtime = require_jsx_runtime();
function Heatmap({ end, weeks = 12, scores }) {
	const days = weeks * 7;
	const start = addDays(end, -(days - 1));
	const startPad = (weekday(start) + 6) % 7;
	const keys = keysBefore(end, days);
	const cells = [...Array.from({ length: startPad }, () => null), ...keys];
	while (cells.length % 7 !== 0) cells.push(null);
	const columns = [];
	for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between text-xs text-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatMedium(keys[0] ?? end) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatMedium(end) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 overflow-x-auto pb-1",
			children: columns.map((col, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: col.map((key, ri) => {
					if (!key) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3.5" }, `e-${ci}-${ri}`);
					const s = scores[key];
					const logged = s && s.rated > 0;
					const opacity = logged ? Math.max(.18, s.truePct / 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						title: logged ? `${key} · ${s.truePct}%` : `${key} · no marks`,
						className: cn("size-3.5 rounded-[3px]", logged ? "bg-primary" : "shadow-border"),
						style: logged ? { opacity } : void 0
					}, key);
				})
			}, ci))
		})]
	});
}
function PathChart({ series }) {
	const data = series.map((s) => ({
		date: s.date,
		label: formatMedium(s.date),
		pct: s.rated > 0 ? s.truePct : null
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-52 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					bottom: 0,
					left: -18
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						interval: "preserveStartEnd"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 100],
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							background: "var(--color-surface)",
							border: "1px solid var(--color-border)",
							borderRadius: 12,
							fontSize: 12,
							color: "var(--color-fg)"
						},
						formatter: (v) => [`${v}%`, "Ideal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "pct",
						stroke: "var(--color-primary)",
						strokeWidth: 2,
						dot: false,
						connectNulls: false
					})
				]
			})
		})
	});
}
function PathPage() {
	const today = todayKey();
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const logs = useAppStore((s) => s.logs);
	const series = historySeries(today, 28, logs, metrics, aspects);
	const weekKeys = keysBefore(today, 7);
	const weekAspects = aspectAverages(weekKeys, logs, metrics, aspects);
	const weekPct = Object.fromEntries(weekAspects.map((a) => [a.aspect.id, a.pct]));
	const metricAvgs = averagesForRange(weekKeys, logs, metrics).filter((m) => m.n > 0).sort((a, b) => a.avg - b.avg);
	const loggedDays = series.filter((s) => s.rated > 0);
	const weekAvg = loggedDays.length === 0 ? 0 : Math.round(loggedDays.reduce((s, d) => s + d.truePct, 0) / loggedDays.length * 10) / 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.2em] text-muted uppercase",
					children: "Path"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-3xl font-medium tracking-tight",
					children: "The moving average of you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						loggedDays.length,
						" days kept in the last 28. Week average",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-fg",
							children: [weekAvg, "%"]
						}),
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Twenty-eight days" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathChart, { series }) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Presence" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, {
				end: today,
				weeks: 12,
				scores: Object.fromEntries(historySeries(today, 84, logs, metrics, aspects).map((s) => [s.date, s]))
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-medium",
				children: "This week"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AspectBars, {
				aspects,
				pct: weekPct
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium",
					children: "Marks, thin to thick"
				}), metricAvgs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Rate a few days and the path will fill."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border rounded-xl bg-surface shadow-border",
					children: metricAvgs.map((row) => {
						const Icon = ASPECT_ICONS[row.metric.aspectId];
						const pct = Math.round(row.avg / 5 * 1e3) / 10;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm",
									children: row.metric.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden w-24 sm:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block h-1.5 overflow-hidden rounded-full bg-elevated",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full bg-primary",
											style: { width: `${pct}%` }
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-14 text-right text-sm tabular-nums text-muted",
									children: [pct, "%"]
								})]
							})]
						}, row.metric.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { PathPage as component };
