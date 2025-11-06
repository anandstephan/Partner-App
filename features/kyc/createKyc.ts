import apiClient from '../../api/apiClient.ts';
import { KYC1,KYC2, ReferenceDetails } from './type.ts';


export const createKyc = async (payload:KYC1): Promise<void> => {
   console.log("payload",payload)
   try {
    
   const response = await apiClient.post('/api/kyc',payload);
  
   return response.data;     
   } catch (error) {
         throw new Error(error);
   }
}


export const createKyc1 = async (leadId:string,payload:KYC2): Promise<void> => {
   // console.log("payload22",payload,leadId)
   try {
    
   const response = await apiClient.put('/api/kyc/'+leadId,payload);
  
   return response.data;     
   } catch (error) {
         throw new Error(error);
   }
}

export const createKyc2 = async (leadId:string,payload:ReferenceDetails): Promise<void> => {
   console.log("payload22",payload,leadId)
   try {
    
   const response = await apiClient.put('/api/kyc2/'+leadId+"/submit",payload);
  
   return response.data;     
   } catch (error) {
         throw new Error(error);
   }
}

