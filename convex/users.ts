import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authorized.");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (existingUser !== null) {
      return existingUser._id;
    }

    const username = identity.username as string;
    const email = identity.email;

    if (!username || !email) {
      throw new ConvexError(
        "Missing username or email in Clerk JWT token. Check Clerk Sessions/JWT claims.",
      );
    }

    const name = identity.name ?? username;

    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      name,
      username,
      email,
      avatar: identity.profileUrl,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});
