import { test, expect } from "@playwright/test";
import { blockKeycloakRedirects, mockCandidateApis, seedCandidateSession } from "./helpers/mock-auth";

test.describe("Candidate app routes", () => {
  test.beforeEach(async ({ page }) => {
    await blockKeycloakRedirects(page);
    await seedCandidateSession(page);
    await mockCandidateApis(page);
  });

  test("dashboard loads with API data", async ({ page }) => {
    await page.goto("/app/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /^dashboard$/i })).toBeVisible();
    await expect(page.getByText("120")).toBeVisible();
    await expect(page.getByText("No recent activity")).toBeVisible();
  });

  test("jobs page lists openings from API", async ({ page }) => {
    await page.goto("/app/jobs");
    await expect(page.getByRole("heading", { name: /job discovery/i })).toBeVisible();
    await expect(page.getByText("Frontend Engineer")).toBeVisible();
  });

  test("tracker shows empty state when no applications", async ({ page }) => {
    await page.goto("/app/tracker");
    await expect(page.getByRole("heading", { name: /application tracker/i })).toBeVisible();
    await expect(page.getByText("No applications yet")).toBeVisible();
  });

  test("resume page loads score overview from API", async ({ page }) => {
    await page.goto("/app/resume");
    await expect(page.getByRole("heading", { name: /resume builder/i })).toBeVisible();
    await expect(page.getByText("72")).toBeVisible();
    await expect(page.getByRole("button", { name: /optimize for role/i })).toBeVisible();
  });

  test("resume templates tab loads catalog from API", async ({ page }) => {
    await page.goto("/app/resume");
    await page.getByRole("button", { name: /^templates$/i }).click();
    await expect(page.getByText("Modern Blue")).toBeVisible();
    await expect(page.getByText(/ats friendly/i)).toBeVisible();
  });

  test("resume builder tab loads sections and save action", async ({ page }) => {
    await page.goto("/app/resume");
    await page.getByRole("button", { name: /resume builder/i }).click();
    await expect(page.getByText("Professional Summary")).toBeVisible();
    await expect(page.getByRole("button", { name: /save resume/i })).toBeVisible();
  });

  test("resume analysis tab runs ATS analysis", async ({ page }) => {
    await page.goto("/app/resume");
    await page.getByRole("button", { name: /analysis & insights/i }).click();
    await page.getByLabel(/target role for analysis/i).fill("Frontend Developer");
    await page.getByRole("button", { name: /analyze resume/i }).click();
    await expect(page.getByText("Overall Score")).toBeVisible();
    await expect(page.getByText("78%")).toBeVisible();
  });

  test("resume versions tab lists saved versions", async ({ page }) => {
    await page.goto("/app/resume");
    await page.getByRole("button", { name: /^versions$/i }).click();
    await expect(page.getByText("Default Resume")).toBeVisible();
    await expect(page.getByRole("button", { name: /^view$/i })).toBeVisible();
  });

  test("interview page loads from API", async ({ page }) => {
    await page.goto("/app/interview");
    await expect(page.getByRole("heading", { name: /interview prep/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /start mock interview session/i })).toBeVisible();
  });

  test("negotiation page loads frameworks and market data", async ({ page }) => {
    await page.goto("/app/negotiation");
    await expect(page.getByRole("heading", { name: /offer & negotiation/i })).toBeVisible();
    await expect(page.getByText("Salary Negotiation Framework")).toBeVisible();
  });

  test("legal page loads document list", async ({ page }) => {
    await page.goto("/app/legal");
    await expect(page.getByRole("heading", { name: /legal readiness/i })).toBeVisible();
    await expect(page.getByText("No documents yet")).toBeVisible();
  });

  test("auto-apply page loads profiles", async ({ page }) => {
    await page.goto("/app/auto-apply");
    await expect(page.getByRole("heading", { name: /auto-apply/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /create profile/i })).toBeVisible();
  });

  test("coding arena loads challenges from API", async ({ page }) => {
    await page.goto("/app/coding-arena");
    await expect(page.getByRole("heading", { name: /coding arena/i })).toBeVisible();
    await expect(page.getByText("Two Sum")).toBeVisible();
    await expect(page.getByRole("button", { name: /start challenge/i })).toBeVisible();
  });

  test("profile and settings pages load", async ({ page }) => {
    await page.goto("/app/profile");
    await expect(page.getByRole("heading", { name: /^profile$/i })).toBeVisible();
    await expect(page.getByText("E2E User")).toBeVisible();

    await page.goto("/app/settings");
    await expect(page.getByRole("heading", { name: /^settings$/i })).toBeVisible();
    await expect(page.getByText(/notification preferences/i)).toBeVisible();
  });

  test("credits page shows usage and billing from API", async ({ page }) => {
    await page.goto("/app/credits");
    await expect(page.getByRole("heading", { name: /credits & billing/i })).toBeVisible();
    await expect(page.getByText("120")).toBeVisible();
    await expect(page.getByText("Usage Breakdown")).toBeVisible();
    await expect(page.getByText("Basic")).toBeVisible();
    await expect(page.getByText("Billing History")).toBeVisible();
    await expect(page.getByText("INV-2026-00001")).toBeVisible();
  });
});
