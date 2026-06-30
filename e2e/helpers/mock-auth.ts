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

export const mockResumeVersionsResponse = {
  items: [
    {
      id: 1,
      name: "Default Resume",
      target_role: "Frontend Developer",
      created_at: "2026-06-01T00:00:00Z",
      score: 72,
      is_default: true,
      template_id: "modern-blue",
    },
  ],
};

export const mockResumeTemplatesResponse = {
  items: [
    {
      id: "modern-blue",
      name: "Modern Blue",
      category: "modern",
      description: "Clean and contemporary design perfect for tech roles",
      preview: "modern-blue-preview.jpg",
      ats_friendly: true,
      is_popular: true,
    },
  ],
};

export const mockResumeBuilderResponse = {
  version_id: 1,
  template: "modern-blue",
  sections: [
    { id: "personal", type: "personal", title: "Personal Information", content: "", order: 1, is_visible: true },
    { id: "summary", type: "summary", title: "Professional Summary", content: "", order: 2, is_visible: true },
  ],
  personal_info: {
    name: "E2E User",
    email: "e2e@example.com",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  summary: "Experienced developer ready for new opportunities.",
  experience: [],
  education: [],
  skills: { technical: ["TypeScript"], soft: [], languages: [] },
  certifications: [],
  projects: [],
};

export const mockResumeAnalysisResponse = {
  overall_score: 78,
  ats_score: 75,
  keyword_match: 70,
  formatting_score: 85,
  content_score: 72,
  strengths: ["Professional summary is present"],
  weaknesses: ["Add at least one work experience entry"],
  missing_keywords: ["react"],
  skills_gap: ["react"],
  recommendations: [],
  parsed_data: mockResumeBuilderResponse,
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

export const mockBillingPlansResponse = [
  {
    id: 1,
    name: "Free",
    slug: "free",
    description: "Perfect for trying out Hiring Journey",
    credit_limit: 50,
    price: 0,
    yearly_price: 0,
    features: ["Resume scan (limited)", "Job discovery"],
    is_free: true,
    sort_order: 1,
  },
  {
    id: 2,
    name: "Basic",
    slug: "basic",
    description: "Essential tools",
    credit_limit: 100,
    price: 29000,
    yearly_price: 290000,
    features: ["100 AI credits/month"],
    is_free: false,
    sort_order: 2,
  },
];

export const mockBillingSubscriptionResponse = {
  subscription: {
    id: 1,
    plan_id: 2,
    plan_name: "Basic",
    plan_slug: "basic",
    status: "active",
    billing_cycle: "monthly",
    current_period_start: "2026-06-01T00:00:00Z",
    current_period_end: "2026-07-01T00:00:00Z",
    cancel_at_period_end: false,
    pending_plan_id: null,
    pending_plan_name: null,
    provider: "mock",
  },
};

export const mockBillingInvoicesResponse = [
  {
    id: 1,
    invoice_number: "INV-2026-00001",
    plan_id: 2,
    plan_name: "Basic",
    amount: 29000,
    currency: "INR",
    status: "paid",
    billing_cycle: "monthly",
    failure_reason: null,
    paid_at: "2026-06-01T00:00:00Z",
    created_at: "2026-06-01T00:00:00Z",
  },
];

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

export const mockAdminPlatformSettingsResponse = {
  platform_display_name: "Hiring Journey",
  support_email: "support@hiringjourney.com",
  default_candidate_credits: 200,
  linkedin_integration_enabled: false,
  indeed_integration_enabled: false,
  updated_at: "2026-06-01T00:00:00Z",
};

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

export const mockAdminContactSubmissionsResponse = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Enterprise pricing",
    message: "We would like to learn more about team plans.",
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
    const url = route.request().url();
    if (route.request().method() === "GET" && /\/admin\/jobs\/\d+/.test(url)) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminJobsResponse[0]),
      });
    }
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminJobsResponse),
      });
    }
    if (route.request().method() === "POST" && url.includes("/publish")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, external_posting_ids: { linkedin: "ln_1" } }),
      });
    }
    if (route.request().method() === "PATCH") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
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
  await page.route("**/admin/plans**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminPlansResponse),
      });
    }
    if (route.request().method() === "POST" || route.request().method() === "PATCH") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminPlansResponse[0]),
      });
    }
    return route.continue();
  });
  await page.route("**/admin/platform-settings**", (route) => {
    if (route.request().method() === "GET" || route.request().method() === "PUT") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAdminPlatformSettingsResponse),
      });
    }
    return route.continue();
  });
  await page.route("**/admin/audit-logs**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockAdminAuditLogsResponse),
    }),
  );
  await page.route("**/admin/contact-submissions**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockAdminContactSubmissionsResponse),
    }),
  );
}

