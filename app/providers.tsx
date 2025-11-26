"use client";

import { ConvexAuthProvider, convex } from "@/lib/convex";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
} 