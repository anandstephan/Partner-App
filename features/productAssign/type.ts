export interface ProductAssignFormData {
  batteryId: string;
  chargerId: string;
  batteryPhoto: string;
  chargerPhoto: string;
  batteryHandoverDate: string;
  chargerHandoverDate: string;
  batteryWarrantyTenure: string | number;
  chargerWarrantyTenure: string | number;
  emiStartDate: string;
  emiEndDate: string;
  brandMaterialHandover: boolean | null;
}
