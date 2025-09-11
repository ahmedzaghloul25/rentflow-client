import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
let csrfToken: string | null = null;

/**
 * A setter function to update the stored CSRF token from anywhere in the app.
 * We will call this right after the /profile API returns the token.
 * @param token The CSRF token string.
 */
export const setCsrfToken = (token: string) => {

    csrfToken = token;
    console.log('csrf token ', token);
    
};

api.interceptors.request.use(config => {
    if (csrfToken && config.method && !['GET', 'HEAD', 'OPTIONS'].includes(config.method.toLowerCase())) {
        config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
});

export default api;