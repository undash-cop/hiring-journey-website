import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/legal/privacy",
  "Privacy Policy - Hiring Journey",
  "Privacy Policy for Hiring Journey - Learn how we collect, use, and protect your personal information."
);

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000, the
          Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
          Rules, 2011, and the Digital Personal Data Protection Act, 2023. If you are located in the European Economic
          Area (EEA), United Kingdom, or Switzerland, the General Data Protection Regulation (GDPR) may also apply to
          the processing of your personal data.
        </p>

        <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Welcome to Hiring Journey, operated by Undash-cop Private Limited (&quot;we,&quot; &quot;our,&quot;
              &quot;us,&quot; or &quot;Company&quot;). We are committed to protecting your privacy and ensuring you have
              a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose,
              process, and safeguard your information when you use our services, including our website, mobile
              applications, and related services (collectively, the &quot;Service&quot;).
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              By using our Service, you consent to the collection, use, and disclosure of your information in
              accordance with this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our
              Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.1 Personal Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Name, email address, phone number, and other contact information</li>
              <li>Resume, cover letters, and other career-related documents</li>
              <li>Job preferences, application history, and career goals</li>
              <li>Payment and billing information (processed securely through third-party payment processors)</li>
              <li>Profile information, including skills, work experience, and educational background</li>
              <li>Any other information you choose to provide to us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.2 Sensitive Personal Data or Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              As defined under the Information Technology (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011, we may collect sensitive personal data including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Password and account authentication information</li>
              <li>Financial information such as bank account or credit card details (processed through secure third-party providers)</li>
              <li>Any other information classified as sensitive under applicable Indian laws</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.3 Automatically Collected Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We automatically collect certain information when you use our Service, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, features used, time spent, clickstream data)</li>
              <li>Log files and analytics data</li>
              <li>Cookies and similar tracking technologies (see our Cookie Policy)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              For users in the EEA/UK/Switzerland, we process your personal data based on the following legal bases
              under GDPR:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Contract Performance:</strong> To provide our Service and fulfill our contractual obligations
              </li>
              <li>
                <strong>Legitimate Interests:</strong> To improve our Service, ensure security, and prevent fraud
              </li>
              <li>
                <strong>Consent:</strong> For marketing communications and non-essential cookies (you can withdraw
                consent at any time)
              </li>
              <li>
                <strong>Legal Obligations:</strong> To comply with applicable laws and regulations
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">4. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Service Provision:</strong> To provide, maintain, and improve our Service, including resume
                optimization, job matching, application tracking, and interview preparation
              </li>
              <li>
                <strong>Communication:</strong> To send you service-related notifications, updates, and administrative
                messages
              </li>
              <li>
                <strong>Personalization:</strong> To personalize your experience and provide tailored job recommendations
              </li>
              <li>
                <strong>Payment Processing:</strong> To process payments and manage your subscription
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or
                governmental requests
              </li>
              <li>
                <strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or security threats
              </li>
              <li>
                <strong>Analytics:</strong> To analyze usage patterns and improve our Service
              </li>
              <li>
                <strong>Marketing:</strong> To send you promotional communications (with your consent, where required by
                law)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We do not sell your personal information. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>With Your Consent:</strong> When you have explicitly consented to such sharing
              </li>
              <li>
                <strong>Service Providers:</strong> With third-party service providers who perform services on our behalf
                (e.g., payment processors, cloud hosting, analytics providers), subject to confidentiality obligations
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or governmental authority,
                including under the Information Technology Act, 2000
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with
                notice to users
              </li>
              <li>
                <strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users
                or others
              </li>
              <li>
                <strong>Job Applications:</strong> When you apply for jobs through our platform, we may share your
                resume and application information with potential employers
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We implement reasonable security practices and procedures as required under the Information Technology Act,
              2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal
              Data or Information) Rules, 2011, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and audits</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              You acknowledge that you provide information at your own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law. Our retention periods
              are based on:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>The nature of the data and purpose of processing</li>
              <li>Legal and regulatory requirements (e.g., tax laws may require retention of payment records)</li>
              <li>Legitimate business interests (e.g., fraud prevention, dispute resolution)</li>
              <li>Your consent and account status</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              When we no longer need your information, we will securely delete or anonymize it in accordance with our
              data retention policies and applicable laws (including GDPR requirements for EU users).
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Your Rights Under Applicable Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need
              your information, we will securely delete or anonymize it in accordance with our data retention policies
              and applicable Indian laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Your Rights Under Applicable Law</h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              7.1 Rights Under Indian Law
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              Subject to applicable Indian laws, including the Digital Personal Data Protection Act, 2023, you have the
              following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Right to Access:</strong> Request access to your personal information and receive a copy
              </li>
              <li>
                <strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your personal information, subject to legal
                obligations
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw your consent for processing personal information,
                where processing is based on consent
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> File a complaint with us or the relevant data protection
                authority
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request transfer of your data in a structured format
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              To exercise these rights, please contact us at privacy@hiringjourney.com. We will respond to your request
              within 30 days, as required by applicable Indian law.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              7.2 Rights Under GDPR (EU/EEA/UK Users)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              If you are located in the EEA, UK, or Switzerland, you have additional rights under the General Data
              Protection Regulation (GDPR), as detailed in Section 10.1.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
              information from children. If you are a parent or guardian and believe your child has provided us with
              personal information, please contact us immediately. If we become aware that we have collected personal
              information from a child without parental consent, we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Third-Party Links</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Our Service may contain links to third-party websites or services. We are not responsible for the privacy
              practices of such third parties. We encourage you to read the privacy policies of any third-party websites
              or services you visit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. International Data Transfers</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              Your information may be transferred to and processed in countries other than India. We ensure that
              appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and
              applicable Indian laws, including the Digital Personal Data Protection Act, 2023.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              10.1 GDPR Compliance (EU/EEA/UK Users)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, the General Data
              Protection Regulation (GDPR) applies to the processing of your personal data. In addition to the rights
              outlined in Section 7, you have the following rights under GDPR:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>Right to Rectification:</strong> Request correction of inaccurate personal data
              </li>
              <li>
                <strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your
                personal data under certain circumstances
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request limitation of processing of your personal data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing of your personal data for direct marketing or
                legitimate interests
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on
                consent
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              For GDPR-related requests, please contact us at privacy@hiringjourney.com. We will respond within one
              month (may be extended by two months for complex requests).
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              10.2 Data Transfer Safeguards
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              When transferring personal data outside the EEA/UK, we implement appropriate safeguards including Standard
              Contractual Clauses (SCCs) approved by the European Commission, adequacy decisions, or other legally
              recognized transfer mechanisms to ensure your data receives an adequate level of protection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal
              requirements, or for other operational, legal, or regulatory reasons. We will notify you of any material
              changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the &quot;Last updated&quot; date</li>
              <li>Sending you an email notification (for material changes)</li>
              <li>Displaying a prominent notice on our Service</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mt-4">
              For EU/EEA/UK users, we will obtain your consent before making material changes if required by GDPR. Your
              continued use of the Service after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Grievance Officer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your
              continued use of the Service after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Grievance Officer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary
              Guidelines and Digital Media Ethics Code) Rules, 2021, we have appointed a Grievance Officer. You may
              contact our Grievance Officer for any privacy-related concerns:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-4">
              <p className="text-gray-900 dark:text-white font-semibold">Grievance Officer</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Undash-cop Private Limited
                <br />
                Email:{" "}
                <a href="mailto:privacy@hiringjourney.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  privacy@hiringjourney.com
                </a>
                <br />
                Response Time: Within 30 days from the date of receipt of grievance
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Data Protection Officer (GDPR)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4">
              For users in the EEA/UK/Switzerland, we have designated a Data Protection Officer (DPO) to oversee GDPR
              compliance. You can contact our DPO for GDPR-related inquiries:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-4">
              <p className="text-gray-900 dark:text-white font-semibold">Data Protection Officer</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Undash-cop Private Limited
                <br />
                Email:{" "}
                <a href="mailto:dpo@hiringjourney.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  dpo@hiringjourney.com
                </a>
                <br />
                Subject Line: &quot;GDPR Inquiry&quot;
              </p>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-7">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-4">
              <p className="text-gray-900 dark:text-white font-semibold">Undash-cop Private Limited</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Email:{" "}
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
