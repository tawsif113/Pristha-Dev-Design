import { cn } from "@/src/lib/cn";

const weekData = [
  { day: "সোম", fullDay: "Monday", minutes: 25, today: false },
  { day: "মঙ্গল", fullDay: "Tuesday", minutes: 40, today: false },
  { day: "বুধ", fullDay: "Wednesday", minutes: 35, today: false },
  { day: "বৃহস্পতি", fullDay: "Thursday", minutes: 15, today: false },
  { day: "শুক্র", fullDay: "Friday", minutes: 50, today: false },
  { day: "শনি", fullDay: "Saturday", minutes: 30, today: false },
  { day: "রবি", fullDay: "Sunday", minutes: 45, today: true },
];

export function ReadingStreak() {
  return (
    <aside className="streak" aria-labelledby="reading-streak-title">
      <div className="streak-card-head">
        <div>
          <span id="reading-streak-title" lang="bn">
            পঠন ধারাবাহিকতা
          </span>
          <i aria-hidden="true" />
        </div>
        <time dateTime="2026-08" lang="bn">
          আগস্ট ২০২৬
        </time>
      </div>
      <div className="streak-count" aria-label="14 Days Reading Streak">
        <strong>14</strong>
        <span>Days Streak</span>
      </div>
      <div
        className="week-line"
        role="region"
        aria-label="Weekly reading activity breakdown"
      >
        {weekData.map((item) => (
          <div
            key={item.day}
            className={cn("week-day-slot", item.today && "is-today")}
            tabIndex={0}
            aria-label={`${item.fullDay}: ${item.minutes} mins read`}
          >
            <span className="dot-tooltip" role="tooltip">
              <strong>{item.minutes}</strong> mins read
            </span>
            <small lang="bn">{item.day}</small>
            <i className={item.today ? "today" : undefined} aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="streak-summary">
        <p className="summary-headline">
          <span>This week</span>
          <i className="summary-dot" aria-hidden="true" />
          <span>240 mins read</span>
        </p>
      </div>
    </aside>
  );
}
