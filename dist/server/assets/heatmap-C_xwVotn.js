import { S as cn, _ as keysBefore, b as weekday, f as formatMedium, m as formatWeekdayShort, u as addDays, x as ASPECT_ICONS } from "./store-BoIZToYY.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/aspect-bars.tsx
function AspectBars({ aspects, pct }) {
	return /* @__PURE__ */ jsx("ul", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-5",
		children: aspects.map((a) => {
			const Icon = ASPECT_ICONS[a.id];
			const v = pct[a.id] ?? 0;
			return /* @__PURE__ */ jsxs("li", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2 text-xs",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1.5 text-muted",
						children: [/* @__PURE__ */ jsx(Icon, { className: "size-3" }), a.name]
					}), /* @__PURE__ */ jsx("span", {
						className: "tabular-nums text-fg",
						children: formatPct(v)
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "h-2 overflow-hidden rounded-none bg-bg shadow-border",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-none bg-primary transition-[width] duration-300 ease-out",
						style: { width: `${Math.max(0, Math.min(100, v))}%` }
					})
				})]
			}, a.id);
		})
	});
}
function formatPct(v) {
	return `${v % 1 === 0 ? Math.round(v) : v.toFixed(1)}%`;
}
//#endregion
//#region src/components/heatmap.tsx
var DAY_MARKS = [
	"M",
	"",
	"W",
	"",
	"F",
	"",
	""
];
function cellTone(s) {
	if (!s || s.rated === 0 && !s.rest) return "bg-bg shadow-border";
	if (s.rest) return "bg-bg shadow-border";
	if (s.truePct >= 75) return "bg-primary";
	if (s.truePct >= 50) return "bg-primary/70";
	if (s.truePct >= 25) return "bg-primary/40";
	return "bg-primary/20";
}
function cellTitle(key, s) {
	if (s?.rest) return `${key} · rest`;
	if (s && s.rated > 0) return `${key} · ${s.truePct}%`;
	return `${key} · no marks`;
}
function Heatmap({ end, weeks = 12, scores }) {
	const days = weeks * 7;
	const start = addDays(end, -(days - 1));
	const startPad = (weekday(start) + 6) % 7;
	const keys = keysBefore(end, days);
	const cells = [...Array.from({ length: startPad }, () => null), ...keys];
	while (cells.length % 7 !== 0) cells.push(null);
	const columns = [];
	for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7));
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-end justify-between font-mono text-xs text-subtle",
				children: [/* @__PURE__ */ jsx("span", { children: formatMedium(keys[0] ?? end) }), /* @__PURE__ */ jsx("span", { children: formatMedium(end) })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex w-4 shrink-0 flex-col gap-1",
					children: DAY_MARKS.map((d, i) => /* @__PURE__ */ jsx("div", {
						className: "flex aspect-square items-center font-mono text-xs text-subtle",
						children: d
					}, i))
				}), /* @__PURE__ */ jsx("div", {
					className: "flex min-w-0 flex-1 gap-1",
					children: columns.map((col, ci) => /* @__PURE__ */ jsx("div", {
						className: "flex min-w-0 flex-1 flex-col gap-1",
						children: col.map((key, ri) => {
							if (!key) return /* @__PURE__ */ jsx("div", { className: "aspect-square w-full" }, `e-${ci}-${ri}`);
							const s = scores[key];
							return /* @__PURE__ */ jsx("div", {
								title: cellTitle(key, s),
								className: cn("relative aspect-square w-full rounded-none", cellTone(s)),
								children: s?.rest ? /* @__PURE__ */ jsx("span", { className: "absolute inset-[3px] shadow-border" }) : null
							}, key);
						})
					}, ci))
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "font-mono text-xs text-subtle",
				children: "Empty: no marks. Inner box: rest. Brighter: closer to the ideal."
			})
		]
	});
}
function WeekStrip({ end, scores }) {
	const keys = keysBefore(end, 7);
	return /* @__PURE__ */ jsx("div", {
		className: "flex gap-1",
		children: keys.map((key) => {
			const s = scores[key];
			return /* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-xs text-subtle",
					children: formatWeekdayShort(key).slice(0, 1)
				}), /* @__PURE__ */ jsx("div", {
					title: cellTitle(key, s),
					className: cn("relative aspect-square w-full rounded-none", cellTone(s)),
					children: s?.rest ? /* @__PURE__ */ jsx("span", { className: "absolute inset-[3px] shadow-border" }) : null
				})]
			}, key);
		})
	});
}
//#endregion
export { WeekStrip as n, AspectBars as r, Heatmap as t };
