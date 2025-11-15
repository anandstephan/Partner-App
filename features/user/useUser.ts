import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "./userService";

export const useUser = () => {
    return useQuery({
        queryKey: ["userData"],
        queryFn: getUser,
    });
};



export const useUpdateUser = () => {
const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['updateUser']);
    },
  });

  return mutation;
};