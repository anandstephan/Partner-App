import apiClient from '../../api/apiClient.ts';
import { AssetRequest } from './type.ts';




export const createAssets = async (payload:AssetRequest): Promise<void> => {

  const response = await apiClient.post('/api/assetRequest',payload);
 
  return response.data;
};

