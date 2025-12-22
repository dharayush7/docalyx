"use server";

import prisma from "@/lib/prisma";
import response from "@/lib/response";
import { updateUserProfile } from "@/service/kinde.service";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function updateProfileHandler({ name }: { name: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) redirect("/auth");

    const dbUser = await prisma.users.findFirst({
      where: {
        kinde_user_id: user.id,
      },
    });

    if (!dbUser) redirect("/auth/callback");

    const kindeResponse = await updateUserProfile({ name, userId: user.id });

    if (!kindeResponse.success) {
      throw new Error(kindeResponse.msg);
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: dbUser.id,
      },
      data: {
        name: name,
      },
    });

    return response.success(updatedUser);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);
    return response.error(error);
  }
}
