import type { Metadata } from "next";
import { LibraryExperience } from "@/src/features/library/components/library-experience";
import { libraryService } from "@/src/services";

export const metadata: Metadata = {
  title: "Library",
  robots: { index: false, follow: false },
};

export default async function LibraryPage() {
  const items = await libraryService.getLibrary();
  return <LibraryExperience items={items} />;
}
