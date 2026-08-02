import Link from "next/link";
import { routes } from "@/src/config/routes";
import type { BookSummary } from "@/src/types/domain";
import { BookCover } from "./book-cover";

function compactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function BookCard({
  book,
  isNew = false,
}: {
  book: BookSummary;
  isNew?: boolean;
}) {
  return (
    <Link className="discover-book-card" href={routes.book(book.slug)}>
      <BookCover
        label={book.coverLabel}
        tone={book.tone}
        isNew={isNew}
      />
      <span className="discover-book-copy">
        <strong lang="bn">{book.title}</strong>
        <em lang="bn">{book.authorName}</em>
        <span className="discover-rating">
          <b>★ {book.rating.toFixed(1)}</b>
          <small>({compactNumber(book.ratingCount)})</small>
        </span>
        <small>
          {book.format} · {book.tags[0]?.label ?? "Fiction"}
        </small>
      </span>
    </Link>
  );
}
