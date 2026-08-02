import type { Metadata } from "next";
import { StudioBooksManager } from "@/src/features/studio/components/studio-books-manager";

export const metadata: Metadata = {
  title: "Manuscripts",
  robots: { index: false, follow: false },
};

export default function StudioBooksPage() {
  return <StudioBooksManager />;
}
