import type { Metadata } from "next";
import { HomeExperience } from "@/src/features/library/components/home-experience";
import { bookService, postService } from "@/src/services";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Continue reading and discover thoughtful stories on Pristha.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [featuredBooks, featuredPosts] = await Promise.all([
    bookService.getFeaturedBooks(),
    postService.getFeaturedPosts(),
  ]);
  return (
    <HomeExperience
      featuredBooks={featuredBooks}
      featuredPosts={featuredPosts}
    />
  );
}
