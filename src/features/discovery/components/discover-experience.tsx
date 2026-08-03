import Link from "next/link";
import { Icon } from "@/src/components/ui/icon";
import { EmptyState } from "@/src/components/feedback/empty-state";
import { routes } from "@/src/config/routes";
import { BookCard } from "@/src/features/books/components/book-card";
import { BookGrid } from "@/src/features/books/components/book-grid";
import { StandalonePostCard } from "@/src/features/posts/components/standalone-post-card";
import { withSearchParams } from "@/src/lib/search-params";
import type { BookSummary, StandalonePost } from "@/src/types/domain";
import { cn } from "@/src/lib/cn";

const formats = [
  "All stories",
  "Complete",
  "Ongoing",
  "Short read",
  "Micro-thoughts",
];
const genres = [
  "All genres",
  "Literary fiction",
  "Romance",
  "Mystery",
  "Magical realism",
  "Speculative",
];

const shelves = [
  {
    id: "for-you",
    eyebrow: "Selected for you",
    title: "Because you enjoy quiet, literary stories",
    description:
      "Character-led books with intimate voices and a lingering sense of place.",
    bookIds: [
      "unknown-window",
      "chithi",
      "song-of-return",
      "house-in-clouds",
      "rain-at-noon",
      "borrowed-sky",
    ],
  },
  {
    id: "popular",
    eyebrow: "What readers love",
    title: "Popular across Pristha this week",
    description:
      "The stories readers are saving, finishing, and recommending right now.",
    bookIds: [
      "last-train",
      "chithi",
      "blue-door",
      "silent-map",
      "winter-veranda",
      "under-the-city",
    ],
  },
  {
    id: "fresh",
    eyebrow: "Fresh on the shelf",
    title: "New chapters and recent releases",
    description:
      "Recently published work from voices you may not have met yet.",
    bookIds: [
      "silent-map",
      "blue-door",
      "after-the-river",
      "rain-at-noon",
      "under-the-city",
      "borrowed-sky",
    ],
  },
];

export interface DiscoverQuery {
  q?: string;
  format?: string;
  genre?: string;
  shelf?: string;
  page?: number;
}

