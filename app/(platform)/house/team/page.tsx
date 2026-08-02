import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Team" };

export default function HouseTeamPage() {
  return <HouseRoute section="team" />;
}
