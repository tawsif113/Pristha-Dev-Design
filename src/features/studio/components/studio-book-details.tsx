"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import type { StudioBook } from "@/src/types/domain";

export function StudioBookDetails({ book }: { book: StudioBook }) {
  const router = useRouter();
  const { addStudioChapter, selectDraft } = usePristha();

  function openChapter(chapterId: string) {
    selectDraft({ bookId: book.id, chapterId });
    router.push(routes.editor(book.id, chapterId));
  }

  function addChapter() {
    const selection = addStudioChapter(book.id);
    if (!selection) return;
    router.push(routes.editor(selection.bookId, selection.chapterId));
  }

  return (
    <div className="product-page page-enter">
      <Link className="book-back-link" href={routes.studioBooks}>
        <span aria-hidden="true">←</span> All manuscripts
      </Link>
      <section className="studio-book-detail-hero">
        <span className={"book-cover overview " + book.tone}>
          <b>{book.shortTitle}</b>
          <small>{book.romanTitle}</small>
        </span>
        <div>
          <span className="eyebrow">Manuscript overview</span>
          <h1>{book.title}</h1>
          <p>{book.synopsis}</p>
          <dl>
            <div>
              <dt>{book.format}</dt>
              <dd>Format</dd>
            </div>
            <div>
              <dt>{book.chapters.length}</dt>
              <dd>Chapters</dd>
            </div>
            <div>
              <dt>{book.progress}%</dt>
              <dd>Progress</dd>
            </div>
          </dl>
        </div>
        <button className="primary-button" onClick={addChapter}>
          <Icon name="plus" size={16} /> Add chapter
        </button>
      </section>
      <section className="studio-book-chapters">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Structure</span>
            <h2>Chapters</h2>
          </div>
        </div>
        <div className="chapter-list">
          {book.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => openChapter(chapter.id)}
            >
              <span className="chapter-number">{chapter.number}</span>
              <span className="chapter-copy">
                <strong>{chapter.title}</strong>
                <small>{chapter.meta}</small>
              </span>
              <span className="chapter-words">
                {chapter.words.toLocaleString()} words
              </span>
              <em>{chapter.status}</em>
              <Icon name="arrow" size={20} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
