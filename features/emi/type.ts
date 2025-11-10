export interface EmiData {
  _id: string;
  emiAmount: number;
  status: "pending" | "paid" | "overdue" | string;
  amountPaid: number;
  dueDate: string;
  stateId: string;
  cityId: string;
  clusterId: string;
  tenantId: Tenant;
  loanId: Loan;
  driverId: Driver;
  emiSchemeId: string | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  _id: string;
  organizationName: string;
  type: "nbfc" | string;
  address: string;
  mobile: string;
  email: string;
  documents: string[];
  status: "active" | "inactive" | string;
  gstNumber: string;
  panNumber: string;
  workingHours: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Loan {
  _id: string;
  tenantId: string;
  driverId: string;
  tenure: string;
  loanAmount: string;
  productType: string;
  leadId: string;
  emiAmountFinal: string;
  emiSchemeId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  emiEndDate: string;
  emiStartDate: string;
  downPayment: DownPayment;
}

export interface DownPayment {
  downPaymentAmountFinal: number;
  status: string;
  collectionId: string;
}

export interface Driver {
  _id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  stateId: string;
  cityId: string;
  clusterId: string;
  dealerId: string;
  kycId: string;
  leadId: string;
  emiSchemeId: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
  driverId: string;
  password: string;
  __v: number;
  batteryPhoto: string;
  brandMaterialHandover: boolean;
  chargerPhoto: string;
}
