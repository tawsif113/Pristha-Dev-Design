import type { Metadata } from "next";
import { BookmarksExperience } from "@/src/features/library/components/bookmarks-experience";

export const metadata: Metadata = {
  title: "Bookmarks",
  robots: { index: false, follow: false },
};

export default function BookmarksPage() {
  return <BookmarksExperience />;
}
