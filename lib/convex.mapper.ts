export type PortfolioItem = {
  id: string;
  name: string;
  image?: string;
  order?: number;
};

export type ConvexPortfolioItem = {
  _id: string;
  name: string;
  category: string;
  content: string;
  imageUrl?: string;
  order?: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupByCategory(items: ConvexPortfolioItem[]) {
  const grouped: Record<string, PortfolioItem[]> = {};

  for (const item of items) {
    const category = item.category;
    const name = item.name;
    const image = item.imageUrl;
    const orderValue = item.order;

    const entry: PortfolioItem = {
      id: item._id,
      name,
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