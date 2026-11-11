import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Doc } from "../../../convex/_generated/dataModel";

export default function PortfolioCard({
  portfolio,
}: {
  portfolio: Doc<"portfolios">;
}) {
  return (
    <Link
      href={`/editor/${portfolio._id}`}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full min-h-46 flex-col p-5 transition-colors group-hover:border-foreground/20">
        <div className="flex items-center justify-between gap-3">
          <span className="max-w-[65%] truncate rounded border bg-muted/40 px-2 py-1 font-mono text-[11px] leading-4 text-muted-foreground">
            {portfolio.templateId}
          </span>
          <span
            className={
              portfolio.isPublished
                ? "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                : "inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            }
          >
            <span
              aria-hidden="true"
              className={
                portfolio.isPublished
                  ? "size-1.5 rounded-full bg-emerald-500"
                  : "size-1.5 rounded-full bg-muted-foreground/50"
              }
            />
            {portfolio.isPublished ? "Published" : "Draft"}
          </span>
        </div>

        <div className="mt-3">
          <h2 className="truncate text-base font-semibold leading-6 tracking-tight">
            {portfolio.title}
          </h2>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            by {portfolio.artistName || "You"}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <span className="truncate font-mono text-xs text-muted-foreground">
            /{portfolio.slug}
          </span>
          <ChevronRight
            aria-hidden="true"
            className="ml-3 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </div>
      </Card>
    </Link>
  );
}
