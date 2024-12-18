import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const cookieStore = cookies();

  if (code) {
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code);

    // Get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        // Ensure profile exists (will be handled by trigger if not)
        await supabase.from("profiles").upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          updated_at: new Date().toISOString(),
        });

        // Check subscription status
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        // Redirect based on subscription status
        if (!subscription) {
          return NextResponse.redirect(new URL("/pricing", requestUrl.origin));
        }
        
        return NextResponse.redirect(new URL("/study", requestUrl.origin));
      } catch (error) {
        console.error("Error in callback:", error);
        return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
      }
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
