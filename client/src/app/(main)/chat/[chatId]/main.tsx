"use client";
import { chats } from "@/generated/prisma/client";
import useNavbar from "@/hooks/use-navbar";

export default function Main({ chat }: { chat: chats }) {
  const { setTitle } = useNavbar();

  setTitle(chat.name);

  return <div>main</div>;
}
