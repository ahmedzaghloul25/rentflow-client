import { Contract } from "./contract";
import { Payment } from "./payment";
import { Property } from "./property";

// --- API Response Types ---

// Represents an item from the GET /dashboard/summary 'contracts' array
// export interface PropertySummaryItem extends Contract {
// }

// Represents an item from the GET /dashboard/summary 'duePayments' array
export interface DuePaymentInfo {
  _id: string; // Contract ID
  duePayment: Payment | null;
}

// The complete shape of the GET /dashboard/summary response
export interface PropertySummaryResponse {
  contracts: Contract[];
  duePayments: DuePaymentInfo[];
}

// Represents an item from the GET /dashboard/finance response array
export interface FinancialSummaryItem {
  _id: string; // Contract ID
  totalRevenue: number;
  totalReceived: number;
  totalDue: number;
  contract: Contract;
  property: Property;
}

// --- Processed Data Type for the UI ---

// This is the final, combined shape of a single row in our dashboard table.
export interface DashboardRow {
  _id: string; // Contract ID
  propertyNumber: string;
  clientName: string;
  startDate: string;
  endDate: string;
  nextDueDate: string | null;
  nextDueAmount: number | null;
  totalRevenue: number;
  totalPaid: number;
  totalDue: number;
}

