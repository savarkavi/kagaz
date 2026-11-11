import DashboardHeader from "@/components/dashboard/dashboard-header";
import PortfolioList from "@/components/dashboard/portfolio-list";

export default function DashboardContainer() {
  return (
    <main className="mx-auto w-full max-w-5xl pb-16 pt-24">
      <DashboardHeader />
      <PortfolioList />
    </main>
  );
}
