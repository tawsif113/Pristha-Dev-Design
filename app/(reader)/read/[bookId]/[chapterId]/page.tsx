import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReaderExperience } from "@/src/features/reader/components/reader-experience";
import { bookService } from "@/src/services";

export const metadata: Metadata = {
  title: "Read",
  robots: { index: false, follow: false },
};

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) {
  const { bookId, chapterId } = await params;
  const book = await bookService.getBookById(bookId);
  if (!book) notFound();
  const [chapter, chapters] = await Promise.all([
    bookService.getChapter(book.id, chapterId),
    bookService.getBookChapters(book.id),
  ]);
  if (!chapter) notFound();
  return (
    <ReaderExperience
      book={book}
      chapter={chapter}
      chapters={chapters}
    />
  );
}
