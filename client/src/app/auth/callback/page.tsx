import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }

  const databaseUser = await prisma.users.findUnique({
    where: {
      kinde_user_id: user.id,
    },
  });

  if (!databaseUser) {
    await prisma.users.create({
      data: {
        email: user.email!,
        name: user.family_name || "",
        kinde_user_id: user.id,
        avatar_url: user.picture,
      },
    });

    return redirect("/");
  }

  return redirect("/");
}
