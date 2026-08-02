import type { Metadata } from "next";
import { EditorRoute } from "@/src/features/editor/components/editor-route";
import { studioService } from "@/src/services";

export const metadata: Metadata = {
  title: "Chapter editor",
  robots: { index: false, follow: false },
};

export default async function ChapterEditorPage({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) {
  const { bookId, chapterId } = await params;
  const initialDraft = await studioService.getDraft({
    bookId,
    chapterId,
  });
  return (
    <EditorRoute
      bookId={bookId}
      chapterId={chapterId}
      initialDraft={initialDraft}
    />
  );
}
