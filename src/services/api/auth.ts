import api from '@/src/lib/api';
import { User } from '@/src/types/auth'; // We'll create this type next

export const getProfile = async (): Promise<{user:User, csrfToken?: string}> => {
  
  const { data } = await api.get('/auth/profile');
    console.log('get profile called ', data);
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};