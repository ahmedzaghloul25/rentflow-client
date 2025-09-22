import axios from 'axios';
import { getToken } from './token'; // We will create this helper file next

const api = axios.create({
  // This should be your environment variable, which for Vercel is /api
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Axios Request Interceptor
 * * This function runs before every single request is sent from the frontend.
 * Its job is to check if we have a token in localStorage and, if so,
 * automatically add it to the 'Authorization' header.
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get the token from storage
    if (token) {
      // If a token exists, add the 'Bearer <token>' header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // This part handles errors that might occur during request setup
    return Promise.reject(error);
  }
);

export default api;

