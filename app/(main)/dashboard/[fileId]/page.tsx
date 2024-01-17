import Chat from "@/components/chat/Chat";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getFileById } from "@/lib/actions/serveractions";
import { Bot } from "lucide-react";

type Params = {
  params: {
    fileId: string;
  };
};

export default async function File({ params }: Params) {
  const pdf = await getFileById(params.fileId);

  return (
    <>
      <div className="flex px-4">
        <embed
          className="flex-1"
          src={"https://docs.google.com/gview?embedded=true&url=" + pdf?.url}
          title={pdf?.name}
          width={"500px"}
          height={"500px"}
        ></embed>

        <div className=" md:hidden">
          <Sheet>
            <SheetTrigger className="absolute bottom-8 right-8">
              <Bot
                className={buttonVariants({
                  size: "icon",
                  className: "p-2",
                })}
              />
            </SheetTrigger>
            <SheetContent side="right">
              <Chat props={{ fileUrl: pdf?.url! }} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden flex-1 md:block">
          <Chat props={{ fileUrl: pdf?.url! }} />
        </div>
      </div>
    </>
  );
}
