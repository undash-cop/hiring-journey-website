"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Mail, Github, Loader2, Globe, Instagram, Twitter, Facebook } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  about: string;
  photo: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string | null;
  github?: string | null;
}

// Team data from https://undash-cop.com/about
const fallbackTeamMembers: TeamMember[] = [
  {
    name: "Suman KN",
    title: "Founder | Chief Executive Officer",
    about:
      "I started Undash-cop to build software that helps startups and founders ship faster. We focus on engineering-first delivery and products where AI is built in for reliability and outcomes. Outside work, I race and pursue motorsport.",
    photo: "https://drive.google.com/thumbnail?id=1UmzllytJ3x5RRhgawS53AEntf-uXe68Y",
    website: "https://sumankn.undash-cop.com",
    linkedin: "https://in.linkedin.com/in/suman-kn",
    instagram: "https://www.instagram.com/suman_kn_racer",
    twitter: "https://twitter.com/suman_kn",
    facebook: "https://www.facebook.com/suman.kn.585",
  },
  {
    name: "Yashwanth H R",
    title: "Co-Founder | Chief Operating Officer",
    about:
      "Co-founder with deep experience in operations and resource management. Eight years in sourcing and team coordination.",
    photo:
      "https://drive.google.com/thumbnail?id=1W1ARN1r2w0xlH-vA0B04mhlUkDJ3LlIz",
    website: "",
    linkedin: "https://in.linkedin.com/in/yashwanth-hr-naidu-b6a4b4149",
    instagram: "https://www.instagram.com/yashwanth_hr_naidu",
    twitter: "https://twitter.com/hrnaidu",
    facebook: "https://www.facebook.com/yashwanth.naidu.587",
  },
  {
    name: "Mohammed Nawaz A",
    title: "Co-Founder | Chief Financial Officer",
    about:
      "Co-founder with over nine years in finance and operations, focused on running lean and scaling efficiently.",
    photo:
      "https://drive.google.com/thumbnail?id=1Ox51HTawBCKXSQprsm-Tfd_Vt992KzVx",
    website: "",
    linkedin: "https://in.linkedin.com/in/nawaz-a",
    instagram: "https://www.instagram.com/nawazf37",
    twitter: "",
    facebook: "https://www.facebook.com/mohammed.nawaz.921677",
  },
  {
    name: "Karthik",
    title: "Chief Technological Officer",
    about:
      "Leads technology strategy and engineering. Focused on stable, scalable systems and products where AI is a core capability.",
    photo: "https://drive.google.com/thumbnail?id=1Yc3h-zx7RVFckE-eRgQkZOoet7nv6_zS",
    website: "",
    linkedin: "https://www.linkedin.com/in/karthik-r-352600103",
    instagram: "https://www.instagram.com/karthikhr7",
    twitter: "https://twitter.com/karthikbdb",
    facebook: "https://www.facebook.com/karthik.bdb",
  },
  {
    name: "Purushottam Gour",
    title: "Chief Product Officer",
    about:
      "Product management and roadmap. Ensures our products stay aligned with customer needs and engineering capacity.",
    photo:
      "https://drive.google.com/thumbnail?id=1XNO92CHpgnSGwM38hzYOfOUKhGREeuLq",
    website: "",
    linkedin: "https://www.linkedin.com/in/purushottam-gour-2a96ab148/",
    instagram: "https://www.instagram.com/purushottam.gour/",
    twitter: "",
    facebook: "https://www.facebook.com/prince.gour.50",
  },
];

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(fallbackTeamMembers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("/api/team");
        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }
        
        const data = await response.json();
        
        // Always use the team data from API, even if it's fallback
        if (data.team && Array.isArray(data.team) && data.team.length > 0) {
          setTeamMembers(data.team);
        }
        // If API returns empty array, keep fallback data that's already set
      } catch (error) {
        console.error("Failed to fetch team data:", error);
        // Keep fallback data that's already set in useState
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            A passionate team dedicated to transforming India&apos;s job market
          </motion.p>
        </div>

        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary-200 dark:ring-primary-800">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 text-2xl">
                            👤
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{member.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{member.about}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} Website`}
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} Instagram`}
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {member.facebook && (
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} Facebook`}
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We&apos;re growing! Join us in transforming careers across India.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            View Open Positions
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
