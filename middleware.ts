import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Convex Auth doesn't require middleware for authentication
// Authentication is handled client-side and server-side in Convex functions
export function middleware(request: NextRequest) {
  // Middleware can be used for other purposes if needed
  // For now, we just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};