import axios from 'axios';
import { Storage } from '../utilites/storage'; // ensure named import if you exported like `export const Storage = { ... }`

const apiClient = axios.create({
  baseURL: 'https://backendverse.digivoltt.com',
  timeout: 5000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {   // <--- async added here
    if (config.url !== '/api/driver/auth/login') {
      try {
        const token = await Storage.getItem('token');
        console.log(token)
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
