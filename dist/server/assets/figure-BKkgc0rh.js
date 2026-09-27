import { S as cn, t as useAppStore, x as ASPECT_ICONS, y as todayKey } from "./store-BoIZToYY.js";
import { i as Button, n as Label, r as Input } from "./router-SQ3rHPvJ.js";
import { n as CardContent, t as Card } from "./card-BKyp8nd2.js";
import * as React from "react";
import { useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-none bg-surface p-6 shadow-border", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute top-4 right-4 rounded-sm text-muted transition-opacity duration-150 hover:text-fg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
		children: [/* @__PURE__ */ jsx(X, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("font-display text-lg font-medium tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = DialogPrimitive.Root;
var SheetPortal = DialogPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80", className),
	...props
}));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
var SheetContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col rounded-none bg-surface p-6 shadow-border md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-full md:max-w-md", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute top-4 right-4 rounded-sm text-muted transition-opacity duration-150 hover:text-fg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
		children: [/* @__PURE__ */ jsx(X, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("font-display text-lg font-medium tracking-tight", className),
	...props
}));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/routes/figure.tsx?tsr-split=component
function FigurePage() {
	const profile = useAppStore((s) => s.profile);
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const setName = useAppStore((s) => s.setName);
	const toggleMetric = useAppStore((s) => s.toggleMetric);
	const renameMetric = useAppStore((s) => s.renameMetric);
	const removeMetric = useAppStore((s) => s.removeMetric);
	const addMetric = useAppStore((s) => s.addMetric);
	const resetAll = useAppStore((s) => s.resetAll);
	const clearHistory = useAppStore((s) => s.clearHistory);
	const importSheet = useAppStore((s) => s.importSheet);
	const [addOpen, setAddOpen] = useState(false);
	const [resetOpen, setResetOpen] = useState(false);
	const [newName, setNewName] = useState("");
	const [newAspect, setNewAspect] = useState("body");
	const fileRef = useRef(null);
	const activeCount = metrics.filter((m) => m.active).length;
	return /* @__PURE__ */ jsxs("main", {
		className: "flex flex-col gap-8 px-5 pt-8 md:pt-10",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-mono text-xs tracking-widest text-muted uppercase",
					children: "Figure"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display mt-1 text-4xl tracking-wide",
					children: "Rewrite the ideal."
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-sm text-muted",
					children: [activeCount, " active marks. The sheet is yours."]
				})
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ jsx(Label, {
					htmlFor: "display-name",
					children: "Name on the sheet"
				}), /* @__PURE__ */ jsx(Input, {
					id: "display-name",
					value: profile.name,
					onChange: (e) => setName(e.target.value),
					placeholder: "Your name"
				})]
			}),
			aspects.map((aspect) => {
				const Icon = ASPECT_ICONS[aspect.id];
				const group = metrics.filter((m) => m.aspectId === aspect.id).sort((a, b) => a.order - b.order);
				return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-3 flex items-baseline gap-2",
						children: [
							/* @__PURE__ */ jsx(Icon, { className: "size-4 text-muted" }),
							/* @__PURE__ */ jsx("h2", {
								className: "font-display text-xl font-medium",
								children: aspect.name
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs text-subtle",
								children: aspect.tagline
							})
						]
					}), /* @__PURE__ */ jsx("ul", {
						className: "divide-y divide-border",
						children: group.map((m) => /* @__PURE__ */ jsxs("li", {
							className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ jsx(Input, {
								value: m.name,
								onChange: (e) => renameMetric(m.id, e.target.value),
								className: "h-11 sm:flex-1",
								"aria-label": `Rename ${m.name}`
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: m.active ? "default" : "outline",
									onClick: () => toggleMetric(m.id),
									children: m.active ? "On" : "Off"
								}), /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => removeMetric(m.id),
									children: "Remove"
								})]
							})]
						}, m.id))
					})]
				}) }, aspect.id);
			}),
			/* @__PURE__ */ jsxs(Button, {
				variant: "secondary",
				onClick: () => setAddOpen(true),
				children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Add a mark"]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-3 pb-8",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-medium",
						children: "The book"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted",
						children: "History lives on this device. Keep a copy. On a phone, use the browser share menu and add Arête to the home screen. Clearing the path keeps the figure. Starting over forgets everything."
					}),
					/* @__PURE__ */ jsx("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							e.target.value = "";
							if (!file) return;
							file.text().then((raw) => {
								try {
									const parsed = JSON.parse(raw);
									const data = parsed.state ?? parsed;
									if (!data.profile || !Array.isArray(data.metrics) || !Array.isArray(data.aspects) || !data.logs) {
										toast.error("That file is not a sheet.");
										return;
									}
									importSheet({
										profile: data.profile,
										aspects: data.aspects,
										metrics: data.metrics,
										logs: data.logs,
										briefings: data.briefings ?? {}
									});
									toast.success("Sheet restored.");
								} catch {
									toast.error("Could not read that file.");
								}
							});
						}
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2 sm:flex-row sm:flex-wrap",
						children: [
							/* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								onClick: () => {
									const s = useAppStore.getState();
									const blob = new Blob([JSON.stringify({
										arete: 1,
										exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
										profile: s.profile,
										aspects: s.aspects,
										metrics: s.metrics,
										logs: s.logs,
										briefings: s.briefings
									}, null, 2)], { type: "application/json" });
									const a = document.createElement("a");
									a.href = URL.createObjectURL(blob);
									a.download = `arete-${todayKey()}.json`;
									a.click();
									URL.revokeObjectURL(a.href);
									toast.success("Copy downloaded.");
								},
								children: "Download a copy"
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								onClick: () => fileRef.current?.click(),
								children: "Restore a copy"
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								onClick: () => clearHistory(),
								children: "Clear the path"
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								onClick: () => setResetOpen(true),
								children: "Start over"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(Sheet, {
				open: addOpen,
				onOpenChange: setAddOpen,
				children: /* @__PURE__ */ jsxs(SheetContent, { children: [/* @__PURE__ */ jsxs(SheetHeader, { children: [/* @__PURE__ */ jsx(SheetTitle, { children: "Add a mark" }), /* @__PURE__ */ jsx(SheetDescription, { children: "A name is enough. Put it in the aspect it belongs to." })] }), /* @__PURE__ */ jsxs("form", {
					className: "mt-6 flex flex-col gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						if (!newName.trim()) return;
						addMetric({
							name: newName.trim(),
							aspectId: newAspect
						});
						setNewName("");
						setAddOpen(false);
					},
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "new-mark",
								children: "Name"
							}), /* @__PURE__ */ jsx(Input, {
								id: "new-mark",
								value: newName,
								onChange: (e) => setNewName(e.target.value),
								placeholder: "e.g. Sabbath"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Aspect" }), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: aspects.map((a) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setNewAspect(a.id),
									className: cn("h-10 rounded-none px-3 text-sm transition-colors duration-150", newAspect === a.id ? "bg-primary text-primary-foreground" : "text-muted shadow-border"),
									children: a.name
								}, a.id))
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: !newName.trim(),
							children: "Add to the sheet"
						})
					]
				})] })
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: resetOpen,
				onOpenChange: setResetOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Start over?" }), /* @__PURE__ */ jsx(DialogDescription, { children: "This clears the figure, the path, and the name. It cannot be undone. Download a copy first if you want the book back." })] }), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					onClick: () => setResetOpen(false),
					children: "Keep it"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "destructive",
					onClick: () => {
						resetAll();
						setResetOpen(false);
					},
					children: "Start over"
				})] })] })
			})
		]
	});
}
//#endregion
export { FigurePage as component };
