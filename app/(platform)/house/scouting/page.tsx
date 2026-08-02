import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Scouting" };

export default function HouseScoutingPage() {
  return <HouseRoute section="scouting" />;
}
