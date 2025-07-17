import { query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to group items by category
function groupByCategory(items: any[]) {
  const grouped: Record<string, any[]> = {};

  for (const item of items) {
    const category = item.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
  }

  // Sort each group by order
  for (const key in grouped) {
    grouped[key].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  }

  return grouped;
}

// Get all portfolio items grouped by category
export const getPortfolioItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("portfolioItems")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return groupByCategory(items);
  },
});

// Get items by category
export const getItemsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("portfolioItems")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
  },
});

// Get all items (including inactive) for admin
export const getAllPortfolioItems = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portfolioItems").collect();
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
}); 