import Link from "next/link";
import { ArrowRight, Briefcase, IndianRupee, Rocket } from "lucide-react";

const pulseCards = [
  {
    title: "Role-based roadmaps",
    description: "Structured action plans from fundamentals to interview-ready outcomes for high-demand roles.",
    href: "/career/full-stack-developer/roadmap",
    cta: "Explore roadmaps",
    icon: Rocket,
  },
  {
    title: "India salary insights",
    description: "City and role-level salary benchmarks to plan your growth and negotiate with confidence.",
    href: "/salary/software-engineer/bangalore",
    cta: "View salary data",
    icon: IndianRupee,
  },
  {
    title: "Interview question hubs",
    description: "Role-specific preparation tracks covering technical rounds, communication, and hiring patterns.",
    href: "/interview-questions/software-engineer",
    cta: "Start interview prep",
    icon: Briefcase,
  },
];

export function IndiaMarketPulse() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            India Market Pulse
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Build faster career momentum with demand-led guidance
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            Move from guesswork to outcomes using role roadmaps, salary intelligence, and interview systems designed for India-first growth.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pulseCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white dark:bg-gray-950 p-6 ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm"
            >
              <card.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{card.description}</p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
