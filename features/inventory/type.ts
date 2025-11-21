export interface BatteryCount {
  status: "in-stock" | "assigned" | "RTP" | "service" | "faulty";
  count: number;
}

export interface StateInfo {
  _id: string;
  name: string;
  code: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeDistributor {
  _id: string;
  name: string;
  mobile: string;
  tenantId: string;
  batteryCounts: BatteryCount[];
  state: StateInfo;
}


export interface BatteryCount {
  status: "in-stock" | "assigned" | "RTP" | "service" | "faulty";
  count: number;
}

export interface StateInfo {
  _id: string;
  name: string;
  code: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface CityInfo {
  _id: string;
  name: string;
  pinCode: string;
  status: string;
  tenantId: string;
  stateId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Dealer {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  tenantId: string;
  distributorId: string;
  batteryCounts: BatteryCount[];
  state: StateInfo;
  city: CityInfo;
}
