import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    username: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_username", ["username"]),

  portfolios: defineTable({
    userId: v.id("users"),
    templateId: v.string(),
    title: v.string(),
    slug: v.string(),
    isPublished: v.boolean(),
    artistName: v.string(),
    artistBio: v.optional(v.string()),
    artistAvatar: v.optional(v.string()),
    artistSocials: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
        }),
      ),
    ),
    useArtworkCategories: v.boolean(),
    artworks: v.array(
      v.object({
        mediaUrl: v.string(),
        mediaType: v.union(v.literal("image"), v.literal("video")),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        link: v.optional(v.string()),
        category: v.optional(v.string()),
      }),
    ),
    customFields: v.optional(v.any()),
  })
    .index("by_userId", ["userId"])
    .index("by_slug", ["slug"]),
});
