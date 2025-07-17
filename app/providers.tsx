"use client";

import { ConvexProvider, convex } from "@/lib/convex";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
} 