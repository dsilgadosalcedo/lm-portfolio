export type PortfolioItem = {
  id: string;
  content: string;
  image?: string;
  order?: number;
};

export type ConvexPortfolioItem = {
  _id: string;
  category: string;
  content: string;
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
    const image = item.imageUrl;
    const orderValue = item.order;

    const entry: PortfolioItem = {
      id: item._id,
      content,
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