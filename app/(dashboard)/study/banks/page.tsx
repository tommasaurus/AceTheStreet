"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";
import { useTheme } from "next-themes";

const banks = [
  {
    id: "goldman-sachs-1",
    name: "Goldman Sachs",
    questionCount: 3,
    description:
      "Technical and behavioral questions from Goldman Sachs interviews",
    color: {
      light: "from-blue-600 to-indigo-600",
      dark: "from-blue-400 to-indigo-500",
    },
  },
  {
    id: "morgan-stanley-1",
    name: "Morgan Stanley",
    questionCount: 3,
    description: "Common interview questions from Morgan Stanley",
    color: {
      light: "from-violet-600 to-purple-600",
      dark: "from-violet-400 to-purple-500",
    },
  },
  {
    id: "jpmorgan-1",
    name: "JP Morgan",
    questionCount: 3,
    description: "JP Morgan's technical and behavioral interview questions",
    color: {
      light: "from-fuchsia-600 to-pink-600",
      dark: "from-fuchsia-400 to-pink-500",
    },
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
    <div className="max-w-6xl animate-fade-in">
      <div className="relative mb-12 p-8 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border border-black/5 dark:border-white/10">
        <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
            <Badge
              variant="secondary"
              className="text-sm py-1 px-3 bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80"
            >
              Investment Banks
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Bank Questions
          </h1>
          <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl">
            Practice with bank-specific interview questions from leading
            investment banks
          </p>
        </div>
      </div>

      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl" />
        <div className="relative bg-white/80 dark:bg-background/80 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 p-2">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 dark:text-white/40" />
          <Input
            placeholder="Search banks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/30 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBanks.map((bank) => (
          <Link key={bank.id} href={`/study/banks/${bank.id}`}>
            <Card className="group relative h-[280px] overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-black/[0.02] via-black/[0.01] to-transparent dark:from-white/[0.02] dark:via-white/[0.01] dark:to-transparent backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  isDark ? bank.color.dark : bank.color.light
                } opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl group-hover:blur-2xl transition-all duration-500" />

              <CardHeader className="h-full">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-colors">
                        {bank.name}
                      </CardTitle>
                      <p className="text-base text-black/60 dark:text-white/60 leading-relaxed">
                        {bank.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <Badge
                      variant="secondary"
                      className="bg-black/5 dark:bg-white/5 text-sm py-1.5 px-4 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-sm text-black/70 dark:text-white/70"
                    >
                      {bank.questionCount} Questions
                    </Badge>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
