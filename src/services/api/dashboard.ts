import api from '@/src/lib/api';
import { PropertySummaryResponse, FinancialSummaryItem } from '@/src/types/dashboard';

/**
 * Fetches the summary of active contracts and their next due payments.
 * Corresponds to GET /dashboard/summary
 */
export const getPropertySummary = async (): Promise<PropertySummaryResponse> => {
  const { data } = await api.get('/dashboard/duePayment');
  return data;
};

/**
 * Fetches the aggregated financial data for all contracts.
 * Corresponds to GET /dashboard/finance
 */
export const getFinancialSummary = async (): Promise<FinancialSummaryItem[]> => {
  const { data } = await api.get('/dashboard/finance');
  return data;
};