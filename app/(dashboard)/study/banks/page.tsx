"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const banks = [
  {
    id: "goldman-sachs-1",
    name: "Goldman Sachs",
    questionCount: 3,
    description:
      "Technical and behavioral questions from Goldman Sachs interviews",
  },
  {
    id: "morgan-stanley-1",
    name: "Morgan Stanley",
    questionCount: 3,
    description: "Common interview questions from Morgan Stanley",
  },
  {
    id: "jpmorgan-1",
    name: "JP Morgan",
    questionCount: 3,
    description: "JP Morgan's technical and behavioral interview questions",
  },
];

export default function BanksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Bank Questions</h1>
      <p className="text-muted-foreground mb-8">
        Practice with bank-specific interview questions
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search banks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBanks.map((bank) => (
          <Link key={bank.id} href={`/study/banks/${bank.id}`}>
            <Card className="cursor-pointer transition-colors hover:bg-accent">
              <CardHeader>
                <div className="space-y-3">
                  <CardTitle>{bank.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {bank.description}
                  </p>
                  <Badge variant="secondary">
                    {bank.questionCount} Questions
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
