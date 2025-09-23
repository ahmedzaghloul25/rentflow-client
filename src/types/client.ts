export interface Client {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  ID_no: string;
  phone: string;
  user_id: string;
}

export type NewClientData = Omit<Client, '_id' | 'user_id' | 'fullName'>;