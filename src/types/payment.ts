import { Contract } from "./contract";

export enum PaymentMethodEnum {
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK',
    E_WALLET = 'E-WALLET'
}

export interface Payment {
    _id: string;
    contract_id: Contract; // Populated from backend
    due_date: string;
    due_amount: number;
    amount_paid?: number;
    is_paid: boolean;
    payment_date?: string;
    is_cancelled?: boolean;
    payment_method?: PaymentMethodEnum;
}

// For the "Mark as Paid" form
export interface MarkPaymentPaidData {
    amount_paid: number;
    payment_method: PaymentMethodEnum;
    payment_date: Date;
}

export interface GetContractPayments {
  is_paid?:boolean
  is_cancelled?: boolean
  page?:number
  limit?:number
}
