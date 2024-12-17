"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Investment Banking Prep?",
    answer:
      "Investment Banking Prep is a comprehensive platform designed to help candidates prepare for investment banking interviews. We provide technical questions, bank-specific interview preparation, and community access to help you secure roles at top investment banks.",
  },
  {
    question: "How does the question bank work?",
    answer:
      "Our platform features a vast collection of technical and behavioral questions from actual interviews at major banks like Goldman Sachs, Morgan Stanley, and JPMorgan. Questions are regularly updated based on recent interviews and verified by industry professionals.",
  },
  {
    question: "What types of practice modes are available?",
    answer:
      "We offer multiple study modes including flashcards, matching games, and timed tests. You can practice with bank-specific questions, general technical questions, and customize your learning experience based on your needs.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes, our platform tracks your performance across different question types and topics. You can see your improvement over time, identify weak areas, and focus your preparation where it's needed most.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id='faq' className='py-12 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16'
        >
          FAQ
        </motion.h2>

        <div className='max-w-3xl mx-auto space-y-4'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className='border-b border-gray-200 dark:border-gray-800 last:border-0'
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full py-6 flex items-center justify-between gap-4 text-left'
              >
                <span className='text-xl font-medium text-black dark:text-white'>
                  {faq.question}
                </span>
                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                    openIndex === index && "rotate-45"
                  )}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='pb-6 text-gray-600 dark:text-gray-300'
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
