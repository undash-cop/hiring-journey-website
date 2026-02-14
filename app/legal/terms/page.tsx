import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/legal/terms",
  "Terms of Service - Hiring Journey",
  "Terms of Service for Hiring Journey - Read our terms and conditions for using our platform."
);

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          These Terms of Service are governed by the laws of India. By using our Service, you agree to be bound by
          these terms and the applicable laws of India, including the Information Technology Act, 2000, the Consumer
          Protection Act, 2019, the Digital Personal Data Protection Act, 2023, and other applicable Indian laws. If
          you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, additional rights and
          protections under the General Data Protection Regulation (GDPR) may apply as set forth in our Privacy Policy.
        </p>

        <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
              (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Undash-cop Private Limited
              (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use
              of the Hiring Journey platform, including our website, mobile applications, and related services
              (collectively, the &quot;Service&quot;).
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              By accessing, browsing, or using our Service, you acknowledge that you have read, understood, and agree
              to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use
              our Service.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We reserve the right to modify these Terms at any time. Material changes will be notified through our
              Service or via email. Your continued use of the Service after such modifications constitutes acceptance of
              the updated Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Eligibility and Account Registration</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.1 Age Requirement</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              You must be at least 18 years old to use our Service. By using Hiring Journey, you represent and warrant
              that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are
              under 18, you may only use our Service with the consent and supervision of a parent or legal guardian.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 Account Registration</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              To access certain features of our Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not share your account credentials with any third party</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent,
              abusive, or illegal activities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              Hiring Journey provides an AI-powered career success platform offering:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Resume optimization and enhancement services</li>
              <li>Job discovery and matching tools</li>
              <li>Automated job application services</li>
              <li>Application tracking and management</li>
              <li>Interview preparation resources</li>
              <li>Career guidance and negotiation frameworks</li>
              <li>Other related career services</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or
              without notice. We do not guarantee that the Service will be available at all times or that it will be
              error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Subscription Plans and Payment Terms</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.1 Subscription Plans</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We offer various subscription plans, including free and paid tiers. Paid plans are billed on a monthly or
              annual basis as selected by you. By subscribing to a paid plan, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Pay all fees associated with your selected subscription plan</li>
              <li>Pay fees in Indian Rupees (INR) or as displayed at the time of purchase</li>
              <li>Authorize automatic renewal of your subscription unless cancelled</li>
              <li>Accept that subscription fees are non-refundable except as required by law or as specified in our
                refund policy
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.2 Payment Processing</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Payments are processed through third-party payment gateways. We do not store your complete payment card
              information. You agree to provide valid payment information and authorize us to charge your payment method
              for all fees due.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.3 Refund Policy</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              In accordance with the Consumer Protection Act, 2019:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Subscription fees are generally non-refundable</li>
              <li>Refunds may be provided at our sole discretion for technical issues preventing service delivery</li>
              <li>Refund requests must be submitted within 7 days of purchase</li>
              <li>Refunds will be processed to the original payment method within 14-21 business days</li>
              <li>No refunds will be provided for partial subscription periods after cancellation</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">4.4 Price Changes</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We reserve the right to modify subscription prices at any time. Price changes will not affect your current
              subscription period but will apply to renewals. We will provide at least 30 days&apos; notice of any price
              increases.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. User Content and Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.1 Your Content</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              You retain ownership of all content you submit to our Service, including resumes, cover letters, and
              profile information (&quot;User Content&quot;). By submitting User Content, you grant us a worldwide,
              non-exclusive, royalty-free, perpetual, irrevocable, and sublicensable license to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Use, reproduce, modify, adapt, and display your User Content for the purpose of providing our Service</li>
              <li>Share your User Content with potential employers when you apply for jobs through our platform</li>
              <li>Use your User Content for analytics and service improvement purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.2 Our Intellectual Property</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              All content, features, and functionality of the Service, including but not limited to text, graphics,
              logos, icons, images, software, and the compilation thereof, are the exclusive property of Undash-cop
              Private Limited or its licensors and are protected by Indian copyright, trademark, and other intellectual
              property laws. You may not reproduce, distribute, modify, or create derivative works without our express
              written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">5.3 Content Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              You are solely responsible for the accuracy, legality, and appropriateness of your User Content. We do
              not verify or guarantee the accuracy of User Content and disclaim all liability for any errors or
              omissions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Use the Service for any illegal purpose or in violation of any applicable Indian laws or regulations</li>
              <li>Violate any third-party rights, including intellectual property, privacy, or publicity rights</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorized access to our systems, accounts, or networks</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Use automated systems (bots, scrapers) to access the Service without authorization</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the Service to compete with us or develop competing services</li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              Violation of these prohibitions may result in immediate termination of your account and may subject you to
              legal action.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Disclaimers and Warranties</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.1 Service Disclaimer</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>We do not guarantee job placement, interview calls, or employment opportunities</li>
              <li>We do not guarantee the accuracy of job listings or employer information</li>
              <li>We do not guarantee that resume optimization will result in job offers</li>
              <li>We do not guarantee uninterrupted, error-free, or secure access to the Service</li>
              <li>We disclaim all warranties regarding third-party content or services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">7.2 No Employment Relationship</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We are not an employment agency or recruiter. We facilitate connections between job seekers and employers
              but do not guarantee employment. Any employment relationship is solely between you and the employer. We are
              not responsible for employment decisions, terms of employment, or any disputes between users and employers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE INDIAN LAW, INCLUDING THE CONSUMER PROTECTION ACT, 2019:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>No Consequential Damages:</strong> We shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not limited to loss of profits, data, use,
                goodwill, or other intangible losses
              </li>
              <li>
                <strong>Liability Cap:</strong> Our total liability for any claims arising from or related to the
                Service shall not exceed the amount you paid us in the 12 months preceding the claim, or ₹5,000,
                whichever is greater
              </li>
              <li>
                <strong>Third-Party Services:</strong> We are not liable for any damages arising from third-party
                services, including payment processors, job boards, or employer websites
              </li>
              <li>
                <strong>Force Majeure:</strong> We are not liable for any failure to perform due to circumstances beyond
                our reasonable control, including natural disasters, war, terrorism, pandemics, or government actions
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by our
              negligence, fraud, or any other liability that cannot be excluded or limited under applicable Indian law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              You agree to indemnify, defend, and hold harmless Undash-cop Private Limited, its officers, directors,
              employees, agents, and affiliates from and against any and all claims, damages, obligations, losses,
              liabilities, costs, or debt, and expenses (including reasonable attorney&apos;s fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Your use of or access to the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
              <li>Any dispute between you and an employer or other user</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Termination</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">10.1 Termination by You</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              You may terminate your account at any time by contacting us or using the account deletion feature in your
              settings. Upon termination, your right to use the Service will immediately cease. You remain responsible
              for all fees incurred prior to termination.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">10.2 Termination by Us</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We may suspend or terminate your account immediately, without prior notice, if:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>You violate these Terms or our Privacy Policy</li>
              <li>You engage in fraudulent, abusive, or illegal activities</li>
              <li>We are required to do so by law or governmental authority</li>
              <li>You fail to pay subscription fees when due</li>
              <li>We discontinue the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">10.3 Effect of Termination</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Upon termination, your right to access and use the Service will immediately cease. We may delete your
              account and User Content, subject to our data retention policies and applicable law. Provisions that by
              their nature should survive termination will survive, including ownership provisions, warranty disclaimers,
              indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Dispute Resolution and Governing Law</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">11.1 Governing Law</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to
              its conflict of law provisions. The courts of [City], [State], India shall have exclusive jurisdiction
              over any disputes arising from or related to these Terms or the Service.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              <strong>EU/EEA/UK Users:</strong> If you are located in the EEA, UK, or Switzerland, you may also have
              rights under the laws of your country of residence, including the right to bring proceedings in your
              local courts. Nothing in these Terms limits your rights as a consumer under mandatory local law.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">11.2 Dispute Resolution</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              In the event of any dispute, controversy, or claim arising out of or relating to these Terms or the
              Service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Good Faith Negotiation:</strong> Parties shall first attempt to resolve the dispute through
                good faith negotiation for a period of 30 days
              </li>
              <li>
                <strong>Arbitration:</strong> If negotiation fails, disputes shall be resolved through binding
                arbitration in accordance with the Arbitration and Conciliation Act, 2015, by a sole arbitrator
                appointed by mutual agreement or by [Arbitration Institution]
              </li>
              <li>
                <strong>Consumer Rights:</strong> Nothing in this clause shall prevent you from availing remedies under
                the Consumer Protection Act, 2019
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. General Provisions</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.1 Entire Agreement</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement
              between you and us regarding the Service and supersede all prior agreements and understandings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.2 Severability</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
              or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and
              effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.3 Waiver</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right
              or provision.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.4 Assignment</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              You may not assign or transfer these Terms or your account without our prior written consent. We may assign
              these Terms without restriction.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">12.5 Notices</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              All notices shall be in writing and delivered via email to the addresses provided during registration or as
              updated by you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white font-semibold">Undash-cop Private Limited</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Email:{" "}
                <a href="mailto:legal@hiringjourney.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  legal@hiringjourney.com
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
