import { useQuery, useMutation } from '@tanstack/react-query';
import { getState } from '../features/stateAndCity/stateAndCity';


// Hook for fetching state list
export const useAllState = () => {
  return useQuery({
    queryKey: ['stateList'],
    queryFn: getState,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 min
  });
};
