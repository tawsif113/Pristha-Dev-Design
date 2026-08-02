import { PageHeader } from "@/src/components/layout/page-header";
import { Icon } from "@/src/components/ui/icon";

const readers = [
  ["তাসনিম রহমান", "@tasnimreads", "Top 1% reader", "24 chapters"],
  ["Arif Chowdhury", "@arifc", "New supporter", "11 chapters"],
  ["মাইশা কবির", "@maishak", "Returning reader", "9 chapters"],
];

export function AudienceDashboard() {
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Reader relationships"
        title="Your audience"
        subtitle="Understand the people returning to your work, without turning them into metrics."
      />
      <section className="audience-lead">
        <div>
          <strong>12.4k</strong>
          <span>active readers</span>
          <small>68% return within seven days</small>
        </div>
        <div className="audience-rings">
          <i>
            <b>42%</b>
            <span>18–24</span>
          </i>
          <i>
            <b>31%</b>
            <span>25–34</span>
          </i>
          <i>
            <b>27%</b>
            <span>35+</span>
          </i>
        </div>
      </section>
      <section className="audience-grid">
        <div>
          <div className="section-heading">
            <div>
              <span className="eyebrow">Engaged readers</span>
              <h2>People to remember</h2>
            </div>
          </div>
          <div className="people-list">
            {readers.map((reader, index) => (
              <button key={reader[1]}>
                <span className={"reader-avatar tone-" + index}>
                  {reader[0][0]}
                </span>
                <span>
                  <strong>{reader[0]}</strong>
                  <small>
                    {reader[1]} · {reader[2]}
                  </small>
                </span>
                <em>{reader[3]}</em>
              </button>
            ))}
          </div>
        </div>
        <aside className="reader-note">
          <span className="eyebrow">From your comments</span>
          <blockquote lang="bn">
            “এই অধ্যায়টা শেষ করার পর কিছুক্ষণ চুপ করে বসে ছিলাম।”
          </blockquote>
          <p>— তাসনিম, on চিঠি · Chapter 07</p>
          <button>
            Reply thoughtfully <Icon name="arrow" size={16} />
          </button>
        </aside>
      </section>
    </div>
  );
}
