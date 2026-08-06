import type { Metadata } from "next";
import { DiscoverExperience } from "@/src/features/discovery/components/discover-experience";
import { bookService } from "@/src/services";

export const metadata: Metadata = {
  title: "Discover",
  description:
    "Discover Bengali and English stories, serials, and independent voices on Pristha.",
  alternates: { canonical: "/discover" },
};

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    format?: string;
    genre?: string;
    shelf?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const [all, result] = await Promise.all([
    bookService.searchBooks({ pageSize: 100 }),
    bookService.searchBooks({
      query: params.q,
      format: params.format,
      genre: params.genre,
      page,
      pageSize: 12,
    }),
  ]);
  return (
    <DiscoverExperience
      allBooks={all.items}
      results={result.items}
      total={result.total}
      query={{
        q: params.q,
        format: params.format,
        genre: params.genre,
        shelf: params.shelf,
        page,
      }}
    />
  );
}
