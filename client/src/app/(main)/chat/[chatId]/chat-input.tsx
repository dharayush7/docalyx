import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { useSendMassageMutation } from "./mutation";

export default function ChatInput({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState("");
  const mutation = useSendMassageMutation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Enter pressed without shift");
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() === "") return;
    mutation.mutate({ chatId: chatId, message: message.trim() });
  };

  return (
    <div className="fixed w-4/5 bottom-6 max-w-3xl">
      <Textarea
        className="bg-card! rounded-[35px] px-8 pr-16 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-zinc-800 border-zinc-800 py-5 min-h-0! resize-none max-h-40 no-scrollbar"
        cols={1}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
      />
      <Button
        className="rounded-full p-3 py-5 absolute right-2 bottom-11.5"
        disabled={mutation.isPending}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {mutation.isPending ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
      <p className="text-sm text-muted-foreground mt-4 w-full text-center">
        By sending, you agree to our{" "}
        <a href="/terms" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
