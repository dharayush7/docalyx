"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import response from "@/lib/response";

export async function sendMessageHandler(params: {
  message: string;
  chatId: string;
}) {
  try {
    const message = params.message.trim();
    const chatId = params.chatId;
    if (!message || !chatId || message.length === 0 || chatId.length === 0) {
      throw new Error("Message and chatId are required");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) redirect("/auth");

    const chat = await prisma.chats.findFirst({
      where: {
        id: chatId,
        users: {
          kinde_user_id: user.id,
        },
      },
    });

    if (!chat) throw new Error("Chat not found or access denied");

    const dbMessage = await prisma.messages.create({
      data: {
        content: message,
        role: "query",
        chat_id: chat.id,
      },
    });

    return response.success(dbMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    if (isRedirectError(error)) throw error;
    return response.error("Failed to save message");
  }
}
