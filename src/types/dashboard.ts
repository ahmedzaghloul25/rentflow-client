import { Contract } from "./contract";
import { Payment } from "./payment";
import { Property } from "./property";


export interface DuePaymentInfo {
  _id: string;
  duePayment: Payment | null;
}

export interface PropertySummaryResponse {
  contracts: Contract[];
  duePayments: DuePaymentInfo[];
}

export interface FinancialSummaryItem {
  _id: string;
  totalRevenue: number;
  totalReceived: number;
  totalDue: number;
  contract: Contract;
  property: Property;
}


export interface DashboardRow {
  _id: string;
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

