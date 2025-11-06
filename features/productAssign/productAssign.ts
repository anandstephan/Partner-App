import apiClient from '../../api/apiClient.ts';
import { ProductAssignFormData } from './type.ts';



export const productAssign = async (payload:ProductAssignFormData): Promise<void> => {

  const response = await apiClient.post('/api/productAssign',payload);
 
  return response.data;
};

