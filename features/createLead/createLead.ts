import apiClient from '../../api/apiClient.ts';
import { LeadDetails } from './type.ts';



export const createLead = async (payload:LeadDetails): Promise<void> => {

  const response = await apiClient.post('/api/lead',payload);
 
  return response.data;
};

