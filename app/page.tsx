import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/ui/navbar";
import { PartnersSection } from "@/components/partners-section";
import { DemoSection } from "@/components/demo-section";
import { WhyUsSection } from "@/components/why-us-section";
import { PricingSection } from "@/components/pricing-section";

// app/page.tsx
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <div className="hero-section">
        <HeroSection />
      </div>
      <PartnersSection />
      <div className="relative container mx-auto">
        {/* First section - Right aligned */}
        <div className="flex py-24">
          <div className="w-1/4" />
          <div className="w-3/4">
            <DemoSection />
          </div>
        </div>

        {/* Second section - Left aligned */}
        <div className="flex py-24">
          <div className="w-3/4">
            <WhyUsSection />
          </div>
          <div className="w-1/4" />
        </div>

        {/* Third section - Right aligned */}
        <PricingSection />
      </div>
    </main>
  );
}
