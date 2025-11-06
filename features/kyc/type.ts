export interface LatLng {
  lat: number;
  lng: number;
}

export interface KYC1 {
  leadId: string;
  firstName: string;
  lastName: string;
  selfie: string;
  selfieWithDriver: string;
  gender: 'male' | 'female' | 'other'; // you can expand if needed
  marritalStatus: string;
  smartPhoneUser: boolean;
  aadhaarFrontPhoto: string;
  aadhaarBackPhoto: string;
  aadhaarNo: string;
  nameAsPerAadhaar: string;
  dob: string; // using string because date is often received as ISO string (e.g., "2025-11-04")
  addressAsPerAadhaar: string;
  permanentAddress: string;
  houseOwnership: string;
  rentAgreementOrNOC: string;
  electricityBill: string;
  waterBill: string;
  housePhoto: string;
  latLng: LatLng;
  localityPhotos: string[];
  panFrontPhoto: string;
  panNo: string;
  dlFrontPhoto: string;
  dlBackPhoto: string;
}


export interface KYC2 {
  rcFrontPhoto: string;
  rcBackPhoto: string;
  rcNo: string;
  vehicleRegistrationDate: string; // ISO date string
  vehicleMake: string;
  vehicleModel: string;
  vehicleOwnership: 'owned' | 'financed' | 'leased'; // restricts to known values
  vehicleNOCDocument: string;
}


export interface ReferenceDetails {
  refOneNameAsPerAadhaar: string;
  refOneMobileNo: string;
  refOneAadhaarPANPhoto: string[]; // Array of URLs
  refOneAadhaarNo: string;
  refOnePanNo: string;
  refOneDOB: string; // ISO date string (e.g., "1985-07-10")
  refOneAddressAsPerAadhaar: string;
  refOnePermanentAddress: string;

  refTwoNameAsPerAadhaar: string;
  refTwoMobileNo: string;
  refTwoAadhaarPANPhoto: string[]; // Array of URLs
  refTwoAadhaarNo: string;
  refTwoPanNo: string;
  refTwoDOB: string; // ISO date string (e.g., "1990-03-22")
  refTwoAddressAsPerAadhaar: string;
  refTwoPermanentAddress: string;
}
