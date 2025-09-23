import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClients, addClient, deleteClient } from '@/src/services/api/clients';
import { NewClientData } from '@/src/types/client';
import { AxiosError } from 'axios';
import { GeneralError } from '@/src/types/common';
import toast from 'react-hot-toast';

export const useClients = ({ page, limit }: { page: number, limit: number }) => {
  return useQuery({
    queryKey: ['clients', page, limit],
    queryFn: () => getClients({ page, limit }),
  });
};

export const useAddClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newClient: NewClientData) => addClient(newClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client added successfully')
    },
    onError: (axiosError: AxiosError) => {
      const errorObject = axiosError.response?.data as GeneralError
      toast.error(`Error: ${errorObject.message}`);
    }
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientId: string) => deleteClient(clientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully')
    },
    onError: (axiosError: AxiosError) => {
      const errorObject = axiosError.response?.data as GeneralError
      toast.error(`Error: ${errorObject.message}`);
    }
  });
};