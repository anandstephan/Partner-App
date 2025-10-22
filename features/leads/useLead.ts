import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLeads } from './leads';


export const useLead = () => {
    return useQuery({
        queryKey: ['lead'],
        queryFn: getLeads
    })
 
};

