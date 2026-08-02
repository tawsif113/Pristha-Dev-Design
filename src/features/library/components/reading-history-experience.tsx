import Link from "next/link";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";
import type { LibraryItem } from "@/src/types/domain";
import { LibraryList } from "./library-list";

export function ReadingHistoryExperience({
  items,
}: {
  items: LibraryItem[];
}) {
  const recent = items.filter((item) => item.progress);
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Reading history"
        title="Recent pages"
        subtitle="Return to the stories that have shaped your evenings."
        action={<Link href={routes.bookmarks}>View bookmarks</Link>}
      />
      <LibraryList items={recent} />
    </div>
  );
}
