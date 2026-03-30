export type CareerDetail = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  experience: string;
  salary: string;
  description: string;
};

export const careerDetails: CareerDetail[] = [
  {
    id: 1,
    slug: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    posted: "2025-02-01",
    experience: "5+ years",
    salary: "₹15-25L",
    description: `We're looking for an experienced Frontend Developer to join our engineering team and help build the future of career success platforms.

## Responsibilities
- Develop and maintain responsive web applications using React and Next.js
- Collaborate with designers and backend engineers to implement user interfaces
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-documented code

## Requirements
- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and Next.js
- Experience with modern CSS frameworks (Tailwind CSS)
- Understanding of web performance optimization`,
  },
  {
    id: 2,
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote / Mumbai",
    type: "Full-time",
    posted: "2025-01-28",
    experience: "3+ years",
    salary: "₹12-18L",
    description: `Join our design team and help create beautiful, intuitive experiences for millions of job seekers across India.

## Responsibilities
- Design user interfaces and experiences for web and mobile platforms
- Create wireframes, prototypes, and high-fidelity designs
- Collaborate with product managers and engineers throughout the design process

## Requirements
- 3+ years of experience in product design or UI/UX design
- Strong portfolio showcasing design skills
- Proficiency in design tools (Figma, Adobe Creative Suite)`,
  },
  {
    id: 3,
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Hyderabad",
    type: "Full-time",
    posted: "2025-01-25",
    experience: "4+ years",
    salary: "₹18-30L",
    description: `Help us build cutting-edge AI features that power resume optimization, job matching, and career guidance.

## Responsibilities
- Develop and deploy machine learning models for resume analysis and job matching
- Work on NLP tasks including text classification, extraction, and generation
- Optimize model performance and scalability

## Requirements
- 3+ years of experience in machine learning or AI engineering
- Strong programming skills in Python
- Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)`,
  },
  {
    id: 4,
    slug: "content-marketing-manager",
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-20",
    experience: "3+ years",
    salary: "₹10-15L",
    description: `Drive our content strategy and help job seekers succeed through valuable, engaging content.

## Responsibilities
- Develop and execute content marketing strategy
- Create blog posts, guides, and other content assets
- Collaborate with SEO team to optimize content

## Requirements
- 4+ years of experience in content marketing
- Excellent writing and editing skills
- Understanding of SEO best practices`,
  },
  {
    id: 5,
    slug: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / Delhi",
    type: "Full-time",
    posted: "2025-01-15",
    experience: "3+ years",
    salary: "₹12-20L",
    description: `Build reliable backend systems for AI-powered products with strong observability, performance, and security.`,
  },
  {
    id: 6,
    slug: "ux-researcher",
    title: "UX Researcher",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-10",
    experience: "2+ years",
    salary: "₹8-12L",
    description: `Lead user research programs to improve conversion, product usability, and accessibility across the platform.`,
  },
];

export const careerIdToSlug = Object.fromEntries(careerDetails.map((job) => [String(job.id), job.slug]));
