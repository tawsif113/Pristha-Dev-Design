"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import { withSearchParams } from "@/src/lib/search-params";

const tabs = [
  "Account",
  "Reading",
  "Writing",
  "Notifications",
  "Appearance",
  "Privacy",
  "Billing",
] as const;

export type SettingsTab = (typeof tabs)[number];

export function SettingsExperience({
  activeTab,
}: {
  activeTab: SettingsTab;
}) {
  const router = useRouter();
  const { showToast } = usePristha();
  const [quietMode, setQuietMode] = useState(true);
  const [digest, setDigest] = useState(false);
  const [smartTypography, setSmartTypography] = useState(true);
  const [autosave, setAutosave] = useState(true);
  const [readerActivity, setReaderActivity] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  function changeTab(tab: SettingsTab) {
    router.replace(
      withSearchParams(routes.settings, {
        section: tab.toLocaleLowerCase(),
      }),
      { scroll: false },
    );
  }

  function toggleRow(
    title: string,
    description: string,
    value: boolean,
    setValue: (value: boolean) => void,
  ) {
    return (
      <div className="setting-row">
        <div>
          <strong>{title}</strong>
          <small>{description}</small>
        </div>
        <button
          className={"toggle " + (value ? "on" : "")}
          onClick={() => setValue(!value)}
          aria-pressed={value}
          aria-label={title}
        >
          <span />
        </button>
      </div>
    );
  }

  return (
    <div className="product-page settings-page page-enter">
      <PageHeader
        eyebrow="Personal preferences"
        title="Settings"
        subtitle="Shape Pristha around the way you read, write, and rest."
      />
      <div className="settings-layout">
        <nav aria-label="Settings sections">
          {tabs.map((item) => (
            <button
              className={activeTab === item ? "active" : undefined}
              onClick={() => changeTab(item)}
              aria-current={activeTab === item ? "page" : undefined}
              key={item}
            >
              {item}
            </button>
          ))}
        </nav>
        <section className="settings-panel">
          <div className="settings-panel-head">
            <span className="eyebrow">Preferences</span>
            <h2>{activeTab}</h2>
          </div>
          {activeTab === "Account" && (
            <>
              <div className="settings-profile">
                <span className="profile-monogram small">র</span>
                <div>
                  <strong>Rumana Kabir</strong>
                  <small>@rumana · rumana@pristha.app</small>
                </div>
                <button
                  className="secondary-button"
                  onClick={() => showToast("Profile editor opened")}
                >
                  Edit profile
                </button>
              </div>
              <SelectRow
                title="Display name"
                description="Shown on stories, comments, and your public profile."
                value="Rumana Kabir"
              />
              <SelectRow
                title="Connected publishing house"
                description="Batayan Prokashoni · Editor access"
                value="Manage"
              />
            </>
          )}
          {activeTab === "Reading" && (
            <>
              {toggleRow(
                "Quiet reading mode",
                "Hide social activity while you are inside a chapter.",
                quietMode,
                setQuietMode,
              )}
              {toggleRow(
                "Weekly reading digest",
                "A calm Sunday summary of saved and unfinished stories.",
                digest,
                setDigest,
              )}
              <SelectRow
                title="Default text size"
                description="Applied whenever a book does not specify a preference."
                value="Comfortable"
              />
            </>
          )}
          {activeTab === "Writing" && (
            <>
              {toggleRow(
                "Smart typography",
                "Use curly quotes, em dashes, and Bengali punctuation.",
                smartTypography,
                setSmartTypography,
              )}
              {toggleRow(
                "Continuous autosave",
                "Keep a recoverable version history while you write.",
                autosave,
                setAutosave,
              )}
              <SelectRow
                title="Daily writing goal"
                description="A private, encouraging target—not a public score."
                value="1,500 words"
              />
            </>
          )}
          {activeTab === "Notifications" && (
            <>
              {toggleRow(
                "Reader activity",
                "Thoughtful summaries of follows, saves, and comments.",
                readerActivity,
                setReaderActivity,
              )}
              {toggleRow(
                "Weekly digest",
                "Writing progress and reader momentum in one email.",
                digest,
                setDigest,
              )}
              <SelectRow
                title="Quiet hours"
                description="Pause non-essential alerts while you rest or write."
                value="10 PM–8 AM"
              />
            </>
          )}
          {activeTab === "Appearance" && (
            <>
              <SelectRow
                title="Theme"
                description="Choose an eye-comfortable reading and writing surface."
                value="Warm ivory"
              />
              {toggleRow(
                "Reduce motion",
                "Limit non-essential transitions and animated feedback.",
                reducedMotion,
                setReducedMotion,
              )}
            </>
          )}
          {activeTab === "Privacy" && (
            <>
              <SelectRow
                title="Profile visibility"
                description="Control who can find your reading and writing profile."
                value="Public"
              />
              <SelectRow
                title="Reading activity"
                description="Choose whether writers can see your name."
                value="Private"
              />
              <SelectRow
                title="Download your data"
                description="Export manuscripts, highlights, and account history."
                value="Request export"
              />
            </>
          )}
          {activeTab === "Billing" && (
            <>
              <div className="billing-summary">
                <span className="eyebrow">Current plan</span>
                <h3>Writer Pro</h3>
                <p>
                  Professional writing tools, version history,
                  analytics, and publishing-house collaboration.
                </p>
                <strong>
                  ৳499 <small>/ month</small>
                </strong>
              </div>
              <SelectRow
                title="Payment method"
                description="Visa ending in 2048 · expires 08/29"
                value="Update"
              />
            </>
          )}
          <button
            className="primary-button save-settings"
            onClick={() => showToast("Preferences saved")}
          >
            Save preferences
          </button>
        </section>
      </div>
    </div>
  );
}

function SelectRow({
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: string;
}) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>
        <small>{description}</small>
      </div>
      <button className="inline-select">
        {value} <span>›</span>
      </button>
    </div>
  );
}
