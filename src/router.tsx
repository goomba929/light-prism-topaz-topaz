import { createHashHistory, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const useHash =
    import.meta.env.VITE_HASH === "1" && typeof window !== "undefined";
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    ...(useHash ? { history: createHashHistory() } : {}),
  });
}
