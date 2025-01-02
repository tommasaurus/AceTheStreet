import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  try {
    const { priceId, userId, planType } = await req.json();
    const supabase = createRouteHandlerClient({ cookies });

    // Get user's email from Supabase
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      throw new Error("User not found");
    }

    // Create or get customer
    let customer;
    try {
      // First check if we already have a subscription with a customer ID
      const { data: existingSubscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingSubscription) {
        console.log("Found existing subscription:", existingSubscription);

        // If there's an existing subscription, update it instead of creating a new one
        customer = await stripe.customers.retrieve(
          existingSubscription.stripe_customer_id || ""
        );

        // Update existing subscription to pending
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status: "pending",
            plan_type: planType,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Error updating subscription:", updateError);
          throw updateError;
        }
      } else {
        // Create new customer
        console.log("Creating new customer for user:", userId);
        customer = await stripe.customers.create({
          email: userData.email,
          metadata: {
            userId: userId,
          },
        });
        console.log("Created new customer:", customer.id);

        // Create initial subscription record with temporary dates
        const now = new Date();
        const tempEndDate = new Date(now);
        tempEndDate.setHours(now.getHours() + 1); // Set temporary end date 1 hour in the future

        const { error: subscriptionError } = await supabase
          .from("subscriptions")
          .insert({
            user_id: userId,
            status: "pending",
            plan_type: planType,
            stripe_customer_id: customer.id,
            current_period_start: now.toISOString(),
            current_period_end: tempEndDate.toISOString(), // Temporary end date
          });

        if (subscriptionError) {
          console.error("Error creating subscription:", subscriptionError);
          throw subscriptionError;
        }
      }
    } catch (error) {
      console.error("Error handling customer:", error);
      throw error;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        userId: userId,
        planType: planType,
      },
      client_reference_id: userId, // Add this to maintain session context
    });

    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
