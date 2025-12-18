import { useMutation } from "@tanstack/react-query";
import { sendMessageHandler } from "./action";
import { toast } from "sonner";
import useSocket from "@/hooks/use-socket";

export const useSendMassageMutation = () => {
  const socket = useSocket();
  const mutation = useMutation({
    mutationFn: sendMessageHandler,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (res) => {
      if (!res.success || !res.data) {
        toast.error(res.msg || "Failed to send message");
      } else {
        socket?.emit("message", {
          chat_id: res.data.chat_id,
          query: res.data.content,
        });
      }
    },
  });

  return mutation;
};
