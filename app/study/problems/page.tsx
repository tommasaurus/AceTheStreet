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
