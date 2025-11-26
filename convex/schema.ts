import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    username: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("email", ["email"]),

  portfolio_lm: defineTable({
    category: v.string(), // linkedin, description, email, profile-photo, whatsapp, experience, service-dev-title, service-dev-item, service-business-title, service-business-item
    content: v.string(),
    description: v.optional(v.string()), // Optional description field for service items
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_category", ["category"]),
});
