import * as z from "zod";

export const createPortfolioSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(50, "Title must be under 50 characters."),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters.")
    .max(30, "Slug must be under 30 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens (-) are allowed.",
    ),

  templateId: z.string().min(1, "Please select a starting template."),
});
