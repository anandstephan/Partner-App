import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKyc, createKyc1, createKyc2 } from './createKyc';
import { KYC2, ReferenceDetails } from './type';


export const useKyc1 = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createKyc,
    onSuccess: () => {
      // invalidate cached list after successful POST
      queryClient.invalidateQueries(['kyc1']);
    },
    onError: (err) => {
      console.log("Error",err)
    }
  });

  return mutation;
};


export const useKyc2 = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ kycId, payload }: { kycId: string; payload: KYC2 }) =>
      createKyc1(kycId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['kyc2']);
    },
  });

  return mutation;
};


export const useFinalKyc = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ kycId, payload }: { kycId: string; payload: ReferenceDetails }) =>
      createKyc2(kycId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['finalkyc']);
    },
  });

  return mutation;
};


