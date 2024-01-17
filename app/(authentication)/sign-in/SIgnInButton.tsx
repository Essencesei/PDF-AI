"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInButton() {
  const [pending, setPending] = useState(false);

  const signInHandler = () => {
    setPending(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };
  return (
    <Button disabled={pending} onClick={signInHandler} className="">
      {pending && <Loader2 className="mr-2 animate-spin"></Loader2>} Sign in
      with Google
    </Button>
  );
}
