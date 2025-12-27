import { cn } from "@/lib/utils";
import { InfiniteData } from "@tanstack/react-query";
import { InViewHookResponse } from "react-intersection-observer";
import { ApiMessageResponse } from "@/lib/types";
import AiChatCard from "@/components/ai-chat-card";
import UserChatCard from "@/components/user-chat-card";

interface ChatListProps {
  data: InfiniteData<ApiMessageResponse>;
  inView: InViewHookResponse;
  isThinking: boolean;
  isError: boolean;
}

export default function ChatList({
  data,
  inView,
  isThinking,
  isError,
}: ChatListProps) {
  return (
    <main className="space-y-12">
      <div ref={inView.ref} />
      {data.pages
        .slice()
        .reverse()
        .map((page) =>
          page.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.role === "query" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "query" ? (
                <UserChatCard message={message} />
              ) : (
                <AiChatCard message={message} />
              )}
            </div>
          )),
        )}
      {isThinking && (
        <div className="mt-12 flex items-center gap-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="animate-bounce [animation-delay:0ms]">●</span>
            <span className="animate-bounce [animation-delay:150ms]">●</span>
            <span className="animate-bounce [animation-delay:300ms]">●</span>
          </div>
          <p>Thinking...</p>
        </div>
      )}
      {isError && (
        <p className="w-full -mt-10 text-sm text-end text-destructive font-medium ">
          Something went wrong
        </p>
      )}
    </main>
  );
}
