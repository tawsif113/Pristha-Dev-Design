import type { Metadata } from "next";
import { HomeExperience } from "@/src/features/library/components/home-experience";
import { bookService, libraryService, postService } from "@/src/services";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Continue reading, revisit your library, and discover thoughtful stories on Pristha.",
  alternates: { canonical: "/" },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, featuredBooks, libraryItems, featuredPosts] =
    await Promise.all([
      searchParams,
      bookService.getFeaturedBooks(),
      libraryService.getLibrary(),
      postService.getFeaturedPosts(),
    ]);
  return (
    <HomeExperience
      activeTab={tab === "library" ? "library" : "tonight"}
      featuredBooks={featuredBooks}
      libraryItems={libraryItems}
      featuredPosts={featuredPosts}
    />
  );
}
