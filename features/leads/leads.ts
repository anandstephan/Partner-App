import apiClient from '../../api/apiClient.ts';
import { LeadArray } from './type.ts';



export const getLeads = async (): Promise<LeadArray> => {

  try {
    const response = await apiClient.get('/api/lead');
    console.log("res", response);
    return response.data;
  } catch (error: any) {
    console.log("error fetching leads:", error.message);
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};