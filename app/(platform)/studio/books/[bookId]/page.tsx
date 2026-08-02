import type { Metadata } from "next";
import { StudioBookRoute } from "@/src/features/studio/components/studio-book-route";

export const metadata: Metadata = {
  title: "Manuscript",
  robots: { index: false, follow: false },
};

export default async function StudioBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  return <StudioBookRoute bookId={bookId} />;
}
