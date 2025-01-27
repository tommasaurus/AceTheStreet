"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Category {
  id: string;
  name: string;
  description: string;
  question_count: number;
  gradient: string;
}

export default function M_and_I_Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("m_and_i_400")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching categories:", error);
          return;
        }

        setCategories(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [supabase]);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white' />
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full'>
      <div className='relative max-w-6xl mx-auto space-y-12 px-4 sm:px-6 pt-8'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4'
        >
          <h1 className='text-4xl sm:text-6xl font-bold text-black dark:text-white'>
            M&I 400
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl'>
            The complete Mergers & Inquisitions 400 interview questions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='relative'
        >
          <div className='relative bg-[#ECECEC] dark:bg-[#1c2936] rounded-2xl p-2'>
            <Search className='absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-300' />
            <Input
              placeholder='Search categories...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-12 h-14 text-lg bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400'
            />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8'>
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
              }}
            >
              <Link
                href={`/study/m&i400/${category.id}`}
                className='block group'
              >
                <Card className='relative h-[280px] rounded-3xl border-0 bg-[#ECECEC] dark:bg-[#1c2936] p-8 overflow-hidden'>
                  <CardHeader className='relative p-0 h-full z-10'>
                    <div className='flex h-full flex-col justify-between'>
                      <div className='space-y-3'>
                        <CardTitle className='text-3xl font-semibold text-black dark:text-white'>
                          {category.name}
                        </CardTitle>
                        <p className='text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed'>
                          {category.description}
                        </p>
                      </div>

                      <div className='flex items-center justify-between'>
                        <Badge
                          variant='secondary'
                          className='text-sm py-1.5 px-4 rounded-full bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm'
                        >
                          {category.question_count} Questions
                        </Badge>
                        <div className='w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
