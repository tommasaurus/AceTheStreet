import { PricingPage } from "@/components/marketing/pricing-page";
import { Navbar } from "@/components/marketing/navbar";
import { PricingSection } from "@/components/marketing/pricing-section";
import { Footer } from "@/components/marketing/footer";

export default function Page() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <PricingSection showContinueButton={true} />
      <Footer />
    </main>
  );
}
