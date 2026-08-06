import type { Metadata } from "next";
import { QuickReadsExperience } from "@/src/features/quick-reads/components/quick-reads-experience";
import { postService } from "@/src/services";

export const metadata: Metadata = {
  title: "Quick Reads",
  description:
    "Endless stream of Bengali micro-thoughts, short stories, and standalone pieces on Pristha.",
  alternates: { canonical: "/quick-reads" },
};

export default async function QuickReadsPage() {
  const posts = await postService.getFeaturedPosts();
  return <QuickReadsExperience initialPosts={posts} />;
}
