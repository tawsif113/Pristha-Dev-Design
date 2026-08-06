"use client";

import { useState, useMemo } from "react";
import { cn } from "@/src/lib/cn";

interface HeatmapDay {
  dateStr: string;
  formattedDate: string;
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const MONTH_LABELS = [
  "জানু",
  "ফেব্রু",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্ট",
  "অক্টো",
  "নভে",
  "ডিসে",
];

// Generate deterministic sample activity for 365 days of 2026
function generateYearData(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const startDate = new Date(2026, 0, 1);

  for (let i = 0; i < 364; i++) {
    const cur = new Date(startDate);
    cur.setDate(startDate.getDate() + i);

    const dayOfWeek = cur.getDay();
    const dateStr = cur.toISOString().split("T")[0];
    const month = cur.toLocaleDateString("bn-BD", { month: "short" });
    const dayNum = cur.getDate();
    const formattedDate = `${dayNum} ${month} ২০২৬`;

    // Deterministic minutes generation to simulate realistic reading pattern
    let minutes = 0;
    const seed = (i * 37 + dayOfWeek * 13) % 100;

    if (i > 300) {
      // Recent streak for current August days
      minutes = (i % 5) * 20 + 25;
    } else if (seed > 35) {
      minutes = (seed % 4) * 25 + 10;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (minutes > 60) level = 4;
    else if (minutes > 30) level = 3;
    else if (minutes > 15) level = 2;
    else if (minutes > 0) level = 1;

    days.push({ dateStr, formattedDate, minutes, level });
  }

  return days;
}

export function ReadingStreak() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const yearData = useMemo(() => generateYearData(), []);

  // Split 364 days into 52 weeks (7 days per week column)
  const weeks = useMemo(() => {
    const cols: HeatmapDay[][] = [];
    for (let i = 0; i < yearData.length; i += 7) {
      cols.push(yearData.slice(i, i + 7));
    }
    return cols;
  }, [yearData]);

  return (
    <aside className="streak reading-heatmap-card" aria-labelledby="reading-streak-title">
      {/* Top Header & Year Selector */}
      <div className="heatmap-header">
        <div className="header-title-wrap">
          <span className="streak-icon-flame" aria-hidden="true">🔥</span>
          <div>
            <h3 id="reading-streak-title" lang="bn">
              পাঠাভ্যাস ও বার্ষিক রিডিং হিটম্যাপ
            </h3>
            <p lang="bn">৩৬৫ দিনের পাঠাভ্যাস ও সময়ের হিটম্যাপ গ্রিড</p>
          </div>
        </div>

        <div className="year-selector">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Select year"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Metric Stats Banner */}
      <div className="heatmap-stats-strip">
        <div className="stat-box">
          <span className="stat-label" lang="bn">চলতি স্ট্রিক</span>
          <strong className="stat-value" lang="bn">১৪ দিন</strong>
          <small className="stat-sub">টানা পঠিত</small>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat-box">
          <span className="stat-label" lang="bn">সর্বোচ্চ রেকর্ড</span>
          <strong className="stat-value" lang="bn">৪২ দিন</strong>
          <small className="stat-sub">সেরা সাফল্য</small>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat-box">
          <span className="stat-label" lang="bn">পঠিত দিন</span>
          <strong className="stat-value" lang="bn">২১৪ দিন</strong>
          <small className="stat-sub">৩৬৫ দিনের মধ্যে</small>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat-box">
          <span className="stat-label" lang="bn">মোট সময়</span>
          <strong className="stat-value" lang="bn">১২৮ ঘণ্টা</strong>
          <small className="stat-sub">পঠন কাল</small>
        </div>
      </div>

      {/* 52-Week GitHub Style Heatmap Grid */}
      <div className="heatmap-scroll-container">
        <div className="heatmap-grid-wrap">
          {/* Month Labels Row */}
          <div className="months-row">
            <span className="month-offset-spacer" />
            <div className="months-labels">
              {MONTH_LABELS.map((m) => (
                <span key={m} className="month-label" lang="bn">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Main Grid: Days of Week + 52 Column Weeks */}
          <div className="heatmap-body">
            <div className="day-labels">
              <span lang="bn">সোম</span>
              <span lang="bn">বুধ</span>
              <span lang="bn">শুক্র</span>
            </div>

            <div className="weeks-grid" role="region" aria-label="365 days reading contribution grid">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="week-column">
                  {week.map((day) => (
                    <div
                      key={day.dateStr}
                      className={cn("heatmap-cell", `level-${day.level}`)}
                      tabIndex={0}
                      aria-label={`${day.formattedDate}: ${day.minutes} mins read`}
                    >
                      <div className="cell-tooltip" role="tooltip">
                        <strong>{day.formattedDate}</strong>
                        <span>
                          {day.minutes > 0
                            ? `${day.minutes} মিনিট পঠিত`
                            : "কোনো পঠন তথ্য নেই"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer & Activity Density Legend */}
      <div className="heatmap-footer">
        <div className="density-legend">
          <span lang="bn">কম</span>
          <div className="legend-cells">
            <span className="heatmap-cell level-0" />
            <span className="heatmap-cell level-1" />
            <span className="heatmap-cell level-2" />
            <span className="heatmap-cell level-3" />
            <span className="heatmap-cell level-4" />
          </div>
          <span lang="bn">বেশি</span>
        </div>

        <p className="footer-note" lang="bn">
          নিয়মিত পাঠাভ্যাস বজায় রাখতে প্রতিদিন অন্তত ১৫ মিনিট পড়ুন।
        </p>
      </div>
    </aside>
  );
}
