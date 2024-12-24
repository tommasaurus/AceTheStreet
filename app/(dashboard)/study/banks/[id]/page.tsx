import { FlashcardsContent } from "@/components/dashboard/study/flashcards/flashcards-content";
import { StudyHeader } from "@/components/dashboard/study/study-header";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto py-8'>
        <FlashcardsContent category='banks' bankId={params.id} />
      </div>
    </div>
  );
}
