import { test, expect } from "@playwright/test";

const M1_MARKETING_ROUTES = [
  { path: "/", titlePattern: /Hiring Journey/i },
  { path: "/pricing", name: "pricing" },
  { path: "/features", name: "features" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/blog", name: "blog" },
  { path: "/careers", name: "careers" },
  { path: "/faq", name: "faq" },
];

const LEGAL_ROUTES = ["/legal/privacy", "/legal/terms", "/legal/cookie-policy"];

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

  for (const path of LEGAL_ROUTES) {
    test(`${path} loads`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
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

  test("header signup CTA points to app signup", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /start free/i }).first()).toHaveAttribute(
      "href",
      "/app/signup",
    );
  });

  test("hero signup CTA points to app signup", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /^start free$/i }).first()).toHaveAttribute(
      "href",
      "/app/signup",
    );
  });

  test("footer legal links are reachable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Privacy", exact: true }).click();
    await expect(page).toHaveURL(/\/legal\/privacy/);
  });

  test("skip link focuses main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute("href", "#main-content");
  });

  test("faq accordion expands on click", async ({ page }) => {
    await page.goto("/faq");
    const firstQuestion = page.getByRole("button").first();
    await firstQuestion.click();
    await expect(page.getByText(/Freshers, experienced professionals/i)).toBeVisible();
  });

  test("home FAQ preview links to full FAQ page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /view all faqs/i }).click();
    await expect(page).toHaveURL(/\/faq/);
  });

  test("contact form validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
  });

  test("contact form submits successfully", async ({ page }) => {
    await page.route("**/contact", async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          message: "Thank you for your message. We will get back to you within one business day.",
        }),
      });
    });

    await page.goto("/contact");
    await page.getByLabel(/^name$/i).fill("Jane Doe");
    await page.getByLabel(/^email$/i).fill("jane@example.com");
    await page.getByLabel(/^subject$/i).fill("Product question");
    await page.getByLabel(/^message$/i).fill("I would like to learn more about enterprise plans.");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/thank you/i)).toBeVisible();
  });
});
