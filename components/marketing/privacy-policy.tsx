"use client";

import { motion } from "framer-motion";

export function PrivacyPolicy() {
  return (
    <section className='py-16 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-12'
        >
          Privacy Policy
        </motion.h1>
        <div className='prose prose-lg dark:prose-invert max-w-4xl mx-auto'>
          <div className='space-y-8'>
            {/* Introduction */}
            <div className='space-y-4'>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed italic'>
                Effective Date: January 1, 2024
              </p>
              <h2 className='text-2xl font-bold'>Introduction</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                This Privacy Policy outlines how PrepIB ("we," "us," or "our")
                collects, uses, discloses, and protects your information when
                you access and use our website prepib.com (the "Website") and
                associated services (the "Service"). By using our Service, you
                agree to the terms of this Privacy Policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Information We Collect</h2>

              <div className='pl-4 space-y-4'>
                <h3 className='text-xl font-semibold'>Personal Information</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  When you register for an account, subscribe to our Service, or
                  contact us, we may collect personal information, including but
                  not limited to:
                </p>
                <ul className='list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300'>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Payment information</li>
                  <li>Other information you voluntarily provide</li>
                </ul>

                <h3 className='text-xl font-semibold'>
                  Non-Personal Information
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  We may collect non-personal information about your interaction
                  with our Service, such as:
                </p>
                <ul className='list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300'>
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>IP address</li>
                  <li>Pages visited</li>
                  <li>Time spent on the Website</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                Cookies and Tracking Technologies
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We use cookies, beacons, and other tracking technologies to
                improve your user experience and analyze usage patterns. You can
                manage your cookie preferences through your browser settings.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                How We Use Your Information
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We use the information we collect to:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300'>
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and manage subscriptions</li>
                <li>
                  Communicate with you, including sending account updates and
                  promotional content
                </li>
                <li>Personalize your experience</li>
                <li>
                  Protect against fraud, unauthorized access, and other illegal
                  activities
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                Information Sharing and Disclosure
              </h2>

              <div className='pl-4 space-y-4'>
                <h3 className='text-xl font-semibold'>
                  Third-Party Service Providers
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  We may share your information with third-party providers to
                  assist us in delivering the Service, such as payment
                  processors and hosting providers. These providers are bound by
                  confidentiality agreements.
                </p>

                <h3 className='text-xl font-semibold'>Legal Compliance</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  We may disclose your information if required by law or if we
                  believe such disclosure is necessary to:
                </p>
                <ul className='list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300'>
                  <li>Comply with legal obligations</li>
                  <li>Protect and defend our rights or property</li>
                  <li>Prevent illegal activity or protect users' safety</li>
                </ul>

                <h3 className='text-xl font-semibold'>Business Transfers</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred to the acquiring entity.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Data Security</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We implement reasonable security measures to protect your
                information from unauthorized access, disclosure, or misuse.
                However, no data transmission or storage system can be
                guaranteed to be 100% secure.
              </p>
            </div>

            {/* Your Choices */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Your Choices</h2>

              <div className='pl-4 space-y-4'>
                <h3 className='text-xl font-semibold'>Account Information</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  You can update or delete your account information by accessing
                  your account settings. Please note that we may retain certain
                  information as required by law or for legitimate business
                  purposes.
                </p>

                <h3 className='text-xl font-semibold'>
                  Marketing Communications
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  You can opt out of receiving promotional emails by following
                  the unsubscribe instructions in those emails. Please note that
                  you may still receive transactional or account-related emails.
                </p>

                <h3 className='text-xl font-semibold'>Cookies</h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  You can manage or disable cookies through your browser
                  settings. Disabling cookies may affect your experience with
                  the Service.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Children's Privacy</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                Our Service is not intended for individuals under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If we become aware that a child under 13 has provided
                us with personal information, we will delete such information.
              </p>
            </div>

            {/* International Users */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>International Users</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                If you access our Service from outside the United States, your
                information may be transferred to and processed in the United
                States. By using the Service, you consent to such transfer and
                processing.
              </p>
            </div>

            {/* Changes */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                Changes to This Privacy Policy
              </h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                We reserve the right to update this Privacy Policy at any time.
                We will notify you of any material changes by posting the
                updated policy on the Website. Your continued use of the Service
                after changes are made constitutes acceptance of the updated
                policy.
              </p>
            </div>

            {/* Contact */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Contact Us</h2>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
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
