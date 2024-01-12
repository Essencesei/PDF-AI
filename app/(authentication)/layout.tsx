import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return <>{children}</>;
};

export default AuthLayout;
