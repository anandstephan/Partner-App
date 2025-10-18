import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLead } from './createLead';


export const useCreateLead = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['lead']);
    },
  });

  return mutation;
};
