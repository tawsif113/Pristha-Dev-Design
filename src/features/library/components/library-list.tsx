import Link from "next/link";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import type { LibraryItem } from "@/src/types/domain";
import { BookCover } from "@/src/features/books/components/book-cover";

export function LibraryList({ items }: { items: LibraryItem[] }) {
  return (
    <div className="shelf-list">
      {items.map((item) => {
        const progress = item.progress?.percentage ?? 0;
        return (
          <Link href={routes.book(item.book.slug)} key={item.book.id}>
            <BookCover
              label={item.book.coverLabel}
              tone={item.book.tone}
            />
            <span>
              <strong lang="bn">{item.book.title}</strong>
              <small lang="bn">{item.book.authorName}</small>
            </span>
            <em>{progress === 100 ? "Finished" : "Reading"}</em>
            <span className="shelf-progress">
              <i style={{ width: String(progress) + "%" }} />
            </span>
            <small>{progress}%</small>
            <Icon name="arrow" size={19} />
          </Link>
        );
      })}
    </div>
  );
}
