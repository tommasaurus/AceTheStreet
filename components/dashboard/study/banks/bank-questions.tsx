"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Bookmark, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  type: string;
  question: string;
  answer: string;
  completed: boolean;
  bookmarked: boolean;
}

interface BankQuestions {
  bank: string;
  questions: Question[];
}

export function BankQuestions({
  bankQuestions,
}: {
  bankQuestions: BankQuestions;
}) {
  const [selectedQuestion, setSelectedQuestion] = useState(
    bankQuestions.questions[0]
  );

  return (
    <div>
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/study/banks" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Banks
        </Link>
      </Button>

      <div className="flex h-[calc(100vh-16rem)]">
        <div className="w-1/2 border-r">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {bankQuestions.questions.map((q) => (
                <Card
                  key={q.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedQuestion?.id === q.id ? "border-primary" : ""
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
                selectedQuestion?.type === "Technical" ? "default" : "secondary"
              }
            >
              {selectedQuestion?.type}
            </Badge>
            <h2 className="text-2xl font-semibold">
              {selectedQuestion?.question}
            </h2>
            <div className="prose prose-sm dark:prose-invert">
              {selectedQuestion?.answer.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
