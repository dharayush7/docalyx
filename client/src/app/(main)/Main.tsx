"use client";

import UploadPDF from "@/components/upload/upload-pdf";
import { useEffect, useState } from "react";
import useSocket from "@/hooks/use-socket";
import { PdfReadResponse } from "@/lib/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";

export default function Main() {
  const [isUpladed, setIsUpladed] = useState(false);
  const socket = useSocket();
  const { resolvedTheme } = useTheme();

  const lottie =
    resolvedTheme === "dark"
      ? "./lottie/sparkles-loop-loader-dark.lottie"
      : "./lottie/sparkles-loop-loader-light.lottie";

  useEffect(() => {
    if (isUpladed && socket) {
      socket.on("pdf_read_response", (data: PdfReadResponse) => {
        console.log(data);
      });
    }
  }, [isUpladed, socket]);

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-56px)]">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl">Ready when you are.</h1>
        <p className="mb-6 text-gray-400 mt-0.5">
          Upload your PDF file to get started
        </p>
        {!isUpladed && <UploadPDF setIsUpladed={setIsUpladed} />}
        {isUpladed && (
          <Card className="md:w-100 sm:w-full bg-primary">
            <DotLottieReact src={lottie} autoplay loop />
            <p className="text-center text-white font-semibold">
              Processing your PDF file...
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
