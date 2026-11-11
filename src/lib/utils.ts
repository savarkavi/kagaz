import { toast } from "@/components/ui/toast";
import { ConvexError } from "convex/values";

export { cn } from "cn";

export const handleConvexError = (error: unknown) => {
  const errorMessage =
    error instanceof ConvexError
      ? (error.data as { message: string }).message
      : "Unable to create your portfolio. Please try again.";

  return toast.add({
    type: "error",
    description: errorMessage,
  });
};
