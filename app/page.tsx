import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/ui/navbar";
import { PartnersSection } from "@/components/partners-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DemoSection } from "@/components/demo-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
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
