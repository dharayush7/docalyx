import { useMutation } from "@tanstack/react-query";
import { updateProfileHandler } from "./action";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

export const useUpdateUserMutation = () => {
  const { setUserName } = useAuth();

  const mutation = useMutation({
    mutationFn: updateProfileHandler,
    onSuccess: async (response) => {
      if (response.success && response.data) {
        setUserName(response.data?.name);
        toast.success("Profile updated successfully");
      } else toast.error(response.msg || "Failed to update profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
