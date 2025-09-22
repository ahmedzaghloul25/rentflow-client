import { useQuery } from '@tanstack/react-query';
import { getPropertySummary, getFinancialSummary } from '@/src/services/api/dashboard';

/**
 * Hook to fetch and cache the active contracts summary and their next due payments.
 */
export const usePropertySummary = () => {
  return useQuery({
    queryKey: ['dashboardPropertySummary'],
    queryFn: getPropertySummary,
    retry: false
  });
};

/**
 * Hook to fetch and cache the financial summary data.
 */
export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ['dashboardFinancialSummary'],
    queryFn: getFinancialSummary,
    retry: false
  });
};