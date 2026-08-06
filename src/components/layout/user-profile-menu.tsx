"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";

export function UserProfileMenu() {
  const router = useRouter();
  const { isAuthenticated, isAuthor, logout } = usePristha();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link href={routes.login} className="primary-button compact-btn">
        <span>Sign in</span>
      </Link>
    );
  }

  return (
    <div className="user-profile-menu-wrap" ref={menuRef}>
      <button
        type="button"
        className={`profile-avatar-trigger ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User account menu"
        aria-expanded={open}
      >
        <span className="avatar-circle">র</span>
        <span className="user-name-label">Rumana Kabir</span>
        <span className="chevron-icon">
          <Icon name="arrow" size={14} />
        </span>
      </button>

      {open && (
        <div className="profile-dropdown-popover dropdown-enter" role="menu">
          <div className="popover-user-header">
            <div className="header-avatar">র</div>
            <div className="header-info">
              <strong>Rumana Kabir</strong>
              <small>@rumana_kabir</small>
            </div>
            <span className={`role-badge ${isAuthor ? "author" : "reader"}`}>
              {isAuthor ? "Author" : "Reader"}
            </span>
          </div>

          <div className="popover-divider" />

          <nav className="popover-menu-links">
            <Link
              href={routes.profile("rumana-kabir")}
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              <Icon name="audience" size={16} />
              <span>View profile</span>
            </Link>

            {isAuthor ? (
              <Link
                href={routes.studio}
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                <Icon name="studio" size={16} />
                <span>Writer Studio</span>
              </Link>
            ) : (
              <Link
                href={routes.becomeAuthor}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="highlight-link"
              >
                <Icon name="pen" size={16} />
                <span>Become an Author</span>
              </Link>
            )}

            <Link
              href={routes.settings}
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              <Icon name="settings" size={16} />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="popover-divider" />

          <button
            type="button"
            className="popover-logout-btn"
            onClick={() => {
              setOpen(false);
              logout();
              router.push(routes.login);
            }}
            role="menuitem"
          >
            <Icon name="close" size={15} />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}
