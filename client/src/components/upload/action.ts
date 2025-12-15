"use server";

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BUCKET } from "@/lib/constants";
import { r2Client } from "@/lib/r2";
import response from "@/lib/response";

export async function uploadDocumentHandler({ title }: { title: string }) {
  try {
    const ext = title.split(".").pop();

    if (!ext || ext !== "pdf") {
      throw new Error("Invalid title");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }

    const document = await prisma.documents.create({
      data: {
        title,
      },
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: BUCKET,
      Key: `${document.id}.pdf`,
    });

    const preSignedUrl = await getSignedUrl(r2Client, putObjectCommand, {
      expiresIn: 3600,
    });

    return response.success({
      preSignedUrl,
      documentId: document.id,
    });
  } catch (error) {
    return response.error(error);
  }
}
