import type { Page } from "@playwright/test";

export async function seedCandidateSession(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const payload = {
      sub: "e2e-candidate",
      email: "e2e@example.com",
      preferred_username: "E2E User",
      realm_access: { roles: ["candidate"] },
    };
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const token = `${header}.${body}.e2e-signature`;

    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          user: {
            id: 0,
            name: "E2E User",
            email: "e2e@example.com",
            role: "candidate",
          },
          token,
          refreshToken: null,
          role: "candidate",
        },
        version: 0,
      }),
    );
  });
}

export const mockDashboardResponse = {
  resume_score: 72,
  credits_remaining: 120,
  applications_count: 2,
  interviews_count: 1,
  applications_trend: [{ date: "2026-06-01", count: 1 }],
  recent_activity: [],
};

export const mockResumeResponse = {
  score: 72,
  suggestions: ["Add quantifiable achievements"],
  last_updated: "2026-06-01T00:00:00Z",
  target_role: null,
  role_specific_score: null,
  ats_score: 75,
  keyword_match: 68,
  skills_gap: ["TypeScript"],
};

export const mockJobsResponse = {
  items: [
    {
      id: 1,
      title: "Frontend Engineer",
      description: "Build product UI",
      skills: ["React", "TypeScript"],
      location: "Remote",
      salary_range: { min: 800000, max: 1200000 },
      employment_type: "full-time",
      status: "published",
      source: "internal",
      created_at: "2026-06-01T00:00:00Z",
    },
  ],
  total: 1,
  page: 1,
  page_size: 50,
};

export const mockApplicationsResponse = {
  items: [],
  total: 0,
  page: 1,
  page_size: 50,
};

export const mockCreditsResponse = {
  remaining: 120,
  total: 200,
  used: 80,
  breakdown: {
    resumeOptimization: 20,
    interviewPrep: 15,
    autoApply: 30,
    negotiation: 15,
  },
};

export async function mockCandidateApis(page: Page): Promise<void> {
  await page.route("**/dashboard/candidate**", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(mockDashboardResponse) }),
  );
  await page.route("**/resume**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/jobs**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockJobsResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/applications**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApplicationsResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/users/me/settings**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        email_notifications: true,
        sms_notifications: false,
        marketing_emails: false,
        auto_apply_enabled: false,
        skill_match_threshold: 70,
        preferred_locations: [],
        preferred_job_types: [],
        theme: "system",
      }),
    }),
  );
  await page.route("**/users/me**", (route) => {
    if (route.request().url().includes("/settings")) {
      return route.continue();
    }
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        username: "e2e-user",
        email: "e2e@example.com",
        full_name: "E2E User",
        headline: "",
        updated_at: "2026-06-01T00:00:00Z",
      }),
    });
  });
  await page.route("**/users/me/credits/usage**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockCreditsResponse),
    }),
  );
}
