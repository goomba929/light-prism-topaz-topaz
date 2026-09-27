import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as useAppStore, S as totalXp, _ as levelFromXp, a as ASPECT_ICONS, b as streakEndingAt, l as cn, u as formatLong, v as scoreDay, x as todayKey } from "./router-s7Lg9xSA.mjs";
import { n as CardContent, t as Card } from "./card-COPtalQR.mjs";
import { n as buildQuest } from "./psychology-Dnv5utVP.mjs";
import { t as AspectBars } from "./aspect-bars-Dlu7wW6J.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Da_6nLJA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CharacterSeal({ pct, completion, rated, active, className }) {
	const size = 240;
	const cx = size / 2;
	const cy = size / 2;
	const r = 96;
	const circ = 2 * Math.PI * r;
	const shown = completion === 0 ? 0 : pct;
	const dash = Math.max(0, Math.min(100, shown)) / 100 * circ;
	const display = shown % 1 === 0 ? String(Math.round(shown)) : shown.toFixed(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto w-[240px]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${size} ${size}`,
			className: "size-full",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: 110,
					fill: "none",
					stroke: "currentColor",
					className: "text-border",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "currentColor",
					className: "text-elevated",
					strokeWidth: "10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "currentColor",
					className: "text-primary",
					strokeWidth: "10",
					strokeLinecap: "round",
					strokeDasharray: `${dash} ${circ}`,
					transform: `rotate(-90 ${cx} ${cy})`,
					style: { transition: "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1)" }
				}),
				Array.from({ length: 20 }).map((_, i) => {
					const a = i / 20 * Math.PI * 2 - Math.PI / 2;
					const inner = i % 5 === 0 ? 118 : 114;
					const outer = 124;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: cx + Math.cos(a) * inner,
						y1: cy + Math.sin(a) * inner,
						x2: cx + Math.cos(a) * outer,
						y2: cy + Math.sin(a) * outer,
						stroke: "currentColor",
						className: i % 5 === 0 ? "text-muted" : "text-border",
						strokeWidth: i % 5 === 0 ? 1.5 : 1
					}, i);
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-6xl leading-none font-medium tracking-tight tabular-nums",
					children: [display, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl text-muted",
						children: "%"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "of the ideal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 text-xs text-subtle tabular-nums",
					children: [
						rated,
						"/",
						active,
						" marked"
					]
				})
			]
		})]
	});
}
var FILL = [
	"bg-primary/40 text-primary-foreground",
	"bg-primary/55 text-primary-foreground",
	"bg-primary/70 text-primary-foreground",
	"bg-primary/85 text-primary-foreground",
	"bg-primary text-primary-foreground"
];
function MetricRow({ metric, value, onChange, onClear }) {
	const fill = value != null ? FILL[value - 1] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium text-fg",
				children: metric.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-subtle",
				children: metric.prompt
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": `${metric.name} rating`,
			className: "flex shrink-0 items-center gap-1",
			children: [
				1,
				2,
				3,
				4,
				5
			].map((n) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": value === n,
					onClick: () => {
						if (value === n) onClear();
						else onChange(n);
					},
					className: cn("flex size-11 items-center justify-center rounded-full text-sm tabular-nums transition-[background-color,color,box-shadow] duration-150 ease-out", value != null && value >= n ? fill : "text-muted shadow-border hover:bg-elevated"),
					children: n
				}, n);
			})
		})]
	});
}
function QuestCard({ quest }) {
	const Icon = ASPECT_ICONS[quest.aspect.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex flex-col gap-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "Tomorrow's hinge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-xs text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), quest.aspect.name]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: quest.metric.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: quest.why
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg",
				children: quest.ifThen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: quest.tiny
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/counsel",
				className: "text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
				children: "Full counsel"
			})
		]
	}) });
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-elevated", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full bg-primary transition-[width] duration-200 ease-out",
		style: { width: `${value ?? 0}%` }
	})
}));
Progress.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md bg-elevated px-3 py-3 text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function TodayPage() {
	const today = todayKey();
	const profile = useAppStore((s) => s.profile);
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const logs = useAppStore((s) => s.logs);
	const setScore = useAppStore((s) => s.setScore);
	const clearScore = useAppStore((s) => s.clearScore);
	const setJournal = useAppStore((s) => s.setJournal);
	const log = logs[today];
	const day = scoreDay(today, log, metrics, aspects);
	const xp = totalXp(logs, metrics, aspects);
	const level = levelFromXp(xp);
	const streak = streakEndingAt(today, logs, metrics);
	const quest = buildQuest(today, logs, metrics, aspects);
	const who = profile.name.trim() || "you";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.2em] text-muted uppercase",
					children: formatLong(today)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-3xl font-medium tracking-tight",
					children: who === "you" ? "How fully did you show up?" : `How fully did ${who} show up?`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-muted uppercase",
						children: level.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl tabular-nums",
						children: ["Lv ", level.level]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterSeal, {
				pct: day.truePct,
				completion: day.completion,
				rated: day.rated,
				active: day.active
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						level.title,
						" · ",
						xp,
						" xp"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [
							streak,
							" day",
							streak === 1 ? "" : "s"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: Math.round(level.progress * 100) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AspectBars, {
				aspects,
				pct: day.aspectPct
			}),
			quest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestCard, { quest }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex flex-col gap-6",
				children: aspects.map((aspect) => {
					const group = metrics.filter((m) => m.active && m.aspectId === aspect.id).sort((a, b) => a.order - b.order);
					if (group.length === 0) return null;
					const Icon = ASPECT_ICONS[aspect.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 font-display text-xl font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }), aspect.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm tabular-nums text-muted",
									children: [day.aspectPct[aspect.id] ?? 0, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs text-subtle",
								children: aspect.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border",
								children: group.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricRow, {
									metric: m,
									value: log?.scores[m.id],
									onChange: (v) => setScore(today, m.id, v),
									onClear: () => clearScore(today, m.id)
								}, m.id))
							})
						]
					}) }, aspect.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "journal",
					className: "text-sm font-medium text-muted",
					children: "What mattered"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "journal",
					className: "mt-2",
					value: log?.journal ?? "",
					onChange: (e) => setJournal(today, e.target.value),
					placeholder: "One true sentence about the day."
				})]
			})
		]
	});
}
//#endregion
export { TodayPage as component };
