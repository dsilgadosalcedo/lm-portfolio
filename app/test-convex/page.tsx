"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TestConvexPage() {
  const portfolioItems = useQuery(api.queries.getPortfolioItems);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Convex Test Page</h1>
      
      {portfolioItems === undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Portfolio Items by Category:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(portfolioItems, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 