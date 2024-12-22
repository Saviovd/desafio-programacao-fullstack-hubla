"use client";
import DashboardChart from "@/components/DashboardCharts";
import Metrics from "@/components/Metrics";
import SectionTitle from "@/components/SectionTitle";
import Sidebar from "@/components/SideBar";
import Signature from "@/components/Signature";

export default function Dashboard() {
  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="w-full flex flex-col justify-between">
        <main className="flex pt-12 px-3 flex-col w-full lg:p-6 gap-8 row-start-2 items-center sm:items-start">
          <SectionTitle content="Home" />
          <Metrics />
          <DashboardChart />
        </main>
        <Signature />
      </div>
    </div>
  );
}
