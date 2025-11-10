export interface EmiSummary {
  dueEmisCount: number;
  upcomingSevenDaysCount: number;
  overdueCount: number;
}

//api/emi/homePageNumbers

export interface LeadSummary {
  success: boolean;
  todayCount: number;
  totalLeadCount: number;
  kycDoneLeadCount: number;
  onboardedLeadCount: number;
}
