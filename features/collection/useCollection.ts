import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCollection } from './collection';



export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['collection']);
    },
  });

  return mutation;
};

