import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEmis } from './emi';


export const useEmi = () => {
    return useQuery({
        queryKey: ['emis'],
        queryFn: getEmis
    })
 
};

