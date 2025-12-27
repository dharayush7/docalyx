import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Main from "./main";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect(`/auth`);

  const dbUser = await prisma.users.findFirst({
    where: { kinde_user_id: user.id },
  });

  if (!dbUser) {
    redirect(`/auth/callback`);
  }

  return <Main dbUser={dbUser} />;
}

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Docalyx account and preferences.",
  alternates: {
    canonical: "/profile",
  },
};
