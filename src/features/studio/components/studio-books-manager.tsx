"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "@/src/components/ui/icon";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";

export function StudioBooksManager() {
  const router = useRouter();
  const {
    studioBooks,
    addStudioChapter,
    selectDraft,
  } = usePristha();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();
  const books = useMemo(
    () =>
      studioBooks.filter((book) =>
        (book.title + " " + book.format)
          .toLocaleLowerCase()
          .includes(normalized),
      ),
    [normalized, studioBooks],
  );

  function addChapter(bookId: string) {
    const selection = addStudioChapter(bookId);
    if (!selection) return;
    router.push(routes.editor(selection.bookId, selection.chapterId));
  }

  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Writer Studio"
        title="Your manuscripts"
        subtitle="Every book, chapter, and draft in one calm workspace."
        action={
          <Link className="primary-button" href={routes.studio}>
            Studio overview
          </Link>
        }
      />
      <label className="studio-book-search">
        <Icon name="search" size={18} />
        <span className="sr-only">Search manuscripts</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search manuscripts"
        />
      </label>
      <div className="manage-book-list studio-books-page">
        {books.map((book) => (
          <article key={book.id}>
            <span className={"book-cover mini " + book.tone}>
              <b>{book.shortTitle}</b>
              <small>{book.romanTitle}</small>
            </span>
            <span>
              <strong>{book.title}</strong>
              <small>
                {book.format} · {book.chapters.length} chapters
              </small>
            </span>
            <span className="manage-progress">
              <i>
                <b style={{ width: String(book.progress) + "%" }} />
              </i>
              <small>{book.progress}%</small>
            </span>
            <Link href={routes.studioBook(book.id)}>Overview</Link>
            <button
              className="manage-continue"
              onClick={() => {
                const chapter = book.chapters.at(-1);
                if (!chapter) return;
                selectDraft({
                  bookId: book.id,
                  chapterId: chapter.id,
                });
                router.push(routes.editor(book.id, chapter.id));
              }}
            >
              Continue
            </button>
            <button
              className="manage-add-chapter"
              onClick={() => addChapter(book.id)}
              aria-label={"Add a chapter to " + book.title}
            >
              <Icon name="plus" size={16} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
