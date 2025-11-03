import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadToS3 } from './uploadService';

export const useUpload = () =>{
 
  const queryClient = useQueryClient();   

  const mutation = useMutation({
    mutationFn:uploadToS3,
      onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['upload']);

    },
       onError:(error, variables, onMutateResult, context)=> {
      console.log("Error",error)
    },
 
  })
  return mutation

}