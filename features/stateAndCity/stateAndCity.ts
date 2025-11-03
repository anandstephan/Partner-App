import apiClient from '../../api/apiClient.ts';
import { CityInterface } from './type.ts';


export const getState = async (): Promise<[]> => {
  try {
    const response = await apiClient.get('/api/state');
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response State:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};


export const getCity = async (params: CityInterface): Promise<[]> => {
  try {
    console.log("+++",params)
    const response = await apiClient.get('/api/city?stateId='+params.stateId);

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error response City:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};


export const getCluster = async (params: any): Promise<[]> => {

  try {
    const response = await apiClient.get('/api/cluster?cityId='+params.cityId+'&stateId='+params.stateId);
    console.log("ClusterData",response.data.data)
    return response.data.data
  } catch (error: any) {
    if (error.response) {
      console.log("error response Cluster:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
}