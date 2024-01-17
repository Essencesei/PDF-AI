"use client";
import "@uploadthing/react/styles.css";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { FileUp } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
import { upload } from "@/lib/actions/serveractions";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const Dropzone = () => {
  const { toast } = useToast();
  const session = useSession();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <FileUp />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>Upload PDF</DialogHeader>
        <UploadDropzone
          config={{ mode: "auto" }}
          className=""
          endpoint="pdfUploader"
          onClientUploadComplete={async (res) => {
            // Do something with the response
            console.log("Files: ", res);

            if (!session.data?.user.id) throw Error("No user id found");
            upload(res[0].url, res[0].key, res[0].name, session.data?.user.id!);
            toast({
              title: "File uploaded",
            });
            setOpen(false);
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "File upload failed",
              description: `ERROR! ${error.message}`,
            });
            setOpen(false);
          }}
          onUploadBegin={(name) => {
            // Do something once upload begins
            console.log("Uploading: ", name);
          }}
        />

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default Dropzone;
