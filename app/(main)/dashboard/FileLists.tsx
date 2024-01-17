"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileText, Files } from "lucide-react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type FileListsProps = {
  props: {
    files: Prisma.UploadsGetPayload<{}>[];
  };
};

export default function FileLists({ props }: FileListsProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2">
        <FileText />
        PDF AI
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Files</SheetTitle>
          <SheetDescription>
            <ul className="flex flex-col items-start gap-2">
              {props.files.map((file) => {
                return (
                  <li key={file.id}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={`/dashboard/${file.id}`}
                    >
                      <p className="text-start"> {file.name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
