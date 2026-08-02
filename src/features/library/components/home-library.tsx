import type { LibraryItem } from "@/src/types/domain";
import { LibraryList } from "./library-list";

export function HomeLibrary({ items }: { items: LibraryItem[] }) {
  return (
    <section className="home-library" aria-labelledby="home-library-title">
      <h2 id="home-library-title" className="sr-only">
        Your Library
      </h2>
      <section className="shelf-section">
        <div className="shelf-actions">
          <button type="button">Sort by recent</button>
        </div>
        <LibraryList items={items} />
      </section>
    </section>
  );
}
