"use client";

import UploadPDF from "@/components/upload/upload-pdf";
import { useState } from "react";

export default function Main() {
  const [isUpladed, setIsUpladed] = useState(false);
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-56px)]">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl">Ready when you are.</h1>
        <p className="mb-6 text-gray-400 mt-0.5">
          Upload your PDF file to get started
        </p>
        {!isUpladed && <UploadPDF setIsUpladed={setIsUpladed} />}
        {isUpladed && <div>PDF uploaded successfully</div>}
      </div>
    </div>
  );
}
