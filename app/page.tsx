import { HeroSection } from "@/components/frontpage/hero-section";
import { Navbar } from "@/components/frontpage/navbar";
import { PartnersSection } from "@/components/frontpage/partners-section";
import { TestimonialsSection } from "@/components/frontpage/testimonials-section";
import { DemoSection } from "@/components/frontpage/demo-section";
import { PricingSection } from "@/components/frontpage/pricing-section";
import { FAQSection } from "@/components/frontpage/faq-section";
import { Footer } from "@/components/frontpage/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// app/page.tsx
export default function Home() {
  return (
    <main className='relative bg-background'>
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <TestimonialsSection />
      <DemoSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
