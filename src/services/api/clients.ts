import api from '@/src/lib/api';
import { Client, NewClientData } from '@/src/types/client';

export const getClients = async ({ page, limit }: { page: number, limit: number }) => {
  const { data } = await api.get('/clients', {
    params: { page: page + 1, limit },
  });
  return data;
};

export const addClient = async (clientData: NewClientData): Promise<Client> => {
  const { data } = await api.post('/clients', clientData);
  return data.client;
};

export const deleteClient = async (clientId: string): Promise<any> => {
  const { data } = await api.delete(`/clients/${clientId}`);
  return data;
};