"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const banks = [
  {
    id: "goldman-sachs-1",
    name: "Goldman Sachs",
    questionCount: 3,
    description:
      "Technical and behavioral questions from Goldman Sachs interviews",
    gradient: "from-[#FF8F71] to-[#EF2F88]",
  },
  {
    id: "morgan-stanley-1",
    name: "Morgan Stanley",
    questionCount: 3,
    description: "Common interview questions from Morgan Stanley",
    gradient: "from-[#4158D0] to-[#C850C0]",
  },
  {
    id: "jpmorgan-1",
    name: "JP Morgan",
    questionCount: 3,
    description: "JP Morgan's technical and behavioral interview questions",
    gradient: "from-[#0093E9] to-[#80D0C7]",
  },
];

export default function BanksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Bank Questions
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl'>
            Practice with bank-specific interview questions
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
              placeholder='Search banks...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-12 h-14 text-lg bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400'
            />
          </div>
        </motion.div>

        {/* Banks Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8'>
          {filteredBanks.map((bank, index) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
              }}
            >
              <Link href={`/study/banks/${bank.id}`} className='block group'>
                <Card className='relative h-[280px] rounded-3xl border-0 bg-[#ECECEC] dark:bg-[#1c2936] p-8 overflow-hidden'>
                  <CardHeader className='relative p-0 h-full z-10'>
                    <div className='flex h-full flex-col justify-between'>
                      <div className='space-y-3'>
                        <CardTitle className='text-3xl font-semibold text-black dark:text-white'>
                          {bank.name}
                        </CardTitle>
                        <p className='text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed'>
                          {bank.description}
                        </p>
                      </div>

                      <div className='flex items-center justify-between'>
                        <Badge
                          variant='secondary'
                          className='text-sm py-1.5 px-4 rounded-full bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 backdrop-blur-sm'
                        >
                          {bank.questionCount} Questions
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
