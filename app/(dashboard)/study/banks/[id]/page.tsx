import { FlashcardsContent } from "@/components/dashboard/study/flashcards/flashcards-content";
import { StudyHeader } from "@/components/dashboard/study/study-header";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="min-h-screen">
      {/* Reduced top padding from 72px to 48px */}
      <div className="pt-[48px] pb-8">
        <div className="container mx-auto">
          <FlashcardsContent category="banks" bankId={params.id} />
        </div>
      </div>
    </div>
  );
}
