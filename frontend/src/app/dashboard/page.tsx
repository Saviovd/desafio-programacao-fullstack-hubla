"use client";
import DashboardChart from "@/components/DashboardCharts";
import Metrics from "@/components/Metrics";
import Sidebar from "@/components/SideBar";

export default function Dashboard() {
  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="w-full flex flex-col justify-between">
        <main className="flex flex-col w-full gap-8 row-start-2 items-center sm:items-start">
          <h1>Home</h1>
          <Metrics />
          <DashboardChart  />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          hello
        </footer>
      </div>
    </div>
  );
}
