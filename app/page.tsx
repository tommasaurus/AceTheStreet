import { HeroSection } from "@/components/marketing/hero-section";
import { Navbar } from "@/components/marketing/navbar";
import { PartnersSection } from "@/components/marketing/partners-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { DemoSection } from "@/components/marketing/demo-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { Footer } from "@/components/marketing/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

//test commit 1
export default function Home() {
  return (
    <main className='relative bg-background'>
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <TestimonialsSection />
      <DemoSection />
      <PricingSection showContinueButton={false} />
      <FAQSection />
      <Footer />
    </main>
  );
}
