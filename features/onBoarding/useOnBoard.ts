import { useMutation, useQueryClient } from '@tanstack/react-query';

import { onBoard } from './onBoard';


export const useOnBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: onBoard,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['onboard']);
    },
  });

  return mutation;
};

