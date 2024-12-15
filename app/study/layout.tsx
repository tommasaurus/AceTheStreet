"use client";

import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LightbulbIcon,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Zap,
} from "lucide-react";
import { StudySidebar } from "@/components/study-sidebar";
import MatchContent from "@/components/study/match/MatchContent";
import { TestSetup, TestSettings } from "@/components/study/test/TestSetup";
import { TestInterface } from "@/components/study/test/TestInterface";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isTestMode, setIsTestMode] = useState(false);
  const [testSettings, setTestSettings] = useState<TestSettings | null>(null);

  useEffect(() => {
    setIsTestMode(false);
    setTestSettings(null);
  }, [pathname]);

  const handleStartTest = (settings: TestSettings) => {
    if (
      !settings.questionTypes.trueFalse &&
      !settings.questionTypes.multipleChoice &&
      !settings.questionTypes.matching
    ) {
      toast.error("Please select at least one question type");
      return;
    }

    if (settings.questionCount === 0) {
      toast.error("Please enter the number of questions");
      return;
    }

    setTestSettings(settings);
    setIsTestMode(true);
  };

  const handleTestComplete = (results: any) => {
    if (results === null) {
      // User clicked "Start New Test"
      setIsTestMode(false);
      setTestSettings(null);
    } else {
      // Test was completed normally
      console.log("Test completed with results:", results);
    }
  };

  const handleTabChange = (value: string) => {
    if (value !== "test") {
      setIsTestMode(false);
      setTestSettings(null);
    }
  };

  const shouldHideNav =
    pathname === "/study/banks" || pathname === "/study/m&i400";

  return (
    <div className="min-h-screen bg-background">
      <StudySidebar />

      {/* Main Content */}
      <div className="pl-64">
        <div className="container mx-auto px-4 py-6">
          {shouldHideNav ? (
            children
          ) : (
            <Tabs
              defaultValue="flashcards"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-5 h-auto gap-4">
                <TabsTrigger
                  value="flashcards"
                  className="flex flex-col py-4 gap-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <LightbulbIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Flashcards</span>
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>Learn</span>
                </TabsTrigger>
                <TabsTrigger value="test" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span>Test</span>
                </TabsTrigger>
                <TabsTrigger value="match" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span>Match</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span>Q-Chat</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flashcards">{children}</TabsContent>
              <TabsContent value="learn">
                <div className="p-4 text-center text-muted-foreground">
                  Learn content coming soon...
                </div>
              </TabsContent>
              <TabsContent value="test">
                {isTestMode && testSettings ? (
                  <TestInterface
                    settings={testSettings}
                    questions={[
                      {
                        id: 1,
                        type: "Technical",
                        question: "What is WACC?",
                        answer: "Weighted Average Cost of Capital",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 2,
                        type: "Technical",
                        question: "What is CAPM?",
                        answer: "Capital Asset Pricing Model",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 3,
                        type: "Technical",
                        question: "What is DCF?",
                        answer: "Discounted Cash Flow",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 4,
                        type: "Technical",
                        question: "What is LBO?",
                        answer: "Leveraged Buyout",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 5,
                        type: "Technical",
                        question: "What is EBITDA?",
                        answer:
                          "Earnings Before Interest, Taxes, Depreciation, and Amortization",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 6,
                        type: "Technical",
                        question: "What is ROE?",
                        answer: "Return on Equity",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 7,
                        type: "Technical",
                        question: "What is NPV?",
                        answer: "Net Present Value",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 8,
                        type: "Technical",
                        question: "What is IRR?",
                        answer: "Internal Rate of Return",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 9,
                        type: "Technical",
                        question: "What is Working Capital?",
                        answer: "Current Assets minus Current Liabilities",
                        completed: false,
                        bookmarked: false,
                      },
                      {
                        id: 10,
                        type: "Technical",
                        question: "What is Enterprise Value?",
                        answer: "Market Cap plus Net Debt",
                        completed: false,
                        bookmarked: false,
                      },
                    ]}
                    onComplete={handleTestComplete}
                  />
                ) : (
                  <TestSetup maxQuestions={50} onStartTest={handleStartTest} />
                )}
              </TabsContent>
              <TabsContent value="match">
                <MatchContent />
              </TabsContent>
              <TabsContent value="chat">
                <div className="p-4 text-center text-muted-foreground">
                  Q-Chat content coming soon...
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
