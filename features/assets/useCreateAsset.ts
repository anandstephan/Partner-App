import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAssets } from './assets';


export const useCreateAssets = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAssets,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['assets']);
    },
  });

  return mutation;
};

