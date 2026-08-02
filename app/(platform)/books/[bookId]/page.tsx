import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetailsExperience } from "@/src/features/books/components/book-details-experience";
import {
  bookService,
  reviewService,
} from "@/src/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>;
}): Promise<Metadata> {
  const { bookId } = await params;
  const book = await bookService.getBookById(bookId);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.summary,
    alternates: { canonical: "/books/" + book.slug },
    openGraph: {
      type: "book",
      title: book.title,
      description: book.summary,
      authors: [book.authorName],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = await bookService.getBookById(bookId);
  if (!book) notFound();
  const [chapters, reviews, ratingSummary] = await Promise.all([
    bookService.getBookChapters(book.id),
    reviewService.getReviews(book.id),
    reviewService.getRatingSummary(book.id),
  ]);
  return (
    <BookDetailsExperience
      book={book}
      chapters={chapters}
      initialReviews={reviews}
      ratingSummary={ratingSummary}
    />
  );
}
