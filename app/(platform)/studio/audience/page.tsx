import type { Metadata } from "next";
import { AudienceDashboard } from "@/src/features/audience/components/audience-dashboard";

export const metadata: Metadata = {
  title: "Audience",
  robots: { index: false, follow: false },
};

export default function AudiencePage() {
  return <AudienceDashboard />;
}
