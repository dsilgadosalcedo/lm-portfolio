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
      .query("portfolio_lm")
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
      .query("portfolio_lm")
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
    return await ctx.db.query("portfolio_lm").collect();
  },
});

// Get file URL from storage ID
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    // The identity.subject contains userId|session format
    // The first part is the userId (returned from createOrUpdateUser callback in convex/auth.ts)
    const subjectParts = identity.subject?.split("|") || [];
    const userId = subjectParts[0];

    if (!userId) {
      return null;
    }

    // The userId from subject is the _id of the user in the users table
    // (returned from createOrUpdateUser callback)
    try {
      const user = await ctx.db.get(userId as any);
      if (user) {
        const userData = user as any;
        const userUsername = userData.username || "";
        return {
          _id: userData._id,
          username: userUsername,
          name:
            userData.firstName && userData.lastName
              ? `${userData.firstName} ${userData.lastName}`.trim()
              : userData.firstName || userUsername || "User",
          firstName: userData.firstName || userUsername || "User",
        };
      }
    } catch (e) {
      // userId is not a valid Convex ID, fall through to username lookup
    }

    // Fallback: If userId is not a valid ID, try to find user by username
    // This shouldn't happen if createOrUpdateUser returns the correct ID, but handle it anyway
    const authUser = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", userId))
      .first();

    if (authUser) {
      const userUsername = authUser.username || "";
      return {
        _id: authUser._id,
        username: userUsername,
        name:
          authUser.firstName && authUser.lastName
            ? `${authUser.firstName} ${authUser.lastName}`.trim()
            : authUser.firstName || userUsername || "User",
        firstName: authUser.firstName || userUsername || "User",
      };
    }

    return null;
  },
});
