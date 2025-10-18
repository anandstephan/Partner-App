import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadService } from './uploadService';

export const useUpload = () =>{
 
  const queryClient = useQueryClient();   

  const mutation = useMutation({
    mutationFn:uploadService,
      onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['upload']);
    },
  })
  return mutation

}