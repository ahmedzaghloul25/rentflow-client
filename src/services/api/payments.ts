import api from '@/src/lib/api';
import { Payment, MarkPaymentPaidData } from '@/src/types/payment';

interface PaymentsResponse {
  message: string;
  pagination: {
    totalRecords: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  payments: Payment[];
}

export const getPaymentsForContract = async ({ contractId, page, limit, filters }: { contractId: string, page: number, limit: number, filters: any }): Promise<PaymentsResponse> => {
  const { data } = await api.get(`/payments/${contractId}`, {
    params: { page: page + 1, limit, ...filters }
  });
  return data;
};

export const markPaymentAsPaid = async ({ paymentId, paymentData }: { paymentId: string, paymentData: MarkPaymentPaidData }) => {
  const { data } = await api.post(`/payments/${paymentId}`, paymentData);
  return data;
};
