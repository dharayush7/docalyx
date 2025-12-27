import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect, notFound } from "next/navigation";
import Main from "./main";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps<"/chat/[chatId]">) {
  const { chatId } = await params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }

  const chat = await prisma.chats.findFirst({
    where: {
      id: chatId,
      users: {
        kinde_user_id: user.id,
      },
    },
    include: {
      documents: true,
    },
  });

  if (!chat) {
    notFound();
  }

  return <Main chat={chat} />;
}

export async function generateMetadata({
  params,
}: PageProps<"/chat/[chatId]">): Promise<Metadata> {
  const { chatId } = await params;
  const chat = await prisma.chats.findUnique({
    where: { id: chatId },
    include: { documents: true },
  });
  if (!chat) {
    return {
      title: "Chat",
      description: "Chat not found.",
      robots: { index: false, follow: false },
      alternates: { canonical: `/chat/${chatId}` },
    };
  }
  const title = chat.name
    ? `Chat — ${chat.name}`
    : chat.documents?.title
      ? `Chat — ${chat.documents.title}`
      : "Chat";
  const description = chat.documents?.title
    ? `Conversation on "${chat.documents.title}".`
    : "Conversation related to your uploaded document.";
  return {
    title,
    description,
    alternates: { canonical: `/chat/${chatId}` },
    openGraph: {
      type: "article",
      url: `/chat/${chatId}`,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
