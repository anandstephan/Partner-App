export interface TenantAgreementFormats {
  battery: string;
}

export interface Tenant {
  agreementFormats: TenantAgreementFormats;
  _id: string;
  organizationName: string;
  type: string;
  address: string;
  mobile: string;
  email: string;
  documents: string[];
  status: string;
  gstNumber: string;
  panNumber: string;
  workingHours: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Employee {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  category: string;
  address: string;
  stateId: string;
  cityId: string | null;
  clusterId: string | null;
  status: string;
  tenantId: Tenant;
  createdAt: string;
  updatedAt: string;
  password: string;
  __v: number;
  distributorId?: string; // only present for dealer employee
}

export interface EmployeesResponse {
  success: boolean;
  count: number;
  data: Employee[];
}
