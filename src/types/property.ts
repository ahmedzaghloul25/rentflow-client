import { EgyptianCity, PropertyType } from "@/src/lib/constants"; // We'll create this next

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

// This will be the shape of the form data
export type NewPropertyData = Omit<Property, '_id' | 'user_id'>;