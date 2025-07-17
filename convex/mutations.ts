import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create new portfolio item
export const createPortfolioItem = mutation({
  args: {
    category: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("portfolio_lm", {
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
    id: v.id("portfolio_lm"),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If imageUrl is an empty string, we want to remove it from the record
    if (updates.imageUrl === "") {
      const { imageUrl, ...otherUpdates } = updates;
      return await ctx.db.patch(id, {
        ...otherUpdates,
        imageUrl: undefined, // Explicitly set to undefined to remove the field
        updatedAt: Date.now(),
      });
    }
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete portfolio item
export const deletePortfolioItem = mutation({
  args: { id: v.id("portfolio_lm") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Generate upload URL for file storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Delete file from storage
export const deleteFile = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
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