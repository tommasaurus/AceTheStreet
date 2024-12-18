"use client";

import { useState } from "react";
import {
  Star,
  Crown,
  Gem,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface Feature {
  included: boolean;
  text: string;
}

interface PricingPlan {
  icon: React.ElementType;
  title: string;
  price: string;
  period: string;
  duration: string;
  stripePriceId?: string;
  type?: string;
  features: Feature[];
  popular?: boolean;
  bestValue?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    icon: Star,
    title: "Basic Plan",
    price: "$20",
    period: "month",
    duration: "1 MONTH",
    stripePriceId: "price_1QWjvkKOf8uvbAVYSOi1Wt42",
    type: "basic",
    features: [
      { included: true, text: "Bank specific questions" },
      { included: true, text: "M&I questions" },
      { included: true, text: "Test modes" },
      { included: true, text: "Email support" },
    ],
  },
  {
    icon: Crown,
    title: "Pro Plan",
    price: "$13.33",
    period: "month",
    duration: "3 MONTHS",
    popular: true,
    stripePriceId: "price_1QWjvkKOf8uvbAVYSOi1Wt42",
    type: "pro",
    features: [
      { included: true, text: "Bank specific questions" },
      { included: true, text: "M&I questions" },
      { included: true, text: "Test modes" },
      { included: true, text: "Email support" },
    ],
  },
  {
    icon: Gem,
    title: "Max Plan",
    price: "$6.67",
    period: "month",
    duration: "12 MONTHS",
    bestValue: true,
    stripePriceId: "price_1QWjvkKOf8uvbAVYSOi1Wt42",
    type: "max",
    features: [
      { included: true, text: "Bank specific questions" },
      { included: true, text: "M&I questions" },
      { included: true, text: "Test modes" },
      { included: true, text: "Email support" },
    ],
  },
];

export function PricingSection() {
  interface PricingCardProps {
    plan: PricingPlan;
    isRelative?: boolean;
  }

  const PricingCard = ({ plan, isRelative = false }: PricingCardProps) => {
    const Icon = plan.icon;
    const router = useRouter();

    const handleSubscribe = async (plan: PricingPlan) => {
      try {
        const supabase = createClientComponentClient();

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Redirect to signup instead of signin
          router.push("/signup");
          return;
        }

        // Create Stripe Checkout Session with metadata
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: plan.stripePriceId,
            userId: user.id,
            planType: plan.type,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create checkout session");
        }

        const { sessionUrl, error } = await response.json();

        if (error) {
          console.error("Checkout error:", error);
          return;
        }

        if (sessionUrl) {
          router.push(sessionUrl);
        }
      } catch (error) {
        console.error("Subscribe error:", error);
      }
    };

    return (
      <div className='relative' style={{ zIndex: 1 }}>
        {(plan.popular || plan.bestValue) && (
          <div
            className='absolute -top-3 left-0 right-0 flex justify-center'
            style={{ zIndex: 999 }}
          >
            <div
              className={`px-6 py-1.5 rounded-full text-sm font-medium shadow-lg relative ${
                plan.popular
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                  : "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 text-white"
              }`}
            >
              {plan.popular ? "Most Popular: Save 33%" : "Best Value"}
            </div>
          </div>
        )}
        <Card
          className={`bg-[#ECECEC] dark:bg-[#1c2936] rounded-3xl border-0 p-8 flex flex-col ${
            isRelative ? "relative" : ""
          }`}
        >
          {plan.popular && (
            <>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[24px] z-0' />
              <div className='absolute inset-[1px] bg-[#ECECEC] dark:bg-[#1c2936] rounded-[23px] z-10' />
            </>
          )}
          <div className={`${plan.popular ? "relative z-10" : ""}`}>
            <CardHeader className='p-0 space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='w-12 h-12 rounded-xl bg-[#E0E0E0] dark:bg-[#2a3744] flex items-center justify-center'>
                  <Icon className='w-6 h-6 text-black dark:text-white' />
                </div>
                <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>
                  {plan.duration}
                </span>
              </div>
              <div className='space-y-2'>
                <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                  {plan.title}
                </CardTitle>
                <div className='flex flex-col'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-5xl font-semibold text-black dark:text-white'>
                      {plan.price}
                    </span>
                    <span className='text-xl text-gray-500 dark:text-gray-400'>
                      /{plan.period}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0 mt-8 flex-grow flex flex-col justify-between'>
              <ul className='space-y-5 mb-8'>
                {plan.features.map((feature: Feature, index: number) => (
                  <li
                    key={index}
                    className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'
                  >
                    {feature.included ? (
                      <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    ) : (
                      <X className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button
                className='w-full bg-black hover:bg-black/80 text-white rounded-full h-12 transition-colors dark:bg-white dark:text-black dark:hover:bg-white/90'
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section id='pricing' className='py-16 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        {/* Title and subtitle */}
        <div className='text-center max-w-4xl mx-auto mb-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='mt-4 text-xl text-gray-600 dark:text-gray-300 italic'
          >
            "AceTheStreet helped me land an offer at Goldman Sachs! – Junior
            from UMich"
          </motion.p>
        </div>

        {/* Desktop Grid */}
        <div className='hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-4'>
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={index} plan={plan} isRelative={true} />
          ))}
        </div>

        {/* Mobile Stack - Replace the carousel with this */}
        <div className='md:hidden space-y-6'>
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={index} plan={plan} isRelative={true} />
          ))}
        </div>

        {/* Terms of Service Message */}
        <div className='text-center mt-8 text-sm text-gray-500 dark:text-gray-400'>
          By subscribing, you agree to our{" "}
          <Link
            href='/terms'
            className='text-black dark:text-white hover:underline'
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href='/privacy'
            className='text-black dark:text-white hover:underline'
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </section>
  );
}
