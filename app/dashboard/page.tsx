import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Welcome {`<${session.user.name} />`}</h1>
    </div>
  );
}
