import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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

  // Admin users for authentication
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.string(), // admin, editor
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
