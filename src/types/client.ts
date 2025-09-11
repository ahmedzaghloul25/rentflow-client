export interface Client {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string; // From the virtual property
  ID_no: string;
  phone: string;
  user_id: string;
}

// This will be the shape of the form data
export type NewClientData = Omit<Client, '_id' | 'user_id' | 'fullName'>;