import ChatCard from "@/components/ChatCard";
import { messages } from "@/generated/prisma/client";
import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useRef } from "react";
import { InViewHookResponse } from "react-intersection-observer";
import { ApiMessageResponse } from "@/lib/types";

interface ChatListProps {
  data: InfiniteData<ApiMessageResponse>;
  inView: InViewHookResponse;
}

export default function ChatList({ data, inView }: ChatListProps) {
  return (
    <main>
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
            <ChatCard message={message} isUser={message.role === "query"} />
          </div>
        ))
      )}
    </main>
  );
}
