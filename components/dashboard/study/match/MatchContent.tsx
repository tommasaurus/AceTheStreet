"use client";

import { usePathname } from "next/navigation";
import MatchGame from "./MatchGame";
import styles from "./match.module.css";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  question: string;
  answer: string;
}

export default function MatchContent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const pathParts = pathname.split("/");
        const id = pathParts.pop(); // Get the last part (bank slug or category id)
        const route = pathParts[pathParts.length - 1]; // Get the route type (banks or m&i400)

        if (id) {
          let query;

          if (route === "banks") {
            // First get the bank id
            const { data: bankData, error: bankError } = await supabase
              .from("banks")
              .select("id")
              .eq("slug", id)
              .single();

            if (bankError) {
              console.error("Error fetching bank:", bankError);
              return;
            }

            query = supabase
              .from("questions")
              .select("id, question, answer")
              .eq("bank_id", bankData.id);
          } else if (route === "m&i400") {
            // For M&I 400, use the category id directly
            query = supabase
              .from("questions")
              .select("id, question, answer")
              .eq("m_and_i_400_id", id);
          }

          if (query) {
            const { data: questionsData, error: questionsError } = await query;

            if (questionsError) {
              console.error("Error fetching questions:", questionsError);
              return;
            }

            setQuestions(questionsData || []);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [pathname, supabase]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white' />
      </div>
    );
  }

  if (!questions.length) {
    return <div>No questions available for matching.</div>;
  }

  return (
    <div className={cn(styles.container, "max-w-5xl mx-auto")}>
      <MatchGame questions={questions} />
    </div>
  );
}
