import apiClient from '../../api/apiClient.ts';
import { LeadArray } from './type.ts';



export const getLeads = async ():Promise<LeadArray> => {

  const response = await apiClient.get('/api/lead');
 
  return response.data;
};

