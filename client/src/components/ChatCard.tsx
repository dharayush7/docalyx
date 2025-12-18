import { messages } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import React from "react";

interface ChatCardPoops {
  message: messages;
  isUser: boolean;
}

export default function ChatCard({ message, isUser }: ChatCardPoops) {
  return (
    <div className="max-w-75">
      <div
        className={cn(
          "w-auto p-2 rounded",
          isUser
            ? "bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
