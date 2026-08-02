import Link from "next/link";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import { BookCover } from "@/src/features/books/components/book-cover";
import type { BookSummary, LibraryItem } from "@/src/types/domain";
import { HomeLibrary } from "./home-library";
import { cn } from "@/src/lib/cn";

export function HomeExperience({
  featuredBooks,
  libraryItems,
  activeTab,
}: {
  featuredBooks: BookSummary[];
  libraryItems: LibraryItem[];
  activeTab: "tonight" | "library";
}) {
  return (
    <div className="product-page page-enter">
      <header className="home-page-header">
        <span className="eyebrow">Good evening, Rumana</span>
        <h1 className="sr-only">Home</h1>
        <div className="home-subtabs" role="tablist" aria-label="Home sections">
          <Link
            id="home-tab-tonight"
            role="tab"
            aria-selected={activeTab === "tonight"}
            aria-controls="home-panel-tonight"
            className={cn(activeTab === "tonight" && "active")}
            href={routes.home}
          >
            Tonight on your page
          </Link>
          <Link
            id="home-tab-library"
            role="tab"
            aria-selected={activeTab === "library"}
            aria-controls="home-panel-library"
            className={cn(activeTab === "library" && "active")}
            href="/?tab=library"
          >
            Your Library
          </Link>
        </div>
      </header>

      {activeTab === "tonight" ? (
        <div
          id="home-panel-tonight"
          role="tabpanel"
          aria-labelledby="home-tab-tonight"
          className="home-tab-panel"
        >
          <section className="reader-feature">
            <div className="resume-reading">
              <BookCover
                label="চি"
                title="CHITHI"
                tone="saffron"
                size="large"
              />
              <div>
                <span className="eyebrow">Continue reading</span>
                <h2 lang="bn">অধ্যায় চার — দেরি</h2>
                <p>
                  You stopped three paragraphs in. Your watermark and
                  place are safely kept.
                </p>
                <div
                  className="reading-progress"
                  role="progressbar"
                  aria-valuenow={38}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="38 percent read"
                >
                  <span />
                </div>
                <small>38% · page 6 of 16 · 4 min left</small>
              </div>
              <Link
                className="primary-button"
                href={routes.reader("chithi", "chithi-04")}
              >
                Resume <Icon name="arrow" size={18} />
              </Link>
            </div>
          </section>

          <section className="open-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Fresh for you</span>
                <h2>টাটকা পাতা</h2>
              </div>
              <Link href={routes.discover}>Explore stories</Link>
            </div>
            <div className="cover-grid">
              {featuredBooks.slice(0, 4).map((book) => (
                <Link href={routes.book(book.slug)} key={book.id}>
                  <BookCover
                    label={book.coverLabel}
                    tone={book.tone}
                  />
                  <span>
                    <strong lang="bn">{book.title}</strong>
                    <small lang="bn">{book.authorName}</small>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="feed-line">
            <span className="profile-portrait">ন</span>
            <div>
              <strong lang="bn">
                নুসরাত আহমেদ নতুন একটি অধ্যায় প্রকাশ করেছেন
              </strong>
              <small>চিঠি · Chapter 08 · 22 minutes ago</small>
            </div>
            <Link href={routes.reader("chithi", "chithi-08")}>
              Read chapter <Icon name="arrow" size={16} />
            </Link>
          </section>
        </div>
      ) : (
        <div
          id="home-panel-library"
          role="tabpanel"
          aria-labelledby="home-tab-library"
          className="home-tab-panel"
        >
          <HomeLibrary items={libraryItems} />
        </div>
      )}
    </div>
  );
}
