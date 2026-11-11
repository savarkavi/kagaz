import CreatePortfolioDialog from "@/components/dashboard/create-portfolio-dialog";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Portfolios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a portfolio to edit or launch a new single-page site.
        </p>
      </div>
      <CreatePortfolioDialog triggerVariant="header" />
    </div>
  );
}
