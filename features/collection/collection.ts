import apiClient from '../../api/apiClient.ts';
import { CollectionDetails } from './type.ts';



export const createCollection = async (payload:CollectionDetails): Promise<void> => {

  const response = await apiClient.post('/api/collection',payload);
 
  return response.data;
};

