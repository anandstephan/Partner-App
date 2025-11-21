import apiClient from "../../api/apiClient";
import { Dealer, EmployeeDistributor } from "./type";

export const getDistributor = async (): Promise<EmployeeDistributor[]> => {
  try {
    const response = await apiClient.get(
      "/api/inventoryManagement/getDistributorStats/691381ad970b7f6dbbf6af75"
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; 
  }
};


export const getDealer = async (): Promise<Dealer[]> => {
  try {
    const response = await apiClient.get(
      "/api/inventoryManagement/getDistributorStats/691381ad970b7f6dbbf6af75"
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; 
  }
};

