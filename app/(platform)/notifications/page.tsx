import type { Metadata } from "next";
import { NotificationsExperience } from "@/src/features/notifications/components/notifications-experience";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

export default function NotificationsPage() {
  return <NotificationsExperience />;
}
