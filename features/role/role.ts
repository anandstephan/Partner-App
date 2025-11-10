import apiClient from '../../api/apiClient.ts';
import { UserRole } from './type.ts';



export const getRole = async (): Promise<[UserRole]> => {

  try {
    const response = await apiClient.get('/api/role');

    return response.data.data;
  } catch (error: any) {
    console.log("error fetching leads:", error.message);
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
};

export const getDealerByStateCityCluserRole = async (params: any): Promise<[UserRole]> => {
    console.log("params",JSON.stringify(params))
    params.stateId = '68ec06c6ad33264418ee029b'// isko change krna hai
    
  try {
    const response = await apiClient.get('/api/user?role='+params.role.replace(/"/g, '')+'&stateId='+params.stateId.replace(/"/g, '')+'&cityId='+params.cityId.replace(/"/g, '')+'&clusterId='+params.clusterId.replace(/"/g, ''));
    console.log("______",response.data.data)
    return response.data.data;
  } catch (error: any) {
    console.log("error fetching leads:", error.message);
    if (error.response) {
      console.log("error response:", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
}