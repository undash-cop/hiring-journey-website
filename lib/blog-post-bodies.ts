export type BlogFaqItem = { question: string; answer: string };

export type BlogPostBody = {
  content: string;
  faq: BlogFaqItem[];
};

/** Unique markdown + FAQ per post id (matches `blogSummarySeed` ids). */
export const blogPostBodiesById: Record<number, BlogPostBody> = {
  1: {
    content: `## Why ATS parsing matters in India in 2026
Most large employers and well-funded startups still route resumes through applicant tracking systems before a human reads them. In India, that often means keyword matching against role JDs, plus basic structure checks. AI resume analyzers help you see gaps—missing skills, weak section order, bullets that read like job duties instead of outcomes.

## What good AI feedback actually looks like
Use tools that explain *why* a line scored low, not just a percentage. Strong signals: role alignment score against a pasted JD, readability for six-second scans, and duplicate phrasing across sections. Weak signals: opaque “AI strength” numbers with no actionable edits.

## A weekly workflow that compounds
1) Paste your target JD and run a diff report against your resume.
2) Rewrite the top five bullets with metric + verb + scope (team size, latency cut, revenue impact where allowed).
3) Export a plain-text version for forms that strip formatting, and keep one PDF with consistent headings for human reviewers.

## Red flags to avoid
Keyword stuffing reads unnatural and can hurt both ATS parsing and human trust. Prefer synonyms from the JD used once in context. Avoid invisible text or tiny fonts—some parsers flag manipulation.

## India-specific nuance
Campus and off-campus drives often batch-parse thousands of resumes in hours. Shorter, scannable summaries and a clear “skills” block aligned to the JD still outperform clever layouts.`,
    faq: [
      {
        question: "Will an AI resume tool replace a human review?",
        answer:
          "No. Treat it as a first-pass editor. You still need stories that match interview depth and a narrative that fits the company stage.",
      },
      {
        question: "Should I optimize one resume per company?",
        answer:
          "For high-priority roles, yes—light tailoring beats one generic file. Keep a master resume and fork copies with tracked changes.",
      },
    ],
  },
  2: {
    content: `## How mock interviews changed in India
Remote hiring normalized async and live video loops. AI mock interviews now give structure: timed answers, follow-up prompts, and rubrics for clarity. They are especially useful when campus placement schedules are tight and peer practice is uneven.

## What to practice first
Start with HR behavioral prompts, then add role-specific drills. For engineering, mix one system design prompt a week with two coding explain-backs—where you narrate trade-offs without an IDE.

## Using feedback without overfitting
If the AI flags filler words, fix delivery—not just the script. If it scores low on structure, outline in STAR (Situation, Task, Action, Result) but keep answers under 90 seconds for phone screens.

## Pair AI drills with humans
Use AI for volume and consistency; use mentors or friends for calibration on culture fit and salary conversations. Record yourself, watch once, delete—most gains come from noticing pace and eye contact.

## Metrics that matter
Track time-to-answer, restarts, and whether you answered the question asked. A high word count with no result is a common failure mode.`,
    faq: [
      {
        question: "Can AI mock interviews replace real panel practice?",
        answer:
          "They complement it. Panels add ambiguity and follow-ups that are hard to simulate—use both.",
      },
      {
        question: "What mic and lighting setup is enough?",
        answer:
          "Clear audio matters more than 4K video. A quiet room and a ₹2k USB mic beat a noisy HD camera.",
      },
    ],
  },
  3: {
    content: `## What “smart matching” optimizes
Job-matching models score overlap between your skills, seniority signals, and role text. In India’s market, location flexibility, notice period, and compensation bands also get inferred from forms and profiles—sometimes noisily.

## Make your profile machine-legible
Normalize skill names (e.g., “React.js” vs “ReactJS”), list recent tools with time bounds, and avoid empty role descriptions. Matching systems punish vague titles like “Software Engineer” with no domain.

## The human layer still decides
Shortlists are often re-ranked by recruiters. A strong match score gets you seen; crisp bullets and referrals still convert. Treat alerts as a trigger to customize, not auto-apply blindly.

## Privacy and duplication
If you syndicate the same resume across five boards, dedupe your inbox and track where you applied. Some employers dislike duplicate ATS entries from multiple sources.

## When matching goes wrong
If you see irrelevant roles, refresh skills, remove stale keywords, and tighten location preferences. Report bad matches where the product allows—it improves models over time.`,
    faq: [
      {
        question: "Why do I see irrelevant job matches?",
        answer:
          "Noisy profiles, outdated skills, or broad location settings. Tighten one variable at a time and re-evaluate weekly.",
      },
      {
        question: "Does applying to more jobs always help?",
        answer:
          "Volume without fit hurts response quality. Prioritize roles where you can write a specific cover note or referral path.",
      },
    ],
  },
  4: {
    content: `## What auto-apply promises—and where it breaks
Automation can fill repetitive fields and queue applications while you sleep. The risk is generic answers and mismatched JDs that burn bridges with teams that read cover letters carefully.

## Guardrails that work
Maintain a shortlist of companies and role families. Cap daily sends. Require a human review step for answers above 50 words. Never submit to roles where you cannot speak to the product.

## Personalization at scale
Keep snippets: why this company, why this domain, one relevant project. Swap two sentences per application instead of pasting identical intros.

## Tracking is non-negotiable
Use a spreadsheet or lightweight CRM: company, role, date, referrer, status. Auto-apply without tracking creates embarrassing double emails and missed follow-ups.

## India hiring etiquette
Some recruiters appreciate persistence; others blacklist spray-and-pray. When in doubt, slower targeted outreach beats hundred-click blasts.`,
    faq: [
      {
        question: "Is auto-apply safe for campus hiring?",
        answer:
          "Usually no—many campuses require portal-specific forms and deadlines. Use automation for external applications only where allowed.",
      },
      {
        question: "How do I avoid looking like a bot?",
        answer:
          "Human-review free-text fields, mention one concrete product detail, and keep tone consistent with your resume voice.",
      },
    ],
  },
  5: {
    content: `## How AI assists negotiation—not replaces judgment
Salary copilots aggregate public ranges, survey data, and role ladders. They help you phrase asks and time counteroffers. They cannot know your runway, competing offers, or internal band strictness.

## Data hygiene before you negotiate
Verify currency, years of experience bucket, and city. “India average” numbers often hide startup vs MNC spreads. Cross-check two sources minimum.

## Scripts that land
Anchor with a researched range, justify with scope (team size, ownership), and leave space for non-cash value: learning budget, remote days, title.

## When AI suggestions feel aggressive
If a script reads combative, soften with collaborative language: “Based on market data for Bangalore backend roles at this level, I was expecting…”

## Legal and policy boundaries
Never share confidential offer letters with third-party tools. Summarize numbers manually if you use an assistant.`,
    faq: [
      {
        question: "Should I disclose competing offers?",
        answer:
          "Only when true and strategically necessary. Some companies respond well; others withdraw. Assess trust and stage first.",
      },
      {
        question: "What if the band is fixed?",
        answer:
          "Shift to sign-on bonus, equity, review timeline, or learning budget—sometimes flexibility exists outside base.",
      },
    ],
  },
  6: {
    content: `## Credits vs subscriptions
Usage-based credits fit intermittent job seekers—you pay when you refresh a resume or run a mock. Subscriptions reward heavy practice. Pick based on months active, not hype.

## How credits usually drain
Resume rewrites, mock sessions, and JD scans are priced differently. Watch expirations and rollover rules; some bundles reset monthly.

## Budgeting for a search sprint
If you are interviewing actively, estimate weekly usage: two mocks, one resume pass, one JD scan. Multiply by eight weeks and compare plans.

## Quality per credit
Favor vendors that show diff-style edits and rubrics. Opaque scores waste credits without teaching.

## India payment realities
UPI and cards should both work; check invoices for GST. Enterprise pilots sometimes offer student discounts—ask politely with a .edu or placement proof.`,
    faq: [
      {
        question: "Do unused credits roll over?",
        answer:
          "Depends on the product—read the billing FAQ. Assume monthly pools expire unless stated otherwise.",
      },
      {
        question: "Are free tiers enough to start?",
        answer:
          "Often yes for diagnostics. Pay when you need depth: full mock panels or multi-JD optimization.",
      },
    ],
  },
  7: {
    content: `## What a headline does in six seconds
Headlines sit under your name and above the summary. They should state role, level, and domain—not buzzwords. In India, adding city or remote preference can improve recruiter scan speed.

## Formulas that work
“Senior Backend Engineer | Payments | Go” or “Data Analyst | SQL & Looker | Bangalore”. Avoid “passionate” unless you back it with proof in bullets.

## ATS-friendly length
Keep under 120 characters where possible. Use pipe separators; avoid emojis on conservative enterprise forms.

## Examples tuned for Indian hiring
Product: “Associate PM | B2B SaaS | Onboarding & Activation”. QA: “SDET | API Automation | Cypress”. Fresher: “CS Grad | Backend Internship | Java & Spring”.

## Iterate with data
A/B test two headlines every two weeks if response rates are low. Change one variable at a time.`,
    faq: [
      {
        question: "Should freshers write ‘open to any role’?",
        answer:
          "Too broad hurts matching. Pick a primary track and mention openness in the summary instead.",
      },
      {
        question: "Is mentioning salary in the headline wise?",
        answer:
          "Generally no—negotiation should come later unless the platform explicitly expects it.",
      },
    ],
  },
  8: {
    content: `## Why HR rounds still filter hard
HR screens check communication, stability, motivation, and policy fit. In India, notice period and location often surface here—not only in ops rounds.

## Questions you should nail
Tell me about yourself. Why this company? Why leaving? Salary expectations. Handling conflict. Failure story. Strengths and weaknesses without clichés.

## STAR without sounding robotic
Outline mentally, answer conversationally. Drop data points: timeline, team size, business impact.

## Notice period honesty
Misrepresenting notice burns trust fast. If negotiable, say how early buyout might work.

## Remote and hybrid framing
Show how you collaborate async, document decisions, and respect time zones—especially for India + global teams.`,
    faq: [
      {
        question: "How long should answers be?",
        answer:
          "Aim for 60–90 seconds live. Written forms: 120–180 words unless specified.",
      },
      {
        question: "What if salary question comes early?",
        answer:
          "Give a researched range and ask their band to align—politely and factually.",
      },
    ],
  },
  9: {
    content: `## Week 1–2: Foundations
Learn testing vocabulary, basic test case design, and one automation tool path (e.g., Cypress or Playwright). Ship a tiny demo project testing a public API or open-source UI.

## Week 3–4: Portfolio signal
Write READMEs with scope, risks, and test strategy. Add CI running your suite on push. Recruiters scan for discipline, not enterprise scale.

## Week 5–6: Interview shape
Practice exploratory testing narratives, bug reporting clarity, and a live automation walkthrough. Pair with a friend weekly.

## Week 7–8: Mock and apply
Target startups hiring QA generalists; tailor resume bullets to automation + manual depth. Expect system knowledge questions on releases and environments.

## Week 9–12: Iterate
Reflect on rejections—was it tool depth, communication, or domain? Adjust the next month’s focus accordingly.`,
    faq: [
      {
        question: "Do I need ISTQB to switch to QA?",
        answer:
          "Helpful for some enterprises, not mandatory for many startups. Prioritize demonstrable automation projects first.",
      },
      {
        question: "Can manual testers move without coding?",
        answer:
          "Partially—learn scripting basics. Even light JS helps for modern web automation stacks.",
      },
    ],
  },
  10: {
    content: `## How to read 2026 India ranges
Ranges vary by funding stage, cloud vs product shop, and hybrid policies. Treat public charts as directional—your offer depends on leverage, niche skills, and timing.

## City adjustments
Bangalore and Hyderabad often lead for product engineering; Pune remains strong for enterprise IT. Remote-first roles may pay metro-equivalent or slightly lower—read the fine print on location clauses.

## Experience bands
Freshers: focus on learning curve and project proof. Mid-level: ownership breadth. Senior: scope, ambiguity, and mentoring. Don’t compare across bands blindly.

## Equity and cash
Startups may weight equity; ask about refreshers and cliffs. MNCs may emphasize fixed pay and benefits—compare total comp, not headline.

## Using benchmarks responsibly
Share ranges, not individual offers, when crowdsourcing. Protect confidentiality clauses.`,
    faq: [
      {
        question: "When should I discuss salary?",
        answer:
          "After you understand role scope. Early screening may need a broad band—keep it researched, not random.",
      },
      {
        question: "Are Glassdoor numbers reliable in India?",
        answer:
          "Use them as one signal. Cross-check with recent offers from trusted peers and recruiter posts.",
      },
    ],
  },
  11: {
    content: `## Signals we are watching in March 2026
Product and platform roles remain active where monetization pressure is high. Data roles favor analysts who can ship dashboards, not only models. QA with automation + CI fluency sees fewer resume-only shortlists.

## What candidates should adjust
Lead with business outcomes in bullets. Show collaboration artifacts—RFCs, docs, incident reviews. For remote, evidence of async communication matters.

## Interview bar
More live debugging, fewer trivia lists. Prepare to explain recent prod issues you’ve seen or simulated.

## Geography
Tier-2 hiring holds steady for support and implementation roles; product hubs still concentrate but hybrid policies oscillate—verify per company.

## Practical weekly plan
Update one project story, run one mock, and send five targeted applications with tailored intros.`,
    faq: [
      {
        question: "Are layoff cycles still affecting hiring?",
        answer:
          "Selective freezes exist, but many teams still hire for revenue-critical roles. Target problem statements, not logos only.",
      },
      {
        question: "Should I upskill in AI tools?",
        answer:
          "Yes for productivity and some roles, but don’t neglect fundamentals recruiters still test.",
      },
    ],
  },
  12: {
    content: `## Scope for two years experience
Expect to discuss one end-to-end feature, data consistency, and basic scaling. Deep CAP theorem lectures matter less than clear trade-offs on caching, queues, and DB choice.

## Study map (four weeks)
Week 1: APIs, auth, pagination, idempotency. Week 2: Caching and CDNs. Week 3: Async processing and backpressure. Week 4: Observability (logs, metrics, traces) tied to incidents.

## Mock format
Pick prompts like “URL shortener” or “notification system.” Draw boxes, note failure modes, estimate rough capacity.

## Communication tips
State assumptions, ask clarifying questions, and timebox depth. Interviewers reward structured exploration.

## India interview quirks
Some panels mix DSA with high-level design—clarify which round you are in before diving deep.`,
    faq: [
      {
        question: "Do I need microservices experience?",
        answer:
          "Understand pros/cons. Many roles still ship modular monoliths—show you can evolve architecture responsibly.",
      },
      {
        question: "How deep on math?",
        answer:
          "Basic throughput/latency intuition helps. Heavy math is rare unless the team says so upfront.",
      },
    ],
  },
  13: {
    content: `## Week -4: Resume and links
One-page resume, GitHub with readable README, LinkedIn aligned to projects. Remove unused accounts that confuse search results.

## Week -3: Skills proof
Pick one stack, build a small deployed project, write tests or checks. Document what broke and how you fixed it.

## Week -2: Interview basics
Behavioral stories, company research template, mock HR call. Practice typing answers for forms with character limits.

## Week -1: Applications
Target roles with clear learning paths. Track every submission. Prepare questions for interviewers about team size and mentorship.

## Ongoing: Health and cadence
Sleep and consistency beat cramming. Batch applications to reduce anxiety spikes.`,
    faq: [
      {
        question: "How many applications per week?",
        answer:
          "Quality over count—5–10 thoughtful applies beat 50 blank forms for most freshers.",
      },
      {
        question: "Internship or wait for full-time?",
        answer:
          "If finances allow, internships build signal. Convert when possible; document outcomes.",
      },
    ],
  },
  14: {
    content: `## Core stack for India analyst roles in Q2 2026
SQL remains non-negotiable—window functions, joins, and performance intuition. Add one BI tool (Power BI, Looker Studio, or Tableau) and a spreadsheet layer for finance partners.

## Storytelling skills
Translate charts into decisions. Practice “insight, evidence, recommendation” in five sentences.

## Portfolio pieces
Public datasets on Indian themes (e.g., mobility, prices) with clean dashboards beat Kaggle medals without narrative.

## Domain paths
Fintech expects risk and funnel metrics; e-commerce cares about cohorts and inventory; SaaS cares about activation and churn.

## Interview drills
Metric definitions, experiment basics, and SQL live screens. rehearse clarifying questions before writing queries.`,
    faq: [
      {
        question: "Do I need Python for every analyst job?",
        answer:
          "Increasingly helpful, but not always mandatory. Read JDs—some roles are SQL + BI only.",
      },
      {
        question: "How much stats is required?",
        answer:
          "Basics of distributions and hypothesis tests help. Deep theory matters more for research-heavy roles.",
      },
    ],
  },
  15: {
    content: `## Kubernetes topics that come up
Pods, deployments, services, ingress, config maps, secrets, probes, resource limits, and rollout strategies. Be ready to sketch a cluster boundary and where CI fits.

## CI/CD angles
Pipeline stages, artifact promotion, canaries, and rollback. Tie answers to incidents you’ve handled or simulated.

## Observability
Metrics vs logs vs traces. Alert fatigue and SLO thinking—how you’d page on user-visible errors.

## Security and access
RBAC basics, least privilege, image scanning at a high level.

## Practical prep
Run minikube or a managed trial. Break things on purpose—failed deploys teach faster than slides.`,
    faq: [
      {
        question: "Is CKA required?",
        answer:
          "Useful for some employers, not universal. Hands-on beats certificates if time is tight.",
      },
      {
        question: "How deep on networking?",
        answer:
          "Understand DNS, TLS termination at ingress, and service discovery—deep packet analysis is rarely required.",
      },
    ],
  },
  16: {
    content: `## Frameworks interviewers expect
RCA for metrics drops, RICE/ICE for prioritization, CIRCLES for product sense, and structured user story refinement. Use them lightly—interviewers want judgment, not acronyms.

## India startup context
Resource constraints, regulatory quirks, and mobile-first users. Show you can scope MVPs and say no with data.

## Execution signals
Talk about working with design and engineering, writing crisp specs, and measuring launches with guardrails.

## Case practice
Do one case weekly timed. Record yourself, critique clarity, repeat.

## Stakeholder stories
Conflicting priorities between growth and compliance, sales asks vs tech debt—prepare balanced narratives.`,
    faq: [
      {
        question: "Do I need an MBA?",
        answer:
          "Not strictly. Strong execution stories and analytics depth can substitute if presented crisply.",
      },
      {
        question: "How technical should PMs be?",
        answer:
          "Enough to sniff out feasibility and trade-offs—deep coding is usually optional unless stated.",
      },
    ],
  },
  17: {
    content: `## How we picked tools this month
We bias toward products with clear India pricing, UPI or card support, and outputs you can verify (diffs, transcripts, citations). Ephemeral hype tools that hide pricing were cut.

## Categories covered
Resume intelligence, mock interviews, salary benchmarking, and application tracking. We tested onboarding friction and export options.

## Usage tips
Start with free tiers to map fit, then buy the smallest paid tier during an active search week. Cancel immediately if you are not interviewing.

## Ethics and data
Prefer vendors that state data retention and model training policies. Avoid uploading confidential employer docs.

## What’s coming next quarter
More localized JD libraries and better Indian language support in transcripts—watch release notes before committing annual plans.`,
    faq: [
      {
        question: "Are these endorsements paid?",
        answer:
          "No paid placements in this roundup—selection is editorial based on hands-on checks and pricing clarity.",
      },
      {
        question: "How often is the list updated?",
        answer:
          "Monthly cadence; tool APIs and pricing change fast—verify before purchase.",
      },
    ],
  },
};
