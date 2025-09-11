import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProperties, addProperty, deleteProperty } from '@/src/services/api/properties';
import { NewPropertyData } from '@/src/types/property';
import { AxiosError } from 'axios';
import { GeneralError } from '@/src/types/common';
import toast from 'react-hot-toast';

export const useProperties = ({ page, limit }: { page: number, limit: number }) => {
  return useQuery({
    // Add page and limit to the queryKey to make it unique
    queryKey: ['properties', page, limit],
    queryFn: () => getProperties({ page, limit }),
  });
};

// ▼▼▼ ADD THIS HOOK ▼▼▼
export const useAddProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProperty: NewPropertyData) => addProperty(newProperty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property added successfully')
    },
    onError: (axiosError: AxiosError) => {
      const errorObject = axiosError.response?.data as GeneralError
      console.error(axiosError)
      toast.error(`Error: ${errorObject.message}`); // Error toast
    }
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => deleteProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property deleted successfully')
    },
    onError: (axiosError: AxiosError) => {
      const errorObject = axiosError.response?.data as GeneralError
      console.error(axiosError)
      toast.error(`Error: ${errorObject.message}`); // Error toast
    }
  });
};