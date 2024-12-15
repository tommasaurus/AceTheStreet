"use client";

import { FlashcardsContent } from "@/components/flashcards-content";

export default function M400Page({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <FlashcardsContent category="m-and-i" categoryId={params.categoryId} />
    </div>
  );
}
