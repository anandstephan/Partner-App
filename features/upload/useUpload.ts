import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadMultipleToS3, uploadToS3 } from './uploadService';

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


export const useUploadMultiple = () =>{
  const queryClient = useQueryClient();   

  const mutation = useMutation({
    mutationFn: (files: any[]) => uploadMultipleToS3(files),

    onSuccess: () => {
      queryClient.invalidateQueries(['uploadMultiple']);
    },

    onError: (error) => {
      console.log("❌ Upload Error:", error);
    },
  });

  return mutation;
};