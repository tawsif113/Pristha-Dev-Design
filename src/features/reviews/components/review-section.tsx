"use client";

import { useMemo, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Modal } from "@/src/components/ui/modal";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import type { RatingSummary, Review } from "@/src/types/domain";

type ReviewSort = "Most helpful" | "Recent" | "Highest" | "Lowest";

export function ReviewSection({
  bookId,
  initialReviews,
  ratingSummary,
}: {
  bookId: string;
  initialReviews: Review[];
  ratingSummary: RatingSummary;
}) {
  const { showToast } = usePristha();
  const [reviews, setReviews] = useState(initialReviews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sort, setSort] = useState<ReviewSort>("Most helpful");
  const [spoilerFreeOnly, setSpoilerFreeOnly] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [revealedSpoilers, setRevealedSpoilers] = useState<string[]>([]);

  const myReview = reviews.find((review) => review.isMine);
  const visibleReviews = useMemo(() => {
    return [...reviews]
      .filter((review) => !spoilerFreeOnly || !review.spoiler)
      .sort((left, right) => {
        if (sort === "Recent") return right.id.localeCompare(left.id);
        if (sort === "Highest") return right.rating - left.rating;
        if (sort === "Lowest") return left.rating - right.rating;
        return right.helpfulCount - left.helpfulCount;
      });
  }, [reviews, sort, spoilerFreeOnly]);

  function saveReview(review: Review) {
    setReviews((current) =>
      myReview
        ? current.map((item) =>
            item.id === myReview.id ? review : item,
          )
        : [review, ...current],
    );
    setDialogOpen(false);
    showToast(
      myReview ? "Your review was updated" : "Your review was published",
    );
  }

  return (
    <section
      className="book-reviews"
      id="reader-reviews"
      aria-labelledby="reader-reviews-title"
    >
      <div className="book-reviews-head">
        <div>
          <span className="eyebrow">Reader perspective</span>
          <h2 id="reader-reviews-title">Reader reviews</h2>
          <p>
            Book ratings reflect the complete reading experience and stay
            separate from chapter reactions.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          {myReview ? "Edit your review" : "Write a review"}
        </Button>
      </div>

      <div className="review-overview">
        <div className="review-average">
          <strong>{ratingSummary.average.toFixed(1)}</strong>
          <span aria-label={ratingSummary.average + " out of 5 stars"}>
            ★★★★★
          </span>
          <small>
            Based on {ratingSummary.count.toLocaleString()} reader ratings
          </small>
        </div>
        <div
          className="rating-distribution"
          aria-label="Rating distribution"
        >
          {[5, 4, 3, 2, 1].map((stars) => {
            const value =
              ratingSummary.distribution[
                stars as 1 | 2 | 3 | 4 | 5
              ];
            return (
              <div key={stars}>
                <span>{stars} ★</span>
                <i>
                  <b style={{ width: String(value) + "%" }} />
                </i>
                <small>{value}%</small>
              </div>
            );
          })}
        </div>
        <aside className="review-eligibility">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>You can review this book</strong>
            <small>
              You have read 38%—enough for a verified reader review.
            </small>
          </div>
        </aside>
      </div>

      <div className="review-controls">
        <label>
          Sort
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as ReviewSort)
            }
          >
            <option>Most helpful</option>
            <option>Recent</option>
            <option>Highest</option>
            <option>Lowest</option>
          </select>
        </label>
        <label className="spoiler-filter">
          <input
            type="checkbox"
            checked={spoilerFreeOnly}
            onChange={(event) =>
              setSpoilerFreeOnly(event.target.checked)
            }
          />
          Spoiler-free only
        </label>
        <span>{visibleReviews.length} reviews shown</span>
      </div>

      <div className="review-list">
        {visibleReviews.map((review) => {
          const helpful = helpfulReviews.includes(review.id);
          const revealed = revealedSpoilers.includes(review.id);
          return (
            <article key={review.id} className="review-card">
              <header>
                <span className="reviewer-avatar">
                  {review.readerInitial}
                </span>
                <div>
                  <strong lang="bn">{review.readerName}</strong>
                  <small>{review.dateLabel}</small>
                </div>
                {review.verified && <em>✓ Verified reader</em>}
              </header>
              <div
                className="review-card-rating"
                aria-label={review.rating + " out of 5 stars"}
              >
                <span>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                <strong lang="bn">{review.title}</strong>
                {review.spoiler && <em>Spoiler</em>}
              </div>
              {review.spoiler && !revealed ? (
                <button
                  className="spoiler-cover"
                  onClick={() =>
                    setRevealedSpoilers((current) => [
                      ...current,
                      review.id,
                    ])
                  }
                >
                  This review contains story details. Show review
                </button>
              ) : (
                <p lang="bn">{review.body}</p>
              )}
              <footer>
                <button
                  className={helpful ? "active" : undefined}
                  onClick={() =>
                    setHelpfulReviews((current) =>
                      helpful
                        ? current.filter((id) => id !== review.id)
                        : [...current, review.id],
                    )
                  }
                  aria-pressed={helpful}
                >
                  {helpful ? "Helpful" : "Was this helpful?"} ·{" "}
                  {review.helpfulCount + (helpful ? 1 : 0)}
                </button>
                {!review.isMine && (
                  <button
                    onClick={() =>
                      showToast("Review reported for moderation")
                    }
                  >
                    Report
                  </button>
                )}
              </footer>
            </article>
          );
        })}
      </div>

      <Modal
        open={dialogOpen}
        title={myReview ? "Edit your review" : "Write a reader review"}
        description="One review per reader. You can return and edit it whenever your opinion changes."
        eyebrow="Reader review"
        onClose={() => setDialogOpen(false)}
      >
        <ReviewComposer
          bookId={bookId}
          existingReview={myReview}
          onCancel={() => setDialogOpen(false)}
          onSave={saveReview}
        />
      </Modal>
    </section>
  );
}

