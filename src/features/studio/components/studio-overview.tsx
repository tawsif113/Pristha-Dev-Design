"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Modal } from "@/src/components/ui/modal";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import { studioFeedback } from "@/src/mocks/studio";
import type { StudioBook } from "@/src/types/domain";

type StudioDialog = "resume" | "new-book" | null;

export function StudioOverview() {
  const router = useRouter();
  const {
    studioBooks,
    activeDraft,
    selectDraft,
    createStudioBook,
  } = usePristha();
  const [dialog, setDialog] = useState<StudioDialog>(null);
  const [selectedBookId, setSelectedBookId] = useState(
    activeDraft.bookId,
  );
  const [selectedChapterId, setSelectedChapterId] = useState(
    activeDraft.chapterId,
  );
  const [feedbackBookId, setFeedbackBookId] = useState("chithi");

  const chapters = useMemo(
    () =>
      studioBooks.flatMap((book) =>
        book.chapters.map((chapter) => ({ book, chapter })),
      ),
    [studioBooks],
  );
  const totalWords = chapters.reduce(
    (sum, item) => sum + item.chapter.words,
    0,
  );
  const selectedBook =
    studioBooks.find((book) => book.id === selectedBookId) ??
    studioBooks[0];
  const selectedChapter =
    selectedBook?.chapters.find(
      (chapter) => chapter.id === selectedChapterId,
    ) ?? selectedBook?.chapters.at(-1);
  const feedbackBook =
    studioBooks.find((book) => book.id === feedbackBookId) ??
    studioBooks[0];
  const feedback = feedbackBook
    ? studioFeedback[feedbackBook.id]
    : undefined;
  const recentChapters = chapters.slice(-4).reverse();

  function openResume(
    bookId = activeDraft.bookId,
    chapterId = activeDraft.chapterId,
  ) {
    const book =
      studioBooks.find((item) => item.id === bookId) ??
      studioBooks[0];
    setSelectedBookId(book?.id ?? "");
    setSelectedChapterId(
      book?.chapters.some((chapter) => chapter.id === chapterId)
        ? chapterId
        : book?.chapters.at(-1)?.id ?? "",
    );
    setDialog("resume");
  }

  return (
    <div className="studio-page page-enter">
      <section className="studio-hero">
        <div className="hero-greeting">
          <span className="eyebrow">Writer Studio</span>
          <h1 lang="bn">শুভ সকাল, রুমানা</h1>
          <p lang="bn">আজ আপনার গল্প কোথায় যাবে?</p>
          <div className="hero-actions">
            <Button onClick={() => openResume()}>
              Continue writing <Icon name="arrow" size={18} />
            </Button>
            <button
              className="text-action"
              onClick={() => setDialog("new-book")}
            >
              New book
              <span className="circled-plus">
                <Icon name="plus" size={17} />
              </span>
            </button>
          </div>
        </div>

        <WritingStreak />
      </section>

      <section className="metric-strip" aria-label="Writing overview">
        <div>
          <strong>{(totalWords / 1000).toFixed(1)}k</strong>
          <span>Total words</span>
        </div>
        <div>
          <strong>{chapters.length}</strong>
          <span>Chapters</span>
        </div>
        <div>
          <strong>{studioBooks.length}</strong>
          <span>Books</span>
        </div>
        <div>
          <strong>73%</strong>
          <span>Weekly goal</span>
        </div>
      </section>

      <section className="studio-grid">
        <div className="chapters-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Latest work</span>
              <h2>Recent chapters</h2>
            </div>
            <Link href={routes.studioBooks}>View all</Link>
          </div>
          <div className="chapter-list">
            {recentChapters.map(({ book, chapter }) => (
              <Link
                key={chapter.id}
                href={routes.editor(book.id, chapter.id)}
                onClick={() =>
                  selectDraft({
                    bookId: book.id,
                    chapterId: chapter.id,
                  })
                }
              >
                <span className="chapter-number">{chapter.number}</span>
                <span className="chapter-copy">
                  <strong lang="bn">{chapter.title}</strong>
                  <small>
                    {book.title} <i>·</i> {chapter.meta}
                  </small>
                </span>
                <span className="chapter-words">
                  {chapter.words.toLocaleString()} words
                </span>
                <Icon name="arrow" size={23} />
              </Link>
            ))}
          </div>
        </div>

        <aside className="focus-panel">
          <span className="eyebrow">Today’s focus</span>
          <h2>
            650 <span>/ 900 words</span>
          </h2>
          <div className="focus-progress">
            <span />
          </div>
          <p>Write the next scene before revising.</p>
          <div className="focus-note">
            <small>Current manuscript</small>
            <strong lang="bn">
              {selectedBook?.title} — Chapter {selectedChapter?.number}
            </strong>
            {selectedBook && selectedChapter && (
              <Link
                href={routes.editor(
                  selectedBook.id,
                  selectedChapter.id,
                )}
              >
                Open manuscript <Icon name="arrow" size={16} />
              </Link>
            )}
          </div>
        </aside>
      </section>

      {feedbackBook && feedback && (
        <section
          className="studio-feedback"
          aria-labelledby="studio-feedback-title"
        >
          <div className="studio-feedback-head">
            <div>
              <span className="eyebrow">Reader feedback</span>
              <h2 id="studio-feedback-title">
                What readers are feeling
              </h2>
              <p>
                Private, aggregated signals for your craft—never a list
                of individual readers.
              </p>
            </div>
            <Link href={routes.studioAudience}>
              View feedback report <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div
            className="feedback-book-tabs"
            role="tablist"
            aria-label="Choose a manuscript"
          >
            {studioBooks.slice(0, 3).map((book) => (
              <button
                role="tab"
                aria-selected={feedbackBook.id === book.id}
                className={
                  feedbackBook.id === book.id ? "active" : undefined
                }
                key={book.id}
                onClick={() => setFeedbackBookId(book.id)}
              >
                {book.title}
              </button>
            ))}
          </div>

          <div className="studio-feedback-grid">
            <div className="feedback-score">
              <small>Book rating</small>
              <strong>{feedback.rating}</strong>
              <span
                aria-label={feedback.rating + " out of 5 stars"}
              >
                ★★★★★
              </span>
              <p>{feedback.ratings} verified reader ratings</p>
            </div>
            <div className="feedback-reactions">
              <small>Most selected reactions</small>
              {feedback.reactions.map((reaction) => (
                <div key={reaction.label}>
                  <span lang="bn">{reaction.label}</span>
                  <i>
                    <b
                      style={{
                        width: String(reaction.value) + "%",
                      }}
                    />
                  </i>
                  <em>{reaction.value}%</em>
                </div>
              ))}
            </div>
            <div className="feedback-chapter">
              <small>Strongest recent chapter</small>
              <strong>{feedback.chapter}</strong>
              <p>
                <span>★ {feedback.chapterRating}</span>
                {feedback.chapterReactions}
              </p>
              <blockquote>{feedback.theme}</blockquote>
            </div>
          </div>
        </section>
      )}

      <section className="book-row">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Your shelf</span>
            <h2>Books in progress</h2>
          </div>
          <Link href={routes.studioBooks}>Manage books</Link>
        </div>
        <div className="book-list">
          {studioBooks.map((book) => (
            <Link href={routes.studioBook(book.id)} key={book.id}>
              <StudioCover book={book} />
              <span>
                <strong lang="bn">{book.title}</strong>
                <small>
                  {book.chapters.length} chapters · {book.progress}%
                  complete
                </small>
              </span>
              <i>
                <span
                  style={{ width: String(book.progress) + "%" }}
                />
              </i>
            </Link>
          ))}
          <button
            className="new-book"
            onClick={() => setDialog("new-book")}
          >
            <span>
              <Icon name="plus" size={20} />
            </span>
            <strong>Start a new book</strong>
            <small>Build a serial or complete manuscript</small>
          </button>
        </div>
      </section>

      <ContinueWritingDialog
        open={dialog === "resume"}
        books={studioBooks}
        selectedBook={selectedBook}
        selectedChapterId={selectedChapter?.id}
        onSelectBook={(book) => {
          setSelectedBookId(book.id);
          setSelectedChapterId(book.chapters.at(-1)?.id ?? "");
        }}
        onSelectChapter={setSelectedChapterId}
        onClose={() => setDialog(null)}
      />

      <NewBookDialog
        open={dialog === "new-book"}
        onClose={() => setDialog(null)}
        onCreate={(input) => {
          const selection = createStudioBook(input);
          setDialog(null);
          router.push(
            routes.editor(selection.bookId, selection.chapterId),
          );
        }}
      />
    </div>
  );
}

