import Link from "next/link";
import { routes } from "@/src/config/routes";
import type { Chapter } from "@/src/types/domain";

export function ChapterList({
  bookId,
  chapters,
  progress = 0,
}: {
  bookId: string;
  chapters: Chapter[];
  progress?: number;
}) {
  return (
    <div className="chapter-index-list">
      {chapters.map((chapter, index) => {
        const current = progress > 0 && index === 1;
        return (
          <Link
            key={chapter.id}
            className={current ? "is-current" : undefined}
            href={routes.reader(bookId, chapter.id)}
          >
            <span className="index-number">{chapter.number}</span>
            <span className="index-copy">
              <strong lang="bn">{chapter.title}</strong>
              <small>
                {Math.max(4, Math.round(chapter.wordCount / 220))} min read
                {current ? " · " + progress + "% complete" : ""}
              </small>
              {index === 1 && (
                <em className="chapter-feedback-signal">
                  ★ 4.9 · 84 reactions
                </em>
              )}
            </span>
            <span className="access-label free">
              {current ? "Continue" : "Free"}
            </span>
            <span className="chapter-row-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
