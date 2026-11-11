import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";
import { createPortfolioSchema } from "../src/lib/form-validations";

export const createPortfolio = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    templateId: v.string(),
    artistName: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const { user } = await getCurrentUser(ctx);

    if (!user) {
      throw new ConvexError({ message: "User not found in database." });
    }

    const parsed = createPortfolioSchema.safeParse(args);

    if (!parsed.success) {
      throw new ConvexError({
        message: parsed.error.issues[0]?.message ?? "Invalid input.",
      });
    }

    const { title, slug, templateId } = parsed.data;

    const existingSlug = await ctx.db
      .query("portfolios")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existingSlug) {
      throw new ConvexError({
        message: "This URL slug is already taken. Try another one!",
      });
    }

    return await ctx.db.insert("portfolios", {
      userId: user._id,
      templateId: templateId,
      title: title,
      slug: slug,
      isPublished: false,
      artistName: user.name,
      useArtworkCategories: false,
      artworks: [],
    });
  },
});

export const getMyPortfolios = query({
  args: {},
  handler: async (ctx) => {
    const { user } = await getCurrentUser(ctx);

    if (!user) {
      throw new ConvexError({ message: "User not found in database." });
    }

    return await ctx.db
      .query("portfolios")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const getPortfolioById = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    const { user } = await getCurrentUser(ctx);

    if (!user) {
      throw new ConvexError({ message: "User not found in database." });
    }

    const portfolio = await ctx.db.get("portfolios", args.portfolioId);

    if (!portfolio || portfolio.userId !== user._id) {
      return null;
    }

    return portfolio;
  },
});
