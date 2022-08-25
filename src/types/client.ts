export interface Billing {
  company_name: string;
  building_name?: string;
  unit_number?: string;
  street_name: string;
  city: string;
  country: string;
  postal_code: string;
  company_registration?: string;
}

export interface Client {
  _id: string;
  client_name: string;
  billing_details: Billing;
  project_ids: [];
  createdAt: Date | null;
  updatedAt: Date | null;
}
