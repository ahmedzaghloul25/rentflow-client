import api from '@/src/lib/api';
import { NewContractData } from '@/src/types/contract';

export const getContracts = async ({ page, limit, is_terminated }: { page: number, limit: number, is_terminated?: boolean }) => {
    const params: { page: number, limit: number, is_terminated?: boolean } = {
        page: page + 1,
        limit,
    };
    if (is_terminated !== undefined) {
        params.is_terminated = is_terminated;
    }
    const { data } = await api.get('/contracts', { params });
    return data;
};

export const addContract = async (contractData: NewContractData) => {
    const { property_id, ...rest } = contractData;
    const { data } = await api.post(`/contracts/${property_id}`, rest);
    return data;
};

export const getContractById = async (contractId: string) => {
    const { data } = await api.get(`/contracts/${contractId}`);
    return data.contract;
}

export const terminateContract = async (contractId: string) => {
    const { data } = await api.post(`/contracts/terminate/${contractId}`);
    return data;
}