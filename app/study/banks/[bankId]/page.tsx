"use client";

import { FlashcardsContent } from "@/components/flashcards-content";

export default function BankPage({ params }: { params: { bankId: string } }) {
  return (
    <div className="container mx-auto py-8">
      <FlashcardsContent category="banks" bankId={params.bankId} />
    </div>
  );
}
