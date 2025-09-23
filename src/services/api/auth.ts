import api from '@/src/lib/api';
import { User } from '@/src/types/auth';

export const getProfile = async (): Promise<{user: User}> => {
  
  const { data } = await api.get('/auth/profile');
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};