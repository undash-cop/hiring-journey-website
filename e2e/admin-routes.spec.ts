import { test, expect } from "@playwright/test";
import { blockKeycloakRedirects, mockAdminApis, seedAdminSession } from "./helpers/mock-auth";

test.describe("Admin app routes", () => {
  test.beforeEach(async ({ page }) => {
    await blockKeycloakRedirects(page);
    await seedAdminSession(page);
    await mockAdminApis(page);
  });

  test("admin dashboard loads with API stats", async ({ page }) => {
    await page.goto("/app/admin/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /admin dashboard/i })).toBeVisible();
    await expect(page.locator("p.text-3xl", { hasText: /^42$/ })).toBeVisible();
    await expect(page.locator("p.text-3xl", { hasText: /^8$/ })).toBeVisible();
  });

  test("jobs page lists postings", async ({ page }) => {
    await page.goto("/app/admin/jobs", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /job management/i })).toBeVisible();
    await expect(page.getByText("Frontend Engineer")).toBeVisible();
    await expect(page.getByRole("link", { name: /create new job/i })).toBeVisible();
  });

  test("applications page lists applications", async ({ page }) => {
    await page.goto("/app/admin/applications", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /^applications$/i })).toBeVisible();
    await expect(page.getByText("Jane Candidate")).toBeVisible();
  });

  test("candidates page lists candidates", async ({ page }) => {
    await page.goto("/app/admin/candidates", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /^candidates$/i })).toBeVisible();
    await expect(page.getByText("jane@example.com")).toBeVisible();
  });

  test("analytics page loads funnel data", async ({ page }) => {
    await page.goto("/app/admin/analytics", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /^analytics$/i })).toBeVisible();
    await expect(page.getByText("Conversion Rates")).toBeVisible();
  });

  test("contact page lists submissions", async ({ page }) => {
    await page.goto("/app/admin/contact", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /contact submissions/i })).toBeVisible();
    await expect(page.getByText("jane@example.com")).toBeVisible();
  });

  test("newsletter page lists subscribers", async ({ page }) => {
    await page.goto("/app/admin/newsletter", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /newsletter subscribers/i })).toBeVisible();
    await expect(page.getByText("subscriber@example.com")).toBeVisible();
  });

  test("plans page shows plan cards", async ({ page }) => {
    await page.goto("/app/admin/plans", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /plans & credits/i })).toBeVisible();
    await expect(page.getByText("Starter")).toBeVisible();
    await expect(page.getByRole("button", { name: /create new plan/i })).toBeEnabled();
  });

  test("settings page shows editable platform settings", async ({ page }) => {
    await page.goto("/app/admin/settings", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /^settings$/i })).toBeVisible();
    await expect(page.getByLabel(/platform display name/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /save settings/i })).toBeVisible();
  });

  test("publish page supports save as draft", async ({ page }) => {
    await page.goto("/app/admin/publish", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /publish job/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /save as draft/i })).toBeEnabled();
  });

  test("jobs page edit link opens publish form", async ({ page }) => {
    await page.goto("/app/admin/jobs", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /^edit$/i }).first().click();
    await expect(page).toHaveURL(/\/app\/admin\/publish\?jobId=/);
    await expect(page.getByRole("heading", { name: /edit job/i })).toBeVisible();
  });
});
