import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";

import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/contact",
  "Contact Us - Hiring Journey",
  "Get in touch with Hiring Journey. We're here to help you succeed in your career journey."
);

const contactMethods = [
  {
    icon: Mail,
    title: "General Inquiries",
    description: "For general questions and information",
    contact: "contact@hiringjourney.com",
    href: "mailto:contact@hiringjourney.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Technical support and assistance",
    contact: "support@hiringjourney.com",
    href: "mailto:support@hiringjourney.com",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "Partnerships",
    description: "Business partnerships and collaborations",
    contact: "partners@hiringjourney.com",
    href: "mailto:partners@hiringjourney.com",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Mail,
    title: "Media",
    description: "Press inquiries and media requests",
    contact: "media@hiringjourney.com",
    href: "mailto:media@hiringjourney.com",
    color: "from-orange-500 to-red-500",
  },
];

const officeInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "India (Remote First)",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri, 9 AM - 6 PM IST",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-8660-158001",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <ContactHero />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Methods</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="group flex items-start gap-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-md transition-all"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${method.color}`}>
                      <method.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{method.description}</p>
                      <p className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400">{method.contact}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Office Info */}
            <div className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-6 ring-1 ring-primary-200 dark:ring-primary-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Office Information</h3>
              <div className="space-y-3">
                {officeInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                      <info.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">{info.label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-6 ring-1 ring-gray-200 dark:ring-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We typically respond within 24 hours during business days. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
