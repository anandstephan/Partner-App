import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDealerByStateCityCluserRole, getRole } from './role';
import { Employee } from './type';


export const useRole = () => {
    return useQuery({
        queryKey: ['lead'],
        queryFn: getRole
    })
 
};



export const useDealerByParams = (params: {
  stateId: string;
  cityId: string;
  clusterId: string;
  role: string;
}) => {
  return useQuery<Employee[], Error>({
    queryKey: ["dealerByLocation", params],
    queryFn: () => getDealerByStateCityCluserRole(params),
    enabled: !!params?.stateId && !!params?.cityId && !!params?.clusterId && !!params?.role, // tabhi chale jab sab params ho
  });
};