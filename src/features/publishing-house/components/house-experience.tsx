"use client";

import { PageHeader } from "@/src/components/layout/page-header";
import { Icon } from "@/src/components/ui/icon";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import type {
  CatalogueItem,
  Submission,
  TeamMember,
} from "@/src/types/domain";

export type HouseSection =
  | "overview"
  | "catalogue"
  | "submissions"
  | "storefront"
  | "scouting"
  | "team";

const config: Record<
  HouseSection,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    action: string;
  }
> = {
  overview: {
    eyebrow: "House overview",
    title: "Good morning, Batayan",
    subtitle:
      "One calm view of your catalogue, team, and reader business.",
    action: "Add title",
  },
  catalogue: {
    eyebrow: "Publishing operations",
    title: "Catalogue",
    subtitle:
      "Manage every title without losing sight of the work itself.",
    action: "Add title",
  },
  submissions: {
    eyebrow: "Editorial inbox",
    title: "Submissions",
    subtitle: "Promising manuscripts, ordered for thoughtful review.",
    action: "Invite author",
  },
  storefront: {
    eyebrow: "Reader experience",
    title: "Storefront",
    subtitle: "Curate the front door to your publishing house.",
    action: "Publish changes",
  },
  scouting: {
    eyebrow: "Talent discovery",
    title: "Scouting",
    subtitle: "Find voices worth supporting before the market notices.",
    action: "New search",
  },
  team: {
    eyebrow: "People & access",
    title: "Team",
    subtitle:
      "Editors, designers, and operators behind every published page.",
    action: "Invite teammate",
  },
};

export function HouseExperience({
  section,
  catalogue,
  submissions,
  team,
}: {
  section: HouseSection;
  catalogue: CatalogueItem[];
  submissions: Submission[];
  team: TeamMember[];
}) {
  const { showToast } = usePristha();
  const current = config[section];

  return (
    <div className="product-page house-page page-enter">
      <PageHeader
        eyebrow={current.eyebrow}
        title={current.title}
        subtitle={current.subtitle}
        action={
          <button
            className="primary-button"
            onClick={() => showToast(current.action + " opened")}
          >
            <Icon name="plus" size={17} />
            {current.action}
          </button>
        }
      />

      <HouseSummary />

      {(section === "overview" || section === "catalogue") && (
        <CatalogueTable
          items={catalogue}
          title={section === "overview" ? "Catalogue pulse" : "All titles"}
        />
      )}
      {section === "submissions" && (
        <SubmissionsTable submissions={submissions} />
      )}
      {section === "storefront" && (
        <StorefrontExperience
          onPublish={() => showToast("Storefront changes published")}
        />
      )}
      {section === "scouting" && <ScoutingExperience />}
      {section === "team" && <TeamExperience members={team} />}

      {section !== "storefront" && section !== "team" && (
        <section className="house-note">
          <div>
            <span className="eyebrow">Editorial reminder</span>
            <h2>
              Three shortlisted manuscripts are waiting for a second
              reader.
            </h2>
          </div>
          <button onClick={() => showToast("Review queue opened")}>
            Open review queue <Icon name="arrow" size={17} />
          </button>
        </section>
      )}
    </div>
  );
}

function HouseSummary() {
  return (
    <section className="house-summary">
      <div>
        <small>Live titles</small>
        <strong>24</strong>
        <span>3 in review</span>
      </div>
      <div>
        <small>Readers this month</small>
        <strong>84.2k</strong>
        <span>+12.6%</span>
      </div>
      <div>
        <small>Gross revenue</small>
        <strong>৳2.8L</strong>
        <span>Across 6 imprints</span>
      </div>
      <div>
        <small>Open submissions</small>
        <strong>38</strong>
        <span>12 need review</span>
      </div>
    </section>
  );
}

