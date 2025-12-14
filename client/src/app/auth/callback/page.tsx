import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const databaseUser = await prisma.user.findUnique({
    where: {
      kindeUserId: user.id,
    },
  });

  if (!databaseUser) {
    await prisma.user.create({
      data: {
        email: user.email!,
        name: user.family_name || "",
        kindeUserId: user.id,
        avaterUrl: user.picture,
      },
    });

    return redirect("/");
  }

  return <div>page</div>;
}
