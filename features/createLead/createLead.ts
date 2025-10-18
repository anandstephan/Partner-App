import apiClient from '../../api/apiClient.ts';
import { LeadDetails } from './type.ts';



export const createTicket = async (payload:LeadDetails): Promise<TicketResponse> => {
  console.log(payload)
  const response = await apiClient.post('/api/lead/employee',payload);
  console.log("+++++",response)
  return response.data;
};

