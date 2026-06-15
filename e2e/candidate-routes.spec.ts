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

  test("coding arena is gated by feature flag", async ({ page }) => {
    await page.goto("/app/coding-arena");
    await expect(page.getByRole("heading", { name: /coding arena/i })).toBeVisible();
    await expect(page.getByText(/coming soon|not available/i)).toBeVisible();
  });

  test("profile and settings pages load", async ({ page }) => {
    await page.goto("/app/profile");
    await expect(page.getByRole("heading", { name: /^profile$/i })).toBeVisible();
    await expect(page.getByText("E2E User")).toBeVisible();

    await page.goto("/app/settings");
    await expect(page.getByRole("heading", { name: /^settings$/i })).toBeVisible();
    await expect(page.getByText(/notification preferences/i)).toBeVisible();
  });

  test("credits page shows usage from API", async ({ page }) => {
    await page.goto("/app/credits");
    await expect(page.getByRole("heading", { name: /credits/i })).toBeVisible();
    await expect(page.getByText("120")).toBeVisible();
    await expect(page.getByText("Usage Breakdown")).toBeVisible();
  });
});
