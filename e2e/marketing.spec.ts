import { test, expect } from "@playwright/test";

test.describe("Marketing pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hiring Journey/i);
  });

  test("pricing page loads", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("legacy auth login redirects to app login", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/\/app\/login/);
  });
});
