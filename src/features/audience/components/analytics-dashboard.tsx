"use client";

import { PageHeader } from "@/src/components/layout/page-header";
import { usePristha } from "@/src/features/app-state/pristha-provider";

export function AnalyticsDashboard() {
  const { showToast } = usePristha();
  const bars = [26, 38, 34, 52, 47, 68, 58, 76, 72, 88, 83, 96];
  return (
    <div className="product-page page-enter">
      <PageHeader
        eyebrow="Writer analytics"
        title="Publishing dashboard"
        subtitle="The numbers that help you decide—not distract."
        action={
          <button
            className="primary-button"
            onClick={() => showToast("Withdrawal request started")}
          >
            Withdraw ৳41,870
          </button>
        }
      />
      <section className="dashboard-metrics">
        <div>
          <small>Net earnings</small>
          <strong>৳68,420</strong>
          <span>+18.4% this month</span>
        </div>
        <div>
          <small>Active readers</small>
          <strong>12,408</strong>
          <span>+1,264 in 30 days</span>
        </div>
        <div>
          <small>Completion rate</small>
          <strong>68%</strong>
          <span>Across all serials</span>
        </div>
      </section>
      <section className="chart-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Reader momentum</span>
            <h2>Weekly reads</h2>
          </div>
          <button type="button">Last 12 weeks</button>
        </div>
        <div
          className="bar-chart"
          aria-label="Weekly reads chart for the last 12 weeks"
        >
          {bars.map((height, index) => (
            <i key={index} style={{ height: String(height) + "%" }}>
              <span>{index + 1}</span>
            </i>
          ))}
        </div>
        <div className="chart-foot">
          <span>12 weeks ago</span>
          <strong>58.2k total reads</strong>
          <span>This week</span>
        </div>
      </section>
      <section className="earnings-table">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Revenue</span>
            <h2>Top earning titles</h2>
          </div>
          <button
            onClick={() => showToast("Revenue report prepared")}
          >
            Export report
          </button>
        </div>
        {[
          ["চিঠি", "Serial unlocks", "18,240", "৳38,900"],
          ["নীলদরিয়া", "Direct purchases", "12,870", "৳21,450"],
          ["Monsoon Letters", "Direct sales", "4,108", "৳8,070"],
        ].map((row) => (
          <div className="data-row" key={row[0]}>
            <strong>{row[0]}</strong>
            <span>{row[1]}</span>
            <span>{row[2]} reads</span>
            <b>{row[3]}</b>
          </div>
        ))}
      </section>
    </div>
  );
}
