import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Catalogue" };

export default function HouseCataloguePage() {
  return <HouseRoute section="catalogue" />;
}
