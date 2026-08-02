import type { Metadata } from "next";
import { HouseRoute } from "@/src/features/publishing-house/components/house-route";

export const metadata: Metadata = { title: "Storefront" };

export default function HouseStorefrontPage() {
  return <HouseRoute section="storefront" />;
}
