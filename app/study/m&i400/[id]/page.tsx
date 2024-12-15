import { FlashcardsContent } from "@/components/flashcards-content";

const categories = ["valuation-1", "accounting-1", "ma-1", "lbo-1"];

export function generateStaticParams() {
  return categories.map((id) => ({
    id,
  }));
}

export default function M_and_I_QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  return <FlashcardsContent category="m-and-i" categoryId={params.id} />;
}
