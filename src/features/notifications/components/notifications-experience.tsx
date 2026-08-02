import Link from "next/link";
import { PageHeader } from "@/src/components/layout/page-header";
import { notifications } from "@/src/mocks/notifications";
import { cn } from "@/src/lib/cn";

export function NotificationsExperience() {
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        subtitle="Reader, editorial, and publishing updates in one place."
      />
      <div className="notification-page-list">
        {notifications.map((notification) => (
          <Link href={notification.href} key={notification.id}>
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
            </span>
            <time>{notification.createdAtLabel}</time>
          </Link>
        ))}
      </div>
    </div>
  );
}
