import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backendverse.digivoltt.com',
  timeout: 5000,
  headers:{
    'Content-Type':"application/json"
  },
  withCredentials: true 
});



export default apiClient;
