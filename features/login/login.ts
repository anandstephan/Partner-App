import apiClient from '../../api/apiClient.ts';
import { AuthPayload } from './type.ts';




export const login = async (payload:AuthPayload): Promise<void> => {
  console.log("pay",payload)
  const response = await apiClient.post('/api/auth/login',payload);
  console.log("resu",apiClient)
  return response.data;
};

