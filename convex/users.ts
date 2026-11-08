import { ConvexError } from "convex/values";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";

export const getCurrentUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError({ message: "Not authenticated." });
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();

  return { identity, user };
};

export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const { identity, user } = await getCurrentUser(ctx);

    if (user) {
      return user._id;
    }

    const username = identity.username as string;
    const email = identity.email;

    if (!username || !email) {
      throw new ConvexError({
        message:
          "Missing username or email in Clerk JWT token. Check Clerk Sessions/JWT claims.",
      });
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
