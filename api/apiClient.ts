import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backendverse.digivoltt.com',
  timeout: 5000,
  withCredentials: true 
});


apiClient.interceptors.request.use(
  (config) => {
    // Check if request is NOT login
    if (config.url !== "/api/driver/auth/login") {
    
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmM4ZDQyZWU2NTllYjE1N2MyZjJjNCIsInR5cGUiOiJ1c2VyIiwidGVuYW50SWQiOiI2OGVjMDI2Y2FiMjY4YWFjMDNlMTI5NzUiLCJpYXQiOjE3NjIwNDU4ODEsImV4cCI6MTc2MjY1MDY4MX0.rWvTN53QgxSZ25pwHs330t0i3BQkA8RjJWfiXnBFKms' // get from MMKV / AsyncStorage
      console.log("Tokne",token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
