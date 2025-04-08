import { LeftSideNav } from "@/components/dashboard/left-side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LeftSideNav />
      {children}
    </div>
  );
}
