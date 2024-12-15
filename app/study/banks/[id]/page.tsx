import { FlashcardsContent } from "@/components/flashcards-content";

const banks = ["goldman-sachs-1", "morgan-stanley-1", "jpmorgan-1"];

export function generateStaticParams() {
  return banks.map((id) => ({
    id,
  }));
}

export default function BankQuestionPage({
  params,
}: {
  params: { id: string };
}) {
  return <FlashcardsContent category="banks" bankId={params.id} />;
}
