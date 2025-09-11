import { Client } from "./client";
import { Property } from "./property";

export enum PaymentInterval {
    EVERY_MONTH = 1,
    EVERY_3_MONTHS = 3,
    EVERY_6_MONTHS = 6,
    EVERY_YEAR = 12
}

export interface Contract {
    _id: string;
    property_id: Property; // Will be populated from the backend
    client_id: Client;     // Will be populated from the backend
    user_id: string;
    start_date: string; // Dates will be strings
    end_date: string;
    initial_rent: number;
    payment_interval: PaymentInterval;
    annual_increase: number;
    security_deposit: number;
    is_terminated?: boolean;
    actual_end_date?: string;
}

// Shape of the form data for creating a new contract
export interface NewContractData {
    property_id: string; // We'll submit IDs
    client_id: string;
    start_date: Date;
    end_date: Date;
    initial_rent: number;
    payment_interval: PaymentInterval;
    annual_increase: number;
    security_deposit: number;
}