"use client";
import { Card } from "@/components/ui/card";
import useNavbar from "@/hooks/use-navbar";
import useSocket from "@/hooks/use-socket";
import { PdfReadResponse } from "@/lib/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main() {
  const { setTitle } = useNavbar();
  const { resolvedTheme } = useTheme();
  const socket = useSocket();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle("New chat");
    if (socket) {
      socket.on("pdf_read_response", (data: PdfReadResponse) => {
        if (data.status === "success") {
          queryClient.invalidateQueries({
            queryKey: ["chats"],
          });

          router.push(`/chat/${data.chat_id}`);
        }
      });
    }
  }, [socket, queryClient]);

  const lottie =
    resolvedTheme === "dark"
      ? "/lottie/sparkles-loop-loader-dark.lottie"
      : "/lottie/sparkles-loop-loader-light.lottie";
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-56px)]">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl">Ready when you are.</h1>
        <p className="mb-6 text-gray-400 mt-0.5">
          Upload your PDF file to get started
        </p>
        <Card className="md:w-100 sm:w-full bg-primary">
          <DotLottieReact src={lottie} autoplay loop />
          <p className="text-center text-white font-semibold">
            Processing your PDF file...
          </p>
        </Card>
      </div>
    </div>
  );
}
