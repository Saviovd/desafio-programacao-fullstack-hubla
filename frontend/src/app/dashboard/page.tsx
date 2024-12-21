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
        <div className="fixed right-2 bottom-1 flex gap-1">
        <span>Developed by</span>
        <a
          className="text-lime-600 transition-colors hover:text-lime-500"
          href="https://github.com/Saviovd"
          target="_black"
        >
          Sávio Almeida
        </a>
      </div>
      </div>
    </div>
  );
}
