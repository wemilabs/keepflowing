import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <DashboardHeader />
    </div>
  );
}
