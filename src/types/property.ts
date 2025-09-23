import { EgyptianCity, PropertyType } from "@/src/lib/constants";

export interface Property {
  _id: string;
  number: string;
  type: PropertyType;
  city: EgyptianCity;
  district: string;
  building: string;
  notes?: string;
  user_id: string;
}

export type NewPropertyData = Omit<Property, '_id' | 'user_id'>;