import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContracts, addContract, terminateContract, getContractById } from '@/src/services/api/contracts';
import { NewContractData } from '@/src/types/contract';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { GeneralError } from '@/src/types/common';


export const useContracts = ({ page, limit, is_terminated }: { page: number, limit: number, is_terminated?: boolean }) => {
    return useQuery({
        queryKey: ['contracts', page, limit, is_terminated],
        queryFn: () => getContracts({ page, limit, is_terminated }),
    });
};

export const useContract = (contractId: string) => {
    return useQuery({
        queryKey: ['contract', contractId],
        queryFn: () => getContractById(contractId),
        enabled: !!contractId,
    });
};

export const useAddContract = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newData: NewContractData) => addContract(newData),
        onSuccess: () => {
            toast.success('Contract added successfully')
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
            queryClient.invalidateQueries({ queryKey: ['propertySummary'] });
            queryClient.invalidateQueries({ queryKey: ['financialSummary'] });
        },
        onError: (axiosError: AxiosError) => {
            const errorObject = axiosError.response?.data as GeneralError
            toast.error(`Error: ${errorObject.message}`);
        }
    });
};

export const useTerminateContract = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (contractId: string) => terminateContract(contractId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
            queryClient.invalidateQueries({ queryKey: ['propertySummary'] });
            queryClient.invalidateQueries({ queryKey: ['financialSummary'] });
            toast.success('Contract terminated successfully')
        },
        onError(axiosError: AxiosError) {
            const errorObject = axiosError.response?.data as GeneralError
            toast.error(`Error: ${errorObject.message}`);
        },
    });
}