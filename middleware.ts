import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Allow webhook endpoints to bypass middleware
  if (req.nextUrl.pathname.startsWith("/api/webhooks/")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require subscription
  const protectedRoutes = ["/study/banks", "/study/problems"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Public routes that don't require subscription checks
  const publicRoutes = [
    "/",
    "/auth",
    "/pricing",
    "/api",
    "/study",
    "/study/m&i400",
  ];
  const isPublicRoute = publicRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      (req.nextUrl.pathname.startsWith(route) && !isProtectedRoute)
  );

  if (isPublicRoute) {
    return res;
  }

  // For protected routes, always check subscription status
  if (isProtectedRoute) {
    console.log("Checking protected route:", req.nextUrl.pathname);

    if (!session) {
      console.log("No session found, redirecting to signin");
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    console.log("User ID:", session.user.id);

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .single();

    console.log("Subscription check result:", { subscription, error });

    if (!subscription || error) {
      console.log("No active subscription found, redirecting to pricing");
      return NextResponse.redirect(new URL("/pricing", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/study/:path*", // Match all paths under /study
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
