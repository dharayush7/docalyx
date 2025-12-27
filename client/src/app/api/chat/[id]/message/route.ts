import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: chatId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      redirect("/auth");
    }

    const chat = await prisma.chats.findFirst({
      where: {
        id: chatId,
        users: {
          kinde_user_id: user.id,
        },
      },
    });

    if (!chat) {
      return new Response(JSON.stringify({ error: "Chat not found" }), {
        status: 404,
      });
    }

    const messages = await prisma.messages.findMany({
      where: {
        chat_id: chatId,
        role: {
          in: ["query", "assistant"],
        },
      },
      take: 21,
      orderBy: {
        created_at: "desc",
      },
      ...(cursor && {
        cursor: { id: cursor },
      }),
    });

    const nextCursor = messages.length > 20 ? messages[20].id : null;

    return Response.json({
      messages: messages.slice(0, 20).reverse(),
      nextCursor,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error fetching chat messages:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
