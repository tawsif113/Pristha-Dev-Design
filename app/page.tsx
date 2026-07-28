"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type View =
  | "home"
  | "discover"
  | "book-detail"
  | "book-detail-no-new"
  | "reader"
  | "studio"
  | "dashboard"
  | "audience"
  | "editor"
  | "profile"
  | "settings"
  | "house-overview"
  | "house-catalogue"
  | "house-submissions"
  | "house-storefront"
  | "house-scouting"
  | "house-team";

type IconName =
  | "home"
  | "discover"
  | "library"
  | "studio"
  | "dashboard"
  | "audience"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "menu"
  | "close"
  | "settings"
  | "house"
  | "catalogue"
  | "inbox"
  | "store"
  | "scout"
  | "team"
  | "pen";

const iconPaths: Record<IconName, React.ReactNode> = {
  home: <><path d="M3 10.8 12 3l9 7.8" /><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7" /></>,
  discover: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  library: <><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15-3.5 1z" /></>,
  studio: <><path d="m4 20 4.5-1 10-10a2.8 2.8 0 0 0-4-4l-10 10L4 20Z" /><path d="m13.5 6.5 4 4" /></>,
  dashboard: <><path d="M4 13h6V4H4zM14 20h6v-9h-6zM4 20h6v-3H4zM14 7h6V4h-6z" /></>,
  audience: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-4 2.3-6.5 6-6.5S15 16 15 20M15 14.5c3.8-.4 6 1.6 6 5.5" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  house: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  catalogue: <><path d="M5 4h14v16H5zM9 4v16M13 8h3M13 12h3" /></>,
  inbox: <><path d="M4 5h16v14H4zM4 14h5l2 2h2l2-2h5" /></>,
  store: <><path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 20v-5h4v5" /></>,
  scout: <><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5M11 8v6M8 11h6" /></>,
  team: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-4 2-6.5 6-6.5s6 2.5 6 6.5M14 15c4-.8 7 1.2 7 5" /></>,
  pen: <><path d="m4 20 4-1 11-11a2.8 2.8 0 0 0-4-4L4 15v5Z" /><path d="m13.5 5.5 5 5" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const writerNav = [
  {
    label: "Read",
    items: [
      { id: "home" as View, label: "Home", icon: "home" as IconName },
      { id: "discover" as View, label: "Discover", icon: "discover" as IconName },
    ],
  },
  {
    label: "Write & Studio",
    items: [
      { id: "studio" as View, label: "Studio", icon: "studio" as IconName },
      { id: "dashboard" as View, label: "Dashboard", icon: "dashboard" as IconName },
      { id: "audience" as View, label: "Audience", icon: "audience" as IconName },
    ],
  },
];

const houseNav = [
  {
    label: "Publishing House",
    items: [
      { id: "house-overview" as View, label: "Overview", icon: "house" as IconName },
      { id: "house-catalogue" as View, label: "Catalogue", icon: "catalogue" as IconName },
      { id: "house-submissions" as View, label: "Submissions", icon: "inbox" as IconName },
    ],
  },
  {
    label: "Business",
    items: [
      { id: "house-storefront" as View, label: "Storefront", icon: "store" as IconName },
      { id: "house-scouting" as View, label: "Scouting", icon: "scout" as IconName },
      { id: "house-team" as View, label: "Team", icon: "team" as IconName },
    ],
  },
];

const searchItems = [
  { label: "Studio overview", meta: "Workspace", view: "studio" as View },
  { label: "চিঠি — Chapter 08", meta: "Draft", view: "editor" as View },
  { label: "Monsoon Letters", meta: "Book", view: "home" as View },
  { label: "নদীর ওপারে", meta: "Chapter", view: "editor" as View },
  { label: "Audience insights", meta: "Analytics", view: "audience" as View },
  { label: "Catalogue", meta: "Publishing house", view: "house-catalogue" as View },
];

export default function Home() {
  const [view, setView] = useState<View>("studio");
  const [workspace, setWorkspace] = useState<"writer" | "house">("writer");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspaceMenu, setWorkspaceMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const navGroups = workspace === "writer" ? writerNav : houseNav;
  const filteredSearch = useMemo(
    () =>
      query.trim()
        ? searchItems
            .filter((item) =>
              `${item.label} ${item.meta}`.toLowerCase().includes(query.toLowerCase()),
            )
            .slice(0, 5)
        : [],
    [query],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function navigate(next: View) {
    setView(next);
    setSidebarOpen(false);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function switchWorkspace(next: "writer" | "house") {
    setWorkspace(next);
    setWorkspaceMenu(false);
    navigate(next === "writer" ? "studio" : "house-overview");
  }

  if (view === "reader") {
    return <ReaderCanvas onBack={() => navigate("book-detail")} />;
  }

  return (
    <div className="app-shell">
      <button
        className={`mobile-scrim ${sidebarOpen ? "is-visible" : ""}`}
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="brand" onClick={() => navigate("home")} role="button" tabIndex={0}>
          <img
            className="brand-logo"
            src="/pristha_official_logo_transparent.png"
            alt="Pristha"
          />
        </div>

        <div className={`sidebar-profile-card ${workspace === "house" ? "is-house" : ""}`}>
          <button
            className="profile-cover"
            onClick={() => navigate(workspace === "writer" ? "profile" : "house-overview")}
            aria-label={workspace === "writer" ? "Open Rumana Kabir's profile" : "Open Batayan Prokashoni"}
          >
            <img src="/images/rumana-cover.webp" alt="" />
          </button>

          <button
            className="profile-avatar-button"
            onClick={() => navigate(workspace === "writer" ? "profile" : "house-overview")}
            aria-label={workspace === "writer" ? "Open Rumana Kabir's profile" : "Open Batayan Prokashoni"}
          >
            {workspace === "writer"
              ? <img src="/images/rumana-profile.webp" alt="Rumana Kabir" />
              : <span className="house-profile-monogram">বা</span>}
          </button>

          <div className="profile-card-content">
            <button
              className="profile-name"
              onClick={() => navigate(workspace === "writer" ? "profile" : "house-overview")}
            >
              <strong>{workspace === "writer" ? "Rumana Kabir" : "Batayan Prokashoni"}</strong>
              <span className="verified-badge" aria-label="Verified">✓</span>
            </button>
            <p>
              {workspace === "writer"
                ? "গল্পে শব্দের চেয়ে নীরবতা বেশি রাখি।"
                : "Thoughtful Bengali books for curious readers."}
            </p>
            <small>{workspace === "writer" ? "Dhaka · Fiction writer" : "Dhaka · Independent publisher"}</small>

            <div className="workspace-picker profile-workspace-picker">
              <button
                className="workspace-trigger"
                onClick={() => setWorkspaceMenu((open) => !open)}
                aria-expanded={workspaceMenu}
              >
                <span className="workspace-status" aria-hidden="true" />
                <span>
                  <strong>{workspace === "writer" ? "Writer workspace" : "Publishing house"}</strong>
                  <small>{workspace === "writer" ? "Write, publish, grow" : "Catalogue & business"}</small>
                </span>
                <span className="workspace-chevron">⌄</span>
              </button>
              {workspaceMenu && (
                <div className="workspace-menu">
                  <button onClick={() => switchWorkspace("writer")}>
                    <span className="avatar small">র</span>
                    <span><strong>Writer studio</strong><small>Write, publish, grow</small></span>
                  </button>
                  <button onClick={() => switchWorkspace("house")}>
                    <span className="avatar small house-avatar">বা</span>
                    <span><strong>Batayan house</strong><small>Catalogue & business</small></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={view === item.id ? "active" : ""}
                  onClick={() => navigate(item.id)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  {item.id === "house-submissions" && <em>12</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className={`footer-profile-link ${view === "profile" ? "active" : ""}`}
            onClick={() => navigate("profile")}
          >
            <Icon name="audience" size={17} />
            <span>View profile</span>
          </button>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <Icon name="menu" />
          </button>
          <div className="search-wrap">
            <Icon name="search" size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search books, chapters, readers"
              aria-label="Search"
            />
            <kbd>⌘ K</kbd>
            {filteredSearch.length > 0 && (
              <div className="search-results">
                <p>Quick results</p>
                {filteredSearch.map((result) => (
                  <button key={result.label} onClick={() => navigate(result.view)}>
                    <span><strong>{result.label}</strong><small>{result.meta}</small></span>
                    <Icon name="arrow" size={17} />
                  </button>
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
            <button
              className={`icon-button topbar-settings ${view === "settings" ? "active" : ""}`}
              onClick={() => navigate("settings")}
              aria-label="Settings"
              aria-current={view === "settings" ? "page" : undefined}
            >
              <Icon name="settings" size={19} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Studio
            visible={view === "studio"}
            onNavigate={navigate}
            onToast={setToast}
          />
          {view !== "studio" && (
            <PlaceholderView
              view={view}
              workspace={workspace}
              onNavigate={navigate}
              onToast={setToast}
            />
          )}
        </main>
      </div>

      <aside className={`notification-panel ${notificationsOpen ? "is-open" : ""}`} aria-label="Notifications">
        <div className="panel-head">
          <div><small>Inbox</small><h2>Notifications</h2></div>
          <button className="icon-button" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications">
            <Icon name="close" />
          </button>
        </div>
        <div className="notification-list">
          <button onClick={() => { navigate("audience"); setNotificationsOpen(false); }}>
            <span className="notification-dot teal" />
            <span><strong>৩২ জন নতুন পাঠক</strong><small>চিঠি followed your serial this week.</small><time>12 min</time></span>
          </button>
          <button onClick={() => { navigate("editor"); setNotificationsOpen(false); }}>
            <span className="notification-dot gold" />
            <span><strong>Editor left a note</strong><small>Chapter 08 is ready for your revision.</small><time>2 hr</time></span>
          </button>
          <button onClick={() => { switchWorkspace("house"); setNotificationsOpen(false); }}>
            <span className="notification-dot" />
            <span><strong>New print-rights offer</strong><small>Batayan sent terms for চিঠি.</small><time>Yesterday</time></span>
          </button>
        </div>
      </aside>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Studio({
  visible,
  onNavigate,
  onToast,
}: {
  visible: boolean;
  onNavigate: (view: View) => void;
  onToast: (message: string) => void;
}) {
  if (!visible) return null;

  const chapters = [
    { number: "08", title: "নদীর ওপারে", book: "নীলদরিয়া", meta: "Edited 18 min ago", words: "1,842" },
    { number: "04", title: "A House of Rain", book: "Monsoon Letters", meta: "Edited yesterday", words: "2,106" },
    { number: "06", title: "প্রত্যাবর্তন", book: "চিঠি", meta: "Draft saved Friday", words: "1,277" },
  ];

  return (
    <div className="studio-page page-enter">
      <section className="studio-hero">
        <div className="hero-greeting">
          <span className="eyebrow">Writer Studio</span>
          <h1 lang="bn">শুভ সকাল, রুমানা</h1>
          <p lang="bn">আজ আপনার গল্প কোথায় যাবে?</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate("editor")}>
              Continue writing <Icon name="arrow" size={18} />
            </button>
            <button className="text-action" onClick={() => onToast("A fresh book workspace is ready")}>
              New book <span className="circled-plus"><Icon name="plus" size={17} /></span>
            </button>
          </div>
        </div>

        <div className="streak">
          <div><strong>12</strong><span>day writing streak</span></div>
          <div className="week-line" aria-label="Seven day writing streak">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <span key={`${day}-${index}`}><small>{day}</small><i className={index === 6 ? "today" : ""} /></span>
            ))}
          </div>
          <p>This week <span>·</span> 4,860 words</p>
        </div>
      </section>

      <section className="metric-strip" aria-label="Writing overview">
        <div><strong>48.2k</strong><span>Total words</span></div>
        <div><strong>18</strong><span>Chapters</span></div>
        <div><strong>3</strong><span>Books</span></div>
        <div><strong>73%</strong><span>Weekly goal</span></div>
      </section>

      <section className="studio-grid">
        <div className="chapters-section">
          <div className="section-heading">
            <div><span className="eyebrow">Latest work</span><h2>Recent chapters</h2></div>
            <button onClick={() => onNavigate("home")}>View all</button>
          </div>
          <div className="chapter-list">
            {chapters.map((chapter) => (
              <button key={chapter.number + chapter.title} onClick={() => onNavigate("editor")}>
                <span className="chapter-number">{chapter.number}</span>
                <span className="chapter-copy">
                  <strong lang={chapter.title.match(/[ঀ-৿]/) ? "bn" : "en"}>{chapter.title}</strong>
                  <small>{chapter.book} <i>·</i> {chapter.meta}</small>
                </span>
                <span className="chapter-words">{chapter.words} words</span>
                <Icon name="arrow" size={23} />
              </button>
            ))}
          </div>
        </div>

        <aside className="focus-panel">
          <span className="eyebrow">Today’s focus</span>
          <h2>650 <span>/ 900 words</span></h2>
          <div className="focus-progress"><span /></div>
          <p>Write the next scene before revising.</p>
          <div className="focus-note">
            <small>Current manuscript</small>
            <strong lang="bn">চিঠি — অধ্যায় ০৮</strong>
            <button onClick={() => onNavigate("editor")}>Open manuscript <Icon name="arrow" size={16} /></button>
          </div>
        </aside>
      </section>

      <section className="book-row">
        <div className="section-heading">
          <div><span className="eyebrow">Your shelf</span><h2>Books in progress</h2></div>
          <button onClick={() => onToast("Book management opened")}>Manage books</button>
        </div>
        <div className="book-list">
          <button onClick={() => onNavigate("editor")}>
            <span className="book-cover saffron"><b lang="bn">চি</b><small>CHITHI</small></span>
            <span><strong lang="bn">চিঠি</strong><small>8 chapters · 64% complete</small></span>
            <i><span style={{ width: "64%" }} /></i>
          </button>
          <button onClick={() => onNavigate("editor")}>
            <span className="book-cover teal"><b lang="bn">নী</b><small>NODI</small></span>
            <span><strong lang="bn">নীলদরিয়া</strong><small>5 chapters · In review</small></span>
            <i><span style={{ width: "48%" }} /></i>
          </button>
          <button className="new-book" onClick={() => onToast("New book setup started")}>
            <span><Icon name="plus" size={20} /></span>
            <strong>Start a new book</strong>
            <small>Build a serial or complete manuscript</small>
          </button>
        </div>
      </section>
    </div>
  );
}

function PlaceholderView({
  view,
  workspace,
  onNavigate,
  onToast,
}: {
  view: View;
  workspace: "writer" | "house";
  onNavigate: (view: View) => void;
  onToast: (message: string) => void;
}) {
  if (view === "home") return <ReaderHome onNavigate={onNavigate} />;
  if (view === "discover") return <DiscoverView onNavigate={onNavigate} />;
  if (view === "book-detail" || view === "book-detail-no-new") {
    return (
      <BookDetailView
        variant={view === "book-detail" ? "new-chapter" : "no-new-chapter"}
        onNavigate={onNavigate}
        onToast={onToast}
      />
    );
  }
  if (view === "dashboard") return <DashboardView onToast={onToast} />;
  if (view === "audience") return <AudienceView />;
  if (view === "editor") return <EditorView onToast={onToast} />;
  if (view === "profile") return <ProfileView onNavigate={onNavigate} />;
  if (view === "settings") return <SettingsView onToast={onToast} />;
  if (workspace === "house" || view.startsWith("house-")) {
    return <HouseView view={view} onToast={onToast} />;
  }
  return <Studio visible onNavigate={onNavigate} onToast={onToast} />;
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}

function ReaderHome({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [homeTab, setHomeTab] = useState<"tonight" | "library">("tonight");
  const recommendations = [
    { initial: "অ", title: "অচেনা জানালা", author: "সায়মা রহমান", tone: "umber", detail: "book-detail" as View },
    { initial: "ম", title: "মেঘের ভেতর বাড়ি", author: "তানভীর মুরাদ", tone: "sage", detail: "book-detail-no-new" as View },
    { initial: "শ", title: "শেষ ট্রেন", author: "তাহমিনা রেজা", tone: "navy", detail: "book-detail-no-new" as View },
    { initial: "ন", title: "নদীর ওপারে", author: "আরিফুল হক", tone: "teal", detail: "book-detail" as View },
  ];
  return (
    <div className="product-page page-enter">
      <header className="home-page-header">
        <span className="eyebrow">Good evening, Rumana</span>
        <h1 className="sr-only">Home</h1>
        <div className="home-subtabs" role="tablist" aria-label="Home sections">
          <button
            id="home-tab-tonight"
            type="button"
            role="tab"
            aria-selected={homeTab === "tonight"}
            aria-controls="home-panel-tonight"
            className={homeTab === "tonight" ? "active" : ""}
            onClick={() => setHomeTab("tonight")}
          >
            Tonight on your page
          </button>
          <button
            id="home-tab-library"
            type="button"
            role="tab"
            aria-selected={homeTab === "library"}
            aria-controls="home-panel-library"
            className={homeTab === "library" ? "active" : ""}
            onClick={() => setHomeTab("library")}
          >
            Your Library
          </button>
        </div>
      </header>

      {homeTab === "tonight" ? (
        <div
          id="home-panel-tonight"
          role="tabpanel"
          aria-labelledby="home-tab-tonight"
          className="home-tab-panel"
        >
          <section className="reader-feature">
            <div className="resume-reading">
              <span className="book-cover large saffron"><b lang="bn">চি</b><small>CHITHI</small></span>
              <div>
                <span className="eyebrow">Continue reading</span>
                <h2 lang="bn">অধ্যায় চার — দেরি</h2>
                <p>You stopped three paragraphs in. Your watermark and place are safely kept.</p>
                <div className="reading-progress"><span /></div>
                <small>38% · page 6 of 16 · 4 min left</small>
              </div>
              <button className="primary-button" onClick={() => onNavigate("reader")}>
                Resume <Icon name="arrow" size={18} />
              </button>
            </div>
          </section>

          <section className="open-section">
            <div className="section-heading">
              <div><span className="eyebrow">Fresh for you</span><h2>টাটকা পাতা</h2></div>
              <button onClick={() => onNavigate("discover")}>Explore stories</button>
            </div>
            <div className="cover-grid">
              {recommendations.map((book) => (
                <button key={book.title} onClick={() => onNavigate(book.detail)}>
                  <span className={`discovery-cover ${book.tone}`}><b>{book.initial}</b><small>PRISTHA</small></span>
                  <span><strong lang="bn">{book.title}</strong><small lang="bn">{book.author}</small></span>
                </button>
              ))}
            </div>
          </section>

          <section className="feed-line">
            <span className="profile-portrait">ন</span>
            <div><strong lang="bn">নুসরাত আহমেদ নতুন একটি অধ্যায় প্রকাশ করেছেন</strong><small>চিঠি · Chapter 08 · 22 minutes ago</small></div>
            <button onClick={() => onNavigate("reader")}>Read chapter <Icon name="arrow" size={16} /></button>
          </section>
        </div>
      ) : (
        <div
          id="home-panel-library"
          role="tabpanel"
          aria-labelledby="home-tab-library"
          className="home-tab-panel"
        >
          <HomeLibrary onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
}

function HomeLibrary({ onNavigate }: { onNavigate: (view: View) => void }) {
  const shelf = [
    { title: "চিঠি", author: "নুসরাত আহমেদ", progress: 38, tone: "saffron", initial: "চি", status: "Reading", detail: "book-detail" as View },
    { title: "শেষ ট্রেন", author: "তাহমিনা রেজা", progress: 72, tone: "navy", initial: "শে", status: "Reading", detail: "book-detail-no-new" as View },
    { title: "মেঘের ভেতর বাড়ি", author: "তানভীর মুরাদ", progress: 100, tone: "sage", initial: "মে", status: "Finished", detail: "book-detail-no-new" as View },
  ];
  return (
    <section className="home-library" aria-labelledby="home-library-title">
      <h2 id="home-library-title" className="sr-only">Your Library</h2>
      <section className="shelf-section">
        <div className="shelf-actions"><button>Sort by recent</button></div>
        <div className="shelf-list">
          {shelf.map((book) => (
            <button key={book.title} onClick={() => onNavigate(book.detail)}>
              <span className={`book-cover ${book.tone === "saffron" ? "saffron" : book.tone === "teal" ? "teal" : ""}`}><b>{book.initial}</b><small>PRISTHA</small></span>
              <span><strong lang="bn">{book.title}</strong><small lang="bn">{book.author}</small></span>
              <em>{book.status}</em>
              <span className="shelf-progress"><i style={{ width: `${book.progress}%` }} /></span>
              <small>{book.progress}%</small>
              <Icon name="arrow" size={19} />
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function DiscoverView({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [discoveryQuery, setDiscoveryQuery] = useState("");
  const books = [
    { title: "অচেনা জানালা", author: "সায়মা রহমান", genre: "Literary", tone: "umber", initial: "অ", rating: "4.9", readTime: "3h 10m", detail: "book-detail" as View },
    { title: "মেঘের ভেতর বাড়ি", author: "তানভীর মুরাদ", genre: "Magical realism", tone: "sage", initial: "ম", rating: "4.8", readTime: "2h 35m", detail: "book-detail-no-new" as View },
    { title: "শেষ ট্রেন", author: "তাহমিনা রেজা", genre: "Mystery", tone: "navy", initial: "শ", rating: "4.7", readTime: "4h 05m", detail: "book-detail-no-new" as View },
    { title: "নীল দরজা", author: "রাইসা করিম", genre: "Romance", tone: "teal", initial: "নী", rating: "4.6", readTime: "2h 20m", detail: "book-detail" as View },
    { title: "শহরের নিচে", author: "নাবিল হাসান", genre: "Speculative", tone: "plum", initial: "শ", rating: "4.5", readTime: "3h 45m", detail: "book-detail-no-new" as View },
    { title: "ফিরে আসার গান", author: "ইশরাত জাহান", genre: "Literary", tone: "teal", initial: "ফি", rating: "4.8", readTime: "2h 55m", detail: "book-detail" as View },
  ];
  const genres = ["All", "Literary", "Romance", "Mystery", "Magical realism"];
  const normalizedQuery = discoveryQuery.trim().toLocaleLowerCase();
  const visibleBooks = books.filter((book) => {
    const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
    const matchesQuery =
      !normalizedQuery ||
      `${book.title} ${book.author} ${book.genre}`.toLocaleLowerCase().includes(normalizedQuery);
    return matchesGenre && matchesQuery;
  });
  const isDefaultView = activeGenre === "All" && !normalizedQuery;

  function resetDiscovery() {
    setActiveGenre("All");
    setDiscoveryQuery("");
  }

  return (
    <div className="product-page discover-page page-enter">
      <header className="discover-header">
        <span className="eyebrow">Discover</span>
        <h1>Find a story for tonight.</h1>
        <p>Search by title or author, or choose the kind of story you feel like reading.</p>
      </header>

      <section className="discover-controls" aria-label="Find and filter books">
        <div className="discover-search">
          <Icon name="search" size={19} />
          <label className="sr-only" htmlFor="discover-search-input">Search books or authors</label>
          <input
            id="discover-search-input"
            type="search"
            value={discoveryQuery}
            onChange={(event) => setDiscoveryQuery(event.target.value)}
            placeholder="Search by book, author, or genre"
          />
          {discoveryQuery && (
            <button type="button" onClick={() => setDiscoveryQuery("")} aria-label="Clear search">
              Clear
            </button>
          )}
        </div>
        <div className="discover-genres">
          <span>Browse</span>
          <div role="group" aria-label="Filter by genre">
            {genres.map((genre) => (
              <button
                type="button"
                className={activeGenre === genre ? "active" : ""}
                aria-pressed={activeGenre === genre}
                onClick={() => setActiveGenre(genre)}
                key={genre}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {isDefaultView && (
        <section className="discover-feature" aria-labelledby="editors-pick-title">
          <span className="discovery-cover umber"><b lang="bn">অ</b><small>PRISTHA</small></span>
          <div>
            <span className="eyebrow">Editor’s pick</span>
            <h2 id="editors-pick-title" lang="bn">অচেনা জানালা</h2>
            <p className="discover-author" lang="bn">সায়মা রহমান</p>
            <p>A quiet, intimate novel about the lives we glimpse through other people’s windows—and the courage it takes to open our own.</p>
            <div className="discover-feature-meta">
              <span>Literary fiction</span>
              <span>★ 4.9</span>
              <span>3h 10m</span>
            </div>
            <button className="primary-button" onClick={() => onNavigate("book-detail")}>
              View book <Icon name="arrow" size={17} />
            </button>
          </div>
        </section>
      )}

      <section className="discover-results" aria-labelledby="discover-results-title">
        <div className="discover-results-heading">
          <div>
            <span className="eyebrow">{isDefaultView ? "Browse the shelf" : "Search results"}</span>
            <h2 id="discover-results-title">
              {activeGenre === "All" ? "All stories" : activeGenre}
            </h2>
          </div>
          <span>{visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"}</span>
        </div>

        {visibleBooks.length > 0 ? (
          <div className="discover-grid">
            {visibleBooks.map((book) => (
              <button key={book.title} onClick={() => onNavigate(book.detail)}>
                <span className={`discovery-cover ${book.tone}`}><b lang="bn">{book.initial}</b><small>PRISTHA</small></span>
                <span className="discover-copy">
                  <small>{book.genre}</small>
                  <strong lang="bn">{book.title}</strong>
                  <em lang="bn">{book.author}</em>
                  <span>★ {book.rating} · {book.readTime}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="discover-empty">
            <span>No books found</span>
            <h3>Try a different title, author, or genre.</h3>
            <button type="button" className="secondary-button" onClick={resetDiscovery}>Show all books</button>
          </div>
        )}
      </section>
    </div>
  );
}

function BookDetailView({
  variant,
  onNavigate,
  onToast,
}: {
  variant: "new-chapter" | "no-new-chapter";
  onNavigate: (view: View) => void;
  onToast: (message: string) => void;
}) {
  const [saved, setSaved] = useState(true);
  const hasNewChapter = variant === "new-chapter";
  const book = hasNewChapter
    ? {
        title: "চিঠি",
        latinTitle: "CHITHI",
        author: "নুসরাত আহমেদ",
        authorInitial: "ন",
        coverLabel: "A SERIAL NOVEL",
        tags: ["Literary fiction", "Ongoing serial"],
        chapterCount: "12",
        totalReading: "2h 46m",
        releaseLabel: "Weekly",
        releaseCaption: "New chapters",
        progress: "38%",
        synopsis:
          "পুরোনো ঢাকার একটি বন্ধ ডাকঘরে রাইসা এমন সব চিঠি খুঁজে পায়, যেগুলো কখনো প্রাপকের কাছে পৌঁছায়নি। প্রতিটি খাম খুলতেই শহরের হারিয়ে যাওয়া মানুষ, অসমাপ্ত ভালোবাসা আর তার নিজের পরিবারের চাপা পড়া ইতিহাস এক সুতোয় জড়াতে থাকে।",
        chapters: [
          { number: "01", title: "যে চিঠি পৌঁছায়নি", time: "12 min read", access: "free" },
          { number: "02", title: "জানালার পাশে অপেক্ষা", time: "15 min read", access: "free" },
          { number: "03", title: "নদীর ওপারে", time: "18 min read", access: "free" },
          { number: "04", title: "দেরি", time: "14 min read", access: "owned", progress: "38%" },
          { number: "05", title: "অপরিচিত হাতের লেখা", time: "16 min read", access: "locked" },
          { number: "06", title: "ফেরার ঠিকানা", time: "19 min read", access: "locked" },
        ],
      }
    : {
        title: "শেষ ট্রেন",
        latinTitle: "SHESH TRAIN",
        author: "তাহমিনা রেজা",
        authorInitial: "ত",
        coverLabel: "A COMPLETE NOVEL",
        tags: ["Mystery", "Complete novel"],
        chapterCount: "9",
        totalReading: "3h 12m",
        releaseLabel: "Complete",
        releaseCaption: "Publication",
        progress: "72%",
        synopsis:
          "মধ্যরাতের শেষ ট্রেনটি বহু বছর ধরে বন্ধ একটি স্টেশনে থামে। সাংবাদিক মীরা সেখানে নেমে আবিষ্কার করে, যাত্রীদের প্রত্যেকেই এমন একটি শহরের স্মৃতি বহন করছে যার কোনো মানচিত্র নেই। সত্যের কাছে পৌঁছাতে হলে তাকে ট্রেনটি আবার ছাড়ার আগেই হারিয়ে যাওয়া একজন মানুষের গল্প শেষ করতে হবে।",
        chapters: [
          { number: "01", title: "শেষ প্ল্যাটফর্ম", time: "17 min read", access: "free" },
          { number: "02", title: "নামহীন যাত্রী", time: "20 min read", access: "free" },
          { number: "03", title: "ঘড়িতে বারোটা পাঁচ", time: "18 min read", access: "free" },
          { number: "04", title: "পরিত্যক্ত স্টেশন", time: "22 min read", access: "free" },
          { number: "05", title: "যে শহর মানচিত্রে নেই", time: "19 min read", access: "owned", progress: "72%" },
          { number: "06", title: "ফেরার টিকিট", time: "21 min read", access: "locked" },
        ],
      };

  return (
    <div className="product-page book-detail-page page-enter">
      <button className="book-back-link" onClick={() => onNavigate("home")}>
        <span aria-hidden="true">←</span> Back to Home
      </button>

      <section className="book-detail-hero">
        <div className={`book-detail-cover ${hasNewChapter ? "" : "is-last-train"}`} aria-label={`Cover of ${book.latinTitle}`}>
          <span className="cover-kicker">{book.coverLabel}</span>
          <span className="cover-orbit orbit-one" />
          <span className="cover-orbit orbit-two" />
          <strong lang="bn">{book.title}</strong>
          <small>{book.latinTitle}</small>
          <em lang="bn">{book.author}</em>
        </div>

        <div className="book-detail-copy">
          <h1 lang="bn">{book.title}</h1>
          <button className="book-author" onClick={() => onNavigate("profile")}>
            <span className="author-avatar">{book.authorInitial}</span>
            <span><small>Written by</small><strong lang="bn">{book.author}</strong></span>
          </button>
          <div className="book-rating" aria-label="Rated 4.8 out of 5 by 1,240 readers">
            <span aria-hidden="true">★</span>
            <strong>4.8</strong>
            <small>1.2k reader ratings</small>
          </div>
          <p className="book-synopsis" lang="bn">{book.synopsis}</p>
          <div className="book-badges" aria-label="Book tags">
            {book.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="book-actions">
            <button className="primary-button" onClick={() => onNavigate("reader")}>
              Continue reading <Icon name="arrow" size={18} />
            </button>
            <button
              className={`secondary-button save-book ${saved ? "is-saved" : ""}`}
              onClick={() => {
                setSaved((current) => !current);
                onToast(saved ? "Removed from your library" : "Saved to your library");
              }}
              aria-pressed={saved}
            >
              <span aria-hidden="true">{saved ? "✓" : "+"}</span>
              {saved ? "In your library" : "Add to library"}
            </button>
          </div>
          <dl className="book-facts">
            <div>
              <dt>
                {book.chapterCount}
                {hasNewChapter && (
                  <span
                    className="new-chapter-star"
                    aria-label="A new chapter was added"
                    title="New chapter available"
                  >
                    ★
                  </span>
                )}
              </dt>
              <dd>Chapters</dd>
            </div>
            <div><dt>{book.totalReading}</dt><dd>Total reading</dd></div>
            <div><dt>{book.releaseLabel}</dt><dd>{book.releaseCaption}</dd></div>
          </dl>
        </div>
      </section>

      <section className="chapter-index" aria-labelledby="chapter-index-title">
        <div className="chapter-index-head">
          <div>
            <span className="eyebrow">Inside this book</span>
            <h2 id="chapter-index-title">Chapter index</h2>
          </div>
          <div className="book-overall-progress">
            <span><strong>{book.progress}</strong> read</span>
            <i><b style={{ width: book.progress }} /></i>
          </div>
        </div>
        <div className="chapter-index-list">
          {book.chapters.map((chapter) => {
            const locked = chapter.access === "locked";
            return (
              <button
                key={chapter.number}
                className={chapter.access === "owned" ? "is-current" : ""}
                onClick={() => locked ? onToast("This chapter is not available yet") : onNavigate("reader")}
              >
                <span className="index-number">{chapter.number}</span>
                <span className="index-copy">
                  <strong lang="bn">{chapter.title}</strong>
                  <small>{chapter.time}{chapter.progress ? ` · ${chapter.progress} complete` : ""}</small>
                </span>
                <span className={`access-label ${chapter.access}`}>
                  {locked ? <><span aria-hidden="true">♙</span> Locked</> : chapter.access === "free" ? "Free" : "Continue"}
                </span>
                <span className="chapter-row-arrow" aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ReaderCanvas({ onBack }: { onBack: () => void }) {
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState<"serif" | "sans">("serif");
  const [theme, setTheme] = useState<"paper" | "light" | "night">("paper");
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const chapterProgress = window.scrollY / scrollable;
      setProgress(Math.min(46, Math.max(38, Math.round(38 + chapterProgress * 8))));
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className={`reader-canvas reader-theme-${theme}`}>
      <header className="reader-toolbar">
        <button className="reader-back" onClick={onBack} aria-label="Back to book details">
          <span aria-hidden="true">←</span><span>Book details</span>
        </button>
        <div className="reader-control-group text-scale" aria-label="Text size">
          <button onClick={() => setFontSize((size) => Math.max(17, size - 1))} aria-label="Decrease text size">A−</button>
          <button onClick={() => setFontSize((size) => Math.min(25, size + 1))} aria-label="Increase text size">A+</button>
        </div>
        <div className="reader-control-group font-choice" aria-label="Font family">
          <button className={fontStyle === "serif" ? "active" : ""} onClick={() => setFontStyle("serif")} aria-pressed={fontStyle === "serif"}>Serif</button>
          <button className={fontStyle === "sans" ? "active" : ""} onClick={() => setFontStyle("sans")} aria-pressed={fontStyle === "sans"}>Sans</button>
        </div>
        <div className="reader-control-group theme-choice" aria-label="Reading theme">
          {(["light", "paper", "night"] as const).map((item) => (
            <button
              key={item}
              className={`theme-dot ${item} ${theme === item ? "active" : ""}`}
              onClick={() => setTheme(item)}
              aria-label={`${item} reading theme`}
              aria-pressed={theme === item}
            />
          ))}
        </div>
        <button className="reader-more" aria-label="More reading options">•••</button>
      </header>

      <main className={`reader-manuscript ${fontStyle}`} style={{ fontSize: `${fontSize}px` }}>
        <header className="reader-chapter-head">
          <span>Part I · Chapter 4</span>
          <h1 lang="bn">দেরি</h1>
          <i />
        </header>
        <article lang="bn">
          <p>
            ডাকঘরের ভেতরটা বাইরে থেকে যতটা ছোট মনে হয়েছিল, আসলে ততটা নয়। অন্ধকারে
            সারি সারি কাঠের তাক দূর পর্যন্ত চলে গেছে—প্রতিটি তাকে ধুলো জমা খাম, হলদে
            পোস্টকার্ড আর নামহীন পার্সেল। রাইসা দরজার কাছে দাঁড়িয়ে কিছুক্ষণ শুধু
            পুরোনো কাগজের গন্ধ শুনল।
          </p>
          <p>
            “এগুলো কেউ নিতে আসেনি?” সে ফিসফিস করে জিজ্ঞেস করল। বৃদ্ধ পোস্টমাস্টার
            হাসলেন না। কেবল চাবির গোছা থেকে একটি ছোট পিতলের চাবি আলাদা করে তার
            হাতের তালুতে রাখলেন।
          </p>
          <p>
            “কিছু চিঠি পৌঁছাতে দেরি হয়,” তিনি বললেন। “আর কিছু চিঠি ঠিক সময়ে পৌঁছালে
            মানুষ প্রস্তুত থাকে না। তাই তারা এখানে অপেক্ষা করে।”
          </p>
          <p>
            রাইসা তৃতীয় তাকের শেষ খামটি টেনে নিল। ওপরে কোনো ডাকটিকিট নেই, প্রাপকের
            নামও নেই। শুধু তার মায়ের হাতের লেখায় একটি তারিখ—সতেরো বছর আগের সেই
            বিকেল, যেদিন বাবা বাড়ি থেকে বেরিয়ে আর ফেরেননি।
          </p>
          <p>
            খামের ভাঁজে আঙুল রাখতেই বাইরে বৃষ্টি শুরু হলো। টিনের চালে শব্দ বাড়তে
            লাগল, যেন শহরের সব বন্ধ দরজা একসঙ্গে কথা বলতে চাইছে। রাইসা চেয়ারে বসল,
            কিন্তু খাম খুলল না। কিছু সত্যের সামনে পৌঁছানো আর তাকে গ্রহণ করা একই
            ব্যাপার নয়।
          </p>
          <p>
            বৃদ্ধ লোকটি বাতি জ্বালিয়ে তার দিকে ঠেলে দিলেন। “দেরি হয়েছে,” তিনি
            শান্তভাবে বললেন, “কিন্তু শেষ হয়ে যায়নি।”
          </p>
          <p>
            রাইসা অবশেষে কাগজ কাটার ছুরিটি তুলে নিল। খামের কিনারা খুলে যেতেই ভেতর
            থেকে একটি শুকনো শিউলি ফুল টেবিলের ওপর পড়ল। তার নিচে ছিল মাত্র একটি
            বাক্য: <em>যদি সে কখনো খুঁজতে আসে, তাকে নদীর ওপারের বাড়িটির কথা বলো।</em>
          </p>
        </article>
        <footer className="reader-next">
          <span>End of chapter 4</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Next chapter <span aria-hidden="true">→</span>
          </button>
        </footer>
      </main>

      <footer className="reader-progress-dock">
        <span>Chapter 4</span>
        <i><b style={{ width: `${progress}%` }} /></i>
        <strong>{progress}%</strong>
      </footer>
    </div>
  );
}

function DashboardView({ onToast }: { onToast: (message: string) => void }) {
  const bars = [26, 38, 34, 52, 47, 68, 58, 76, 72, 88, 83, 96];
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Writer analytics"
        title="Publishing dashboard"
        subtitle="The numbers that help you decide—not distract."
        action={<button className="primary-button" onClick={() => onToast("Withdrawal request started")}>Withdraw ৳41,870</button>}
      />
      <section className="dashboard-metrics">
        <div><small>Net earnings</small><strong>৳68,420</strong><span>+18.4% this month</span></div>
        <div><small>Active readers</small><strong>12,408</strong><span>+1,264 in 30 days</span></div>
        <div><small>Completion rate</small><strong>68%</strong><span>Across all serials</span></div>
      </section>
      <section className="chart-section">
        <div className="section-heading"><div><span className="eyebrow">Reader momentum</span><h2>Weekly reads</h2></div><button>Last 12 weeks</button></div>
        <div className="bar-chart" aria-label="Weekly reads chart">
          {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }}><span>{index + 1}</span></i>)}
        </div>
        <div className="chart-foot"><span>12 weeks ago</span><strong>58.2k total reads</strong><span>This week</span></div>
      </section>
      <section className="earnings-table">
        <div className="section-heading"><div><span className="eyebrow">Revenue</span><h2>Top earning titles</h2></div><button>Export report</button></div>
        {[
          ["চিঠি", "Serial unlocks", "18,240", "৳38,900"],
          ["নীলদরিয়া", "Direct purchases", "12,870", "৳21,450"],
          ["Monsoon Letters", "Direct sales", "4,108", "৳8,070"],
        ].map((row) => (
          <div className="data-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]} reads</span><b>{row[3]}</b></div>
        ))}
      </section>
    </div>
  );
}

function AudienceView() {
  const readers = [
    ["তাসনিম রহমান", "@tasnimreads", "Top 1% reader", "24 chapters"],
    ["Arif Chowdhury", "@arifc", "New supporter", "11 chapters"],
    ["মাইশা কবির", "@maishak", "Returning reader", "9 chapters"],
  ];
  return (
    <div className="product-page page-enter">
      <PageHeader eyebrow="Reader relationships" title="Your audience" subtitle="Understand the people returning to your work, without turning them into metrics." />
      <section className="audience-lead">
        <div><strong>12.4k</strong><span>active readers</span><small>68% return within seven days</small></div>
        <div className="audience-rings"><i><b>42%</b><span>18–24</span></i><i><b>31%</b><span>25–34</span></i><i><b>27%</b><span>35+</span></i></div>
      </section>
      <section className="audience-grid">
        <div>
          <div className="section-heading"><div><span className="eyebrow">Engaged readers</span><h2>People to remember</h2></div><button>View all</button></div>
          <div className="people-list">
            {readers.map((reader, index) => (
              <button key={reader[1]}><span className={`reader-avatar tone-${index}`}>{reader[0][0]}</span><span><strong>{reader[0]}</strong><small>{reader[1]} · {reader[2]}</small></span><em>{reader[3]}</em></button>
            ))}
          </div>
        </div>
        <aside className="reader-note">
          <span className="eyebrow">From your comments</span>
          <blockquote lang="bn">“এই অধ্যায়টা শেষ করার পর কিছুক্ষণ চুপ করে বসে ছিলাম।”</blockquote>
          <p>— তাসনিম, on চিঠি · Chapter 07</p>
          <button>Reply thoughtfully <Icon name="arrow" size={16} /></button>
        </aside>
      </section>
    </div>
  );
}

function EditorView({ onToast }: { onToast: (message: string) => void }) {
  const [draft, setDraft] = useState(
    "চিঠিটা ডাকবাক্সে ফেলে আসার পর থেকে মিরার মনে হচ্ছিল, শহরটা যেন থেমে আছে।\n\nপ্রতিটি সকাল শুরু হলো একইভাবে—জানালার পাশে এক কাপ চা, দূরে রিকশার ঘণ্টি, আর দরজার নিচে কোনো উত্তর নেই।\n\nসপ্তম দিনের বিকেলে, বৃষ্টি নামার ঠিক আগে, সে আবার সেই পরিচিত হাতের লেখা দেখল।",
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [manuscriptStyle, setManuscriptStyle] = useState("Novel manuscript");
  const [lineSpacing, setLineSpacing] = useState("1.8");
  const [toolTab, setToolTab] = useState<"Craft" | "Notes" | "Review">("Craft");
  const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;
  const goal = 1500;
  const progress = Math.min(100, Math.round((wordCount / goal) * 100));

  function wrapSelection(before: string, after = before, emptyText = "text") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = draft.slice(start, end) || emptyText;
    const nextDraft = `${draft.slice(0, start)}${before}${selected}${after}${draft.slice(end)}`;
    setDraft(nextDraft);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertAtCursor(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setDraft(`${draft.slice(0, start)}${text}${draft.slice(end)}`);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    });
  }

  return (
    <div className={`editor-page page-enter ${focusMode ? "is-focus-mode" : ""}`}>
      <div className="editor-head">
        <div><span className="eyebrow">চিঠি <span className="crumb-divider">/</span> Chapter 08</span><h1 lang="bn">নদীর ওপারে</h1></div>
        <div className="editor-status"><span><i /> All changes saved</span><button className="secondary-button" onClick={() => onToast("Preview opened")}>Preview</button><button className="primary-button" onClick={() => onToast("Chapter sent for review")}>Send for review</button></div>
      </div>
      <div className="editor-toolbar" role="toolbar" aria-label="Writing tools">
        <div className="toolbar-group toolbar-style">
          <label className="sr-only" htmlFor="paragraph-style">Paragraph style</label>
          <select id="paragraph-style" defaultValue="Body" onChange={(event) => onToast(`${event.target.value} style applied`)}>
            <option>Body</option><option>Chapter title</option><option>Section heading</option><option>Block quote</option><option>Epigraph</option>
          </select>
        </div>
        <div className="toolbar-group">
          <button onClick={() => wrapSelection("**")} aria-label="Bold"><b>B</b></button>
          <button onClick={() => wrapSelection("_")} aria-label="Italic"><i>I</i></button>
          <button onClick={() => wrapSelection("[", "](link)", "link text")} aria-label="Add link"><span className="link-glyph">↗</span></button>
        </div>
        <div className="toolbar-group">
          <button onClick={() => insertAtCursor("\n\n— — —\n\n")} aria-label="Insert scene break">✦</button>
          <button onClick={() => insertAtCursor("—")} aria-label="Insert em dash">—</button>
          <button onClick={() => wrapSelection("“", "”", "dialogue")} aria-label="Add dialogue quotation">“ ”</button>
          <button onClick={() => onToast("Comment pin added to this paragraph")} aria-label="Add comment">◌</button>
        </div>
        <div className="toolbar-spacer" />
        <button className={focusMode ? "focus-toggle active" : "focus-toggle"} onClick={() => setFocusMode((current) => !current)}>{focusMode ? "Exit focus" : "Focus mode"}</button>
        <span className="toolbar-count">{wordCount} words</span>
      </div>
      <div className="editor-workspace">
        <aside className="chapter-outline">
          <div className="outline-head"><span className="eyebrow">Manuscript</span><button onClick={() => onToast("Chapter panel opened")} aria-label="More manuscript options">•••</button></div>
          <span className="outline-book">চিঠি <small>8 chapters</small></span>
          {["01 · চিঠির শুরু", "02 · শহরের শব্দ", "03 · অপেক্ষা", "04 · নদীর ওপারে"].map((item, index) => (
            <button className={index === 3 ? "active" : ""} key={item}><span>{item}</span>{index === 3 && <small>Editing</small>}</button>
          ))}
          <button className="add-scene"><Icon name="plus" size={15} /> Add scene</button>
          <div className="outline-note"><span>Chapter note</span><p>She receives the reply just before the rain.</p></div>
        </aside>
        <article className="paper-editor">
          <div className="paper-kicker"><span>পর্ব ১ · অধ্যায় ৮</span><span>Draft</span></div>
          <h2 lang="bn">নদীর ওপারে</h2>
          <textarea
            ref={textareaRef}
            aria-label="Chapter text"
            lang="bn"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            style={{ lineHeight: lineSpacing }}
          />
          <footer><span>{wordCount} words · {draft.split(/\n+/).filter(Boolean).length} paragraphs</span><span>Last saved just now</span></footer>
        </article>
        <aside className="editor-tools">
          <div className="tool-tabs" role="tablist" aria-label="Writing assistant panels">
            {(["Craft", "Notes", "Review"] as const).map((tab) => <button role="tab" aria-selected={toolTab === tab} className={toolTab === tab ? "active" : ""} onClick={() => setToolTab(tab)} key={tab}>{tab}</button>)}
          </div>
          <section className="writing-goal"><div><span className="eyebrow">Today&apos;s goal</span><strong>{wordCount.toLocaleString()} <small>/ {goal.toLocaleString()}</small></strong></div><span>{progress}%</span><div className="goal-meter"><i style={{ width: `${progress}%` }} /></div><small>{Math.max(0, goal - wordCount).toLocaleString()} words to go</small></section>
          {toolTab === "Craft" && <>
            <section className="chapter-settings"><span className="eyebrow">Manuscript format</span><label>Preset<select value={manuscriptStyle} onChange={(event) => setManuscriptStyle(event.target.value)}><option>Novel manuscript</option><option>Web serial</option><option>Short story</option><option>Screenplay draft</option></select></label><label>Line spacing<select value={lineSpacing} onChange={(event) => setLineSpacing(event.target.value)}><option value="1.6">Compact · 1.6</option><option value="1.8">Comfortable · 1.8</option><option value="2">Submission · Double</option></select></label></section>
            <div className="quick-tools"><span className="eyebrow">Story tools</span><button onClick={() => onToast("Character bible opened")}><span>Characters</span><small>6 profiles</small></button><button onClick={() => onToast("Find and replace opened")}><span>Find & replace</span><small>⌘ F</small></button><button onClick={() => onToast("Manuscript consistency check started")}><span>Consistency check</span><small>Names · tense</small></button></div>
          </>}
          {toolTab === "Notes" && <>
            <div className="editor-note"><small>Chapter intention</small><p>Let the reader feel the long wait before the answer arrives.</p><button onClick={() => onToast("Chapter note editor opened")}>Edit note</button></div>
            <div className="quick-tools"><span className="eyebrow">Reference notes</span><button onClick={() => onToast("Research board opened")}><span>Research board</span><small>12 notes</small></button><button onClick={() => onToast("Timeline opened")}><span>Story timeline</span><small>8 events</small></button><button onClick={() => onToast("Location notes opened")}><span>Places</span><small>4 locations</small></button></div>
          </>}
          {toolTab === "Review" && <>
            <div className="editor-note"><small>Editor note</small><p>Let the silence breathe one line longer before the letter appears.</p><button onClick={() => onToast("Editor note marked as resolved")}>Mark resolved</button></div>
            <div className="revision-check"><span className="eyebrow">Revision check</span><label><input type="checkbox" defaultChecked /> Opening has a hook</label><label><input type="checkbox" /> Check pacing before publishing</label><label><input type="checkbox" /> Dialogue punctuation is consistent</label></div>
            <button className="export-manuscript" onClick={() => onToast("Export options opened")}>Export manuscript <span>DOCX · PDF · EPUB</span></button>
          </>}
          <div className="writer-encouragement"><span>12 day rhythm</span><p>You do not need a perfect chapter today. Keep the scene moving.</p></div>
        </aside>
      </div>
    </div>
  );
}

function ProfileView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="product-page profile-page page-enter">
      <section className="profile-hero">
        <span className="profile-monogram">র</span>
        <div><span className="eyebrow">Writer · Reader</span><h1>Rumana Kabir</h1><p>@rumana · গল্পে শব্দের চেয়ে নীরবতা বেশি রাখি।</p></div>
        <button className="secondary-button" onClick={() => onNavigate("settings")}>Edit profile</button>
      </section>
      <section className="metric-strip profile-metrics"><div><strong>12</strong><span>day streak</span></div><div><strong>3</strong><span>authored books</span></div><div><strong>42</strong><span>saved stories</span></div><div><strong>1.2k</strong><span>followers</span></div></section>
      <section className="profile-grid">
        <div><div className="section-heading"><div><span className="eyebrow">Reading history</span><h2>Your recent pages</h2></div><button onClick={() => onNavigate("home")}>Open home</button></div><LibraryViewMini /></div>
        <aside className="profile-achievements"><span className="eyebrow">Milestones</span><h2>Quiet progress</h2><div><strong>100 chapters</strong><small>Read across 18 writers</small></div><div><strong>7 week rhythm</strong><small>Your longest writing streak</small></div></aside>
      </section>
    </div>
  );
}

function LibraryViewMini() {
  return (
    <div className="mini-library">
      <div><span className="book-cover saffron"><b>চি</b><small>CHITHI</small></span><span><strong lang="bn">চিঠি</strong><small>Chapter 04 · 38%</small></span></div>
      <div><span className="book-cover teal"><b>শে</b><small>TRAIN</small></span><span><strong lang="bn">শেষ ট্রেন</strong><small>Chapter 09 · 72%</small></span></div>
    </div>
  );
}

function SettingsView({ onToast }: { onToast: (message: string) => void }) {
  const tabs = ["Account", "Reading", "Writing", "Notifications", "Appearance", "Privacy", "Billing"] as const;
  type SettingsTab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<SettingsTab>("Account");
  const [quietMode, setQuietMode] = useState(true);
  const [digest, setDigest] = useState(false);
  const [smartTypography, setSmartTypography] = useState(true);
  const [autosave, setAutosave] = useState(true);
  const [readerActivity, setReaderActivity] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggleRow = (
    title: string,
    description: string,
    value: boolean,
    setValue: (value: boolean) => void,
  ) => (
    <div className="setting-row">
      <div><strong>{title}</strong><small>{description}</small></div>
      <button className={`toggle ${value ? "on" : ""}`} onClick={() => setValue(!value)} aria-pressed={value}><span /></button>
    </div>
  );

  function settingsPanel() {
    if (activeTab === "Account") {
      return <>
        <div className="settings-profile"><span className="profile-monogram small">র</span><div><strong>Rumana Kabir</strong><small>@rumana · rumana@pristha.app</small></div><button className="secondary-button" onClick={() => onToast("Profile editor opened")}>Edit profile</button></div>
        <div className="setting-row"><div><strong>Display name</strong><small>Shown on stories, comments, and your public profile.</small></div><button className="inline-select">Rumana Kabir <span>›</span></button></div>
        <div className="setting-row"><div><strong>Interface language</strong><small>English interface with Bengali literary content.</small></div><button className="inline-select">EN / বাংলা <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Connected publishing house</strong><small>Batayan Prokashoni · Editor access</small></div><button className="inline-select">Manage <span>›</span></button></div>
      </>;
    }
    if (activeTab === "Reading") {
      return <>
        {toggleRow("Quiet reading mode", "Hide social activity while you are inside a chapter.", quietMode, setQuietMode)}
        {toggleRow("Weekly reading digest", "A calm Sunday summary of saved and unfinished stories.", digest, setDigest)}
        <div className="setting-row"><div><strong>Default text size</strong><small>Applied whenever a book does not specify a preference.</small></div><button className="inline-select">Comfortable <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Reading direction</strong><small>Choose the default page and chapter flow.</small></div><button className="inline-select">Vertical <span>⌄</span></button></div>
      </>;
    }
    if (activeTab === "Writing") {
      return <>
        {toggleRow("Smart typography", "Automatically use curly quotes, em dashes, and Bengali punctuation.", smartTypography, setSmartTypography)}
        {toggleRow("Continuous autosave", "Keep a recoverable version history while you write.", autosave, setAutosave)}
        <div className="setting-row"><div><strong>Default manuscript style</strong><small>New chapters begin with these professional formatting rules.</small></div><button className="inline-select">Book manuscript <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Daily writing goal</strong><small>A private, encouraging target—not a public score.</small></div><button className="inline-select">1,500 words <span>⌄</span></button></div>
      </>;
    }
    if (activeTab === "Notifications") {
      return <>
        {toggleRow("Reader activity", "Thoughtful summaries of follows, saves, and meaningful comments.", readerActivity, setReaderActivity)}
        {toggleRow("Weekly digest", "Writing progress and reader momentum in one email.", digest, setDigest)}
        <div className="setting-row"><div><strong>Editorial updates</strong><small>Review notes, submission decisions, and publishing deadlines.</small></div><button className="inline-select">Email + in app <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Quiet hours</strong><small>Pause non-essential alerts while you rest or write.</small></div><button className="inline-select">10 PM–8 AM <span>⌄</span></button></div>
      </>;
    }
    if (activeTab === "Appearance") {
      return <>
        <div className="setting-row"><div><strong>Theme</strong><small>Choose an eye-comfortable reading and writing surface.</small></div><button className="inline-select">Warm ivory <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Interface density</strong><small>Controls spacing in lists, tables, and tool panels.</small></div><button className="inline-select">Comfortable <span>⌄</span></button></div>
        {toggleRow("Reduce motion", "Limit non-essential transitions and animated feedback.", reducedMotion, setReducedMotion)}
      </>;
    }
    if (activeTab === "Privacy") {
      return <>
        <div className="setting-row"><div><strong>Profile visibility</strong><small>Control who can find your reading and writing profile.</small></div><button className="inline-select">Public <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Reading activity</strong><small>Choose whether writers can see your name in reader insights.</small></div><button className="inline-select">Private <span>⌄</span></button></div>
        <div className="setting-row"><div><strong>Active sessions</strong><small>Review devices currently signed into your Pristha account.</small></div><button className="inline-select">2 devices <span>›</span></button></div>
        <div className="setting-row"><div><strong>Download your data</strong><small>Export your manuscripts, library, highlights, and account history.</small></div><button className="inline-select">Request export <span>›</span></button></div>
      </>;
    }
    return <>
      <div className="billing-summary"><span className="eyebrow">Current plan</span><h3>Writer Pro</h3><p>Professional writing tools, version history, analytics, and publishing-house collaboration.</p><strong>৳499 <small>/ month</small></strong></div>
      <div className="setting-row"><div><strong>Payment method</strong><small>Visa ending in 2048 · expires 08/29</small></div><button className="inline-select">Update <span>›</span></button></div>
      <div className="setting-row"><div><strong>Invoices</strong><small>View and download your past billing documents.</small></div><button className="inline-select">View invoices <span>›</span></button></div>
    </>;
  }

  return (
    <div className="product-page settings-page page-enter">
      <PageHeader eyebrow="Personal preferences" title="Settings" subtitle="Shape Pristha around the way you read, write, and rest." />
      <div className="settings-layout">
        <nav aria-label="Settings sections">
          {tabs.map((item) => <button className={activeTab === item ? "active" : ""} onClick={() => setActiveTab(item)} key={item}>{item}</button>)}
        </nav>
        <section className="settings-panel">
          <div className="settings-panel-head"><span className="eyebrow">Preferences</span><h2>{activeTab}</h2></div>
          {settingsPanel()}
          <button className="primary-button save-settings" onClick={() => onToast("Preferences saved")}>Save preferences</button>
        </section>
      </div>
    </div>
  );
}

function HouseView({ view, onToast }: { view: View; onToast: (message: string) => void }) {
  const config: Record<string, { eyebrow: string; title: string; subtitle: string; action: string }> = {
    "house-overview": { eyebrow: "House overview", title: "Good morning, Batayan", subtitle: "One calm view of your catalogue, team, and reader business.", action: "Add title" },
    "house-catalogue": { eyebrow: "Publishing operations", title: "Catalogue", subtitle: "Manage every title without losing sight of the work itself.", action: "Add title" },
    "house-submissions": { eyebrow: "Editorial inbox", title: "Submissions", subtitle: "Promising manuscripts, ordered for thoughtful review.", action: "Invite author" },
    "house-storefront": { eyebrow: "Reader experience", title: "Storefront", subtitle: "Curate the front door to your publishing house.", action: "Edit storefront" },
    "house-scouting": { eyebrow: "Talent discovery", title: "Scouting", subtitle: "Find voices worth supporting before the market notices.", action: "New search" },
    "house-team": { eyebrow: "People & access", title: "Team", subtitle: "Editors, designers, and operators behind every published page.", action: "Invite teammate" },
  };
  const current = config[view] ?? config["house-overview"];
  const rowsByView: Record<string, string[][]> = {
    "house-submissions": [["অন্য শহর", "Nadia Sultana", "Literary fiction", "New"], ["The Weather Room", "Asif Rahman", "Essays", "Shortlist"], ["ঘুমন্ত নদী", "মাহিন কবির", "Mystery", "In review"]],
    "house-team": [["Farhana Islam", "Editorial Director", "14 titles", "Active"], ["Sabbir Hossain", "Managing Editor", "9 titles", "Active"], ["Maya Sen", "Cover Designer", "Freelance", "Invited"]],
    "house-scouting": [["রাইসা করিম", "Romance", "18.2k readers", "Rising"], ["Nabil Hasan", "Speculative", "12.8k readers", "Watch"], ["তানভীর মুরাদ", "Literary", "9.4k readers", "Contacted"]],
    default: [["চিঠি", "নুসরাত আহমেদ", "18,240 reads", "৳38,900"], ["জোছনার পথ", "মাহিন কবির", "24,100 reads", "৳61,200"], ["নদীর ওপারে", "রাইসা করিম", "15,870 reads", "৳41,050"], ["শেষ ট্রেন", "তাহমিনা রেজা", "9,640 reads", "৳18,700"]],
  };
  const rows = rowsByView[view] ?? rowsByView.default;
  return (
    <div className="product-page house-page page-enter">
      <PageHeader eyebrow={current.eyebrow} title={current.title} subtitle={current.subtitle} action={<button className="primary-button" onClick={() => onToast(`${current.action} opened`)}><Icon name="plus" size={17} />{current.action}</button>} />
      <section className="house-summary">
        <div><small>Live titles</small><strong>24</strong><span>3 in review</span></div>
        <div><small>Readers this month</small><strong>84.2k</strong><span>+12.6%</span></div>
        <div><small>Gross revenue</small><strong>৳2.8L</strong><span>Across 6 imprints</span></div>
        <div><small>Open submissions</small><strong>38</strong><span>12 need review</span></div>
      </section>
      <section className="house-table">
        <div className="section-heading"><div><span className="eyebrow">Priority view</span><h2>{view === "house-overview" ? "Catalogue pulse" : current.title}</h2></div><button>Filter & sort</button></div>
        <div className="table-head"><span>Title / person</span><span>Author / role</span><span>Performance</span><span>Status</span></div>
        {rows.map((row) => <button className="house-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><em>{row[3]}</em><Icon name="arrow" size={18} /></button>)}
      </section>
      <section className="house-note"><div><span className="eyebrow">Editorial reminder</span><h2>Three shortlisted manuscripts are waiting for a second reader.</h2></div><button onClick={() => onToast("Review queue opened")}>Open review queue <Icon name="arrow" size={17} /></button></section>
    </div>
  );
}
