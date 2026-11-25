import DashboardContainer from "@/components/dashboard/dashboard-container";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  await auth.protect();

  return <DashboardContainer />;
}
