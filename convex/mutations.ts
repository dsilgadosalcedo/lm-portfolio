import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create new portfolio item
export const createPortfolioItem = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("portfolioItems", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update portfolio item
export const updatePortfolioItem = mutation({
  args: {
    id: v.id("portfolioItems"),
    name: v.optional(v.string()),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete portfolio item
export const deletePortfolioItem = mutation({
  args: { id: v.id("portfolioItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Create user
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
}); 