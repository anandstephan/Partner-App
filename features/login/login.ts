import apiClient from '../../api/apiClient.ts';
import { AuthPayload } from './type.ts';




export const login = async (payload:AuthPayload): Promise<void> => {

  const response = await apiClient.post('/api/auth/login',payload);
 
  return response.data;
};

