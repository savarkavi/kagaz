"use client";

import { Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PortfolioCard from "@/components/dashboard/portfolio-card";
import { Card } from "@/components/ui/card";

function CreatePortfolioCard() {
  return (
    <Card className="flex min-h-46 flex-col items-center justify-center border-dashed bg-transparent px-5 text-center shadow-none hover:border-black cursor-pointer">
      <span className="mb-3 flex size-9 items-center justify-center rounded-full border bg-muted/30 text-muted-foreground">
        <Plus aria-hidden="true" className="size-4" />
      </span>
      <p className="text-sm font-medium">Create Portfolio</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Pick a template &amp; claim a slug
      </p>
    </Card>
  );
}

function PortfolioCardSkeleton() {
  return (
    <Card aria-hidden="true" className="flex min-h-46 flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="h-6 w-16 animate-pulse rounded bg-muted" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="mt-auto border-t pt-4">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  );
}

export default function PortfolioList() {
  const portfolios = useQuery(api.portfolios.getMyPortfolios);

  return (
    <section
      aria-label="Your portfolios"
      aria-busy={portfolios === undefined}
      className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {portfolios === undefined ? (
        <>
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
        </>
      ) : (
        portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio._id} portfolio={portfolio} />
        ))
      )}
      <CreatePortfolioCard />
    </section>
  );
}
