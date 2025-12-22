"use client";
import { chats, documents } from "@/generated/prisma/client";
import useNavbar from "@/hooks/use-navbar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatInput from "./chat-input";
import ChatList from "./chat-list";
import { useInView } from "react-intersection-observer";
import {
  InfiniteData,
  QueryFilters,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { ApiMessageResponse, SocketMessageResponse } from "@/lib/types";
import useSocket from "@/hooks/use-socket";
import { toast } from "sonner";
import { ArrowDown, Loader2 } from "lucide-react";
import DocumentCard from "@/components/document-card";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export default function Main({
  chat,
}: {
  chat: chats & { documents: documents };
}) {
  const { setTitle } = useNavbar();
  const ref = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isError, setIsError] = useState(false);
  const socket = useSocket();
  const queryClient = useQueryClient();
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const { open } = useSidebar();
  const mobile = useIsMobile();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["chat-messages", chat.id],
    queryFn: async ({ pageParam }) => {
      const res = await kyInstance.get(
        `/api/chat/${chat.id}/message`,
        pageParam ? { searchParams: { cursor: pageParam } } : {}
      );
      const body = await res.json<ApiMessageResponse>();
      return body;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: { nextCursor: string | null }) =>
      lastPage.nextCursor,
  });

  const inView = useInView({
    rootMargin: "50px",
    onChange: (inView) => {
      if (
        inView &&
        hasNextPage &&
        !isFetchingNextPage &&
        isScrolled &&
        !isLoading &&
        !isFetching
      ) {
        fetchNextPage();
      }
    },
  });

  useEffect(() => {
    setTitle(chat.name);
  }, [chat]);

  useEffect(() => {
    if (!isScrolled && data) {
      scrollToBottom();
      setIsScrolled(true);
    }
  }, [data, isScrolled]);

  useEffect(() => {
    if (isThinking) {
      setIsError(false);
      scrollToBottom();
      socket?.on("message_response", (data: SocketMessageResponse) => {
        if (data.status === "success") {
          const queryFilter = {
            queryKey: ["chat-messages", chat.id],
          } satisfies QueryFilters;

          queryClient.setQueriesData<InfiniteData<ApiMessageResponse>>(
            queryFilter,
            (oldData) => {
              if (!oldData) return { pages: [], pageParams: [] };
              return {
                ...oldData,
                pages: [
                  ...oldData.pages.map((page, i) => {
                    if (i === 0) {
                      return {
                        ...page,
                        messages: [...page.messages, data.data],
                      };
                    }
                    return page;
                  }),
                ],
              };
            }
          );
          setIsThinking(false);
          scrollToBottom();
        } else {
          setIsError(true);
          setIsThinking(false);
          scrollToBottom();
          toast.error("Failed to send message");
        }
      });
    }
  }, [isThinking]);

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        if (ref.current) {
          const visibleHeight = ref.current.clientHeight;
          const scrolledDistance =
            ref.current.scrollHeight - target.scrollTop - visibleHeight;
          setCurrentScrollHeight(scrolledDistance);
        }
      };

      ref.current.addEventListener("scroll", handleScroll);

      return () => {
        ref.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref.current, data]);

  if (isLoading)
    return (
      <div className="pt-[30%] w-full flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-primary text-lg font-semibold mt-1">
          Loading messages...
        </p>
      </div>
    );

  if (!data) return null;

  return (
    <div className="overflow-y-auto h-screen pt-20 pb-36" ref={ref}>
      <div className="mx-auto max-w-3xl px-4">
        {isFetchingNextPage && (
          <div className="pt-2 w-full flex flex-col items-center justify-center">
            <Loader2 size={40} className="animate-spin text-primary" />
            <p className="text-primary text-lg font-semibold mt-1">
              Loading old messages...
            </p>
          </div>
        )}
        {!hasNextPage && <DocumentCard document={chat.documents} />}
        <ChatList
          data={data}
          inView={inView}
          isThinking={isThinking}
          isError={isError}
        />
        {currentScrollHeight > 40 && (
          <div
            className={cn(
              "fixed bottom-30 transform flex items-center justify-center transition-all duration-200 ease-linear",
              mobile
                ? "w-full left-0"
                : open
                ? "w-[calc(100%-var(--sidebar-width))] left-(--sidebar-width)"
                : "w-[calc(100%-var(--sidebar-width-icon))] left-(--sidebar-width-icon)"
            )}
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full cursor-pointer border border-gray-300 dark:border-zinc-600 hover:bg-secondary!"
              onClick={scrollToBottom}
            >
              <ArrowDown />
            </Button>
          </div>
        )}
        <ChatInput
          chatId={chat.id}
          isThinking={isThinking}
          setIsThinking={setIsThinking}
        />
      </div>
    </div>
  );
}
