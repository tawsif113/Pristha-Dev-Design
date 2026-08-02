import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/src/features/audience/components/analytics-dashboard";

export const metadata: Metadata = {
  title: "Writer analytics",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
