import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEMISummary, getLeadSummary } from './home';
import { EmiSummary, LeadSummary } from './type';


export const useLeadSummary = () => {
  return useQuery<LeadSummary>({
    queryKey: ['homePageNumbers'],
    queryFn: getLeadSummary,
  });
};


export const useEMISummary = () =>{
    return useQuery<EmiSummary>({
        queryKey: ['emiSummary'],
        queryFn: getEMISummary,
      });
}