import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from './login';


export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['login']);
    },
  });

  return mutation;
};

