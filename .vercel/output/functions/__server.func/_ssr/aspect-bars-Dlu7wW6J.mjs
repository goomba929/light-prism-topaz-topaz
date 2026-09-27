import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ASPECT_ICONS } from "./router-s7Lg9xSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aspect-bars-Dlu7wW6J.js
var import_jsx_runtime = require_jsx_runtime();
function AspectBars({ aspects, pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-5",
		children: aspects.map((a) => {
			const Icon = ASPECT_ICONS[a.id];
			const v = pct[a.id] ?? 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), a.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-fg",
						children: formatPct(v)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary transition-[width] duration-300 ease-out",
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
export { AspectBars as t };
