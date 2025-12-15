"use client";

import UploadPDF from "@/components/upload/upload-pdf";

export default function Main() {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-56px)]">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl">Ready when you are.</h1>
        <p className="mb-6 text-gray-400 mt-0.5">
          Upload your PDF file to get started
        </p>
        <UploadPDF />
      </div>
    </div>
  );
}

function UploadPDFComp() {
  return;
}
