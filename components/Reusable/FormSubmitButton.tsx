"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & ComponentProps<typeof Button>;

export default function FormSubmitButton({ children }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : children}
      </Button>
    </>
  );
}
