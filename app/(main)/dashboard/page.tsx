import { Button } from "@/components/ui/button";
import authOptions from "@/lib/actions/authOptions";
import { getFiles } from "@/lib/actions/serveractions";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import CurrentFile from "./currentFile";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const files = await getFiles(session?.user.id!);

  return (
    <div className="h-[85vh]">
      <CurrentFile props={{ files: files }}></CurrentFile>
    </div>
  );
};

export default Dashboard;
