"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "valuation-1",
    name: "Valuation",
    questionCount: 4,
    description: "Core valuation concepts and methodologies",
  },
  {
    id: "accounting-1",
    name: "Accounting",
    questionCount: 3,
    description: "Essential accounting concepts and financial statements",
  },
  {
    id: "ma-1",
    name: "M&A",
    questionCount: 3,
    description: "Mergers & Acquisitions process and analysis",
  },
  {
    id: "lbo-1",
    name: "Leveraged Buyouts",
    questionCount: 3,
    description: "LBO modeling and private equity concepts",
  },
];

export default function M_and_I_Page() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">M&I 400</h1>
      <p className="text-muted-foreground mb-8">
        The complete Mergers & Inquisitions 400 interview questions
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/study/m&i400/${category.id}`}>
            <Card className="cursor-pointer transition-colors hover:bg-accent">
              <CardHeader>
                <div className="space-y-3">
                  <CardTitle>{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <Badge variant="secondary">
                    {category.questionCount} Questions
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