function WritingStreak() {
  return (
    <aside className="streak" aria-labelledby="writing-streak-title">
      <div className="streak-card-head">
        <div>
          <span id="writing-streak-title" lang="bn">
            লেখার ধারাবাহিকতা
          </span>
          <i aria-hidden="true" />
        </div>
        <time dateTime="2026-08" lang="bn">
          আগস্ট ২০২৬
        </time>
      </div>
      <div className="streak-count" aria-label="12 Days Streak">
        <strong>12</strong>
        <span>Days Streak</span>
      </div>
      <div
        className="week-line"
        role="progressbar"
        aria-label="সাত দিনের লেখার অগ্রগতি"
        aria-valuemin={0}
        aria-valuemax={7}
        aria-valuenow={7}
      >
        {["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", "রবি"].map(
          (day, index) => (
            <span key={day}>
              <small lang="bn">{day}</small>
              <i
                className={index === 6 ? "today" : undefined}
                aria-hidden="true"
              />
            </span>
          ),
        )}
      </div>
      <div className="streak-summary">
        <p lang="bn">
          এই সপ্তাহে <span aria-hidden="true">·</span> ৪,৮৬০ শব্দ
        </p>
        <time dateTime="2026-07-27/2026-08-02" lang="bn">
          ২৭ জুলাই–২ আগস্ট, ২০২৬
        </time>
      </div>
    </aside>
  );
}

