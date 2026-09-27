import { _ as keysBefore, f as formatMedium, i as historySeries, n as aspectAverages, r as averagesForRange, t as useAppStore, x as ASPECT_ICONS, y as todayKey } from "./store-BoIZToYY.js";
import { i as Button } from "./router-SQ3rHPvJ.js";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BKyp8nd2.js";
import { r as AspectBars, t as Heatmap } from "./heatmap-C_xwVotn.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/components/path-chart.tsx
function rolling(series, window = 7) {
	const out = [];
	const buf = [];
	for (const s of series) {
		const pct = s.rest ? null : s.rated > 0 ? s.truePct : null;
		if (pct != null) {
			buf.push(pct);
			if (buf.length > window) buf.shift();
		}
		const avg = buf.length === 0 ? null : Math.round(buf.reduce((a, b) => a + b, 0) / buf.length * 10) / 10;
		out.push({
			date: s.date,
			label: formatMedium(s.date),
			pct,
			avg: pct == null && buf.length === 0 ? null : avg
		});
	}
	return out;
}
function SquareDot({ cx, cy, payload }) {
	if (cx == null || cy == null || payload?.pct == null) return null;
	return /* @__PURE__ */ jsx("rect", {
		x: cx - 3,
		y: cy - 3,
		width: 6,
		height: 6,
		fill: "var(--color-bg)",
		stroke: "var(--color-primary)",
		strokeWidth: 1.5
	});
}
function PathTooltip({ active, payload }) {
	if (!active || !payload?.[0]) return null;
	const p = payload[0].payload;
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-bg px-3 py-2 font-mono text-xs text-fg shadow-border",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-muted",
				children: p.label
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 tabular-nums",
				children: p.pct == null ? "no marks" : `${p.pct}%`
			}),
			p.avg != null ? /* @__PURE__ */ jsxs("p", {
				className: "text-muted tabular-nums",
				children: [
					"avg ",
					p.avg,
					"%"
				]
			}) : null
		]
	});
}
function PathChart({ series }) {
	const data = rolling(series);
	if (data.filter((d) => d.pct != null).length === 0) return /* @__PURE__ */ jsx("p", {
		className: "py-10 text-sm text-muted",
		children: "Rate a few days. The line appears when the sheet has a past."
	});
	return /* @__PURE__ */ jsx("div", {
		className: "h-64 w-full min-w-0 sm:h-72",
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(LineChart, {
				data,
				margin: {
					top: 12,
					right: 8,
					bottom: 4,
					left: 0
				},
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, {
						stroke: "var(--color-subtle)",
						strokeDasharray: "2 6",
						vertical: false
					}),
					/* @__PURE__ */ jsx(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12,
							fontFamily: "IBM Plex Mono, ui-monospace, monospace"
						},
						tickLine: false,
						axisLine: { stroke: "var(--color-primary)" },
						interval: "preserveStartEnd",
						minTickGap: 28
					}),
					/* @__PURE__ */ jsx(YAxis, {
						domain: [0, 100],
						ticks: [
							0,
							50,
							100
						],
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12,
							fontFamily: "IBM Plex Mono, ui-monospace, monospace"
						},
						tickLine: false,
						axisLine: { stroke: "var(--color-primary)" },
						width: 36,
						unit: "%"
					}),
					/* @__PURE__ */ jsx(ReferenceLine, {
						y: 50,
						stroke: "var(--color-subtle)",
						strokeDasharray: "4 4"
					}),
					/* @__PURE__ */ jsx(Tooltip, {
						content: /* @__PURE__ */ jsx(PathTooltip, {}),
						cursor: {
							stroke: "var(--color-muted)",
							strokeDasharray: "3 3"
						}
					}),
					/* @__PURE__ */ jsx(Line, {
						type: "linear",
						dataKey: "avg",
						stroke: "var(--color-subtle)",
						strokeWidth: 1.5,
						strokeDasharray: "4 4",
						dot: false,
						connectNulls: true,
						isAnimationActive: false
					}),
					/* @__PURE__ */ jsx(Line, {
						type: "linear",
						dataKey: "pct",
						stroke: "var(--color-primary)",
						strokeWidth: 2,
						strokeLinecap: "square",
						dot: /* @__PURE__ */ jsx(SquareDot, {}),
						activeDot: {
							r: 4,
							fill: "var(--color-primary)",
							stroke: "var(--color-bg)"
						},
						connectNulls: false,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
//#endregion
//#region src/routes/path.tsx?tsr-split=component
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
	const weekLogged = historySeries(today, 7, logs, metrics, aspects).filter((s) => s.rated > 0 && !s.rest);
	const weekAvg = weekLogged.length === 0 ? 0 : Math.round(weekLogged.reduce((sum, d) => sum + d.truePct, 0) / weekLogged.length * 10) / 10;
	return /* @__PURE__ */ jsxs("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-mono text-xs tracking-widest text-muted uppercase",
					children: "Path"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display mt-1 text-4xl tracking-wide",
					children: "The moving average of you."
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						series.filter((s) => s.rated > 0).length,
						" days kept in the last 28. Week average ",
						/* @__PURE__ */ jsxs("span", {
							className: "tabular-nums text-fg",
							children: [weekAvg, "%"]
						}),
						"."
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					className: "mt-4",
					variant: "secondary",
					onClick: () => {
						const week = historySeries(today, 7, logs, metrics, aspects);
						const lines = [
							`Arête · ${useAppStore.getState().profile.name.trim() || "the figure"}`,
							`${formatMedium(week[0]?.date ?? today)} – ${formatMedium(today)}`,
							`Week average ${weekAvg}%`,
							"",
							...week.map((d) => d.rest ? `${d.date}  rest` : d.rated > 0 ? `${d.date}  ${d.truePct}%  ${d.rated}/${d.active}` : `${d.date}  —`),
							"",
							"Thin to thick",
							...metricAvgs.map((row) => `${row.metric.name}  ${Math.round(row.avg / 5 * 100)}%`)
						];
						navigator.clipboard.writeText(lines.join("\n")).then(() => toast.success("Week copied."), () => toast.error("Could not copy."));
					},
					children: "Copy this week"
				})
			] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Twenty-eight days" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(PathChart, { series }) })] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Presence" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Heatmap, {
				end: today,
				weeks: 12,
				scores: Object.fromEntries(historySeries(today, 84, logs, metrics, aspects).map((s) => [s.date, s]))
			}) })] }),
			/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
				className: "mb-3 font-display text-xl font-medium",
				children: "This week"
			}), /* @__PURE__ */ jsx(AspectBars, {
				aspects,
				pct: weekPct
			})] }),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-3 pb-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-xl font-medium",
					children: "Marks, thin to thick"
				}), metricAvgs.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted",
					children: "Rate a few days and the path will fill."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "divide-y divide-border bg-bg shadow-border",
					children: metricAvgs.map((row) => {
						const Icon = ASPECT_ICONS[row.metric.aspectId];
						const pct = Math.round(row.avg / 5 * 1e3) / 10;
						return /* @__PURE__ */ jsxs("li", {
							className: "flex items-center justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ jsx(Icon, { className: "size-3.5 shrink-0 text-muted" }), /* @__PURE__ */ jsx("span", {
									className: "truncate text-sm",
									children: row.metric.name
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "hidden w-24 sm:block",
									children: /* @__PURE__ */ jsx("span", {
										className: "block h-2 overflow-hidden rounded-none bg-bg shadow-border",
										children: /* @__PURE__ */ jsx("span", {
											className: "block h-full bg-primary",
											style: { width: `${pct}%` }
										})
									})
								}), /* @__PURE__ */ jsxs("span", {
									className: "w-14 text-right text-sm tabular-nums text-fg",
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
