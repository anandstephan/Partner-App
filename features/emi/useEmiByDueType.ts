import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmisByDueType } from './emi';



export const useEmiByDueType = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: getEmisByDueType,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['emiByDueType']);
    },
  });

  return mutation;
};

