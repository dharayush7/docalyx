import {
  type InfiniteData,
  type QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { sendMessageHandler } from "./action";
import { toast } from "sonner";
import useSocket from "@/hooks/use-socket";
import type { ApiMessageResponse } from "@/lib/types";

export const useSendMassageMutation = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: sendMessageHandler,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (res) => {
      if (!res.success || !res.data) {
        toast.error(res.msg || "Failed to send message");
      } else {
        const queryFilter = {
          queryKey: ["chat-messages", res.data.chat_id],
        } satisfies QueryFilters;

        await queryClient.cancelQueries(queryFilter);

        queryClient.setQueriesData<InfiniteData<ApiMessageResponse>>(
          queryFilter,
          (oldData) => {
            if (!oldData) return { pages: [], pageParams: [] };
            return {
              ...oldData,
              pages: [
                ...oldData.pages.map((page, i) => {
                  if (i === 0) {
                    return {
                      ...page,
                      messages: [...page.messages, res.data],
                    };
                  }
                  return page;
                }),
              ],
            };
          }
        );

        socket?.emit("message", {
          chat_id: res.data.chat_id,
          query: res.data.content,
        });
      }
    },
  });

  return mutation;
};
