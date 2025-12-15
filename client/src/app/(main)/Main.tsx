"use client";

import UploadPDF from "@/components/upload/upload-pdf";
import React from "react";

export default function Main() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl">Ready when you are.</h1>
        <UploadPDF />
      </div>
    </div>
  );
}

function UploadPDFComp() {
  return;
}
