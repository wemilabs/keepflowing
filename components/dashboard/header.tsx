"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              toast.success("Successfully logged out");
            },
          },
        });
      }}
    >
      Logout
    </Button>
  );
}
