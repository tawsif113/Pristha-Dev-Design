import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Submissions" };

export default function HouseSubmissionsPage() {
  return <HouseRoute section="submissions" />;
}
