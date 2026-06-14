import { test, expect } from "@playwright/test";

test.describe("App auth entry routes", () => {
  test("app root redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/app");
    await expect(page).toHaveURL(/\/app\/login/);
  });

  test("app login page is reachable", async ({ page }) => {
    await page.goto("/app/login");
    await expect(page).toHaveURL(/\/app\/login/);
  });

  test("legacy signup route redirects to app signup", async ({ page }) => {
    await page.goto("/auth/signup");
    await expect(page).toHaveURL(/\/app\/signup/);
  });

  test("legacy forgot-password route redirects to app forgot-password", async ({ page }) => {
    await page.goto("/auth/forgot-password");
    await expect(page).toHaveURL(/\/app\/forgot-password/);
  });

  test("protected dashboard starts sign-in when unauthenticated", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.goto("/app/dashboard");
    await expect(page.getByRole("heading", { name: /dashboard/i })).not.toBeVisible({
      timeout: 5000,
    });
  });

  test("auth callback without code redirects home with auth_failed banner", async ({ page }) => {
    await page.goto("/auth/callback");
    await expect(page).toHaveURL(/error=auth_failed/);
    await expect(page.getByRole("alert")).toContainText(/sign-in/i);
    await expect(page.getByRole("link", { name: /try signing in again/i })).toHaveAttribute(
      "href",
      "/app/login",
    );
  });

  test("home shows auth_failed banner when error query param is present", async ({ page }) => {
    await page.goto("/?error=auth_failed");
    await expect(page.getByRole("alert")).toContainText(/sign-in could not be completed/i);
    await expect(page.getByRole("link", { name: /try signing in again/i })).toBeVisible();
  });
});
