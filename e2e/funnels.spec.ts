import { test, expect } from "@playwright/test";
import {
  blockKeycloakRedirects,
  mockAdminApis,
  mockBillingPlansResponse,
  mockCandidateApis,
  seedAdminSession,
  seedCandidateSession,
} from "./helpers/mock-auth";

test.describe("Marketing → signup funnel", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/billing/plans**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockBillingPlansResponse),
      }),
    );
  });

  test("pricing page loads plans and links paid tier to login", async ({ page }) => {
    await page.goto("/pricing", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Basic")).toBeVisible();
    const paidCta = page.getByRole("link", { name: /get started/i }).first();
    await expect(paidCta).toHaveAttribute("href", /\/app\/login\?redirect=/);
  });
});

test.describe("Candidate product funnels", () => {
  test.beforeEach(async ({ page }) => {
    await blockKeycloakRedirects(page);
    await seedCandidateSession(page);
    await mockCandidateApis(page);
  });

  test("dashboard to job discovery funnel", async ({ page }) => {
    await page.goto("/app/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();

    await page.goto("/app/jobs", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /job discovery/i })).toBeVisible();
    await expect(page.getByText("Frontend Engineer")).toBeVisible();
  });

  test("job tracker shows applications after discovery", async ({ page }) => {
    await page.goto("/app/jobs", { waitUntil: "domcontentloaded" });
    await page.goto("/app/tracker", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /application tracker/i })).toBeVisible();
  });

  test("credits billing subscribe funnel", async ({ page }) => {
    await page.goto("/app/credits", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /credits & billing/i })).toBeVisible();
    await page.getByRole("button", { name: /^subscribe$/i }).click();
    await expect(page.getByText(/subscription updated/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Admin operations funnel", () => {
  test.beforeEach(async ({ page }) => {
    await blockKeycloakRedirects(page);
    await seedAdminSession(page);
    await mockAdminApis(page);
  });

  test("admin dashboard to job management to publish", async ({ page }) => {
    await page.goto("/app/admin/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /admin dashboard/i })).toBeVisible();

    await page.goto("/app/admin/jobs", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Frontend Engineer")).toBeVisible();

    await page.getByRole("link", { name: /create new job/i }).click();
    await expect(page).toHaveURL(/\/app\/admin\/publish/);
    await expect(page.getByRole("heading", { name: /publish job/i })).toBeVisible();
  });
});
