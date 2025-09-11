import api from '@/src/lib/api';
import { NewPropertyData } from '@/src/types/property';

export const getProperties = async ({ page, limit }: { page: number, limit: number }) => {
  // Pass page and limit as query parameters
  const { data } = await api.get('/properties', {
    params: { page: page + 1, limit }, // Add 1 to page since MUI is 0-indexed and your API is 1-indexed
  });
  return data; // Return the whole response object now
};

// ▼▼▼ ADD THIS FUNCTION ▼▼▼
export const addProperty = async (propertyData: NewPropertyData) => {
  const { data } = await api.post('/properties', propertyData);
  return data;
};

export const deleteProperty = async (propertyId: string) => {
  const { data } = await api.delete(`/properties/${propertyId}`);
  return data;
};