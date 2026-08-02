"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import type {
  BookDetails,
  Chapter,
  RatingSummary,
  Review,
} from "@/src/types/domain";
import { ChapterList } from "./chapter-list";
import { ReviewSection } from "@/src/features/reviews/components/review-section";

export function BookDetailsExperience({
  book,
  chapters,
  initialReviews,
  ratingSummary,
}: {
  book: BookDetails;
  chapters: Chapter[];
  initialReviews: Review[];
  ratingSummary: RatingSummary;
}) {
  const [saved, setSaved] = useState(true);
  const { showToast } = usePristha();
  const firstChapter = chapters[0];
  const readerHref = firstChapter
    ? routes.reader(book.id, firstChapter.id)
    : routes.book(book.id);

  return (
    <div className="product-page book-detail-page page-enter">
      <Link className="book-back-link" href={routes.home}>
        <span aria-hidden="true">←</span> Back to Home
      </Link>

      <section className="book-detail-hero">
        <div
          className={
            "book-detail-cover " +
            (book.id === "last-train" ? "is-last-train" : "")
          }
          aria-label={"Cover of " + book.title}
        >
          <span className="cover-kicker">
            {book.format === "Ongoing"
              ? "A SERIAL NOVEL"
              : "A COMPLETE NOVEL"}
          </span>
          <span className="cover-orbit orbit-one" />
          <span className="cover-orbit orbit-two" />
          <strong lang="bn">{book.title}</strong>
          <small>{book.slug.toUpperCase().replaceAll("-", " ")}</small>
          <em lang="bn">{book.authorName}</em>
        </div>

        <div className="book-detail-copy">
          <h1 lang="bn">{book.title}</h1>
          <Link
            className="book-author"
            href={routes.profile(book.authorUsername)}
          >
            <span className="author-avatar">
              {book.authorName.slice(0, 1)}
            </span>
            <span>
              <small>Written by</small>
              <strong lang="bn">{book.authorName}</strong>
            </span>
          </Link>
          <a
            className="book-rating"
            aria-label={
              "Rated " +
              ratingSummary.average +
              " out of 5. Read reviews."
            }
            href="#reader-reviews"
          >
            <span aria-hidden="true">★</span>
            <strong>{ratingSummary.average.toFixed(1)}</strong>
            <small>
              {ratingSummary.count.toLocaleString()} reader ratings ·
              Read reviews
            </small>
          </a>
          <p className="book-synopsis" lang="bn">
            {book.summary}
          </p>
          <div className="book-badges" aria-label="Book tags">
            {book.tags.map((tag) => (
              <span key={tag.id}>{tag.label}</span>
            ))}
          </div>
          <div className="book-actions">
            <Link className="primary-button" href={readerHref}>
              Continue reading <Icon name="arrow" size={18} />
            </Link>
            <button
              className={
                "secondary-button save-book " +
                (saved ? "is-saved" : "")
              }
              onClick={() => {
                setSaved((current) => !current);
                showToast(
                  saved
                    ? "Removed from your library"
                    : "Saved to your library",
                );
              }}
              aria-pressed={saved}
            >
              <span aria-hidden="true">{saved ? "✓" : "+"}</span>
              {saved ? "In your library" : "Add to library"}
            </button>
          </div>
          <dl className="book-facts">
            <div>
              <dt>
                {book.chapterCount}
                {book.hasNewChapter && (
                  <span
                    className="new-chapter-star"
                    aria-label="A new chapter was added"
                    title="New chapter available"
                  >
                    ★
                  </span>
                )}
              </dt>
              <dd>Chapters</dd>
            </div>
            <div>
              <dt>2h 46m</dt>
              <dd>Total reading</dd>
            </div>
            <div>
              <dt>{book.publishedAt ?? "Weekly"}</dt>
              <dd>Publication</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="chapter-index"
        aria-labelledby="chapter-index-title"
      >
        <div className="chapter-index-head">
          <div>
            <span className="eyebrow">Inside this book</span>
            <h2 id="chapter-index-title">Chapter index</h2>
          </div>
          <div className="book-overall-progress">
            <span>
              <strong>38%</strong> read
            </span>
            <i>
              <b style={{ width: "38%" }} />
            </i>
          </div>
        </div>
        <ChapterList
          bookId={book.id}
          chapters={chapters}
          progress={38}
        />
      </section>

      <ReviewSection
        bookId={book.id}
        initialReviews={initialReviews}
        ratingSummary={ratingSummary}
      />
    </div>
  );
}
