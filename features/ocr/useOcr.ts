import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ocrService } from './ocrService';

export const useOcr = () =>{
 
  const queryClient = useQueryClient();   

  const mutation = useMutation({
    mutationFn:ocrService,
      onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['ocrService']);

    },
       onError:(error, variables, onMutateResult, context)=> {
      console.log("Error",error)
    },
 
  })
  return mutation

}