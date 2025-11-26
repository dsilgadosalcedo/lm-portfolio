import type { Id } from "@/convex/_generated/dataModel";

export type PortfolioItem = {
  id: string;
  content: string;
  description?: string;
  image?: string;
  order?: number;
};

export type ConvexPortfolioItem = {
  _id: Id<"portfolio_lm">;
  category: string;
  content: string;
  description?: string;
  imageUrl?: string;
  order?: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
};

export function groupByCategory(items: ConvexPortfolioItem[]) {
  const grouped: Record<string, PortfolioItem[]> = {};

  for (const item of items) {
    const category = item.category;
    const content = item.content;
    const description = item.description;
    const image = item.imageUrl;
    const orderValue = item.order;

    const entry: PortfolioItem = {
      id: item._id.toString(),
      content,
      ...(description && { description }),
      ...(image && { image }),
      ...(orderValue !== undefined && { order: orderValue }),
    };

    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(entry);
  }

  // Sort each group by `order`
  for (const key in grouped) {
    grouped[key].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  }

  return grouped;
}
