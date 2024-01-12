"use client";
import Chat from "@/components/chat/Chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { deleteFile } from "@/lib/actions/serveractions";
import { Prisma } from "@prisma/client";
import { DeleteIcon, Loader2, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";

type CurrentFileProps = {
  props: {
    files: Prisma.UploadsGetPayload<{}>[];
  };
};

const CurrentFile = ({ props }: CurrentFileProps) => {
  const searchParams = useSearchParams();

  const [file, setFile] = useState<string>(searchParams.get("pdf")!);
  const [active, setActive] = useState("");
  const [isloading, startTransition] = useTransition();

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="flex-col"
      >
        <ResizablePanel defaultSize={20} maxSize={20}>
          <ul className="flex-0 flex flex-col gap-2 p-2 ">
            {props.files.map((file) => {
              return (
                <li
                  className={`flex cursor-pointer gap-2 rounded-md  p-2 ${
                    active === file.id && "bg-accent"
                  } `}
                  key={file.id}
                  onClick={() => {
                    startTransition(async () => {
                      setFile(file.url);
                      setActive(file.id);
                    });
                  }}
                >
                  <Link
                    href={"/dashboard?pdf=" + file.url}
                    className={`line-clamp-1  `}
                  >
                    {file.name}
                  </Link>
                  <XCircle
                    className=" ml-auto h-4 min-h-4 w-4 min-w-4 "
                    onClick={() => {
                      startTransition(async () => {
                        await deleteFile(file.id, file.filekey);
                      });
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          {file ? (
            <embed
              src={`https://docs.google.com/gview?embedded=true&url=${file}`}
              className="h-full w-full"
            />
          ) : (
            <span className="flex h-full items-center justify-center">
              <p>Please select or upload a pdf file</p>
            </span>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <Chat />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default CurrentFile;
