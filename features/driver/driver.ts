import apiClient from '../../api/apiClient.ts';
import { DriverRecordArray } from './type.ts';



export const getDrivers = async (): Promise<DriverRecordArray> => {

  try {
    const response = await apiClient.get('/api/driver');
    return response.data.data;
  } catch (error: any) {
    console.log("error fetching drivers:", error.message);
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};