function CatalogueTable({
  items,
  title,
}: {
  items: CatalogueItem[];
  title: string;
}) {
  return (
    <section className="house-table">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Priority view</span>
          <h2>{title}</h2>
        </div>
        <button type="button">Filter & sort</button>
      </div>
      <div className="table-head">
        <span>Title</span>
        <span>Author</span>
        <span>Reads</span>
        <span>Revenue</span>
      </div>
      {items.map((item) => (
        <button className="house-row" key={item.book.id}>
          <strong>{item.book.title}</strong>
          <span>{item.book.authorName}</span>
          <span>{item.reads.toLocaleString()} reads</span>
          <em>
            {item.revenue
              ? "৳" + item.revenue.toLocaleString()
              : "In review"}
          </em>
          <Icon name="arrow" size={18} />
        </button>
      ))}
    </section>
  );
}

function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
    <section className="house-table">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Editorial queue</span>
          <h2>Manuscripts to review</h2>
        </div>
      </div>
      <div className="table-head">
        <span>Manuscript</span>
        <span>Author</span>
        <span>Submitted</span>
        <span>Status</span>
      </div>
      {submissions.map((submission) => (
        <button className="house-row" key={submission.id}>
          <strong>{submission.title}</strong>
          <span>{submission.authorName}</span>
          <span>{submission.submittedAt}</span>
          <em>{submission.status.replace("-", " ")}</em>
          <Icon name="arrow" size={18} />
        </button>
      ))}
    </section>
  );
}

function StorefrontExperience({
  onPublish,
}: {
  onPublish: () => void;
}) {
  return (
    <section className="storefront-workspace">
      <div className="storefront-preview">
        <div className="storefront-browser-bar">
          <span />
          <span />
          <span />
          <small>batayan.pristha.shop</small>
        </div>
        <div className="storefront-brand">
          <strong>বা</strong>
          <div>
            <h2>বাতায়ন প্রকাশনী</h2>
            <p>সাহিত্য প্রকাশনা · ১৯৯৮ থেকে</p>
          </div>
        </div>
        <span className="eyebrow">এই মাসের নির্বাচিত</span>
        <div className="storefront-books">
          {["চিঠি", "জোছনার পথ", "লাবণ্যের মেঘ"].map(
            (book, index) => (
              <span
                className={"book-cover " + (index === 1 ? "plum" : "teal")}
                key={book}
              >
                <b>{book.slice(0, 1)}</b>
                <small>{book}</small>
              </span>
            ),
          )}
        </div>
      </div>
      <div className="storefront-controls">
        <label>
          Custom domain
          <input defaultValue="batayan.pristha.shop" />
          <small>Connected</small>
        </label>
        <fieldset>
          <legend>Brand colour</legend>
          <div className="storefront-colours">
            {["#20ad9f", "#f4a619", "#8ca9db", "#df7f9b", "#a98bdd"].map(
              (colour) => (
                <button
                  type="button"
                  key={colour}
                  style={{ backgroundColor: colour }}
                  aria-label={"Use brand colour " + colour}
                />
              ),
            )}
          </div>
        </fieldset>
        <button className="primary-button" onClick={onPublish}>
          Publish storefront
        </button>
      </div>
    </section>
  );
}

function ScoutingExperience() {
  const candidates = [
    ["রাইসা করিম", "Romance", "18.2k readers", "Rising"],
    ["Nabil Hasan", "Speculative", "12.8k readers", "Watch"],
    ["তানভীর মুরাদ", "Literary", "9.4k readers", "Contacted"],
  ];
  return (
    <section className="scouting-grid">
      {candidates.map((candidate) => (
        <article key={candidate[0]}>
          <span className="reader-avatar">{candidate[0][0]}</span>
          <div>
            <span className="eyebrow">{candidate[3]}</span>
            <h2>{candidate[0]}</h2>
            <p>
              {candidate[1]} · {candidate[2]}
            </p>
          </div>
          <button className="secondary-button">View writing</button>
        </article>
      ))}
    </section>
  );
}

function TeamExperience({ members }: { members: TeamMember[] }) {
  return (
    <section className="team-grid">
      {members.map((member) => (
        <article key={member.id}>
          <span className="reader-avatar">{member.name[0]}</span>
          <div>
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
          <em>{member.status}</em>
          <button type="button">Manage access</button>
        </article>
      ))}
    </section>
  );
}
