import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require subscription
  const protectedRoutes = ["/dashboard", "/practice", "/learn"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Public routes that don't require subscription checks
  const publicRoutes = ["/", "/auth", "/pricing", "/api"];
  const isPublicRoute = publicRoutes.some(
    (route) =>
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return res;
  }

  if (session) {
    // Check if user has active subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .single();

    // Only redirect to pricing if trying to access protected route without subscription
    if (isProtectedRoute && !subscription) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }
  } else if (isProtectedRoute) {
    // If not signed in and trying to access protected route, redirect to sign in
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/webhook).*)"],
};
