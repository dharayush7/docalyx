import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const chats = await prisma.chats.findMany({
      where: {
        users: {
          kinde_user_id: user.id,
        },
      },
    });

    return Response.json(chats);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
