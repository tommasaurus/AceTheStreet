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

  // First check if it's a study route
  if (req.nextUrl.pathname.startsWith("/study")) {
    // Require authentication for all study routes
    if (!session) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Then check for subscription-protected routes
    const protectedRoutes = ["/study/banks", "/study/problems"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      const { data: subscription, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .single();

      if (!subscription || error) {
        return NextResponse.redirect(new URL("/pricing", req.url));
      }
    }
  }

  // Public routes that don't require any checks
  const publicRoutes = ["/", "/auth", "/pricing", "/api"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return res;
  }

  return res;
}

export const config = {
  matcher: [
    "/study/:path*", // Match all paths under /study
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
