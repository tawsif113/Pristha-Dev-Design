"use client";

import Link from "next/link";
import { EmptyState } from "@/src/components/feedback/empty-state";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import { StudioBookDetails } from "./studio-book-details";

export function StudioBookRoute({ bookId }: { bookId: string }) {
  const { studioBooks } = usePristha();
  const book = studioBooks.find((item) => item.id === bookId);
  if (!book) {
    return (
      <div className="product-page">
        <EmptyState
          title="This manuscript could not be found."
          description="It may have been removed or belongs to another workspace."
          action={
            <Link className="primary-button" href={routes.studioBooks}>
              View manuscripts
            </Link>
          }
        />
      </div>
    );
  }
  return <StudioBookDetails book={book} />;
}
