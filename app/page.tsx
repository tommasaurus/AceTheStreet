import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/ui/navbar";
import { PartnersSection } from "@/components/partners-section";
import { DemoSection } from "@/components/demo-section";
import { WhyUsSection } from "@/components/why-us-section";
import { PricingSection } from "@/components/pricing-section";
import { ScrollPath } from "@/components/scroll-path";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <ScrollPath />
      <div className="hero-section">
        <HeroSection />
      </div>
      <PartnersSection />
      <DemoSection />
      <WhyUsSection />
      <PricingSection />
    </main>
  );
}