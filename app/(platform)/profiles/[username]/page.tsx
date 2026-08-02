import type { Metadata } from "next";
import { ProfileExperience } from "@/src/features/profiles/components/profile-experience";
import { libraryService } from "@/src/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const displayName =
    username === "rumana-kabir" ? "Rumana Kabir" : username;
  return {
    title: displayName,
    description:
      "Read stories, reviews, and public writing by " + displayName + " on Pristha.",
    alternates: { canonical: "/profiles/" + username },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const [{ username }, libraryItems] = await Promise.all([
    params,
    libraryService.getLibrary(),
  ]);
  return (
    <ProfileExperience
      username={username}
      libraryItems={libraryItems}
    />
  );
}
