import { Billing } from "./billingDetails";

export interface Name {
  familyName: string;
  givenName: string;
  middleName?: string;
}

export interface Email {
  value: string;
  type?: string;
}

export interface Photo {
  value: string;
}

export interface User {
  _id: string;
  provider: string;
  externalId: string;
  displayName: string;
  name: Name;
  emails: Email[];
  photos?: Photo[];
  billingDetails?: Billing;
  clientIds?: string[];
}
