import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SignInButton from "./SIgnInButton";

const SignIn = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row ">
      <div className="hidden flex-1 items-center justify-center md:flex ">
        <div className="relative  h-60 w-60 ">
          <Image src="/welcome.svg" alt="welcome" fill></Image>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Welcome Back!</h2>
        <SignInButton />
      </div>
    </div>
  );
};

export default SignIn;
