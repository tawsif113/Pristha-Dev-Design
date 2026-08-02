import type { Metadata } from "next";
import { ReadingHistoryExperience } from "@/src/features/library/components/reading-history-experience";
import { libraryService } from "@/src/services";

export const metadata: Metadata = {
  title: "Reading history",
  robots: { index: false, follow: false },
};

export default async function ReadingHistoryPage() {
  const items = await libraryService.getLibrary();
  return <ReadingHistoryExperience items={items} />;
}
