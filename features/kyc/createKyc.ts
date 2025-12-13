import apiClient from '../../api/apiClient.ts';
import { KYC1,KYC2, ReferenceDetails } from './type.ts';


export const createKyc = async (payload:KYC1): Promise<void> => {
   console.log("payload",payload)
   try {
    
   const response = await apiClient.post('/api/kyc',payload);
  
   return response.data;     
   } catch (error) {
      console.log("Error",error)
         throw new Error(error);
   }
}


export const createKyc1 = async (kycId:string,payload:KYC2): Promise<void> => {
   console.log("payload22",payload,kycId)
   try {
    
   const response = await apiClient.patch('/api/kyc/'+kycId,payload);
  
   return response.data;     
   } catch (error) {
         throw new Error(error);
   }
}

export const createKyc2 = async (kycId:string,payload:ReferenceDetails): Promise<void> => {
   console.log("payload22",payload,kycId)
   console.log("++++",JSON.stringify(payload))
   try {
    
   const response = await apiClient.post('/api/kyc/'+kycId+"/submit",payload);
  
   return response.data;     
   } catch (error) {
         throw new Error(error);
   }
}

