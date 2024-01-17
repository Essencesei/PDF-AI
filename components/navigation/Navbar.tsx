import React from "react";
import Dropzone from "../upload/UploadDropzone";
import { ModeToggle } from "../mode/ModeToggle";
import SignOutButton from "./SignOutButton";
import FileLists from "@/app/(main)/dashboard/FileLists";
import authOptions from "@/lib/actions/authOptions";
import { getFiles } from "@/lib/actions/serveractions";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("No session found");
  const files = await getFiles(session.user.id);

  return (
    <div className="sticky top-0 flex bg-inherit p-4">
      <h2 className="flex items-center gap-2 font-bold">
        <FileLists props={{ files }} />
      </h2>
      <div className="ml-auto flex gap-2">
        <ModeToggle />
        <Dropzone />
        <SignOutButton />
      </div>
    </div>
  );
};

export default Navbar;
