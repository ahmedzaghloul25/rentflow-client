import api from '@/src/lib/api';
import { NewPropertyData } from '@/src/types/property';

export const getProperties = async ({ page, limit }: { page: number, limit: number }) => {
  const { data } = await api.get('/properties', {
    params: { page: page + 1, limit },
  });
  return data;
};

export const addProperty = async (propertyData: NewPropertyData) => {
  const { data } = await api.post('/properties', propertyData);
  return data;
};

export const deleteProperty = async (propertyId: string) => {
  const { data } = await api.delete(`/properties/${propertyId}`);
  return data;
};