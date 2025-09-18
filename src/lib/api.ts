import axios from 'axios';
import Cookies from 'js-cookie'; // <-- Import the library

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This is crucial for sending cookies automatically
});

// REMOVED: No more global variable or setter function needed.
// let csrfToken: string | null = null;
// export const setCsrfToken = (token: string) => { ... };

// The interceptor now handles everything automatically.
api.interceptors.request.use(config => {
    // 1. Define the methods that need CSRF protection.
    const methodsToProtect = ['post', 'put', 'patch', 'delete'];
    
    // 2. Check if the request method is one that needs protection.
    if (config.method && methodsToProtect.includes(config.method.toLowerCase())) {
        
        // 3. Read the CSRF token directly from the cookie.
        //    Ensure 'csrf_token' matches the name you set in the backend.
        const csrfToken = Cookies.get('csrf_token');

        // 4. If the token exists, add it to the request header.
        if (csrfToken) {
            config.headers['x-csrf-token'] = csrfToken;
        }
    }

    // The browser will automatically attach the HttpOnly auth_token cookie.
    return config;
});

export default api;
