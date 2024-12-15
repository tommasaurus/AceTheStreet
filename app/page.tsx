import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/ui/navbar";
import { PartnersSection } from "@/components/partners-section";
import { DemoSection } from "@/components/testimonials-section";
import { WhyUsSection } from "@/components/why-us-section";
import { PricingSection } from "@/components/pricing-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// app/page.tsx
export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <DemoSection />
      <WhyUsSection />
      <PricingSection />
      <Link href="/flashcards">
        <Button size="lg" className="w-full sm:w-auto">
          Try for Free
        </Button>
      </Link>
    </main>
  );
}
