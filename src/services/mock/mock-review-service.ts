import {
  chithiRatingSummary,
  initialBookReviews,
} from "@/src/mocks/reviews";
import type { ReviewService } from "@/src/services/contracts/review-service";

export const mockReviewService: ReviewService = {
  async getReviews(bookId) {
    return initialBookReviews.filter((review) => review.bookId === bookId);
  },

  async getRatingSummary() {
    return chithiRatingSummary;
  },
};
