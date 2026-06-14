import { test, expect } from "@playwright/test";

const M1_MARKETING_ROUTES = [
  { path: "/", titlePattern: /Hiring Journey/i },
  { path: "/pricing", name: "pricing" },
  { path: "/features", name: "features" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/blog", name: "blog" },
];

test.describe("Marketing pages", () => {
  for (const route of M1_MARKETING_ROUTES) {
    test(`${route.path} loads`, async ({ page }) => {
      await page.goto(route.path);
      if (route.titlePattern) {
        await expect(page).toHaveTitle(route.titlePattern);
      } else {
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
    });
  }

  test("sitemap and robots are accessible", async ({ page }) => {
    const sitemap = await page.goto("/sitemap.xml");
    expect(sitemap?.status()).toBe(200);

    const robots = await page.goto("/robots.txt");
    expect(robots?.status()).toBe(200);
  });

  test("legacy auth login redirects to app login", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/\/app\/login/);
  });
});
