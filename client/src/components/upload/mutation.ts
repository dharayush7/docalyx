import { useMutation } from "@tanstack/react-query";
import { uploadDocumentHandler } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useUploadDocumentMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: uploadDocumentHandler,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success || !data.data) {
        toast.error(data.msg);
      } else {
        router.push(`/doc/${data.data.documentId}`);
      }
    },
  });

  return mutation;
};
