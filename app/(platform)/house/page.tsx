import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Publishing house" };

export default function HousePage() {
  return <HouseRoute section="overview" />;
}
