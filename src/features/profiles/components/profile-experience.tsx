import Image from "next/image";
import Link from "next/link";
import { routes } from "@/src/config/routes";
import type { LibraryItem } from "@/src/types/domain";
import { LibraryList } from "@/src/features/library/components/library-list";

export function ProfileExperience({
  username,
  libraryItems,
}: {
  username: string;
  libraryItems: LibraryItem[];
}) {
  return (
    <div className="product-page profile-page page-enter">
      <section className="profile-hero profile-hero-rich">
        <div className="profile-hero-cover">
          <Image
            src="/images/rumana-cover.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            unoptimized
          />
        </div>
        <Image
          className="profile-hero-avatar"
          src="/images/rumana-profile.webp"
          alt="Rumana Kabir"
          width={128}
          height={128}
          unoptimized
        />
        <div>
          <span className="eyebrow">Writer · Reader</span>
          <h1>Rumana Kabir</h1>
          <p>
            @{username} · গল্পে শব্দের চেয়ে নীরবতা বেশি রাখি।
          </p>
        </div>
        <Link className="secondary-button" href={routes.settings}>
          Edit profile
        </Link>
      </section>
      <section className="metric-strip profile-metrics">
        <div>
          <strong>12</strong>
          <span>day streak</span>
        </div>
        <div>
          <strong>3</strong>
          <span>authored books</span>
        </div>
        <div>
          <strong>42</strong>
          <span>saved stories</span>
        </div>
        <div>
          <strong>1.2k</strong>
          <span>followers</span>
        </div>
      </section>
      <section className="profile-grid">
        <div>
          <header className="page-header">
            <div>
              <span className="eyebrow">Reading history</span>
              <h2>Your recent pages</h2>
            </div>
            <Link href={routes.library}>Open library</Link>
          </header>
          <LibraryList items={libraryItems.slice(0, 2)} />
        </div>
        <aside className="profile-achievements">
          <span className="eyebrow">Milestones</span>
          <h2>Quiet progress</h2>
          <div>
            <strong>100 chapters</strong>
            <small>Read across 18 writers</small>
          </div>
          <div>
            <strong>7 week rhythm</strong>
            <small>Your longest writing streak</small>
          </div>
        </aside>
      </section>
    </div>
  );
}
