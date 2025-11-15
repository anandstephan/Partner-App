import apiClient from "../../api/apiClient";
import Storage from "../../utilites/storage";

export const getUser = async () =>{
  try {
    const id = await Storage.getItem('id');
    const response = await apiClient.get('/api/user/'+id);

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.log("error User", error.response.data);
    }
    throw error; // taaki React Query ko bhi pata chale
  }
}

export const updateUser = async (params:any) =>{
    try {
    const id = await Storage.getItem('id');
    const response = await apiClient.put('/api/user/'+id,params);       
    console.log("updateUser",response.data.data)
    return response.data.data 
    } catch (error) {
        throw error
    }
}
