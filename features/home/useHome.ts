import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getHomePageEMINumbers, getLeadSummary } from './home';
import { EmiSummary, LeadSummary } from './type';


export const useEMIHomePage = () => {
  return useQuery<EmiSummary>({
    queryKey: ['homePageNumbers'],
    queryFn: getHomePageEMINumbers,
  });
};


export const useHomeLeadSummary = () =>{
    return useQuery<LeadSummary>({
        queryKey: ['leadSummary'],
        queryFn: getLeadSummary,
      });
}