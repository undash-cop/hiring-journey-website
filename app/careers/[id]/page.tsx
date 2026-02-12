import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock, ArrowLeft, ArrowRight, Mail } from "lucide-react";

// Mock job openings - Replace with API calls
const jobOpenings: Record<string, any> = {
  "1": {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    posted: "2025-02-01",
    description: `
We're looking for an experienced Frontend Developer to join our engineering team and help build the future of career success platforms.

## Responsibilities

- Develop and maintain responsive web applications using React and Next.js
- Collaborate with designers and backend engineers to implement user interfaces
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-documented code
- Participate in code reviews and contribute to technical discussions
- Stay up-to-date with the latest frontend technologies and best practices

## Requirements

- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and Next.js
- Experience with modern CSS frameworks (Tailwind CSS)
- Familiarity with state management solutions
- Understanding of web performance optimization
- Excellent problem-solving and communication skills
- Bachelor's degree in Computer Science or related field (or equivalent experience)

## Nice to Have

- Experience with Framer Motion or similar animation libraries
- Knowledge of accessibility standards (WCAG)
- Experience with testing frameworks (Jest, React Testing Library)
- Understanding of SEO best practices

## What We Offer

- Competitive salary and equity package
- Flexible work arrangements
- Health insurance and wellness programs
- Professional development opportunities
- Collaborative and inclusive work environment
    `,
  },
  "2": {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote / Mumbai",
    type: "Full-time",
    posted: "2025-01-28",
    description: `
Join our design team and help create beautiful, intuitive experiences for millions of job seekers across India.

## Responsibilities

- Design user interfaces and experiences for web and mobile platforms
- Create wireframes, prototypes, and high-fidelity designs
- Collaborate with product managers and engineers throughout the design process
- Conduct user research and usability testing
- Maintain and evolve our design system
- Present design concepts and rationale to stakeholders

## Requirements

- 3+ years of experience in product design or UI/UX design
- Strong portfolio showcasing design skills
- Proficiency in design tools (Figma, Adobe Creative Suite)
- Understanding of user-centered design principles
- Excellent visual design and typography skills
- Strong communication and collaboration abilities

## Nice to Have

- Experience designing for SaaS products
- Knowledge of frontend development (HTML/CSS)
- Experience with user research methodologies
- Understanding of accessibility in design

## What We Offer

- Competitive salary and benefits
- Remote work flexibility
- Design conference and training budget
- Latest design tools and equipment
- Opportunity to impact millions of users
    `,
  },
  "3": {
    id: 3,
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Hyderabad",
    type: "Full-time",
    posted: "2025-01-25",
    description: `
Help us build cutting-edge AI features that power resume optimization, job matching, and career guidance.

## Responsibilities

- Develop and deploy machine learning models for resume analysis and job matching
- Work on NLP tasks including text classification, extraction, and generation
- Collaborate with product and engineering teams to integrate AI features
- Optimize model performance and scalability
- Research and implement state-of-the-art ML techniques
- Monitor and maintain production ML systems

## Requirements

- 3+ years of experience in machine learning or AI engineering
- Strong programming skills in Python
- Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)
- Knowledge of NLP techniques and libraries
- Understanding of MLOps and model deployment
- Strong mathematical and statistical background
- Bachelor's or Master's degree in Computer Science, AI, or related field

## Nice to Have

- Experience with LLMs and transformer models
- Knowledge of cloud ML platforms (AWS SageMaker, GCP AI Platform)
- Experience with vector databases and embeddings
- Publications in ML/AI conferences or journals

## What We Offer

- Competitive salary and equity
- Research and conference opportunities
- Access to latest ML infrastructure
- Collaborative research environment
- Impact on millions of users' careers
    `,
  },
  "4": {
    id: 4,
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-20",
    description: `
Drive our content strategy and help job seekers succeed through valuable, engaging content.

## Responsibilities

- Develop and execute content marketing strategy
- Create blog posts, guides, and other content assets
- Manage content calendar and editorial process
- Collaborate with SEO team to optimize content
- Analyze content performance and optimize accordingly
- Manage freelance writers and content contributors

## Requirements

- 4+ years of experience in content marketing
- Excellent writing and editing skills
- Understanding of SEO best practices
- Experience with content management systems
- Strong analytical skills
- Bachelor's degree in Marketing, Communications, or related field

## Nice to Have

- Experience in B2C SaaS marketing
- Knowledge of career/job search industry
- Experience with video content creation
- Understanding of content analytics tools

## What We Offer

- Competitive salary
- Remote work flexibility
- Content creation budget
- Opportunity to build thought leadership
- Impact on job seekers' success
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(jobOpenings).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobOpenings[id];
  if (!job) {
    return {
      title: "Job Not Found - Hiring Journey",
    };
  }
  return {
    title: `${job.title} - Careers | Hiring Journey`,
    description: `Join Hiring Journey as a ${job.title} in ${job.department}. ${job.location}`,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobOpenings[id];

  if (!job) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <Link
          href="/careers"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {job.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {job.department}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {job.type}
            </span>
            <span>
              Posted {new Date(job.posted).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-7">
            {job.description.split("\n").map((line: string, index: number) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                    {line.substring(3)}
                  </h2>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {line.substring(2)}
                  </li>
                );
              }
              if (line.trim() === "") {
                return <br key={index} />;
              }
              return (
                <p key={index} className="mb-4">
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ready to Apply?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Send your resume and cover letter to our careers team. We&apos;ll review your application and get back to
            you soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:careers@hiringjourney.com?subject=Application for ${job.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Apply Now
            </a>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white dark:bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Other Positions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
