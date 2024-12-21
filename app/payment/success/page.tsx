"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/signin");
          return;
        }

        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(async () => {
          try {
            attempts++;

            const { data: subscription, error } = await supabase
              .from("subscriptions")
              .select("*")
              .eq("user_id", user.id)
              .eq("status", "active")
              .single();

            if (error) throw error;

            if (subscription) {
              clearInterval(interval);
              router.push("/study");
            } else if (attempts >= maxAttempts) {
              clearInterval(interval);
              router.push("/pricing?error=subscription_failed");
            }
          } catch (error) {
            console.error("Error checking subscription:", error);
            clearInterval(interval);
            router.push("/pricing?error=unexpected_error");
          }
        }, 2000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error in checkSubscription:", error);
        router.push("/pricing?error=unexpected_error");
      }
    };

    checkSubscription();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing your payment...</h1>
        <p className="text-gray-600">
          Please wait while we confirm your subscription.
        </p>
      </div>
    </div>
  );
}
