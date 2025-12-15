import axios from 'axios';
import { Storage } from '../utilites/storage'; // ensure named import if you exported like `export const Storage = { ... }`

const apiClient = axios.create({
  baseURL: 'https://backendverse.digivoltt.com',
  // baseURL:"http://localhost:5000",
  timeout: 5000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {   // <--- async added here
    if (config.url !== '/api/auth/login') {
      try {
        const token = await Storage.getItem('token');
        console.log(token,"Token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
