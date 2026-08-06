const segment = (value: string) => encodeURIComponent(value);

export const routes = {
  home: "/",
  discover: "/discover",
  quickReads: "/quick-reads",
  library: "/library",
  readingHistory: "/reading-history",
  bookmarks: "/bookmarks",
  notifications: "/notifications",
  settings: "/settings",
  login: "/login",
  signup: "/signup",
  becomeAuthor: "/become-author",
  studio: "/studio",
  studioBooks: "/studio/books",
  studioAudience: "/studio/audience",
  studioAnalytics: "/studio/analytics",
  house: "/house",
  houseCatalogue: "/house/catalogue",
  houseSubmissions: "/house/submissions",
  houseStorefront: "/house/storefront",
  houseScouting: "/house/scouting",
  houseTeam: "/house/team",
  book: (bookId: string) => "/books/" + segment(bookId),
  reader: (bookId: string, chapterId: string) =>
    "/read/" + segment(bookId) + "/" + segment(chapterId),
  profile: (username: string) => "/profiles/" + segment(username),
  studioBook: (bookId: string) => "/studio/books/" + segment(bookId),
  editor: (bookId: string, chapterId: string) =>
    "/studio/books/" +
    segment(bookId) +
    "/chapters/" +
    segment(chapterId) +
    "/edit",
} as const;

export type WorkspaceKind = "writer" | "house";

export function workspaceForPath(pathname: string): WorkspaceKind {
  return pathname === routes.house || pathname.startsWith(routes.house + "/")
    ? "house"
    : "writer";
}

export function isPathActive(pathname: string, href: string): boolean {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(href + "/");
}
