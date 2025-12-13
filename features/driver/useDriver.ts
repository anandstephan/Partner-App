import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDrivers } from './driver';



export const useDriver = () => {
    return useQuery({
        queryKey: ['drivers'],
        queryFn: getDrivers,
        staleTime: 1000 * 60 * 2
    })
 
};

