import { useMutation } from "@tanstack/react-query";
import { CityInterface } from "../features/stateAndCity/type";
import { getCity } from "../features/stateAndCity/stateAndCity";

export const useCity = () => {
  return useMutation({
    mutationFn: (params: CityInterface) => getCity(params),
  });
};
