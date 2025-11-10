import apiClient from '../../api/apiClient.ts';
import { EmiData } from './type.ts';



export const getEmis = async (): Promise<EmiData> => {

  try {
    const response = await apiClient.get('/api/emi/');

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};