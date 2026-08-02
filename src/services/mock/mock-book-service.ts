import { bookDetails, chapters, discoverBooks } from "@/src/mocks/books";
import type { BookService } from "@/src/services/contracts/book-service";
import type {
  BookSearchQuery,
  BookSummary,
  PaginatedResult,
} from "@/src/types/domain";

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function hasTag(book: BookSummary, tag: string): boolean {
  return book.tags.some(
    (item) => normalize(item.label) === normalize(tag),
  );
}

export const mockBookService: BookService = {
  async getFeaturedBooks() {
    return discoverBooks.slice(0, 8);
  },

  async getBookById(bookId) {
    const detail = bookDetails.find(
      (book) => book.id === bookId || book.slug === bookId,
    );
    if (detail) return detail;
    const summary = discoverBooks.find(
      (book) => book.id === bookId || book.slug === bookId,
    );
    return summary
      ? {
          ...summary,
          status: "published",
          summary:
            "A thoughtful Pristha story about memory, place, and the choices that continue to echo after a chapter ends.",
          chapterCount: 8,
          hasNewChapter: false,
          publishedAt:
            summary.format === "Complete" ? "Complete" : "Weekly",
        }
      : null;
  },

  async getBookChapters(bookId) {
    return chapters.filter((chapter) => chapter.bookId === bookId);
  },

  async getChapter(bookId, chapterId) {
    return (
      chapters.find(
        (chapter) =>
          chapter.bookId === bookId && chapter.id === chapterId,
      ) ?? null
    );
  },

  async searchBooks(
    query: BookSearchQuery,
  ): Promise<PaginatedResult<BookSummary>> {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.max(1, query.pageSize ?? 12);
    const needle = normalize(query.query ?? "");

    const filtered = discoverBooks
      .filter((book) => {
        const matchesQuery =
          !needle ||
          normalize(
            [
              book.title,
              book.authorName,
              book.format,
              ...book.tags.map((tag) => tag.label),
            ].join(" "),
          ).includes(needle);
        const matchesFormat =
          !query.format ||
          query.format === "All stories" ||
          book.format === query.format;
        const matchesGenre =
          !query.genre ||
          query.genre === "All genres" ||
          hasTag(book, query.genre);
        return matchesQuery && matchesFormat && matchesGenre;
      })
      .sort((left, right) => {
        if (query.sort === "rating") return right.rating - left.rating;
        if (query.sort === "newest") {
          return right.id.localeCompare(left.id);
        }
        return right.ratingCount - left.ratingCount;
      });

    const start = (page - 1) * pageSize;
    return {
      items: filtered.slice(start, start + pageSize),
      page,
      pageSize,
      total: filtered.length,
    };
  },
};
