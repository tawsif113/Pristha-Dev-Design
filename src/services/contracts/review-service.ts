import type { RatingSummary, Review } from "@/src/types/domain";

export interface ReviewService {
  getReviews(bookId: string): Promise<Review[]>;
  getRatingSummary(bookId: string): Promise<RatingSummary>;
}
