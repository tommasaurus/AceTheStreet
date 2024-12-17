"use client";

import { motion } from "framer-motion";

export function TermsOfService() {
  return (
    <section className='py-16 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-12'
        >
          Terms of Service
        </motion.h1>
        <div className='prose prose-lg dark:prose-invert max-w-4xl mx-auto'>
          <div className='space-y-8'>
            {/* Section 1: Acceptance */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>1. Acceptance of Terms</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                This document sets forth the Terms of Service (the "Terms") for
                PrepIB (the "Service"), which is owned and operated by PrepIB
                ("we", "us", or "our"). The Service is hosted on prepib.com (the
                "Website"). By accessing or using the Service, you agree to be
                bound by these Terms. If you disagree with any part of the
                terms, then you do not have permission to access the Service.
              </p>
            </div>

            {/* Section 2: Description */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>2. Description of Service</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We provide subscription-based services to help users prepare for
                investment banking and private equity interviews. The Service
                includes curated flashcards, learning tools, and interview
                preparation resources. These services are subject to the terms
                and conditions outlined in this agreement.
              </p>
            </div>

            {/* Section 3: User Responsibilities */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>3. User Responsibilities</h2>
              <div className='pl-4 space-y-4'>
                <h3 className='text-xl font-semibold'>
                  3.1 Account Registration
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  To use certain features of the Service, you may be required to
                  register for an account. You agree to provide accurate and
                  complete information during the registration process.
                </p>

                <h3 className='text-xl font-semibold'>3.2 Security</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities that occur
                  under your account. Notify us immediately of any unauthorized
                  use or security breaches.
                </p>
              </div>
            </div>

            {/* Section 4: Content and Conduct */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>4. Content and Conduct</h2>
              <div className='pl-4 space-y-4'>
                <h3 className='text-xl font-semibold'>4.1 User Content</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  Users may submit content to our services. By doing so, you
                  grant us a non-exclusive, worldwide, royalty-free license to
                  use, modify, and distribute the content.
                </p>

                <h3 className='text-xl font-semibold'>
                  4.2 Prohibited Conduct
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  Users agree not to engage in any unlawful, abusive, or
                  inappropriate behavior, including but not limited to:
                </p>
                <ul className='list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300'>
                  <li>Misusing the Service for any illegal activities.</li>
                  <li>
                    Sharing or distributing proprietary content without
                    authorization.
                  </li>
                  <li>
                    Attempting to gain unauthorized access to our systems or
                    accounts.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5: Intellectual Property */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>5. Intellectual Property</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We retain all rights, title, and interest in and to our services
                and its content. Users may not copy, modify, distribute, sell,
                or lease any part of our services or included software.
                Furthermore, users may not reverse engineer or attempt to
                extract the source code of that software without express written
                permission from us.
              </p>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Users acknowledge and agree that any unauthorized use of our
                services or included software may constitute a violation of
                intellectual property rights, leading to legal consequences.
              </p>
            </div>

            {/* Section 6: Access Limitation */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>6. Access Limitation</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Access to the Service is strictly limited to one individual per
                account. We reserve the right to terminate your account if it is
                accessed by multiple individuals. By using the Service, you
                agree to use your account solely for your personal use and
                benefit. You further agree not to permit any third party to use
                your account.
              </p>
            </div>

            {/* Section 7: Termination */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>7. Termination</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We reserve the right to terminate or suspend your account or
                subscription at any time for any reason, including violations of
                these terms.
              </p>
            </div>

            {/* Section 8: Disclaimers */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                8. Disclaimers and Limitation of Liability
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                The Service and its content are provided "as is," without any
                warranties or representations of any kind, either express or
                implied. We do not warrant that the Service will be
                uninterrupted, error-free, or secure. We disclaim all liability
                for any damages or losses arising from your use of the Service.
              </p>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Under no circumstances shall we be liable for any direct,
                indirect, incidental, special, or consequential damages arising
                out of or in connection with the use of or inability to use the
                Service, even if we have been advised of the possibility of such
                damages. Users agree to use the Service at their own risk.
              </p>
            </div>

            {/* Section 9: Indemnification */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>9. Indemnification</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Users agree to indemnify, defend, and hold harmless PrepIB and
                its affiliates, officers, directors, employees, and agents from
                and against any and all claims, liabilities, damages, losses, or
                expenses, including reasonable attorneys' fees and costs,
                arising out of or in any way connected with your access to or
                use of the Service or your violation of these Terms.
              </p>
            </div>

            {/* Section 10: Subscription */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                10. Subscription Cancellation and Access
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                To cancel your subscription, click "Manage Subscription" in the
                website footer. Please email support@prepib.com if you have any
                issues canceling your subscription.
              </p>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Upon subscribing to our service, users are granted access to the
                Service for the period specified at the time of purchase. If a
                user decides to cancel their subscription, access to the Service
                is terminated immediately upon cancellation.
              </p>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Subscription fees are not prorated upon cancellation, and no
                refunds will be provided for the remaining period of access
                originally purchased.
              </p>
            </div>

            {/* Section 11: Changes */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>11. Changes to Terms</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We reserve the right to modify or revise these terms at any
                time. Users will be notified of changes, and continued use of
                the services after changes constitutes acceptance of the
                modified terms.
              </p>
            </div>

            {/* Section 12: Contact */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>12. Contact Information</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                If you have any questions or concerns about these Terms, please
                contact us at{" "}
                <a
                  href='mailto:support@prepib.com'
                  className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  support@prepib.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
