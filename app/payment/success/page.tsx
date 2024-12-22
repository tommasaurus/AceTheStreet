"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const checkSubscription = async () => {
      try {
        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!session?.user || sessionError) {
          console.log("No session found, redirecting to signin");
          router.push("/signin");
          return;
        }

        const userId = session.user.id;
        console.log("Checking subscription for user:", userId);

        let attempts = 0;
        const maxAttempts = 15; // Increased max attempts

        checkInterval = setInterval(async () => {
          try {
            attempts++;
            const { data: subscription, error } = await supabase
              .from("subscriptions")
              .select("*")
              .eq("user_id", userId)
              .single();

            if (error) {
              console.error("Subscription check error:", error);
              if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                router.push("/pricing?error=subscription_failed");
              }
              return;
            }

            console.log("Current subscription state:", subscription);

            if (subscription?.status === "active") {
              console.log("Found active subscription");
              clearInterval(checkInterval);
              router.push("/study");
            } else if (attempts >= maxAttempts) {
              console.log("Max attempts reached, subscription not active");
              clearInterval(checkInterval);
              router.push("/pricing?error=subscription_pending");
            }
          } catch (error) {
            console.error("Error in subscription check:", error);
          }
        }, 2000);
      } catch (error) {
        console.error("Error in checkSubscription:", error);
      }
    };

    checkSubscription();

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mb-4" />
      <p className="text-lg">Processing your subscription...</p>
    </div>
  );
}
