"use client";

import Link from "next/link";
import { EmptyState } from "@/src/components/feedback/empty-state";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import { EditorExperience } from "./editor-experience";

export function EditorRoute({
  bookId,
  chapterId,
  initialDraft,
}: {
  bookId: string;
  chapterId: string;
  initialDraft: string;
}) {
  const { studioBooks } = usePristha();
  const book = studioBooks.find((item) => item.id === bookId);
  const chapter = book?.chapters.find((item) => item.id === chapterId);
  if (!book || !chapter) {
    return (
      <div className="product-page">
        <EmptyState
          title="This draft is not available."
          description="Return to Studio and choose an existing manuscript and chapter."
          action={
            <Link className="primary-button" href={routes.studio}>
              Return to Studio
            </Link>
          }
        />
      </div>
    );
  }
  return (
    <EditorExperience
      key={book.id + ":" + chapter.id}
      book={book}
      chapter={chapter}
      initialDraft={initialDraft}
    />
  );
}
