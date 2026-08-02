import Link from "next/link";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";

const bookmarks = [
  {
    id: "bookmark-1",
    bookId: "chithi",
    chapterId: "chithi-04",
    book: "চিঠি",
    chapter: "অধ্যায় চার — দেরি",
    excerpt:
      "কিছু চিঠি ঠিক সময়ে পৌঁছালে মানুষ প্রস্তুত থাকে না। তাই তারা এখানে অপেক্ষা করে।",
  },
  {
    id: "bookmark-2",
    bookId: "last-train",
    chapterId: "last-train-05",
    book: "শেষ ট্রেন",
    chapter: "যে শহর মানচিত্রে নেই",
    excerpt:
      "প্ল্যাটফর্মের একমাত্র বাতিটি নিভে যাওয়ার আগে মীরা নামহীন শহরের প্রথম সাইনবোর্ডটি দেখল।",
  },
];

export function BookmarksExperience() {
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Saved passages"
        title="Bookmarks"
        subtitle="The lines you wanted to carry beyond the chapter."
      />
      <div className="bookmark-list">
        {bookmarks.map((bookmark) => (
          <article key={bookmark.id}>
            <span className="eyebrow">{bookmark.book}</span>
            <h2>{bookmark.chapter}</h2>
            <blockquote lang="bn">“{bookmark.excerpt}”</blockquote>
            <Link
              href={routes.reader(
                bookmark.bookId,
                bookmark.chapterId,
              )}
            >
              Return to chapter
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
