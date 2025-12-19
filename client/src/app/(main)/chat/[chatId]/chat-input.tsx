import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { useSendMassageMutation } from "./mutation";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function ChatInput({
  chatId,
  isThinking,
  setIsThinking,
}: {
  chatId: string;
  isThinking: boolean;
  setIsThinking: (val: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const { open } = useSidebar();
  const mobile = useIsMobile();
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
    if (isThinking) return;
    mutation.mutate(
      { chatId: chatId, message: message.trim() },
      {
        onSuccess: () => {
          setIsThinking(true);
          setMessage("");
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 rounded-t-[35px] flex justify-center items-center flex-col px-2 transition-all duration-200 ease-linear ",
        mobile
          ? "w-full left-0"
          : open
          ? "w-[calc(100%-var(--sidebar-width))] left-(--sidebar-width)"
          : "w-[calc(100%-var(--sidebar-width-icon))] left-(--sidebar-width-icon)"
      )}
    >
      <Textarea
        className="z-20 absolute max-w-[calc(100%-1rem)] md:mx-0 md:max-w-190 w-full bg-card! rounded-[35px] px-8 pr-16 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-zinc-300 border-zinc-300 dark:border-zinc-700 dark:focus-visible:border-zinc-700 py-5 min-h-0! resize-none max-h-40 no-scrollbar bottom-8"
        cols={1}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
      />
      <Button
        className="z-30 rounded-full p-4 py-6 absolute left-[calc(100%-4rem)] bottom-10 md:bottom-9.5 md:left-[calc(50%+325px)]"
        disabled={mutation.isPending || message.trim() === "" || isThinking}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {mutation.isPending ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
      <div className="absolute bottom-0 bg-background w-full h-14 pt-7">
        <p className="text-xs text-muted-foreground w-full text-center h-full bg-background">
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
    </div>
  );
}
