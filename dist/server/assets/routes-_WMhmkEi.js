import { S as cn, a as levelFromXp, c as totalXp, d as formatLong, o as scoreDay, s as streakEndingAt, t as useAppStore, u as addDays, x as ASPECT_ICONS, y as todayKey } from "./store-BoIZToYY.js";
import { i as Button } from "./router-SQ3rHPvJ.js";
import { n as CardContent, t as Card } from "./card-BKyp8nd2.js";
import { n as buildQuest } from "./psychology-CLeDHHov.js";
import { n as WeekStrip, r as AspectBars } from "./heatmap-C_xwVotn.js";
import * as React from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as ProgressPrimitive from "@radix-ui/react-progress";
//#region src/components/character-seal.tsx
function CharacterSeal({ pct, completion, rated, active, className }) {
	const size = 240;
	const cx = size / 2;
	const cy = size / 2;
	const r = 88;
	const circ = 2 * Math.PI * r;
	const shown = completion === 0 ? 0 : pct;
	const dash = Math.max(0, Math.min(100, shown)) / 100 * circ;
	const display = shown % 1 === 0 ? String(Math.round(shown)) : shown.toFixed(1);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative mx-auto w-60 bg-surface p-3 shadow-border", className),
		children: [/* @__PURE__ */ jsxs("svg", {
			viewBox: `0 0 ${size} ${size}`,
			className: "size-full",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "8",
					y: "8",
					width: 224,
					height: 224,
					fill: "none",
					stroke: "currentColor",
					className: "text-primary",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "currentColor",
					className: "text-bg",
					strokeWidth: "10"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "currentColor",
					className: "text-primary",
					strokeWidth: "10",
					strokeLinecap: "square",
					strokeDasharray: `${dash} ${circ}`,
					transform: `rotate(-90 ${cx} ${cy})`,
					style: { transition: "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1)" }
				}),
				Array.from({ length: 20 }).map((_, i) => {
					const a = i / 20 * Math.PI * 2 - Math.PI / 2;
					const inner = i % 5 === 0 ? 106 : 102;
					const outer = 114;
					return /* @__PURE__ */ jsx("line", {
						x1: cx + Math.cos(a) * inner,
						y1: cy + Math.sin(a) * inner,
						x2: cx + Math.cos(a) * outer,
						y2: cy + Math.sin(a) * outer,
						stroke: "currentColor",
						className: i % 5 === 0 ? "text-primary" : "text-subtle",
						strokeWidth: i % 5 === 0 ? 2 : 1
					}, i);
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ jsxs("span", {
					className: "font-display text-6xl leading-none tabular-nums",
					children: [display, /* @__PURE__ */ jsx("span", {
						className: "text-2xl text-muted",
						children: "%"
					})]
				}),
				/* @__PURE__ */ jsx("span", {
					className: "mt-2 font-mono text-xs tracking-widest text-muted uppercase",
					children: "of the ideal"
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "mt-1 font-mono text-xs text-subtle tabular-nums",
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
//#endregion
//#region src/components/metric-row.tsx
var FILL = [
	"bg-primary/60 text-primary-foreground",
	"bg-primary/75 text-primary-foreground",
	"bg-primary/90 text-primary-foreground",
	"bg-primary text-primary-foreground",
	"bg-primary text-primary-foreground"
];
function MetricRow({ metric, value, onChange, onClear }) {
	const fill = value != null ? FILL[value - 1] : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-sm font-medium text-fg",
				children: metric.name
			}), /* @__PURE__ */ jsx("div", {
				className: "text-xs text-subtle",
				children: metric.prompt
			})]
		}), /* @__PURE__ */ jsx("div", {
			role: "radiogroup",
			"aria-label": `${metric.name} rating`,
			className: "flex shrink-0 items-center gap-1",
			onKeyDown: (e) => {
				if (e.key >= "1" && e.key <= "5") {
					e.preventDefault();
					onChange(Number(e.key));
				}
				if (e.key === "Backspace" || e.key === "0") {
					e.preventDefault();
					onClear();
				}
			},
			children: [
				1,
				2,
				3,
				4,
				5
			].map((n) => {
				return /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "radio",
					"aria-checked": value === n,
					onClick: () => {
						if (value === n) onClear();
						else onChange(n);
					},
					className: cn("flex size-11 items-center justify-center rounded-none font-mono text-sm tabular-nums transition-[background-color,color,box-shadow] duration-150 ease-out", value != null && value >= n ? fill : "bg-bg text-subtle shadow-border hover:text-fg hover:bg-elevated"),
					children: n
				}, n);
			})
		})]
	});
}
//#endregion
//#region src/components/quest-card.tsx
function QuestCard({ quest }) {
	const Icon = ASPECT_ICONS[quest.aspect.id];
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
		className: "flex flex-col gap-3 p-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-mono text-xs tracking-widest text-muted uppercase",
					children: "Tomorrow's hinge"
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1 text-xs text-subtle",
					children: [/* @__PURE__ */ jsx(Icon, { className: "size-3" }), quest.aspect.name]
				})]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: quest.metric.name
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted",
				children: quest.why
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-fg",
				children: quest.ifThen
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-subtle",
				children: quest.tiny
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/counsel",
				className: "text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
				children: "Full counsel"
			})
		]
	}) });
}
//#endregion
//#region src/components/ui/progress.tsx
var Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(ProgressPrimitive.Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-none bg-bg shadow-border", className),
	...props,
	children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, {
		className: "h-full bg-primary transition-[width] duration-200 ease-out",
		style: { width: `${value ?? 0}%` }
	})
}));
Progress.displayName = ProgressPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-24 w-full rounded-none bg-bg px-3 py-3 font-mono text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function TodayPage() {
	const today = todayKey();
	const profile = useAppStore((s) => s.profile);
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const logs = useAppStore((s) => s.logs);
	const setScore = useAppStore((s) => s.setScore);
	const clearScore = useAppStore((s) => s.clearScore);
	const setJournal = useAppStore((s) => s.setJournal);
	const setRest = useAppStore((s) => s.setRest);
	const [openYesterday, setOpenYesterday] = useState(false);
	const log = logs[today];
	const day = scoreDay(today, log, metrics, aspects);
	const xp = totalXp(logs, metrics, aspects);
	const level = levelFromXp(xp);
	const streak = streakEndingAt(today, logs, metrics);
	const quest = buildQuest(today, logs, metrics, aspects);
	const who = profile.name.trim() || "you";
	const yesterday = addDays(today, -1);
	const yDay = scoreDay(yesterday, logs[yesterday], metrics, aspects);
	const showYesterday = Boolean(profile.startedAt) && profile.startedAt <= yesterday && yDay.rated === 0 && !yDay.rest;
	const weekScores = Object.fromEntries([
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].map((i) => {
		const date = addDays(today, i - 6);
		return [date, scoreDay(date, logs[date], metrics, aspects)];
	}));
	return /* @__PURE__ */ jsxs("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-mono text-xs tracking-widest text-muted uppercase",
					children: formatLong(today)
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-display mt-1 text-4xl tracking-wide",
					children: who === "you" ? "How fully did you show up?" : `How fully did ${who} show up?`
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "text-right",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-mono text-xs tracking-widest text-muted uppercase",
						children: level.title
					}), /* @__PURE__ */ jsxs("p", {
						className: "font-display text-2xl tabular-nums",
						children: ["Lv ", level.level]
					})]
				})]
			}),
			showYesterday ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "flex flex-col gap-3 p-5",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "font-mono text-xs tracking-widest text-muted uppercase",
						children: ["Yesterday · ", formatLong(yesterday)]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-fg",
						children: "No marks. A blank day ends the streak."
					}),
					/* @__PURE__ */ jsx(Button, {
						variant: "secondary",
						onClick: () => setOpenYesterday((v) => !v),
						children: openYesterday ? "Hide yesterday" : "Close yesterday"
					}),
					openYesterday ? metrics.filter((m) => m.active).map((metric) => /* @__PURE__ */ jsx(MetricRow, {
						metric,
						value: logs[yesterday]?.scores[metric.id],
						onChange: (v) => setScore(yesterday, metric.id, v),
						onClear: () => clearScore(yesterday, metric.id)
					}, metric.id)) : null
				]
			}) }) : null,
			/* @__PURE__ */ jsx(CharacterSeal, {
				pct: day.truePct,
				completion: day.completion,
				rated: day.rated,
				active: day.active
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between text-xs text-muted",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						level.title,
						" · ",
						xp,
						" xp"
					] }), /* @__PURE__ */ jsxs("span", {
						className: "tabular-nums",
						children: [
							streak,
							" day",
							streak === 1 ? "" : "s"
						]
					})]
				}), /* @__PURE__ */ jsx(Progress, { value: Math.round(level.progress * 100) })]
			}),
			/* @__PURE__ */ jsx(AspectBars, {
				aspects,
				pct: day.aspectPct
			}),
			/* @__PURE__ */ jsx(WeekStrip, {
				end: today,
				scores: weekScores
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: /* @__PURE__ */ jsx(Button, {
					variant: log?.rest ? "default" : "secondary",
					onClick: () => setRest(today, !log?.rest),
					children: log?.rest ? "Rest day on" : "Mark rest day"
				})
			}),
			log?.rest ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted",
				children: "Rest holds the streak. Rate anyway if you still showed up."
			}) : null,
			quest ? /* @__PURE__ */ jsx(QuestCard, { quest }) : null,
			/* @__PURE__ */ jsx("section", {
				className: "flex flex-col gap-6",
				children: aspects.map((aspect) => {
					const group = metrics.filter((m) => m.active && m.aspectId === aspect.id).sort((a, b) => a.order - b.order);
					if (group.length === 0) return null;
					const Icon = ASPECT_ICONS[aspect.id];
					return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-2 flex items-baseline gap-2",
							children: [
								/* @__PURE__ */ jsx(Icon, { className: "size-4 text-muted" }),
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-xl",
									children: aspect.name
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-xs tabular-nums text-subtle",
									children: [day.aspectPct[aspect.id] ?? 0, "%"]
								})
							]
						}), group.map((metric) => /* @__PURE__ */ jsx(MetricRow, {
							metric,
							value: log?.scores[metric.id],
							onChange: (v) => setScore(today, metric.id, v),
							onClear: () => clearScore(today, metric.id)
						}, metric.id))]
					}) }, aspect.id);
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-2 pb-8",
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "journal",
					className: "text-sm text-muted",
					children: "What mattered"
				}), /* @__PURE__ */ jsx(Textarea, {
					id: "journal",
					value: log?.journal ?? "",
					onChange: (e) => setJournal(today, e.target.value),
					placeholder: "One sentence is enough."
				})]
			})
		]
	});
}
//#endregion
export { TodayPage as component };
