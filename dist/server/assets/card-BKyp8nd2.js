import { S as cn } from "./store-BoIZToYY.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/ui/card.tsx
var Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("rounded-none bg-surface text-card-foreground shadow-border", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex flex-col gap-1.5 p-5", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", {
	ref,
	className: cn("font-display text-lg font-medium tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("p-5 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center p-5 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
export { CardTitle as i, CardContent as n, CardHeader as r, Card as t };
