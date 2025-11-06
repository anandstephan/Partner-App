import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productAssign } from './productAssign';


export const useProductAssign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productAssign,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['productAssign']);
    },
  });

  return mutation;
};

