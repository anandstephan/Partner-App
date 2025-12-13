import apiClient from '../../api/apiClient.ts';
import { CollectionDetails } from './type.ts';



export const createCollection = async (payload:CollectionDetails): Promise<void> => {
    try {
      console.log(JSON.stringify(payload),"collection")
  const response = await apiClient.post('/api/collection',payload);

  return response.data; 
    } catch (error) {
      console.log("ERRRRRRR",error)
    }
};

