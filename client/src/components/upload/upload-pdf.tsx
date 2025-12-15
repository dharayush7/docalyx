"use client";
import { cn, isFileSizeGreaterThan } from "@/lib/utils";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Loader2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import pdf from "@/assets/pdf.svg";
import Image from "next/image";
import { useUploadDocumentMutation } from "./mutation";
import useSocket from "@/hooks/use-socket";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const allowedDocumentMimeTypes = ["application/pdf"];

export default function UploadPDF({
  setIsUpladed,
}: {
  setIsUpladed: (isUpladed: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isDraging, setDraging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mutation = useUploadDocumentMutation();
  const socket = useSocket();
  const { user } = useKindeBrowserClient();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (file) {
      setDraging(false);
      toast.error("File is already selected");
      return;
    }

    const droppedFileList = e.dataTransfer.files;
    if (droppedFileList.length === 0) {
      toast.error("File type is not supported");
      return;
    }

    if (!allowedDocumentMimeTypes.includes(droppedFileList[0].type)) {
      toast.error("File type is not supported");
      return;
    }

    if (isFileSizeGreaterThan(droppedFileList[0], 50)) {
      toast.error("File size is greater than 50 MB");
      return;
    }

    setFile(droppedFileList[0]);
    setDraging(false);
    onUpload(droppedFileList[0]);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraging(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      if (!allowedDocumentMimeTypes.includes(files[0].type)) {
        toast.error("File type is not supported");
        return;
      }
      if (isFileSizeGreaterThan(files[0], 2048)) {
        toast.error("File size is greater than 50 MB");
        return;
      }
      setFile(files[0]);
      onUpload(files[0]);
    }
  };
  const onClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const onUpload = (file: File) => {
    mutation.mutate(
      { title: file.name },
      {
        onError: () => {
          setFile(null);
        },
        onSuccess: async (data) => {
          if (data.success && data.data) {
            setIsUploading(true);
            try {
              const res = await fetch(data.data.preSignedUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });

              if (!res.ok) {
                throw new Error("Failed to upload file");
              }

              socket?.emit("read_pdf", {
                pdf_key: `${data.data.documentId}.pdf`,
                user_id: user?.id,
              });
              setIsUpladed(true);
            } catch (error) {
              setFile(null);
              toast.error("Failed to upload file");
            } finally {
              setIsUploading(false);
            }
          } else {
            setFile(null);
          }
        },
      }
    );
  };
  return (
    <Card
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "ring-0 border border-border md:w-100 sm:w-full",
        isDraging && "border-primary border-dashed border-2"
      )}
    >
      <CardContent
        className={cn(
          "flex justify-center",
          isDraging && "border-primary border-dashed "
        )}
      >
        {file ? (
          <div className="w-full flex bg-card items-center p-2 rounded-md gap-2 border border-primary">
            <div className="relative">
              <Image
                src={pdf}
                alt="pdf"
                width={40}
                height={40}
                className={cn(
                  (isUploading || mutation.isPending) && "opacity-50"
                )}
              />
              {(isUploading || mutation.isPending) && (
                <Loader2
                  size={30}
                  className="animate-spin absolute text-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            <div>
              <p className="font-semibold w-60 truncate">{file.name}</p>
              <p className="text-sm font-medium text-gray-500 ">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <input
              type="file"
              title="file"
              hidden
              ref={fileRef}
              onChange={onChange}
            />
            <Button
              onClick={onClick}
              type="button"
              className="w-fit cursor-pointer"
            >
              <Upload />
            </Button>
            <p className="text-sm font-medium mt-3">
              Drag and drop to upload or Browse
            </p>
            <p className="text-xs text-gray-400 mt-1">Max file size: 50 MB</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
