import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import Main from "./main";

export default async function Page({ params }: PageProps<"/doc/[docId]">) {
  const { docId } = await params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }

  const doc = await prisma.documents.findFirst({
    where: {
      id: docId,
    },
    include: {
      chats: {
        include: {
          users: true,
        },
      },
    },
  });

  console.log(doc);

  if (!doc) {
    notFound();
  }

  if (doc.chats) {
    if (doc.chats.users.kinde_user_id === user.id)
      redirect(`/chat/${doc.chats.id}`);
    else notFound();
  }

  return <Main />;
}
