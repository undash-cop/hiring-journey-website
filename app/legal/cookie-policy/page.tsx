import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/legal/cookie-policy",
  "Cookie Policy - Hiring Journey",
  "Cookie Policy for Hiring Journey - Learn how we use cookies and similar technologies."
);

export default function CookiePolicyPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This Cookie Policy explains how Hiring Journey (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses
          cookies and similar tracking technologies on our website and mobile applications. This policy should be read
          in conjunction with our Privacy Policy and Terms of Service. If you are located in the European Economic Area
          (EEA), United Kingdom, or Switzerland, the General Data Protection Regulation (GDPR) and ePrivacy Directive
          requirements also apply to our use of cookies.
        </p>

        <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you
              visit a website. They are widely used to make websites work more efficiently, provide information to
              website owners, and enhance user experience. Cookies can be &quot;persistent&quot; (remain on your device
              until deleted or expired) or &quot;session&quot; cookies (deleted when you close your browser).
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We also use similar technologies such as web beacons, pixel tags, and local storage, which function
              similarly to cookies and are covered by this Cookie Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Types of Cookies We Use</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.1 Essential Cookies (Strictly Necessary)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              These cookies are essential for the website to function properly and cannot be disabled. They include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Authentication Cookies:</strong> Maintain your login session and security
              </li>
              <li>
                <strong>Security Cookies:</strong> Protect against fraud and unauthorized access
              </li>
              <li>
                <strong>Load Balancing Cookies:</strong> Distribute website traffic across servers
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your language and region settings
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              <strong>Legal Basis:</strong> These cookies are necessary for the performance of our contract with you and
              compliance with our legal obligations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.2 Performance and Analytics Cookies
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting
              information anonymously:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Error messages and performance issues</li>
              <li>Feature usage statistics</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              <strong>Legal Basis:</strong> Our legitimate interest in improving our Service and user experience.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.3 Functionality Cookies
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              These cookies enable enhanced functionality and personalization:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Remember your preferences (theme, language, display settings)</li>
              <li>Remember your login information (if you choose &quot;Remember Me&quot;)</li>
              <li>Remember your previous interactions with the Service</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              <strong>Legal Basis:</strong> Your consent or our legitimate interest in providing personalized services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.4 Marketing and Advertising Cookies
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              These cookies are used to deliver relevant advertisements and track campaign effectiveness:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Track your browsing behavior across websites</li>
              <li>Build a profile of your interests</li>
              <li>Deliver targeted advertisements</li>
              <li>Measure advertising campaign performance</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              <strong>Legal Basis:</strong> Your explicit consent, which you can withdraw at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Third-Party Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We use third-party services that may set their own cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Analytics Providers:</strong> Google Analytics and similar services to analyze website usage
              </li>
              <li>
                <strong>Payment Processors:</strong> Cookies from payment gateways to process transactions securely
              </li>
              <li>
                <strong>Advertising Networks:</strong> Third-party ad networks for targeted advertising
              </li>
              <li>
                <strong>Social Media Platforms:</strong> Cookies from social media plugins and sharing buttons
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We do not control these third-party cookies. You should review the privacy and cookie policies of these
              third parties to understand how they use cookies and what information they collect. We are not responsible
              for the privacy practices of third-party services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Managing Cookies</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.1 Browser Settings</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for specific websites</li>
              <li>Receive notifications when cookies are set</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              Please note that blocking or deleting cookies may affect your ability to use certain features of our
              Service. Essential cookies cannot be disabled as they are necessary for the Service to function.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.2 Cookie Consent</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              When you first visit our website, we will request your consent for non-essential cookies. You can manage
              your cookie preferences at any time through your account settings or by contacting us. You can withdraw
              your consent at any time, but this may affect your user experience.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.3 Do Not Track Signals</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature. Currently, there is no industry standard
              for DNT signals. We do not respond to DNT signals, but you can manage your cookie preferences through the
              methods described above.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookie Retention</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Cookies are retained for different periods depending on their purpose:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>
                <strong>Session Cookies:</strong> Deleted when you close your browser
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 30 days to 2
                years) or until manually deleted
              </li>
              <li>
                <strong>Essential Cookies:</strong> Retained for the duration of your session or as necessary for
                security
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Updates to This Cookie Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal,
              operational, or regulatory reasons. We will notify you of any material changes by posting the updated
              Cookie Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our
              Service after such changes constitutes acceptance of the updated Cookie Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Your Rights Under Applicable Law</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              7.1 Rights Under Indian Law
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              In accordance with the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023,
              and other applicable Indian laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Be informed about the use of cookies on our website</li>
              <li>Provide or withdraw consent for non-essential cookies</li>
              <li>Access information about cookies used on our website</li>
              <li>Request deletion of cookies (subject to technical limitations)</li>
              <li>File a complaint regarding our use of cookies</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              7.2 Rights Under GDPR and ePrivacy Directive (EU/EEA/UK Users)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              If you are located in the EEA, UK, or Switzerland, the GDPR and ePrivacy Directive (2002/58/EC) provide
              additional protections:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Prior Consent:</strong> We must obtain your explicit consent before placing non-essential
                cookies (consent must be freely given, specific, informed, and unambiguous)
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> You can withdraw your consent to cookies at any time
              </li>
              <li>
                <strong>Information Rights:</strong> Right to be informed about cookies, their purpose, and retention
                period
              </li>
              <li>
                <strong>Opt-Out Rights:</strong> Right to opt-out of non-essential cookies without affecting website
                functionality
              </li>
              <li>
                <strong>Complaint Rights:</strong> Right to lodge a complaint with your local data protection
                authority
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We comply with the ePrivacy Directive requirements for cookie consent and provide granular controls for
              different types of cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. GDPR and ePrivacy Compliance</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              For users in the EEA/UK/Switzerland, we comply with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>GDPR Article 7:</strong> Conditions for consent - we obtain clear, affirmative consent for
                non-essential cookies
              </li>
              <li>
                <strong>ePrivacy Directive:</strong> Requires consent before storing or accessing information on user
                devices (cookies)
              </li>
              <li>
                <strong>GDPR Article 13:</strong> Information to be provided when collecting data - we provide clear
                information about cookie purposes
              </li>
              <li>
                <strong>GDPR Article 17:</strong> Right to erasure - you can request deletion of cookies and associated
                data
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              Our cookie consent mechanism complies with the &quot;Cookie Law&quot; requirements under the ePrivacy
              Directive, ensuring that non-essential cookies are only placed after obtaining your explicit consent.
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              If you have any questions, concerns, or requests regarding this Cookie Policy or our use of cookies,
              please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white font-semibold">Undash-cop Private Limited</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Email:{" "}
                <a href="mailto:privacy@hiringjourney.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  privacy@hiringjourney.com
                </a>
                <br />
                Grievance Officer:{" "}
                <a href="mailto:privacy@hiringjourney.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  privacy@hiringjourney.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
