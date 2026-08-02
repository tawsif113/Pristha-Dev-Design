import type { BookSummary } from "@/src/types/domain";
import { BookCard } from "./book-card";

export function BookGrid({ books }: { books: BookSummary[] }) {
  return (
    <div className="discover-results-grid">
      {books.map((book, index) => (
        <BookCard
          book={book}
          isNew={index === 1 || index === 4}
          key={book.id}
        />
      ))}
    </div>
  );
}
