import { S as cn, t as useAppStore, x as ASPECT_ICONS } from "./store-BoIZToYY.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createHashHistory, createRootRoute, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Compass, Feather, Layers, TriangleAlert, Waypoints } from "lucide-react";
import { z } from "zod";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Toaster } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
//#region \0rolldown/runtime.js
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
//#endregion
//#region src/lib/error-component.tsx
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ jsxs("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
//#endregion
//#region src/lib/auth/provider.tsx
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
	return /* @__PURE__ */ jsx(Fragment, { children });
}
//#endregion
//#region src/lib/app-data/types.ts
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
//#endregion
//#region src/lib/preview-embedder-origin.ts
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
//#endregion
//#region src/lib/preview-host-bridge.ts
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = z.object({
	channel: z.literal(PREVIEW_BRIDGE_CHANNEL),
	version: z.number().int().positive(),
	type: z.string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: z.literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: z.literal("navigate"),
	path: z.string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: z.literal("history"),
	delta: z.union([z.literal(-1), z.literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: z.literal("connector-token-ready") });
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
//#endregion
//#region src/components/preview-host-bridge.tsx
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	useEffect(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-sm font-medium tracking-wide uppercase transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-bg text-primary shadow-border hover:bg-elevated",
			ghost: "text-fg hover:bg-elevated",
			outline: "bg-transparent text-fg shadow-border hover:bg-elevated",
			destructive: "bg-bg text-primary shadow-border hover:bg-elevated"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-none px-3 text-xs",
			lg: "h-12 rounded-none px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
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
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-11 w-full rounded-none bg-bg px-3 py-2 font-mono text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn("text-sm font-medium text-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/onboarding.tsx
var HEADLINE = "The list of who you are becoming, kept.";
function Onboarding() {
	const aspects = useAppStore((s) => s.aspects);
	const metrics = useAppStore((s) => s.metrics);
	const toggleMetric = useAppStore((s) => s.toggleMetric);
	const completeOnboarding = useAppStore((s) => s.completeOnboarding);
	const [step, setStep] = useState(0);
	const [name, setName] = useState("");
	const [typed, setTyped] = useState(0);
	const [seen, setSeen] = useState(false);
	const activeCount = useMemo(() => metrics.filter((m) => m.active).length, [metrics]);
	const done = typed >= 39;
	useEffect(() => {
		if (step !== 0) return;
		if (seen) {
			setTyped(39);
			return;
		}
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTyped(39);
			setSeen(true);
			return;
		}
		setTyped(0);
		const id = window.setInterval(() => {
			setTyped((n) => {
				if (n + 1 >= 39) {
					window.clearInterval(id);
					setSeen(true);
					return 39;
				}
				return n + 1;
			});
		}, 32);
		return () => window.clearInterval(id);
	}, [step, seen]);
	return /* @__PURE__ */ jsxs("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col px-6 py-10 md:justify-center md:py-16",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "font-mono text-xs tracking-widest text-primary uppercase",
			children: [">", " Arete // character.sys"]
		}), step === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "mt-6 flex flex-col gap-8",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
				className: "font-display min-h-24 text-5xl tracking-wide sm:min-h-28 sm:text-6xl",
				onClick: () => {
					setTyped(39);
					setSeen(true);
				},
				children: [HEADLINE.slice(0, typed), /* @__PURE__ */ jsx("span", {
					className: done ? "caret-done" : "caret",
					"aria-hidden": true
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: cn("mt-4 text-muted transition-opacity duration-300 ease-out", done ? "opacity-100" : "opacity-0"),
				children: "Twenty marks. Five aspects. Each day you rate how fully you showed up as the figure you already wrote down. Not a streak toy. A character sheet."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: cn("flex flex-col gap-8 transition-opacity duration-300 ease-out", done ? "opacity-100" : "pointer-events-none opacity-0"),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "name",
						children: "What should the sheet call you?"
					}), /* @__PURE__ */ jsx(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Your name",
						autoComplete: "name",
						onKeyDown: (e) => {
							if (e.key === "Enter") setStep(1);
						}
					})]
				}), /* @__PURE__ */ jsx(Button, {
					size: "lg",
					onClick: () => setStep(1),
					children: "Continue"
				})]
			})]
		}) : /* @__PURE__ */ jsxs("div", {
			className: "mt-6 flex flex-col gap-8 pb-10",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl tracking-wide sm:text-5xl",
					children: "Five aspects. Twenty marks."
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-muted",
					children: "Body, Spirit, Kin, Craft, Mind. Toggle anything that is not yours. You can rewrite the sheet later."
				})] }),
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-6",
					children: aspects.map((aspect) => {
						const Icon = ASPECT_ICONS[aspect.id];
						const group = metrics.filter((m) => m.aspectId === aspect.id);
						return /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-2 flex flex-wrap items-baseline gap-2",
							children: [
								/* @__PURE__ */ jsx(Icon, { className: "size-3.5 text-muted" }),
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-lg font-medium",
									children: aspect.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-subtle",
									children: aspect.tagline
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-2",
							children: group.map((m) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => toggleMetric(m.id),
								className: cn("h-10 rounded-none px-3 font-mono text-sm transition-[background-color,color,box-shadow] duration-150", m.active ? "bg-primary text-primary-foreground" : "bg-bg text-muted shadow-border"),
								children: m.name
							}, m.id))
						})] }, aspect.id);
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ jsx(Button, {
							size: "lg",
							disabled: activeCount === 0,
							onClick: () => completeOnboarding({
								name: name.trim(),
								seed: true
							}),
							children: "Begin with the twenty"
						}),
						/* @__PURE__ */ jsx(Button, {
							size: "lg",
							variant: "secondary",
							disabled: activeCount === 0,
							onClick: () => completeOnboarding({
								name: name.trim(),
								seed: false
							}),
							children: "Start from zero"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-subtle",
							children: "The twenty includes a sample fortnight so the path has a past. Clear it anytime from the figure."
						}),
						/* @__PURE__ */ jsx("button", {
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
//#endregion
//#region src/components/app-nav.tsx
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
	return /* @__PURE__ */ jsx("nav", {
		className: cn("flex", className),
		"aria-label": "Primary",
		children: ITEMS.map((item) => {
			const Icon = item.icon;
			return /* @__PURE__ */ jsxs(Link, {
				to: item.to,
				className: "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 px-2 font-mono text-xs tracking-widest text-subtle uppercase transition-colors duration-150 hover:text-fg [&.active]:text-primary",
				activeOptions: { exact: item.to === "/" },
				activeProps: { className: "active" },
				children: [/* @__PURE__ */ jsx(Icon, {
					className: "size-4",
					strokeWidth: 1.6
				}), item.label]
			}, item.to);
		})
	});
}
function SideNav() {
	return /* @__PURE__ */ jsxs("aside", {
		className: "hidden w-52 shrink-0 flex-col gap-8 py-10 pr-6 md:flex",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "font-display text-3xl tracking-wide text-primary",
			children: "Arête"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 font-mono text-xs tracking-widest text-subtle uppercase",
			children: "Character.sys"
		})] }), /* @__PURE__ */ jsx("nav", {
			className: "flex flex-col gap-1",
			"aria-label": "Primary",
			children: ITEMS.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ jsxs(Link, {
					to: item.to,
					className: "flex min-h-11 items-center gap-3 rounded-none px-3 font-mono text-sm tracking-wide text-muted uppercase transition-colors duration-150 hover:bg-elevated hover:text-fg [&.active]:bg-elevated [&.active]:text-primary",
					activeOptions: { exact: item.to === "/" },
					activeProps: { className: "active" },
					children: [/* @__PURE__ */ jsx(Icon, {
						className: "size-4",
						strokeWidth: 1.6
					}), item.label]
				}, item.to);
			})
		})]
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
function Toaster$1() {
	return /* @__PURE__ */ jsx(Toaster, {
		theme: "dark",
		position: "top-center",
		toastOptions: { classNames: {
			toast: "bg-surface text-fg shadow-border border-0 font-[Figtree,ui-sans-serif,system-ui,sans-serif]",
			title: "text-fg",
			description: "text-muted"
		} }
	});
}
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var TooltipContent = React.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-sm bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-border", className),
	...props
}) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/app-frame.tsx
function AppFrame({ children }) {
	const onboarded = useAppStore((s) => s.profile.onboarded);
	const [ready, setReady] = useState(false);
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs(TooltipProvider, {
		delayDuration: 200,
		children: [ready && onboarded ? /* @__PURE__ */ jsxs("div", {
			className: "min-h-dvh bg-bg text-fg",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-5xl md:px-6",
				children: [/* @__PURE__ */ jsx(SideNav, {}), /* @__PURE__ */ jsx("div", {
					className: "min-w-0 flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-10",
					children
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 md:hidden",
				children: /* @__PURE__ */ jsx(AppNav, { className: "h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]" })
			})]
		}) : /* @__PURE__ */ jsx(Onboarding, {}), /* @__PURE__ */ jsx(Toaster$1, {})]
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "./assets/styles-BePQrPp0.css";
//#endregion
//#region src/routes/__root.tsx
var APP_NAME = "Arête";
var asset = (path) => `./${path.replace(/^\//, "")}`;
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
				content: "#000000"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: asset("favicon.svg")
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=VT323&display=swap"
			},
			{
				rel: "manifest",
				href: asset("manifest.webmanifest")
			},
			{
				rel: "apple-touch-icon",
				href: asset("__grok/icon-180.png")
			}
		]
	}),
	component: () => /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(PreviewHostBridge, {}),
			/* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(AppFrame, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	})
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$3 = () => import("./routes-_WMhmkEi.js");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/counsel.tsx
var $$splitComponentImporter$2 = () => import("./counsel-Dppt5B4E.js");
var Route$2 = createFileRoute("/counsel")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/figure.tsx
var $$splitComponentImporter$1 = () => import("./figure-BKkgc0rh.js");
var Route$1 = createFileRoute("/figure")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/path.tsx
var $$splitComponentImporter = () => import("./path-N3o361Ic.js");
var Route = createFileRoute("/path")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
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
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		...typeof window !== "undefined" ? { history: createHashHistory() } : {}
	});
}
//#endregion
export { getRouter, Button as i, Label as n, Input as r, router_exports as t };
