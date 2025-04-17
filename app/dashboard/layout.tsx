import type { Metadata } from "next";
import "../globals.css";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardNav } from "@/components/dashboard/nav";

export const metadata: Metadata = {
  title: "Dashboard - KeepFlowing",
  description: "Easy, efficient, and flexible project management app",
  keywords: ["keepflowing", "dashboard", "project", "management"],
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden md:block">
          <div className="fixed top-14 z-30 w-[220px] lg:w-[240px] h-[calc(100vh-3.5rem)] overflow-y-auto">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 px-4 md:px-0 pt-10 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
