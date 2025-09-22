/**
 * Retrieves the authentication token from localStorage.
 */
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/**
 * Stores the authentication token in localStorage.
 * @param token The JWT string to store.
 */
export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

/**
 * Removes the authentication token from localStorage.
 */
export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};
