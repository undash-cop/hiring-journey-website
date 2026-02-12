"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "QA Engineer",
    location: "Bangalore",
    image: "👩‍💻",
    rating: 5,
    text: "As a BCA graduate from a small town, I had no idea how to create a professional resume. Hiring Journey's AI optimization helped me land my first job at a top tech company. The interview prep was a game-changer!",
    journey: "Fresher",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Software Developer",
    location: "Pune",
    image: "👨‍💻",
    rating: 5,
    text: "After 3 years in Support, I wanted to transition to Development. Hiring Journey helped me optimize my resume, practice technical interviews, and negotiate a 40% salary increase. Best investment in my career!",
    journey: "Experienced",
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Business Analyst",
    location: "Ahmedabad",
    image: "👩‍💼",
    rating: 5,
    text: "The auto-apply feature saved me so much time! I applied to 50+ jobs in one week. The application tracker kept me organized, and I got 8 interview calls. Highly recommend for anyone job searching!",
    journey: "Experienced",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Frontend Developer",
    location: "Delhi",
    image: "👨‍💻",
    rating: 5,
    text: "Coming from a tier-3 city, I struggled to find opportunities. Hiring Journey's job discovery matched me with remote positions I never knew existed. Landed a great role in just 2 months!",
    journey: "Fresher",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Data Analyst",
    location: "Hyderabad",
    image: "👩‍💼",
    rating: 5,
    text: "The negotiation framework helped me negotiate ₹3L more than the initial offer! The legal readiness check ensured I understood everything before signing. This platform is a lifesaver!",
    journey: "Experienced",
  },
  {
    id: 6,
    name: "Amit Verma",
    role: "DevOps Engineer",
    location: "Mumbai",
    image: "👨‍💻",
    rating: 5,
    text: "The coding arena and technical interview prep were exactly what I needed. Practiced 50+ problems and aced my interviews. From resume to offer, Hiring Journey guided me every step.",
    journey: "Experienced",
  },
];

export function TestimonialsSection() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Success Stories from India&apos;s Job Seekers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Join thousands of professionals who found their dream jobs with Hiring Journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-200 dark:text-primary-800" />
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-cta-500 text-cta-500" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 relative z-10">{testimonial.text}</p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                  {testimonial.journey} Journey
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
