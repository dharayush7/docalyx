import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect, notFound } from "next/navigation";
import Main from "./main";

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
  });

  if (!chat) {
    notFound();
  }

  return <Main chat={chat} />;
}
