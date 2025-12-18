"use client";
import { chats } from "@/generated/prisma/client";
import useNavbar from "@/hooks/use-navbar";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "./chat-input";
import ChatList from "./chat-list";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { ApiMessageResponse } from "@/lib/types";

export default function Main({ chat }: { chat: chats }) {
  const { setTitle } = useNavbar();
  const ref = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
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
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetching && isScrolled) {
        fetchNextPage();
      }
    },
  });

  useEffect(() => {
    setTitle(chat.name);
  }, [chat]);

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref]);

  useEffect(() => {
    if (!isScrolled && data) {
      scrollToBottom();
      setIsScrolled(true);
    }
  }, [data, isScrolled]);

  if (!data) return null;

  return (
    <div className="overflow-y-auto h-screen pt-20 pb-36" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <ChatList data={data} inView={inView} />
        <ChatInput chatId={chat.id} />
      </div>
    </div>
  );
}
