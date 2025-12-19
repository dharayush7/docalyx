import { messages } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import React from "react";

interface ChatCardPoops {
  message: messages;
  isUser: boolean;
}

export default function ChatCard({ message, isUser }: ChatCardPoops) {
  return (
    <div className="max-w-175">
      <div
        className={cn(
          "w-auto p-2 rounded-lg",
          !isUser
            ? "bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
