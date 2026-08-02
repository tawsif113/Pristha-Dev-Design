import type { Metadata } from "next";
import { StudioOverview } from "@/src/features/studio/components/studio-overview";

export const metadata: Metadata = {
  title: "Writer Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioOverview />;
}
