export interface CollectionDetails {
  leadId: string;
  collectionType: string;   // e.g. "DOWN_PAYMENT"
  amount: number;
  paymentMode: string;      // e.g. "cash"
  productType: string;      // e.g. "battery"
  partnerType: string;      // e.g. "driver"
}
