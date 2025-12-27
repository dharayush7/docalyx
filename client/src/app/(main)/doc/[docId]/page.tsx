import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import Main from "./main";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: PageProps<"/doc/[docId]">): Promise<Metadata> {
  const { docId } = await params;
  const doc = await prisma.documents.findUnique({
    where: { id: docId },
  });
  if (!doc) {
    return {
      title: "Document",
      description: "Document not found.",
      robots: { index: false, follow: false },
      alternates: { canonical: `/doc/${docId}` },
    };
  }
  const title = `Document — ${doc.title}`;
  const description = `View and analyze the document "${doc.title}".`;
  return {
    title,
    description,
    alternates: { canonical: `/doc/${docId}` },
    openGraph: {
      type: "article",
      url: `/doc/${docId}`,
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