export async function mockCandidateApis(page: Page): Promise<void> {
  await page.route("**/dashboard/candidate**", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(mockDashboardResponse) }),
  );
  await page.route("**/resume**", async (route) => {
    const url = route.request().url();
    const method = route.request().method();

    if (url.includes("/resume/templates") && method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeTemplatesResponse),
      });
    }
    if (url.includes("/resume/versions") && method === "GET" && !url.includes("/builder") && !url.includes("/export")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeVersionsResponse),
      });
    }
    if (url.includes("/resume/versions") && url.includes("/builder") && method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeBuilderResponse),
      });
    }
    if (url.includes("/resume/versions") && url.includes("/builder") && method === "PUT") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeBuilderResponse),
      });
    }
    if (url.includes("/resume/analysis") && method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResumeAnalysisResponse),
      });
    }
    if (url.includes("/resume/suggestions") && method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: ["Experienced developer with proven outcomes."] }),
      });
    }
    if (url.includes("/resume/parse") && method === "POST") {
      const { version_id: _ignored, ...parsedPayload } = mockResumeBuilderResponse;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          version_id: 1,
          ...parsedPayload,
        }),
      });
    }
    if (url.includes("/resume/versions") && url.includes("/export") && method === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          content: "Default Resume\nSUMMARY\nExperienced developer.",
          filename: "Default Resume.txt",
          mime_type: "text/plain",
        }),
      });
    }
    if (url.endsWith("/resume") && method === "GET") {
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
  await page.route("**/billing/plans**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockBillingPlansResponse),
    }),
  );
  await page.route("**/billing/subscription**", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockBillingSubscriptionResponse),
      });
    }
    if (route.request().method() === "PATCH") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          subscription: { ...mockBillingSubscriptionResponse.subscription, cancel_at_period_end: true },
        }),
      });
    }
    return route.continue();
  });
  await page.route("**/billing/invoices**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockBillingInvoicesResponse),
    }),
  );
  await page.route("**/billing/checkout**", (route) => {
    if (route.request().method() === "POST" && route.request().url().includes("confirm")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, subscription: mockBillingSubscriptionResponse.subscription }),
      });
    }
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          checkout_session_id: 99,
          invoice_id: 99,
          order_id: "order_mock_e2e",
          amount: 29000,
          currency: "INR",
          plan_id: 2,
          plan_name: "Basic",
          billing_cycle: "monthly",
          mock: true,
          free: false,
        }),
      });
    }
    return route.continue();
  });
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
  await page.route("**/legal/documents**", async (route) => {
    const method = route.request().method();
    const url = route.request().url();
    if (method === "GET" && !url.includes("/download")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [] }),
      });
    }
    if (method === "POST" && !url.includes("/validate")) {
      return route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          type: "offer-letter",
          name: "Offer_Letter.docx",
          status: "pending",
          uploaded_at: "2026-06-01T00:00:00Z",
          has_file: true,
          size_bytes: 1024,
        }),
      });
    }
    return route.continue();
  });
  await page.route("**/coding/challenges**", (route) => {
    const url = route.request().url();
    const method = route.request().method();
    const detailMatch = url.match(/\/coding\/challenges\/(\d+)(?:\?|$)/);

    if (method === "GET" && detailMatch) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          title: "Two Sum",
          description:
            "Given an array of integers, return indices of the two numbers such that they add up to a target.",
          difficulty: "easy",
          category: "arrays",
          tags: ["hash-table", "arrays"],
          solved: false,
          attempts: 0,
          executable: true,
          starter_code: "def two_sum(nums, target):\n    pass\n",
          function_name: "two_sum",
        }),
      });
    }
    if (method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          items: [
            {
              id: 1,
              title: "Two Sum",
              description:
                "Given an array of integers, return indices of the two numbers such that they add up to a target.",
              difficulty: "easy",
              category: "arrays",
              tags: ["hash-table", "arrays"],
              solved: false,
              attempts: 0,
              executable: true,
            },
          ],
        }),
      });
    }
    if (method === "POST" && url.includes("/submit")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          challenge_id: 1,
          passed: 3,
          total: 3,
          results: [
            { case: 1, pass: true },
            { case: 2, pass: true },
            { case: 3, pass: true },
          ],
          solved: true,
          attempts: 1,
        }),
      });
    }
    if (method === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ challenge_id: 1, solved: false, attempts: 1 }),
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
