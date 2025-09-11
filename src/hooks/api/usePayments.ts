import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPaymentsForContract, markPaymentAsPaid } from '@/src/services/api/payments';
import { GetContractPayments, MarkPaymentPaidData } from '@/src/types/payment';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { GeneralError } from '@/src/types/common';

export const useContractPayments = ({ contractId, page, limit, filters }: { contractId: string, page: number, limit: number, filters: GetContractPayments }) => {
    return useQuery({
        queryKey: ['contractPayments', contractId, page, limit, filters],
        queryFn: () => getPaymentsForContract({ contractId, page, limit, filters }),
        enabled: !!contractId, // Only run query if contractId is available
    });
};

export const useMarkPaymentPaid = (contractId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ paymentId, paymentData }: { paymentId: string, paymentData: MarkPaymentPaidData }) => markPaymentAsPaid({ paymentId, paymentData }),
        onSuccess: () => {
            toast.success('Payment marked as paid!');
            queryClient.invalidateQueries({ queryKey: ['contractPayments', contractId] });
        },
        onError: (axiosError: AxiosError) => {
            const error = axiosError.response?.data as GeneralError
            console.log(axiosError)
            toast.error(`Error: ${error.message}`);
        }
    });
};
