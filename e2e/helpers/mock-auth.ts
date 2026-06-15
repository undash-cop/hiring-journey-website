import type { Page } from "@playwright/test";

/** Prevent Keycloak SSO / silent-check redirects from aborting in-app navigation during E2E. */
export async function blockKeycloakRedirects(page: Page): Promise<void> {
  await page.route(/auth\.example\.com|openid-connect|silent-check-sso/i, (route) =>
    route.fulfill({ status: 204, body: "" }),
  );
}

function seedAuthStorageScript(role: "candidate" | "admin", name: string, email: string, sub: string) {
  return () => {
    const payload = {
      sub,
      email,
      preferred_username: name,
      realm_access: { roles: [role] },
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
            name,
            email,
            role,
          },
          token,
          refreshToken: null,
          role,
        },
        version: 0,
      }),
    );
  };
}

export async function seedCandidateSession(page: Page): Promise<void> {
  await page.addInitScript(seedAuthStorageScript("candidate", "E2E User", "e2e@example.com", "e2e-candidate"));
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

export async function seedAdminSession(page: Page): Promise<void> {
  await page.addInitScript(seedAuthStorageScript("admin", "E2E Admin", "admin@example.com", "e2e-admin"));
}

export const mockAdminStatsResponse = {
  total_candidates: 42,
  active_jobs: 8,
  applications: 120,
  credit_usage: 3500,
  funnel: {
    applied: 120,
    interviewScheduled: 45,
    interviewCompleted: 30,
    offer: 12,
  },
  job_performance: [
    {
      job_id: 1,
      job_title: "Frontend Engineer",
      applications: 25,
      conversions: 5,
    },
  ],
};

export const mockAdminJobsResponse = [
  {
    id: 1,
    title: "Frontend Engineer",
    description: "Build product UI",
    skills: ["React"],
    location: "Remote",
    salary_range: { min: 800000, max: 1200000 },
    employment_type: "full-time",
    status: "published",
    applicant_count: 12,
    created_at: "2026-06-01T00:00:00Z",
    source: "internal",
  },
];

export const mockAdminApplicationsResponse = [
  {
    id: 1,
    job_id: 1,
    job_title: "Frontend Engineer",
    candidate_id: 10,
    candidate_name: "Jane Candidate",
    status: "applied",
    applied_at: "2026-06-01T00:00:00Z",
    resume_score: 78,
  },
];

export const mockAdminCandidatesResponse = [
  {
    id: 10,
    name: "Jane Candidate",
    email: "jane@example.com",
    resume_score: 78,
    credits_used: 40,
    credits_total: 200,
    status: "active",
    joined_at: "2026-05-01T00:00:00Z",
  },
];

export const mockAdminPlansResponse = [
  {
    id: 1,
    name: "Starter",
    credit_limit: 200,
    price: 999,
    usage: 80,
  },
];

export const mockAdminAuditLogsResponse = [
  {
    id: 1,
    actor_sub: "e2e-admin",
    action: "job.publish",
    resource_type: "job",
    resource_id: "1",
    old_value: null,
    new_value: "published",
    created_at: "2026-06-01T00:00:00Z",
  },
];

export async function mockAdminApis(page: Page): Promise<void> {
  await page.route("**/admin/stats**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockAdminStatsResponse),
    }),
  );
  await page.route("**/admin/jobs**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminJobsResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/admin/applications**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminApplicationsResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/admin/candidates**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminCandidatesResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/admin/plans**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockAdminPlansResponse),
    }),
  );
  await page.route("**/admin/audit-logs**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockAdminAuditLogsResponse),
    }),
  );
}

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
  await page.route("**/interview/questions**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: ["Tell me about yourself."] }),
    }),
  );
  await page.route("**/interview/sessions**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: [], average_score: 0, total_sessions: 0 }),
    }),
  );
  await page.route("**/negotiation/frameworks**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: 1,
            title: "Salary Negotiation Framework",
            description: "Step-by-step guide",
            steps: ["Research market rates"],
            tips: ["Use data"],
            templates: ["Email template"],
          },
        ],
      }),
    }),
  );
  await page.route("**/negotiation/market-insights**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        average_salary: 1250000,
        your_offer: 1200000,
        market_range: { min: 1100000, max: 1400000 },
      }),
    }),
  );
  await page.route("**/legal/documents**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [] }),
      });
    }
    return route.continue();
  });
  await page.route("**/auto-apply/profiles**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [] }),
      });
    }
    return route.continue();
  });
}
