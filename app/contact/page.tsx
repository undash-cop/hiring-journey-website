import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_METHODS, OFFICE_INFO } from "@/lib/marketing-content";
import { createPageMetadata, schema } from "@/lib/seo";

import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  path: "/contact",
  title: "Contact - Hiring Journey",
  description: "Contact Hiring Journey for support, partnerships, and career platform assistance.",
  keywords: ["Hiring Journey contact", "career platform support India"],
});

export const dynamic = "force-static";
export const revalidate = false;

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <JsonLd data={schema.contactPage("/contact")} />
      <JsonLd
        data={schema.breadcrumb([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactHero />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you within one business day.
              </p>
            </div>
            <ContactForm />
          </div>

          <aside className="space-y-8" aria-label="Contact information">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Methods</h3>
              <div className="space-y-4">
                {CONTACT_METHODS.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="group flex items-start gap-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-md transition-all"
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${method.color}`}
                    >
                      <method.icon className="h-5 w-5 text-white" aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{method.description}</p>
                      <p className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                        {method.contact}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-6 ring-1 ring-primary-200 dark:ring-primary-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Office Information</h3>
              <div className="space-y-3">
                {OFFICE_INFO.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                      <info.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" aria-hidden />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">{info.label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-6 ring-1 ring-gray-200 dark:ring-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We typically respond within one business day. For urgent matters, please call us directly.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
