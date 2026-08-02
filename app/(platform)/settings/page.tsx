import type { Metadata } from "next";
import {
  SettingsExperience,
  type SettingsTab,
} from "@/src/features/settings/components/settings-experience";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

const settingsTabs: SettingsTab[] = [
  "Account",
  "Reading",
  "Writing",
  "Notifications",
  "Appearance",
  "Privacy",
  "Billing",
];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const activeTab =
    settingsTabs.find(
      (tab) => tab.toLocaleLowerCase() === section?.toLocaleLowerCase(),
    ) ?? "Account";
  return <SettingsExperience activeTab={activeTab} />;
}
