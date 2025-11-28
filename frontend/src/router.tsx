import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import Bracelets from "./pages/Bracelets";
import Writers from "./pages/Writers";
import LyricsTable from "./pages/Lyrics";
import About from "./pages/About";

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Bracelets,
});

const braceletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "bracelets",
  component: Bracelets,
});

const writersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "writers",
  component: Writers,
});

const lyricsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "lyrics",
  component: LyricsTable,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: About,
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: Bracelets,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  braceletsRoute,
  writersRoute,
  lyricsRoute,
  aboutRoute,
  catchAllRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
