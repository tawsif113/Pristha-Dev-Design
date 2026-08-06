import type { Metadata } from "next";
import { HomeExperience } from "@/src/features/library/components/home-experience";
import { bookService } from "@/src/services";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Continue reading and discover thoughtful stories on Pristha.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredBooks = await bookService.getFeaturedBooks();
  return <HomeExperience featuredBooks={featuredBooks} />;
}
