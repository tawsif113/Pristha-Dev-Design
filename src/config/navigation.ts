import type { IconName } from "@/src/components/ui/icon";
import { routes, type WorkspaceKind } from "./routes";

export interface NavigationItem {
  label: string;
  href: string;
  icon: IconName;
  badge?: string;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationByWorkspace: Record<
  WorkspaceKind,
  NavigationGroup[]
> = {
  writer: [
    {
      label: "Read",
      items: [
        { label: "Home", href: routes.home, icon: "home" },
        {
          label: "Discover",
          href: routes.discover,
          icon: "discover",
        },
        { label: "Library", href: routes.library, icon: "library" },
      ],
    },
    {
      label: "Write & Studio",
      items: [
        { label: "Studio", href: routes.studio, icon: "studio" },
        {
          label: "Analytics",
          href: routes.studioAnalytics,
          icon: "dashboard",
        },
        {
          label: "Audience",
          href: routes.studioAudience,
          icon: "audience",
        },
      ],
    },
  ],
  house: [
    {
      label: "Publishing House",
      items: [
        { label: "Overview", href: routes.house, icon: "house" },
        {
          label: "Catalogue",
          href: routes.houseCatalogue,
          icon: "catalogue",
        },
        {
          label: "Submissions",
          href: routes.houseSubmissions,
          icon: "inbox",
          badge: "12",
        },
      ],
    },
    {
      label: "Business",
      items: [
        {
          label: "Storefront",
          href: routes.houseStorefront,
          icon: "store",
        },
        {
          label: "Scouting",
          href: routes.houseScouting,
          icon: "scout",
        },
        { label: "Team", href: routes.houseTeam, icon: "team" },
      ],
    },
  ],
};
