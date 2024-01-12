import Navbar from "@/components/navigation/Navbar";
import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
