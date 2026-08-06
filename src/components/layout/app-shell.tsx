"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { navigationByWorkspace } from "@/src/config/navigation";
import {
  isPathActive,
  routes,
  workspaceForPath,
  type WorkspaceKind,
} from "@/src/config/routes";
import { notifications } from "@/src/mocks/notifications";
import { UserProfileMenu } from "@/src/components/layout/user-profile-menu";
import { Icon } from "@/src/components/ui/icon";
import { Toast } from "@/src/components/feedback/toast";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import { cn } from "@/src/lib/cn";

const searchItems = [
  {
    label: "Studio overview",
    meta: "Workspace",
    href: routes.studio,
  },
  {
    label: "চিঠি — Chapter 08",
    meta: "Draft",
    href: routes.editor("chithi", "chithi-08"),
  },
  {
    label: "Monsoon Letters",
    meta: "Book",
    href: routes.book("house-in-clouds"),
  },
  {
    label: "নদীর ওপারে",
    meta: "Chapter",
    href: routes.reader("chithi", "chithi-08"),
  },
  {
    label: "Audience insights",
    meta: "Analytics",
    href: routes.studioAudience,
  },
  {
    label: "Catalogue",
    meta: "Publishing house",
    href: routes.houseCatalogue,
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const { toast, isAuthenticated, logout } = usePristha();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspaceMenu, setWorkspaceMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const workspace = workspaceForPath(pathname);
  const navGroups = navigationByWorkspace[workspace];
  const filteredSearch = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return searchItems
      .filter((item) =>
        (item.label + " " + item.meta)
          .toLocaleLowerCase()
          .includes(needle),
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setWorkspaceMenu(false);
        setSidebarOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function switchWorkspace(next: WorkspaceKind) {
    setWorkspaceMenu(false);
    setSidebarOpen(false);
    router.push(next === "writer" ? routes.studio : routes.house);
  }

  function closeNavigation() {
    setSidebarOpen(false);
    setQuery("");
  }

  return (
    <div className="app-shell">
      <button
        className={cn(
          "mobile-scrim",
          sidebarOpen && "is-visible",
        )}
        aria-label="Close navigation"
        tabIndex={sidebarOpen ? 0 : -1}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn("sidebar", sidebarOpen && "is-open")}
        aria-label="Application sidebar"
        onFocusCapture={() => setSidebarOpen(true)}
      >
        <Link
          className="brand"
          href={routes.home}
          onClick={closeNavigation}
        >
          <Image
            className="brand-logo"
            src="/pristha_official_logo_transparent.png"
            alt="Pristha"
            width={352}
            height={128}
            priority
            unoptimized
          />
        </Link>

        <ProfileWorkspaceCard
          workspace={workspace}
          menuOpen={workspaceMenu}
          onToggleMenu={() => setWorkspaceMenu((open) => !open)}
          onSwitch={switchWorkspace}
          onNavigate={closeNavigation}
        />

        <nav className="primary-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const active = isPathActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    className={active ? "active" : undefined}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeNavigation}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                    {item.badge && <em>{item.badge}</em>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link
            className={cn(
              "footer-profile-link",
              pathname.startsWith("/profiles/") && "active",
            )}
            href={routes.profile("rumana-kabir")}
            onClick={closeNavigation}
          >
            <Icon name="audience" />
            <span>View profile</span>
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              className="footer-profile-link logout-btn"
              onClick={() => {
                closeNavigation();
                logout();
                router.push(routes.login);
              }}
            >
              <Icon name="close" size={15} />
              <span>Log out</span>
            </button>
          ) : (
            <Link
              className={cn(
                "footer-profile-link",
                (pathname === routes.login || pathname === routes.signup) && "active",
              )}
              href={routes.login}
              onClick={closeNavigation}
            >
              <Icon name="studio" />
              <span>Sign In / Sign Up</span>
            </Link>
          )}
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
          >
            <Icon name="menu" />
          </button>

          <div className="search-wrap">
            <Icon name="search" size={19} />
            <input
              ref={searchRef}
              type="search"
              role="combobox"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, chapters, readers"
              aria-label="Search books, chapters, and readers"
              aria-autocomplete="list"
              aria-controls="global-search-results"
              aria-expanded={filteredSearch.length > 0}
            />
            <kbd>⌘ K</kbd>
            {filteredSearch.length > 0 && (
              <div
                className="search-results"
                id="global-search-results"
                role="listbox"
                aria-label="Quick search results"
              >
                <p>Quick results</p>
                {filteredSearch.map((result) => (
                  <Link
                    key={result.label}
                    href={result.href}
                    role="option"
                    aria-selected="false"
                    onClick={() => setQuery("")}
                  >
                    <span>
                      <strong>{result.label}</strong>
                      <small>{result.meta}</small>
                    </span>
                    <Icon name="arrow" size={17} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button notification-button"
              onClick={() => setNotificationsOpen((open) => !open)}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Icon name="bell" />
              <span />
            </button>
            <span className="topbar-rule" />
            <Link
              className={cn(
                "icon-button topbar-settings",
                pathname === routes.settings && "active",
              )}
              href={routes.settings}
              aria-label="Settings"
              aria-current={
                pathname === routes.settings ? "page" : undefined
              }
            >
              <Icon name="settings" size={19} />
            </Link>

            <UserProfileMenu />
          </div>
        </header>

        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>

      <NotificationPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <Toast message={toast} />
    </div>
  );
}

function ProfileWorkspaceCard({
  workspace,
  menuOpen,
  onToggleMenu,
  onSwitch,
  onNavigate,
}: {
  workspace: WorkspaceKind;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSwitch: (workspace: WorkspaceKind) => void;
  onNavigate: () => void;
}) {
  const isHouse = workspace === "house";
  const profileHref = isHouse
    ? routes.house
    : routes.profile("rumana-kabir");
  const profileLabel = isHouse
    ? "Open Batayan Prokashoni"
    : "Open Rumana Kabir's profile";

  return (
    <div className={cn("sidebar-profile-card", isHouse && "is-house")}>
      <Link
        className="profile-cover"
        href={profileHref}
        aria-label={profileLabel}
        onClick={onNavigate}
      >
        <Image
          src="/images/rumana-cover.webp"
          alt=""
          width={512}
          height={180}
          unoptimized
        />
      </Link>

      <Link
        className="profile-avatar-button"
        href={profileHref}
        aria-label={profileLabel}
        onClick={onNavigate}
      >
        {isHouse ? (
          <span className="house-profile-monogram">বা</span>
        ) : (
          <Image
            src="/images/rumana-profile.webp"
            alt="Rumana Kabir"
            width={116}
            height={116}
            unoptimized
          />
        )}
      </Link>

      <div className="profile-card-content">
        <Link className="profile-name" href={profileHref}>
          <strong>{isHouse ? "Batayan Prokashoni" : "Rumana Kabir"}</strong>
          <span className="verified-badge" aria-label="Verified">
            ✓
          </span>
        </Link>
        <p>
          {isHouse
            ? "Thoughtful Bengali books for curious readers."
            : "গল্পে শব্দের চেয়ে নীরবতা বেশি রাখি।"}
        </p>
        <small>
          {isHouse
            ? "Dhaka · Independent publisher"
            : "Dhaka · Fiction writer"}
        </small>

        <div className="workspace-picker profile-workspace-picker">
          <button
            className="workspace-trigger"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <span className="workspace-status" aria-hidden="true" />
            <span>
              <strong>
                {isHouse ? "Publishing house" : "Writer workspace"}
              </strong>
              <small>
                {isHouse ? "Catalogue & business" : "Write, publish, grow"}
              </small>
            </span>
            <span className="workspace-chevron" aria-hidden="true">
              ⌄
            </span>
          </button>
          {menuOpen && (
            <div className="workspace-menu" role="menu">
              <button
                role="menuitem"
                onClick={() => onSwitch("writer")}
              >
                <span className="avatar small">র</span>
                <span>
                  <strong>Writer studio</strong>
                  <small>Write, publish, grow</small>
                </span>
              </button>
              <button
                role="menuitem"
                onClick={() => onSwitch("house")}
              >
                <span className="avatar small house-avatar">বা</span>
                <span>
                  <strong>Batayan house</strong>
                  <small>Catalogue & business</small>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <aside
      className="notification-panel is-open"
      aria-label="Notifications"
    >
      <div className="panel-head">
        <div>
          <small>Inbox</small>
          <h2>Notifications</h2>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close notifications"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="notification-list">
        {notifications.map((notification) => (
          <Link
            href={notification.href}
            key={notification.id}
            onClick={onClose}
          >
            <span
              className={cn(
                "notification-dot",
                notification.tone === "teal" && "teal",
                notification.tone === "gold" && "gold",
              )}
            />
            <span>
              <strong>{notification.title}</strong>
              <small>{notification.body}</small>
              <time>{notification.createdAtLabel}</time>
            </span>
          </Link>
        ))}
      </div>
      <Link
        className="notification-all-link"
        href={routes.notifications}
        onClick={onClose}
      >
        View all notifications
      </Link>
    </aside>
  );
}
