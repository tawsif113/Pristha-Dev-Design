import { expect, test } from "@playwright/test";

test("public reader journey supports direct routes", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Tonight on your page" }),
  ).toBeVisible();

  if (isMobile) {
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.waitForTimeout(300);
  }
  await page.getByRole("link", { name: "Discover" }).click();
  await expect(
    page.getByRole("heading", { name: "Stories worth finding." }),
  ).toBeVisible();

  await page.goto("/quick-reads");
  await expect(
    page.getByRole("heading", { name: "ক্ষুদ্রগল্প ও মুক্তচিন্তা" }),
  ).toBeVisible();

  await page.goto("/books/chithi");
  await expect(page.getByRole("heading", { name: "চিঠি", level: 1 })).toBeVisible();

  await page.goto("/read/chithi/chithi-04");
  await expect(page.getByRole("heading", { name: "দেরি" })).toBeVisible();
});

test("writer can choose a manuscript and open the editor", async ({
  page,
}) => {
  await page.goto("/studio");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: /Continue writing/u }).click();
  await expect(
    page.getByRole("dialog", { name: "Choose where to return" }),
  ).toBeVisible();
  const continueBtn = page.getByRole("link", {
    name: /Continue this chapter/u,
  });
  await continueBtn.scrollIntoViewIfNeeded();
  await continueBtn.click({ force: true });
  await expect(page).toHaveURL(/\/studio\/books\/.+\/edit$/u);
  await expect(
    page.getByRole("textbox", { name: "Chapter text" }),
  ).toBeVisible();
});

test("publishing-house routes and not-found load directly", async ({
  page,
  isMobile,
}) => {
  await page.goto("/house/catalogue");
  await expect(page.getByRole("heading", { name: "Catalogue" })).toBeVisible();
  if (isMobile) {
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.waitForTimeout(300);
  }
  await page.getByRole("link", { name: "Storefront" }).click();
  await expect(page.getByRole("heading", { name: "Storefront" })).toBeVisible();

  await page.goto("/this-route-does-not-exist");
  await expect(
    page.getByRole("heading", {
      name: "This page has slipped between the chapters.",
    }),
  ).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  await page.getByRole("link", { name: "Discover" }).click();
  await expect(page).toHaveURL("/discover");
});


