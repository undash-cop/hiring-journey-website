export const keywordClusters = {
  aiCareerToolsIndia: [
    "AI resume builder India",
    "AI interview preparation India",
    "AI career tools India",
    "AI job tools India",
  ],
  automationTestingIndia: [
    "automation testing roadmap India",
    "automation testing salary India",
    "selenium roadmap India",
    "career switch to testing India",
  ],
  softwareEngineeringRoadmaps: [
    "software engineer roadmap India",
    "full stack developer roadmap India",
    "backend developer roadmap India",
  ],
  salaryInsightsIndia: [
    "salary insights India",
    "software engineer salary India",
    "automation tester salary India",
    "fresher salary India",
  ],
  careerSwitchRoadmaps: [
    "career switch roadmap India",
    "job preparation roadmap India",
    "skill roadmap India",
  ],
};

export const keywordToPageMapping: Array<{ page: string; keywords: string[] }> = [
  {
    page: "/tools/ai-resume-builder",
    keywords: keywordClusters.aiCareerToolsIndia,
  },
  {
    page: "/career/automation-tester/roadmap",
    keywords: keywordClusters.automationTestingIndia,
  },
  {
    page: "/career/software-engineer/roadmap",
    keywords: keywordClusters.softwareEngineeringRoadmaps,
  },
  {
    page: "/salary/software-engineer/india",
    keywords: keywordClusters.salaryInsightsIndia,
  },
  {
    page: "/career/full-stack-developer/roadmap",
    keywords: keywordClusters.careerSwitchRoadmaps,
  },
];

export const roleRoadmaps = [
  "automation-tester",
  "full-stack-developer",
  "data-analyst",
  "software-engineer",
  "backend-developer",
] as const;

export const salaryLocations = ["india", "bangalore", "hyderabad", "pune", "mumbai"] as const;

export const blogCategories = [
  "interview-questions",
  "resume-tips",
  "career-growth",
  "salary-guides",
  "ai-tools",
  "job-market-india",
  "freshers-guide",
  "automation-testing",
  "software-engineering",
  "data-science",
  "devops",
  "product-management",
] as const;
