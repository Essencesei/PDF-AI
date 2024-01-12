"use client";
import { FileText, FileUp, LogOut } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import Dropzone from "../upload/UploadDropzone";
import { ModeToggle } from "../mode/ModeToggle";
import { Button, buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex bg-inherit p-4">
      <h2 className="flex items-center gap-2 font-bold">
        <FileText />
        PDF AI
      </h2>

      <div className="ml-auto flex gap-2">
        <ModeToggle />

        <Dropzone />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
