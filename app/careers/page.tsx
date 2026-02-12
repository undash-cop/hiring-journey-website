"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight, Sparkles } from "lucide-react";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersFilters } from "@/components/careers/careers-filters";

// Mock job openings - Replace with API calls
const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    posted: "2025-02-01",
    experience: "5+ years",
    salary: "₹15-25L",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote / Mumbai",
    type: "Full-time",
    posted: "2025-01-28",
    experience: "3+ years",
    salary: "₹12-18L",
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Hyderabad",
    type: "Full-time",
    posted: "2025-01-25",
    experience: "4+ years",
    salary: "₹18-30L",
  },
  {
    id: 4,
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-20",
    experience: "3+ years",
    salary: "₹10-15L",
  },
  {
    id: 5,
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / Delhi",
    type: "Full-time",
    posted: "2025-01-15",
    experience: "3+ years",
    salary: "₹12-20L",
  },
  {
    id: 6,
    title: "UX Researcher",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-10",
    experience: "2+ years",
    salary: "₹8-12L",
  },
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
      const matchesLocation =
        selectedLocation === "All" ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        (selectedLocation === "Remote" && job.location.toLowerCase().includes("remote"));
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesLocation && matchesSearch;
    });
  }, [selectedDepartment, selectedLocation, searchQuery]);

  return (
    <div className="bg-white dark:bg-gray-950">
      <CareersHero />
      <CareersFilters
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Open Positions ({filteredJobs.length})
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Find your perfect role and help us transform careers
            </p>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-gray-950 p-8 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 font-medium text-primary-700 dark:text-primary-300">
                    {job.experience}
                  </span>
                  <span className="rounded-full bg-secondary-50 dark:bg-secondary-900/30 px-3 py-1 font-medium text-secondary-700 dark:text-secondary-300">
                    {job.salary}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted {new Date(job.posted).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </p>
                  <Link
                    href={`/careers/${job.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors group-hover:gap-3"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">No positions found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedDepartment("All");
                setSelectedLocation("All");
                setSearchQuery("");
              }}
              className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Why Join Us */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary-50 via-secondary-50 to-cta-50 dark:from-primary-950/30 dark:via-secondary-950/30 dark:to-cta-950/30 p-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
              <Sparkles className="h-4 w-4" />
              <span>Why Join Us</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Don&apos;t see a role that fits?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              We&apos;re always looking for talented individuals who share our passion for transforming careers. Send us
              your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@hiringjourney.com"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
              >
                Send Your Resume
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
