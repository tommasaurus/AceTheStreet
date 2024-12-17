import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// This would typically come from a database
const problems = {
  "three-statements": {
    title:
      "Walk me through the three financial statements and how they're connected?",
    category: "Technical",
    difficulty: "Medium",
    answer: `The three financial statements (Income Statement, Balance Sheet, and Cash Flow Statement) are interconnected in several ways:

1. Net Income from the Income Statement flows into Retained Earnings on the Balance Sheet
2. Changes in Balance Sheet accounts affect the Cash Flow Statement
3. Depreciation appears on both Income Statement and Cash Flow Statement`,
  },
  "inventory-cash-flow": {
    title: "What happens to cash flow when inventory increases by $10?",
    category: "Technical",
    difficulty: "Easy",
    answer: `When inventory increases by $10:
1. Operating Cash Flow decreases by $10
2. This is reflected as a negative adjustment in the Cash Flow Statement
3. It represents a use of cash as money is tied up in inventory`,
  },
  "why-ib": {
    title: "Why investment banking?",
    category: "Behavioral",
    difficulty: "Medium",
    answer: `A strong answer would include:
1. Interest in complex financial transactions
2. Desire to work on meaningful deals
3. Appreciation for the analytical and interpersonal skills required
4. Specific examples of what attracted you to the field`,
  },
};

export default function ProblemPage({ params }: { params: { id: string } }) {
  const problem = problems[params.id as keyof typeof problems];

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/study/problems" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Problems
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
            {problem.title}
          </h1>
          <div className="flex gap-2">
            <Badge variant="outline">{problem.category}</Badge>
            <Badge
              variant="outline"
              className={
                problem.difficulty === "Easy"
                  ? "border-green-500 text-green-500"
                  : problem.difficulty === "Medium"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-red-500 text-red-500"
              }
            >
              {problem.difficulty}
            </Badge>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {problem.answer.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-black/80 dark:text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