export function DiscoverExperience({
  allBooks,
  results,
  total,
  posts = [],
  query,
}: {
  allBooks: BookSummary[];
  results: BookSummary[];
  total: number;
  posts?: StandalonePost[];
  query: DiscoverQuery;
}) {
  const activeFormat = query.format ?? "All stories";
  const activeGenre = query.genre ?? "All genres";
  const activeShelf = shelves.find((shelf) => shelf.id === query.shelf);
  const displayedResults = activeShelf
    ? activeShelf.bookIds
        .map((id) => allBooks.find((book) => book.id === id))
        .filter((book): book is BookSummary => Boolean(book))
    : results;
  const displayedTotal = activeShelf ? displayedResults.length : total;
  const isDefault =
    !query.q &&
    !query.shelf &&
    activeFormat === "All stories" &&
    activeGenre === "All genres";

  return (
    <div className="product-page discover-page page-enter">
      <header className="discover-header">
        <div>
          <span className="eyebrow">Discover</span>
          <h1>Stories worth finding.</h1>
          <p>
            Browse thoughtful selections, current favourites, and new
            Bengali voices.
          </p>
        </div>
        {!isDefault && (
          <Link className="discover-back" href={routes.discover}>
            <span aria-hidden="true">←</span> All collections
          </Link>
        )}
      </header>

      <section
        className="discover-controls"
        aria-label="Find and filter books"
      >
        <form className="discover-search" action={routes.discover}>
          <Icon name="search" size={19} />
          <label className="sr-only" htmlFor="discover-search-input">
            Search books or authors
          </label>
          <input
            id="discover-search-input"
            type="search"
            name="q"
            defaultValue={query.q}
            placeholder="Search books, authors, or genres"
          />
          {activeFormat !== "All stories" && (
            <input type="hidden" name="format" value={activeFormat} />
          )}
          {activeGenre !== "All genres" && (
            <input type="hidden" name="genre" value={activeGenre} />
          )}
          <button type="submit">Search</button>
        </form>

        <div className="discover-filter-row">
          <div className="discover-formats">
            <span>Filter by</span>
            <div aria-label="Filter by story format">
              {formats.map((format) => (
                <Link
                  className={cn(activeFormat === format && "active")}
                  aria-current={
                    activeFormat === format ? "true" : undefined
                  }
                  href={withSearchParams(routes.discover, {
                    q: query.q,
                    format:
                      format === "All stories" ? undefined : format,
                    genre:
                      activeGenre === "All genres"
                        ? undefined
                        : activeGenre,
                  })}
                  key={format}
                >
                  {format}
                </Link>
              ))}
            </div>
          </div>
          <form
            className="discover-genre-select"
            action={routes.discover}
          >
            <label htmlFor="discover-genre">Genre</label>
            <select
              id="discover-genre"
              name="genre"
              defaultValue={
                activeGenre === "All genres" ? "" : activeGenre
              }
            >
              {genres.map((genre) => (
                <option
                  value={genre === "All genres" ? "" : genre}
                  key={genre}
                >
                  {genre}
                </option>
              ))}
            </select>
            {query.q && (
              <input type="hidden" name="q" value={query.q} />
            )}
            {activeFormat !== "All stories" && (
              <input type="hidden" name="format" value={activeFormat} />
            )}
            <button type="submit">Apply</button>
          </form>
        </div>
      </section>

      {isDefault ? (
        <div className="discover-shelves">
          {shelves.map((shelf) => {
            const shelfBooks = shelf.bookIds
              .map((id) => allBooks.find((book) => book.id === id))
              .filter((book): book is BookSummary => Boolean(book));
            return (
              <section
                className="discover-shelf"
                aria-labelledby={"discover-shelf-" + shelf.id}
                key={shelf.id}
              >
                <header className="discover-shelf-heading">
                  <div>
                    <span className="eyebrow">{shelf.eyebrow}</span>
                    <h2 id={"discover-shelf-" + shelf.id}>
                      {shelf.title}
                    </h2>
                    <p>{shelf.description}</p>
                  </div>
                  <div className="discover-shelf-actions">
                    <Link
                      className="discover-see-all"
                      href={withSearchParams(routes.discover, {
                        shelf: shelf.id,
                      })}
                    >
                      See all <Icon name="arrow" size={15} />
                    </Link>
                  </div>
                </header>
                <div className="discover-rail">
                  {shelfBooks.map((book, index) => (
                    <BookCard
                      book={book}
                      isNew={shelf.id === "fresh" && index < 2}
                      key={book.id}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {posts.length > 0 && (
            <section
              className="discover-shelf"
              aria-labelledby="discover-shelf-posts"
            >
              <header className="discover-shelf-heading">
                <div>
                  <span className="eyebrow">Micro-Thoughts & Short Stories</span>
                  <h2 id="discover-shelf-posts" lang="bn">
                    ক্ষুদ্রগল্প ও মুক্তচিন্তা
                  </h2>
                  <p>
                    স্বাধীন লেখকদের তাৎক্ষণিক ভাবনা ও অনুভূতি।
                  </p>
                </div>
              </header>
              <div className="standalone-posts-grid">
                {posts.slice(0, 3).map((post) => (
                  <StandalonePostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <section
          className="discover-results"
          aria-labelledby="discover-results-title"
        >
          <div className="discover-results-heading">
            <div>
              <span className="eyebrow">
                {query.q
                  ? "Search results"
                  : activeShelf?.eyebrow ?? "Filtered shelf"}
              </span>
              <h2 id="discover-results-title">
                {query.q
                  ? "Results for “" + query.q + "”"
                  : activeShelf?.title ??
                    (activeGenre !== "All genres"
                      ? activeGenre
                      : activeFormat)}
              </h2>
            </div>
            <span>
              {activeFormat === "Micro-thoughts"
                ? `${posts.length} pieces`
                : `${displayedTotal} ${displayedTotal === 1 ? "book" : "books"}`}
            </span>
          </div>

          {activeFormat === "Micro-thoughts" ? (
            posts.length > 0 ? (
              <div className="standalone-posts-grid">
                {posts.map((post) => (
                  <StandalonePostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                eyebrow="No posts found"
                title="No micro-thoughts match your criteria."
                description="Try clearing your search query to see all standalone pieces."
              />
            )
          ) : displayedResults.length > 0 ? (
            <BookGrid books={displayedResults} />
          ) : (
            <EmptyState
              eyebrow="No books found"
              title="Try a different title, format, or genre."
              description="Clear the active filters to return to every collection."
              action={
                <Link
                  className="secondary-button"
                  href={routes.discover}
                >
                  Show all collections
                </Link>
              }
            />
          )}
        </section>
      )}
    </div>
  );
}
