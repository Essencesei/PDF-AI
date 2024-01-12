import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Landing = () => {
  const keyFeatures = [
    {
      title: "Rapid Answers",
      content:
        "Upload PDFs and receive accurate, AI-generated responses to your questions instantly.",
    },
    {
      title: "Effortless Analysis",
      content:
        "Save time with automated document analysis and insightful Q&A capabilities.",
    },
    {
      title: "OpenAI Comprehension",
      content:
        "Harness the intelligence of OpenAI to comprehend and respond to your PDF content.",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex h-screen items-center">
        <div className="relative flex h-80 w-80 flex-1 justify-center">
          <Image src={"/landing.svg"} alt="landing" fill />
        </div>
        <div className="flex flex-1 flex-col  items-center justify-center gap-4">
          <h1>PDF AI</h1>
          <p>Empower Your Documents with Intelligent Insights.</p>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={"/sign-in"}
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-4 flex h-screen items-center justify-center ">
        <ul className="flex gap-4">
          {keyFeatures.map((features) => {
            return (
              <li key={features.title}>
                <Card>
                  <CardHeader>
                    <CardTitle>{features.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{features.content}</CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
