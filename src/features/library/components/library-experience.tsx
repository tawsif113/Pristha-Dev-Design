import Link from "next/link";
import { EmptyState } from "@/src/components/feedback/empty-state";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";
import type { LibraryItem } from "@/src/types/domain";
import { LibraryList } from "./library-list";

export function LibraryExperience({
  items,
}: {
  items: LibraryItem[];
}) {
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Your Library"
        title="Saved stories"
        subtitle="Books you chose to keep, ready wherever you left them."
        action={<Link href={routes.discover}>Discover books</Link>}
      />
      {items.length > 0 ? (
        <section className="shelf-section">
          <div className="shelf-actions">
            <span>{items.length} saved books</span>
          </div>
          <LibraryList items={items} />
        </section>
      ) : (
        <EmptyState
          title="Your library is waiting for its first book."
          description="Save a story from Discover and it will appear here."
          action={
            <Link className="primary-button" href={routes.discover}>
              Explore stories
            </Link>
          }
        />
      )}
    </div>
  );
}
