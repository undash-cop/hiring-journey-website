"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, Award, MapPin, Clock } from "lucide-react";

const impactMetrics = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Job Seekers",
    description: "Users actively using our platform",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Briefcase,
    value: "500K+",
    label: "Jobs Applied",
    description: "Applications submitted through our platform",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Success Rate",
    description: "Users who land their dream jobs",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    value: "₹3L",
    label: "Avg Salary Increase",
    description: "Average salary boost through negotiation",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: MapPin,
    value: "500+",
    label: "Cities Covered",
    description: "Cities across India where users found jobs",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    value: "10hrs",
    label: "Time Saved/Week",
    description: "Average time saved with auto-apply",
    color: "from-indigo-500 to-purple-500",
  },
];

const testimonials = [
  {
    quote: "Hiring Journey helped me transition from Support to Development. The interview prep was incredible!",
    author: "Rahul K.",
    role: "Software Developer",
    location: "Pune",
  },
  {
    quote: "As a fresher from a small town, I had no guidance. Hiring Journey gave me confidence and the right tools.",
    author: "Priya S.",
    role: "QA Engineer",
    location: "Bangalore",
  },
  {
    quote: "The negotiation framework helped me get ₹4L more than the initial offer. Worth every rupee!",
    author: "Amit V.",
    role: "Data Analyst",
    location: "Delhi",
  },
];

export function ImpactSection() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Metrics */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Numbers that reflect our commitment to transforming careers
          </motion.p>
        </div>

        <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <dt className="text-3xl font-display font-bold text-gray-900 dark:text-white">{metric.value}</dt>
                <dd className="mt-2 text-base font-semibold leading-7 text-gray-900 dark:text-white">{metric.label}</dd>
                <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">{metric.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Stories of Success
          </motion.h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-6 ring-1 ring-primary-200 dark:ring-primary-800"
              >
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
