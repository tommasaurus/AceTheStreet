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

export const runtime = "nodejs";

// This disables body parsing, as we need the raw body for Stripe webhook verification
export async function POST(req: Request) {
  try {
    console.log("=================== WEBHOOK START ===================");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    // Log all headers
    const allHeaders = Object.fromEntries(req.headers);
    console.log("Headers:", JSON.stringify(allHeaders, null, 2));

    let rawBody;
    try {
      rawBody = await req.text();
      // Only log a portion of the body for security
      console.log("Raw body (first 100 chars):", rawBody.substring(0, 100));
    } catch (error) {
      console.error("Error reading request body:", error);
      return NextResponse.json(
        { error: "Could not read request body" },
        { status: 400 }
      );
    }

    const signature = headers().get("Stripe-Signature");
    if (!signature) {
      console.error("No Stripe signature found in headers");
      return NextResponse.json(
        { error: "No Stripe signature" },
        { status: 400 }
      );
    }

    // Verify webhook secret is present
    if (!webhookSecret) {
      console.error("Webhook secret is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      console.log("Event constructed successfully:", event.type);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      console.error("Signature received:", signature);
      console.error(
        "Webhook secret first 10 chars:",
        webhookSecret.slice(0, 10)
      );
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    try {
      console.log("Webhook received:", event.type);
      console.log("Event data:", JSON.stringify(event.data, null, 2));

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          // Only proceed if payment was successful
          if (session.payment_status !== "paid") {
            console.log(
              "Payment not successful, status:",
              session.payment_status
            );
            return NextResponse.json({ received: true });
          }

          const customerId = session.customer as string;
          const userId = session.metadata?.userId;
          const planType = session.metadata?.planType;

          if (!userId || !planType || !customerId) {
            console.error("Missing required data in webhook:", {
              userId,
              planType,
              customerId,
            });
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

          // Update subscription to active
          const { error } = await supabase
            .from("subscriptions")
            .update({
              status: "active",
              plan_type: planType,
              stripe_customer_id: customerId,
              current_period_start: now.toISOString(),
              current_period_end: periodEnd.toISOString(),
            })
            .eq("user_id", userId);

          if (error) {
            console.error("Error updating subscription in webhook:", error);
            throw error;
          }

          console.log("Successfully activated subscription for user:", userId);
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const userId = paymentIntent.metadata?.userId;

          if (userId) {
            // Update subscription to inactive
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
            // Update subscription to cancelled
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
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
