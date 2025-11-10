import apiClient from '../../api/apiClient.ts';
import { ProductAssignFormData } from './type.ts';



export const productAssign = async (payload:ProductAssignFormData): Promise<void> => {
  console.log("payload",payload)
  const response = await apiClient.post('/api/productAssign',payload);
  console.log("===",response.data)
  return response.data;
};

