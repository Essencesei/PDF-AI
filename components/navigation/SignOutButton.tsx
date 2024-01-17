"use client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [pending, setPending] = useState(false);

  const signInHandler = () => {
    setPending(true);
    signOut({ callbackUrl: "/sign-in" });
  };
  return (
    <Button
      disabled={pending}
      onClick={signInHandler}
      className=""
      variant={"outline"}
      size={"icon"}
    >
      {pending ? <Loader2 className="animate-spin"></Loader2> : <LogOut />}
    </Button>
  );
}
