import type {
  BookDetails,
  BookSearchQuery,
  BookSummary,
  Chapter,
  PaginatedResult,
} from "@/src/types/domain";

export interface BookService {
  getFeaturedBooks(): Promise<BookSummary[]>;
  getBookById(bookId: string): Promise<BookDetails | null>;
  getBookChapters(bookId: string): Promise<Chapter[]>;
  getChapter(bookId: string, chapterId: string): Promise<Chapter | null>;
  searchBooks(
    query: BookSearchQuery,
  ): Promise<PaginatedResult<BookSummary>>;
}
