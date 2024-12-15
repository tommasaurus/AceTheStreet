"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Bookmark } from "lucide-react";

const questions = [
  {
    id: 1,
    type: "Technical",
    question:
      "Walk me through the three financial statements and how they're connected?",
    answer:
      "The three financial statements (Income Statement, Balance Sheet, and Cash Flow Statement) are interconnected in several ways:\n\n1. Net Income from the Income Statement flows into Retained Earnings on the Balance Sheet\n2. Changes in Balance Sheet accounts affect the Cash Flow Statement\n3. Depreciation appears on both Income Statement and Cash Flow Statement",
    completed: false,
    bookmarked: false,
  },
  {
    id: 2,
    type: "Technical",
    question: "What happens to cash flow when inventory increases by $10?",
    answer:
      "When inventory increases by $10:\n1. Operating Cash Flow decreases by $10\n2. This is reflected as a negative adjustment in the Cash Flow Statement\n3. It represents a use of cash as money is tied up in inventory",
    completed: true,
    bookmarked: true,
  },
  {
    id: 3,
    type: "Behavioral",
    question: "Why investment banking?",
    answer:
      "A strong answer would include:\n1. Interest in complex financial transactions\n2. Desire to work on meaningful deals\n3. Appreciation for the analytical and interpersonal skills required\n4. Specific examples of what attracted you to the field",
    completed: true,
    bookmarked: false,
  },
  {
    id: 4,
    type: "Technical",
    question: "What is EBITDA and why is it important?",
    answer:
      "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is important because:\n1. It's a proxy for operating cash flow\n2. Removes capital structure impact for better company comparisons\n3. Widely used in valuation multiples\n4. Shows operational performance before accounting and financial deductions",
    completed: false,
    bookmarked: true,
  },
  {
    id: 5,
    type: "Technical",
    question: "Walk me through a DCF analysis",
    answer:
      "A DCF (Discounted Cash Flow) analysis involves:\n1. Project future free cash flows\n2. Determine appropriate discount rate (WACC)\n3. Calculate terminal value\n4. Discount all cash flows to present value\n5. Sum up to get enterprise value\n6. Adjust for debt and cash to get equity value",
    completed: false,
    bookmarked: false,
  },
  {
    id: 6,
    type: "Technical",
    question:
      "What's the difference between enterprise value and equity value?",
    answer:
      "Key differences include:\n1. Enterprise Value = Equity Value + Net Debt + Minority Interest - Associates\n2. EV represents total business value, Equity Value represents shareholders' value\n3. EV used for operational multiples (EV/EBITDA), Equity Value for equity multiples (P/E)\n4. EV considers capital structure, Equity Value doesn't",
    completed: false,
    bookmarked: false,
  },
  {
    id: 7,
    type: "Behavioral",
    question: "Tell me about a time you worked in a team",
    answer:
      "Strong answer structure:\n1. Specific situation and context\n2. Your role in the team\n3. Challenges faced and how they were overcome\n4. Results achieved\n5. What you learned about teamwork\n6. How this experience prepared you for banking",
    completed: false,
    bookmarked: false,
  },
  {
    id: 8,
    type: "Technical",
    question: "How do you calculate unlevered free cash flow?",
    answer:
      "Unlevered Free Cash Flow calculation:\n1. Start with EBIT\n2. Subtract taxes (EBIT × Tax Rate)\n3. Add back D&A\n4. Subtract Changes in Working Capital\n5. Subtract Capex\n6. Result is UFCF used in DCF analysis",
    completed: false,
    bookmarked: false,
  },
  {
    id: 9,
    type: "Technical",
    question: "What are the different types of synergies in M&A?",
    answer:
      "Key synergy types:\n1. Revenue Synergies (Cross-selling, Market expansion)\n2. Cost Synergies (Operational efficiency, Redundancy elimination)\n3. Financial Synergies (Tax benefits, Better debt capacity)\n4. Strategic Synergies (Market power, Technology acquisition)",
    completed: false,
    bookmarked: false,
  },
  {
    id: 10,
    type: "Behavioral",
    question: "What are your strengths and weaknesses?",
    answer:
      "Effective response structure:\n1. Strengths: Analytical skills, attention to detail, work ethic\n2. Show how strengths align with banking\n3. Weakness: Choose something improvable\n4. Show steps taken to address weakness\n5. Demonstrate self-awareness and growth mindset",
    completed: false,
    bookmarked: false,
  },
  {
    id: 11,
    type: "Technical",
    question:
      "What's the difference between commercial and investment banking?",
    answer:
      "Key differences:\n1. Services: Commercial (Deposits, Loans) vs Investment (Advisory, Capital Markets)\n2. Clients: Commercial (Individuals, Small Business) vs Investment (Corporations, Institutions)\n3. Revenue: Commercial (Interest Spread) vs Investment (Fees)\n4. Risk: Commercial (Credit Risk) vs Investment (Market Risk)\n5. Regulation: Commercial (More) vs Investment (Less)",
    completed: false,
    bookmarked: false,
  },
  {
    id: 12,
    type: "Technical",
    question: "How do you value a company with negative earnings?",
    answer:
      "Valuation approaches for negative earnings:\n1. Revenue multiples instead of earnings multiples\n2. Focus on future profitability and growth potential\n3. Use of alternative metrics (GMV, MAU, etc.)\n4. Asset-based valuation if applicable\n5. Consider recent comparable transactions\n6. DCF with projected future positive earnings",
    completed: false,
    bookmarked: false,
  },
  {
    id: 13,
    type: "Behavioral",
    question: "Where do you see yourself in 5 years?",
    answer:
      "Strong response elements:\n1. Show commitment to banking career\n2. Demonstrate understanding of career progression\n3. Express interest in specific sector/product\n4. Highlight desire for increasing responsibility\n5. Show realistic expectations\n6. Connect goals to bank's platform",
    completed: false,
    bookmarked: false,
  },
];

export default function ProblemsPage() {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <div className="w-1/2 border-r">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {questions.map((q) => (
              <Card
                key={q.id}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  selectedQuestion.id === q.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedQuestion(q)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge
                        variant={
                          q.type === "Technical" ? "default" : "secondary"
                        }
                      >
                        {q.type}
                      </Badge>
                      <CardTitle className="text-base font-medium">
                        {q.question}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 text-muted-foreground">
                      {q.completed && <Check className="h-4 w-4" />}
                      {q.bookmarked && <Bookmark className="h-4 w-4" />}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/2 p-6">
        <div className="space-y-4">
          <Badge
            variant={
              selectedQuestion.type === "Technical" ? "default" : "secondary"
            }
          >
            {selectedQuestion.type}
          </Badge>
          <h2 className="text-2xl font-semibold">
            {selectedQuestion.question}
          </h2>
          <div className="prose prose-sm dark:prose-invert">
            {selectedQuestion.answer.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
