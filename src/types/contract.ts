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
    property_id: Property;
    client_id: Client;
    user_id: string;
    start_date: string;
    end_date: string;
    initial_rent: number;
    payment_interval: PaymentInterval;
    annual_increase: number;
    security_deposit: number;
    is_terminated?: boolean;
    actual_end_date?: string;
}

export interface NewContractData {
    property_id: string;
    client_id: string;
    start_date: Date;
    end_date: Date;
    initial_rent: number;
    payment_interval: PaymentInterval;
    annual_increase: number;
    security_deposit: number;
}