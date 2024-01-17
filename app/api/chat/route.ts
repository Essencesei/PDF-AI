import { currentPdf } from "@/lib/actions/serveractions";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// import fs from "fs";

// Create an OpenAI API client (that's edge friendly!)

// Set the runtime to edge for best performance
// export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, fileUrl } = await req.json();

  const truncatedMessages = messages.slice(-10);

  const pdfData = await currentPdf(fileUrl);

  const textPdf = pdfData[0].pageContent;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are an intelligent pdf assistant, Your tone is like a human,  you will only answer questions about the pdf you are currently reading. the pdf is about ${textPdf}`,
      },
      ...truncatedMessages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
