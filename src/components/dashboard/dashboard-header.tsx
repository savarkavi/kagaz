import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Portfolios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a portfolio to edit or launch a new single-page site.
        </p>
      </div>
      <Button
        type="button"
        className="h-9 gap-2 rounded-lg px-4 text-sm font-semibold"
      >
        <Plus aria-hidden="true" className="size-4" />
        New Portfolio
      </Button>
    </div>
  );
}
