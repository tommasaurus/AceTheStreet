import { FlashcardsContent } from "@/components/dashboard/study/flashcards/flashcards-content";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <FlashcardsContent category="banks" bankId={params.slug} />
      </div>
    </div>
  );
}
