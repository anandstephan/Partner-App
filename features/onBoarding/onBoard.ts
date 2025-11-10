import apiClient from '../../api/apiClient.ts';
import { EmiSchemeDetails } from './type.ts';



export const onBoard = async (payload:EmiSchemeDetails): Promise<void> => {

  const response = await apiClient.post('/api/onboarding',payload);
 
  return response.data;
};

