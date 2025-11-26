"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useQuery(api.queries.getCurrentUser);
  const isAuthenticated = useQuery(api.auth.isAuthenticated);

  useEffect(() => {
    // If we've checked authentication and user is not authenticated, redirect
    if (isAuthenticated === false) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isAuthenticated === undefined || user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}

