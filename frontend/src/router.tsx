import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import Bracelets from "./pages/Bracelets";
import Writers from "./pages/Writers";
import LyricsTable from "./pages/Lyrics";
import About from "./pages/About";
import { z } from "zod";

const braceletSearchSchema = z
  .object({
    kidFriendly: z.coerce.boolean().optional(),
  })
  .catchall(z.coerce.number())
  .refine(
    (obj) =>
      Object.keys(obj).every(
        (key) => key === "kidFriendly" || /^[A-Z]$/.test(key)
      ),
    { message: "Only single uppercase letter keys and 'kidFriendly' allowed" }
  ); // Schema for alphabet: ?A=3&B=2&C=5

const writersSearchSchema = z.object({
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
}); // Schema for writers: ?sortOrder=asc|desc

const lyricsSearchSchema = z.object({
  searchTerm: z.string().optional(),
  categories: z.array(z.string()).optional(),
  selectedWord: z.string().optional(),
});

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
  validateSearch: braceletSearchSchema,
});

const writersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "writers",
  component: Writers,
  validateSearch: writersSearchSchema,
});

const lyricsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "lyrics",
  component: LyricsTable,
  validateSearch: lyricsSearchSchema,
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
