import { useMutation } from "@tanstack/react-query";
import { uploadDocumentHandler } from "./action";
import { toast } from "sonner";

export const useUploadDocumentMutation = () => {
  const mutation = useMutation({
    mutationFn: uploadDocumentHandler,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.msg);
      }
    },
  });

  return mutation;
};
