import { FlashcardsContent } from "@/components/dashboard/study/flashcards/flashcards-content";

interface PageProps {
  params: {
    bankId: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="container mx-auto py-8">
      <FlashcardsContent category="banks" bankId={params.bankId} />
    </div>
  );
}
