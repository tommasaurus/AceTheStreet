import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/ui/navbar";
import { PartnersSection } from "@/components/partners-section";
import { DemoSection } from "@/components/demo-section";
import { WhyUsSection } from "@/components/why-us-section";
import { PricingSection } from "@/components/pricing-section";

// app/page.tsx
export default function Home() {
  return (
    <main className='relative bg-background'>
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <DemoSection />
      <WhyUsSection />
      <PricingSection />
    </main>
  );
}
