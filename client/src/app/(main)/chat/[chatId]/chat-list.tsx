import { cn } from "@/lib/utils";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useRef } from "react";
import { InViewHookResponse } from "react-intersection-observer";
import { ApiMessageResponse } from "@/lib/types";
import AiChatCard from "@/components/ai-chat-card";
import UserChatCard from "@/components/user-chat-card";

interface ChatListProps {
  data: InfiniteData<ApiMessageResponse>;
  inView: InViewHookResponse;
}

export default function ChatList({ data, inView }: ChatListProps) {
  return (
    <main className="space-y-12">
      <div ref={inView.ref} />
      {data.pages.map((page) =>
        page.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full",
              message.role === "query" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "query" ? (
              <UserChatCard message={message} />
            ) : (
              <AiChatCard message={message} />
            )}
          </div>
        ))
      )}
    </main>
  );
}
