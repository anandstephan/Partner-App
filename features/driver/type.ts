export interface Tenant {
  _id: string;
  organizationName: string;
}

export interface State {
  _id: string;
  name: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Cluster {
  _id: string;
  name: string;
}

export interface Kyc {
  _id: string;
  aadhaarNo: string;
}

export interface EmiScheme {
  _id: string;
  schemeName: string;
}

export interface BatteryIdType {
  _id: string;
}

export interface DriverRecord {
  _id: string;
  tenantId: Tenant;
  firstName: string;
  lastName: string;
  mobile: string;
  agreementSignedStatus: boolean;
  agreement: string[];
  stateId: State;
  cityId: City;
  clusterId: Cluster;
  dealerId: string | null;
  kycId: Kyc;
  leadId: string;
  emiSchemeId: EmiScheme;
  productType: string;
  createdAt: string;
  updatedAt: string;
  driverId: string;
  password: string;
  __v: number;
  batteryPhoto: string;
  brandMaterialHandover: boolean;
  chargerPhoto: string;
  batteryId: BatteryIdType;
}



export type DriverRecordArray = DriverRecord[];