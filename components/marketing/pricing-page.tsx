"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PricingSection } from "@/components/marketing/pricing-section";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function PricingPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("status", "active")
          .single();

        if (subscription && subscription.current_period_end > new Date().toISOString()) {
          router.replace("/study");
          return;
        }
      }

      setLoading(false);
      setMounted(true);
    };

    checkSession();
  }, [supabase, router]);

  if (!mounted || loading) {
    return (
      <div className='min-h-screen md:h-screen md:overflow-hidden bg-white dark:bg-[#151e2a]'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-center md:justify-start h-16'>
            <div className='relative w-[140px] h-[45px] md:-ml-2' />
          </div>
          <div className='md:-mt-16'>
            <div className='h-screen flex items-center justify-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className='min-h-screen md:h-screen md:overflow-hidden bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-center md:justify-start h-16'>
          <Link href='/' className='flex items-center md:-ml-2'>
            <div className='relative w-[140px] h-[45px]'>
              <Image
                src={
                  currentTheme === "dark"
                    ? "/images/logoLight.png"
                    : "/images/logoDark.png"
                }
                alt='AceTheStreet Logo'
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
        </div>

        <div className='md:-mt-16'>
          <PricingSection />
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
