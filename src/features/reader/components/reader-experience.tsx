"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { routes } from "@/src/config/routes";
import type { BookDetails, Chapter } from "@/src/types/domain";

type ReaderTheme = "paper" | "light" | "night";
type ReaderFont = "serif" | "sans";

export function ReaderExperience({
  book,
  chapter,
  chapters,
}: {
  book: BookDetails;
  chapter: Chapter;
  chapters: Chapter[];
}) {
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState<ReaderFont>("serif");
  const [theme, setTheme] = useState<ReaderTheme>("paper");
  const [progress, setProgress] = useState(38);
  const [chapterRating, setChapterRating] = useState(0);
  const [chapterReactions, setChapterReactions] = useState<string[]>([]);
  const [chapterNoteOpen, setChapterNoteOpen] = useState(false);
  const [chapterNote, setChapterNote] = useState("");
  const [chapterFeedbackSent, setChapterFeedbackSent] = useState(false);

  const nextChapter = useMemo(() => {
    const index = chapters.findIndex((item) => item.id === chapter.id);
    return index >= 0 ? chapters[index + 1] : undefined;
  }, [chapter.id, chapters]);

  useEffect(() => {
    function updateProgress() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const chapterProgress = window.scrollY / scrollable;
      setProgress(
        Math.min(100, Math.max(1, Math.round(chapterProgress * 100))),
      );
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  function toggleChapterReaction(reaction: string) {
    setChapterReactions((current) =>
      current.includes(reaction)
        ? current.filter((item) => item !== reaction)
        : [...current, reaction],
    );
  }

  const paragraphs = chapter.content
    .split(/\n\n+/u)
    .filter(Boolean);

  return (
    <div className={"reader-canvas reader-theme-" + theme}>
      <header className="reader-toolbar">
        <Link
          className="reader-back"
          href={routes.book(book.slug)}
          aria-label="Back to book details"
        >
          <span aria-hidden="true">←</span>
          <span>Book details</span>
        </Link>
        <div
          className="reader-control-group text-scale"
          aria-label="Text size"
        >
          <button
            onClick={() =>
              setFontSize((size) => Math.max(17, size - 1))
            }
            aria-label="Decrease text size"
          >
            A−
          </button>
          <button
            onClick={() =>
              setFontSize((size) => Math.min(25, size + 1))
            }
            aria-label="Increase text size"
          >
            A+
          </button>
        </div>
        <div
          className="reader-control-group font-choice"
          aria-label="Font family"
        >
          <button
            className={fontStyle === "serif" ? "active" : undefined}
            onClick={() => setFontStyle("serif")}
            aria-pressed={fontStyle === "serif"}
          >
            Serif
          </button>
          <button
            className={fontStyle === "sans" ? "active" : undefined}
            onClick={() => setFontStyle("sans")}
            aria-pressed={fontStyle === "sans"}
          >
            Sans
          </button>
        </div>
        <div
          className="reader-control-group theme-choice"
          aria-label="Reading theme"
        >
          {(["light", "paper", "night"] as const).map((item) => (
            <button
              key={item}
              className={
                "theme-dot " +
                item +
                (theme === item ? " active" : "")
              }
              onClick={() => setTheme(item)}
              aria-label={item + " reading theme"}
              aria-pressed={theme === item}
            />
          ))}
        </div>
        <button
          className="reader-more"
          aria-label="More reading options"
        >
          •••
        </button>
      </header>

      <main
        className={"reader-manuscript " + fontStyle}
        style={{ fontSize: String(fontSize) + "px" }}
      >
        <header className="reader-chapter-head">
          <span>Part I · Chapter {Number(chapter.number)}</span>
          <h1 lang="bn">{chapter.title}</h1>
          <i />
        </header>
        <article lang="bn">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {paragraphs.length < 4 && (
            <>
              <p>
                ডাকঘরের ভেতরটা বাইরে থেকে যতটা ছোট মনে হয়েছিল, আসলে
                ততটা নয়। অন্ধকারে সারি সারি কাঠের তাক দূর পর্যন্ত চলে
                গেছে—প্রতিটি তাকে ধুলো জমা খাম, হলদে পোস্টকার্ড আর
                নামহীন পার্সেল।
              </p>
              <p>
                “কিছু চিঠি পৌঁছাতে দেরি হয়,” বৃদ্ধ পোস্টমাস্টার বললেন।
                “আর কিছু চিঠি ঠিক সময়ে পৌঁছালে মানুষ প্রস্তুত থাকে না।
                তাই তারা এখানে অপেক্ষা করে।”
              </p>
              <p>
                খামের ভাঁজে আঙুল রাখতেই বাইরে বৃষ্টি শুরু হলো। টিনের
                চালে শব্দ বাড়তে লাগল, যেন শহরের সব বন্ধ দরজা একসঙ্গে
                কথা বলতে চাইছে।
              </p>
              <p>
                বৃদ্ধ লোকটি বাতি জ্বালিয়ে তার দিকে ঠেলে দিলেন। “দেরি
                হয়েছে,” তিনি শান্তভাবে বললেন, “কিন্তু শেষ হয়ে যায়নি।”
              </p>
            </>
          )}
        </article>

        <section
          className="chapter-reaction-panel"
          aria-labelledby="chapter-reaction-title"
        >
          {chapterFeedbackSent ? (
            <div className="chapter-feedback-thanks">
              <span aria-hidden="true">✓</span>
              <div>
                <h2 id="chapter-reaction-title" lang="bn">
                  আপনার প্রতিক্রিয়া লেখকের কাছে পৌঁছেছে
                </h2>
                <p lang="bn">
                  অন্য পাঠকের পরিচয় নয়—লেখক শুধু সামগ্রিক
                  পাঠক-প্রতিক্রিয়া দেখবেন।
                </p>
              </div>
              <button onClick={() => setChapterFeedbackSent(false)}>
                Edit
              </button>
            </div>
          ) : (
            <>
              <header>
                <span>Chapter reaction</span>
                <h2 id="chapter-reaction-title" lang="bn">
                  এই অধ্যায়টি কেমন লেগেছে?
                </h2>
                <p lang="bn">
                  একটি দ্রুত প্রতিক্রিয়া দিন—লিখে জানানো ঐচ্ছিক।
                </p>
              </header>
              <div
                className="chapter-star-picker"
                role="radiogroup"
                aria-label="Chapter rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={chapterRating === star}
                    className={
                      chapterRating >= star ? "active" : undefined
                    }
                    key={star}
                    onClick={() => setChapterRating(star)}
                    aria-label={
                      String(star) + (star > 1 ? " stars" : " star")
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
              <div
                className="chapter-reaction-chips"
                aria-label="Chapter reactions"
              >
                {["মুগ্ধকর", "আবেগপূর্ণ", "ধীরগতির", "চমকপ্রদ"].map(
                  (reaction) => (
                    <button
                      className={
                        chapterReactions.includes(reaction)
                          ? "active"
                          : undefined
                      }
                      key={reaction}
                      onClick={() => toggleChapterReaction(reaction)}
                      aria-pressed={chapterReactions.includes(reaction)}
                      lang="bn"
                    >
                      {reaction}
                    </button>
                  ),
                )}
              </div>
              {chapterNoteOpen ? (
                <label className="chapter-note-field">
                  <span lang="bn">
                    ছোট একটি মন্তব্য <small>ঐচ্ছিক</small>
                  </span>
                  <textarea
                    rows={3}
                    value={chapterNote}
                    onChange={(event) =>
                      setChapterNote(event.target.value)
                    }
                    placeholder="কোন মুহূর্তটি আপনার মনে রয়ে গেল?"
                    lang="bn"
                  />
                </label>
              ) : (
                <button
                  className="chapter-note-toggle"
                  onClick={() => setChapterNoteOpen(true)}
                  lang="bn"
                >
                  ছোট একটি মন্তব্য লিখুন
                </button>
              )}
              <footer>
                <small>
                  Chapter ratings do not change the book’s overall
                  rating.
                </small>
                <button
                  disabled={!chapterRating}
                  onClick={() => setChapterFeedbackSent(true)}
                >
                  প্রতিক্রিয়া পাঠান
                </button>
              </footer>
            </>
          )}
        </section>

        <footer className="reader-next">
          <span>End of chapter {Number(chapter.number)}</span>
          {nextChapter ? (
            <Link href={routes.reader(book.id, nextChapter.id)}>
              Next chapter <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href={routes.book(book.slug)}>Back to book</Link>
          )}
        </footer>
      </main>

      <footer className="reader-progress-dock">
        <span>Chapter {Number(chapter.number)}</span>
        <i>
          <b style={{ width: String(progress) + "%" }} />
        </i>
        <strong>{progress}%</strong>
      </footer>
    </div>
  );
}
