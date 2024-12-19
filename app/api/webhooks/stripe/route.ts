import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    console.log("Webhook received:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Full session data:", JSON.stringify(session, null, 2));

        // Verify payment was successful
        if (session.payment_status !== "paid") {
          console.log("Payment not successful");
          return NextResponse.json({ received: true });
        }

        const userId = session.metadata?.userId;
        const planType = session.metadata?.planType;
        console.log("Metadata:", { userId, planType });

        if (!userId || !planType) {
          throw new Error("Missing required metadata");
        }

        // Calculate subscription period
        const now = new Date();
        const periodEnd = new Date();

        switch (planType) {
          case "basic":
            periodEnd.setMonth(periodEnd.getMonth() + 1);
            break;
          case "pro":
            periodEnd.setMonth(periodEnd.getMonth() + 3);
            break;
          case "max":
            periodEnd.setFullYear(periodEnd.getFullYear() + 1);
            break;
          default:
            throw new Error("Invalid plan type");
        }

        // Use supabase client with service role
        const { error } = await supabase.from("subscriptions").upsert({
          user_id: userId,
          status: "active",
          plan_type: planType,
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
        });

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const userId = invoice.metadata?.userId;

        if (userId) {
          await supabase
            .from("subscriptions")
            .update({
              status: "inactive",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        if (userId) {
          await supabase
            .from("subscriptions")
            .update({
              status: "cancelled",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
