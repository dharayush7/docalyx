import { messages } from "@/generated/prisma/client";

export interface PdfReadResponse {
  status: "success" | "failed";
  chat_id: string;
  title: string;
}

export interface ApiMessageResponse {
  messages: messages[];
  nextCursor: string | null;
}

export interface SocketMessageResponse {
  status: "success" | "failed";
  data: messages;
}
