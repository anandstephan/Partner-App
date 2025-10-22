export interface Lead {
  _id: string;
  firstName: string;
  tenantId: string;
  createdByUser: string;
  fatherMotherName: string;
  mobile: string;
  leadSource: string;
  stateId: string;
  cityId: string;
  clusterId: string;
  productType: "battery" | "vehicle" | "charger" | string; // can extend as needed
  leadStatus: "new" | "kyc_submitted" | "approved" | "rejected" | string;
  loanStatus: "not_applied" | "applied" | "approved" | "disbursed" | string;
  dlStatus: "available" | "not_available" | string;
  selfieWithCustomer?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  leadId: string;
  __v?: number;
}



export type LeadArray = Lead[];