function ReviewComposer({
  bookId,
  existingReview,
  onCancel,
  onSave,
}: {
  bookId: string;
  existingReview?: Review;
  onCancel: () => void;
  onSave: (review: Review) => void;
}) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [title, setTitle] = useState(existingReview?.title ?? "");
  const [body, setBody] = useState(existingReview?.body ?? "");
  const [spoiler, setSpoiler] = useState(
    Boolean(existingReview?.spoiler),
  );

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating || !body.trim()) return;
    onSave({
      id: existingReview?.id ?? "review-mine-" + Date.now(),
      bookId,
      readerName: "রুমানা কবির",
      readerInitial: "রু",
      rating,
      title: title.trim() || "আমার পাঠ-অভিজ্ঞতা",
      body: body.trim(),
      dateLabel: "এইমাত্র",
      helpfulCount: existingReview?.helpfulCount ?? 0,
      verified: true,
      spoiler,
      isMine: true,
    });
  }

  return (
    <form className="review-form" onSubmit={submit}>
      <div className="review-form-eligibility">
        <span>✓</span>
        <p>
          <strong>Verified reader</strong>
          <small>
            Your reading progress will appear with this review.
          </small>
        </p>
      </div>
      <fieldset>
        <legend>বইটি কেমন লেগেছে?</legend>
        <div
          className="review-star-picker"
          role="radiogroup"
          aria-label="Book rating"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              role="radio"
              aria-checked={rating === star}
              className={rating >= star ? "active" : undefined}
              key={star}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        Review title <span>Optional</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="A short headline"
        />
      </label>
      <label>
        Your review
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="What stayed with you after reading?"
          rows={5}
          required
        />
      </label>
      <label className="review-spoiler-check">
        <input
          type="checkbox"
          checked={spoiler}
          onChange={(event) => setSpoiler(event.target.checked)}
        />
        This review contains spoilers
      </label>
      <div className="dialog-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!rating || !body.trim()}
        >
          {existingReview ? "Update review" : "Publish review"}
        </Button>
      </div>
    </form>
  );
}
