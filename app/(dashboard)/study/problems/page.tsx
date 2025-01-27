"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Bookmark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Question {
  id: string;
  question: string;
  answer: string;
  completed?: boolean;
  bookmarked?: boolean;
  bank_id?: string;
  category_id?: string;
  m_and_i_400_id?: string;
  banks?: {
    name: string;
  };
  categories?: {
    name: string;
  };
  m_and_i_400?: {
    name: string;
  };
}

export default function ProblemsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // Fetch questions with bank and category names
        const { data, error } = await supabase.from("questions").select(`
            *,
            banks:bank_id (name),
            categories:category_id (name),
            m_and_i_400:m_and_i_400_id (name)
          `);

        if (error) {
          console.error("Error fetching questions:", error);
          return;
        }

        // Transform the data to include bank_name or category_name
        const questionsWithNames = data.map((q: any) => ({
          ...q,
          bank_name: q.banks?.name,
          category_name: q.categories?.name,
          completed: false,
          bookmarked: false,
        }));

        setQuestions(questionsWithNames);
        if (questionsWithNames.length > 0) {
          setSelectedQuestion(questionsWithNames[0]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [supabase]);

  // Get the display name (either bank or category name)
  const getDisplayName = (question: Question) => {
    if (question.bank_id && question.banks?.name) {
      return question.banks.name;
    }
    if (question.category_id && question.categories?.name) {
      return question.categories.name;
    }
    if (question.m_and_i_400_id && question.m_and_i_400?.name) {
      return question.m_and_i_400.name;
    }
    throw new Error(
      "Question must belong to either a bank, category, or M&I 400"
    );
  };

  // Update the filter to use bank/category names
  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDisplayName(q).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative max-w-6xl mx-auto space-y-8 px-4 sm:px-6 pt-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-black dark:text-white">
            Technical Problems
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Practice with real technical and behavioral interview problems.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative bg-[#ECECEC] dark:bg-[#1c2936] rounded-2xl p-2">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </motion.div>

        {/* Split View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row bg-[#ECECEC] dark:bg-[#1c2936] rounded-3xl overflow-hidden min-h-[600px] border-0"
        >
          {/* Questions List */}
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
            <ScrollArea className="h-[300px] md:h-[600px]">
              <div className="p-4 space-y-3">
                {filteredQuestions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.05,
                    }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 border-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 ${
                        selectedQuestion?.id === q.id
                          ? "ring-2 ring-black/10 dark:ring-white/10"
                          : ""
                      }`}
                      onClick={() => setSelectedQuestion(q)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Badge
                              variant="default"
                              className="bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm"
                            >
                              {getDisplayName(q)}
                            </Badge>
                            <CardTitle className="text-base font-medium text-black dark:text-white">
                              {q.question}
                            </CardTitle>
                          </div>
                          <div className="flex gap-2 text-gray-400 dark:text-gray-500">
                            {q.completed && <Check className="h-4 w-4" />}
                            {q.bookmarked && <Bookmark className="h-4 w-4" />}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Answer View */}
          <div className="w-full md:w-1/2 p-6">
            <motion.div
              key={selectedQuestion?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Badge
                variant="default"
                className="bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm"
              >
                {selectedQuestion && getDisplayName(selectedQuestion)}
              </Badge>
              <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                {selectedQuestion?.question}
              </h2>
              <div className="prose prose-sm dark:prose-invert">
                {selectedQuestion?.answer?.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                )) ?? (
                  <p className="text-gray-600 dark:text-gray-300">
                    No answer provided
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
