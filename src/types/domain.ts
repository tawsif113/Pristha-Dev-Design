export type UserRole =
  | "reader"
  | "writer"
  | "publishing-house-member"
  | "administrator";

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  roles: UserRole[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
}

export interface AuthorProfile extends User {
  bio: string;
  location?: string;
  coverUrl?: string;
  verified: boolean;
  followers: number;
}

export interface ReaderProfile extends User {
  booksRead: number;
  reviewsWritten: number;
}

export interface PublishingHouse {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoUrl?: string;
  verified: boolean;
}

export type BookTone = "saffron" | "teal" | "slate" | "plum" | "olive";
export type BookStatus = "draft" | "in-review" | "published" | "archived";
export type ChapterStatus =
  | "Draft"
  | "Revising"
  | "In review"
  | "Published";

export interface BookTag {
  id: string;
  label: string;
}

export interface BookSummary {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  authorUsername: string;
  coverLabel: string;
  tone: BookTone;
  format: string;
  language: "Bengali" | "English" | "Bilingual";
  rating: number;
  ratingCount: number;
  tags: BookTag[];
}

export interface Book extends BookSummary {
  status: BookStatus;
}

export interface BookDetails extends Book {
  summary: string;
  publishedAt?: string;
  chapterCount: number;
  hasNewChapter?: boolean;
}

export interface Chapter {
  id: string;
  bookId: string;
  number: string;
  title: string;
  content: string;
  wordCount: number;
  status: ChapterStatus;
  updatedAtLabel: string;
}

export interface ReadingProgress {
  bookId: string;
  chapterId: string;
  percentage: number;
  updatedAt: string;
}

export interface LibraryItem {
  book: BookSummary;
  progress?: ReadingProgress;
  savedAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterId: string;
  excerpt: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookId: string;
  readerName: string;
  readerInitial: string;
  rating: number;
  title: string;
  body: string;
  dateLabel: string;
  helpfulCount: number;
  verified: boolean;
  spoiler?: boolean;
  isMine?: boolean;
}

export interface RatingSummary {
  average: number;
  count: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface Reaction {
  label: string;
  value: number;
}

export interface StudioChapter {
  id: string;
  number: string;
  title: string;
  meta: string;
  words: number;
  status: Extract<ChapterStatus, "Draft" | "Revising" | "In review">;
}

export interface StudioBook {
  id: string;
  title: string;
  shortTitle: string;
  romanTitle: string;
  tone: BookTone;
  progress: number;
  format: string;
  synopsis: string;
  chapters: StudioChapter[];
}

export interface StudioDraftSelection {
  bookId: string;
  chapterId: string;
}

export interface Draft {
  bookId: string;
  chapterId: string;
  title: string;
  content: string;
  status: "saved" | "saving" | "unsaved" | "error";
}

export interface StudioFeedback {
  rating: string;
  ratings: string;
  response: string;
  reactions: Reaction[];
  chapter: string;
  chapterRating: string;
  chapterReactions: string;
  theme: string;
}

export interface Submission {
  id: string;
  title: string;
  authorName: string;
  status: "new" | "reading" | "shortlisted" | "declined";
  submittedAt: string;
}

export interface CatalogueItem {
  book: BookSummary;
  status: "live" | "in-review" | "draft";
  reads: number;
  revenue: number;
}

export interface TeamMember extends User {
  role: string;
  status: "active" | "invited";
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  href: string;
  createdAtLabel: string;
  read: boolean;
  tone: "teal" | "gold" | "neutral";
}

export interface SearchResult {
  id: string;
  label: string;
  meta: string;
  href: string;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface BookSearchQuery {
  query?: string;
  format?: string;
  genre?: string;
  sort?: "featured" | "rating" | "newest";
  page?: number;
  pageSize?: number;
}
