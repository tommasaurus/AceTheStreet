import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Technical Problems",
    description:
      "Practice with real technical interview problems. Each problem comes with a detailed solution and explanation.",
    href: "/study/problems",
    count: "50+ Problems",
  },
  {
    title: "Bank Questions",
    description:
      "Bank-specific interview questions from top investment banks. Organized by institution.",
    href: "/study/banks",
    count: "200+ Questions",
  },
  {
    title: "M&I 400",
    description:
      "The complete Mergers & Inquisitions 400 interview questions with detailed answers.",
    href: "/study/m&i400",
    count: "400 Questions",
  },
];

export default function StudyPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
        Study Materials
      </h1>
      <p className="text-black/60 dark:text-white/60 mb-8">
        Choose a section below to start practicing.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 rounded-xl border border-black/5 hover:border-black/10 bg-white/50 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
              {section.title}
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60 mb-4">
              {section.description}
            </p>
            <div className="text-sm font-medium text-blue-500 dark:text-blue-400">
              {section.count}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
