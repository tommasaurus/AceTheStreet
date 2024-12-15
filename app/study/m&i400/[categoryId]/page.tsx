import { FlashcardsContent } from "@/components/flashcards-content";

interface PageProps {
  params: {
    categoryId: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="container mx-auto py-8">
      <FlashcardsContent category="m-and-i" categoryId={params.categoryId} />
    </div>
  );
}
