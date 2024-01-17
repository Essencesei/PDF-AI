"use client";
import { useChat } from "ai/react";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { Bot, MoreHorizontal, User } from "lucide-react";

type ChatProps = {
  props: {
    fileUrl: string;
  };
};

export default function Chat({ props }: ChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      body: {
        fileUrl: props.fileUrl,
      },
    });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex h-full flex-col">
        <div
          className="flex flex-col gap-2 overflow-scroll p-4 "
          ref={chatContainerRef}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className="gap-2 whitespace-pre-wrap rounded-md border p-2"
            >
              <span className="flex flex-col gap-2">
                {m.role === "user" ? <p className="font-bold">You</p> : <Bot />}
                {m.content}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="m-4 mt-auto">
          <div className="flex flex-col justify-center pb-4">
            {isLoading && (
              <span className="flex gap-2">
                <p>Assistant is thinking</p>
                <MoreHorizontal className="animate-bounce" />
              </span>
            )}
            {error && error.message + error.cause}
          </div>
          <Input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