function StudioCover({ book }: { book: StudioBook }) {
  return (
    <span className={"book-cover " + book.tone}>
      <b lang="bn">{book.shortTitle}</b>
      <small>{book.romanTitle}</small>
    </span>
  );
}

function ContinueWritingDialog({
  open,
  books,
  selectedBook,
  selectedChapterId,
  onSelectBook,
  onSelectChapter,
  onClose,
}: {
  open: boolean;
  books: StudioBook[];
  selectedBook?: StudioBook;
  selectedChapterId?: string;
  onSelectBook: (book: StudioBook) => void;
  onSelectChapter: (chapterId: string) => void;
  onClose: () => void;
}) {
  const { selectDraft } = usePristha();
  return (
    <Modal
      open={open}
      eyebrow="Continue writing"
      title="Choose where to return"
      description="Select one of your books, then the exact chapter you want to continue."
      onClose={onClose}
      wide
    >
      {selectedBook && (
        <>
          <div className="resume-picker">
            <nav aria-label="Books in progress">
              <span className="picker-label">
                {books.length} books in progress
              </span>
              {books.map((book) => (
                <button
                  key={book.id}
                  className={
                    selectedBook.id === book.id ? "active" : undefined
                  }
                  onClick={() => onSelectBook(book)}
                >
                  <span className={"book-cover mini " + book.tone}>
                    <b>{book.shortTitle}</b>
                    <small>{book.romanTitle}</small>
                  </span>
                  <span>
                    <strong>{book.title}</strong>
                    <small>
                      {book.chapters.length} chapters · {book.progress}%
                    </small>
                  </span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </nav>
            <section className="resume-chapter-picker">
              <div>
                <span className="picker-label">Choose a chapter</span>
                <strong>{selectedBook.title}</strong>
                <small>{selectedBook.format}</small>
              </div>
              <div className="resume-chapter-list">
                {[...selectedBook.chapters].reverse().map((chapter) => (
                  <button
                    key={chapter.id}
                    className={
                      selectedChapterId === chapter.id
                        ? "active"
                        : undefined
                    }
                    onClick={() => onSelectChapter(chapter.id)}
                  >
                    <span>{chapter.number}</span>
                    <span>
                      <strong>{chapter.title}</strong>
                      <small>
                        {chapter.meta} · {chapter.words.toLocaleString()}{" "}
                        words
                      </small>
                    </span>
                    <em>{chapter.status}</em>
                  </button>
                ))}
              </div>
            </section>
          </div>
          <div className="dialog-actions">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            {selectedChapterId && (
              <Link
                className="primary-button"
                href={routes.editor(
                  selectedBook.id,
                  selectedChapterId,
                )}
                onClick={() =>
                  selectDraft({
                    bookId: selectedBook.id,
                    chapterId: selectedChapterId,
                  })
                }
              >
                Continue this chapter <Icon name="arrow" size={17} />
              </Link>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

function NewBookDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: {
    title: string;
    format: string;
    language: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("Novel manuscript");
  const [language, setLanguage] = useState("Bengali");

  return (
    <Modal
      open={open}
      eyebrow="New manuscript"
      title="Start with a clear foundation"
      description="You can change these choices later. Pristha will prepare the manuscript and first chapter."
      onClose={onClose}
    >
      <form
        className="new-book-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          onCreate({ title: title.trim(), format, language });
          setTitle("");
        }}
      >
        <label>
          Book title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Untitled book"
            required
          />
        </label>
        <div>
          <label>
            Format
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
            >
              <option>Novel manuscript</option>
              <option>Web serial</option>
              <option>Short story cycle</option>
              <option>Novella</option>
              <option>Poetry collection</option>
            </select>
          </label>
          <label>
            Writing language
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option>Bengali</option>
              <option>English</option>
              <option>Bengali + English</option>
            </select>
          </label>
        </div>
        <p>
          <span>✓</span> Industry-standard chapter structure, autosave,
          version history, and manuscript formatting will be ready from
          the first page.
        </p>
        <div className="dialog-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            Create book <Icon name="arrow" size={17} />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
