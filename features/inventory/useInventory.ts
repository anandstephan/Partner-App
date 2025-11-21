
import { useQuery } from "@tanstack/react-query";
import { getDealer, getDistributor } from "./inventory";
import { Dealer, EmployeeDistributor } from "./type";

export const useDistributor = () => {
  return useQuery<EmployeeDistributor[], Error>({
    queryKey: ["distributor-stats"],
    queryFn: getDistributor,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useDealer = () => {
  return useQuery<Dealer[], Error>({
    queryKey: ["dealer-stats"],
    queryFn: getDealer,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
