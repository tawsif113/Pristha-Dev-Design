import type { Metadata } from "next";
import { BecomeAuthorExperience } from "@/src/features/auth/components/become-author-experience";

export const metadata: Metadata = {
  title: "Become an Author — Pristha",
  description: "Complete reader questionnaire and submit 1,200-word sample writing to become an author on Pristha.",
  alternates: { canonical: "/become-author" },
};

export default function BecomeAuthorPage() {
  return <BecomeAuthorExperience />;
}
