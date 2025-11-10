import apiClient from "../../api/apiClient";
import { EmiSummary, LeadSummary } from "./type";

export const getHomePageEMINumbers = async (): Promise<EmiSummary> => {

  try {
    const response = await apiClient.get('/api/emi/homePageNumbers');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};

export const getLeadSummary = async (): Promise<LeadSummary> => {

  try {
    const response = await apiClient.get('/api/lead/homePageNumbers');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};

