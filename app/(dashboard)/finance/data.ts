// Shape mirrors what a `/api/admin/finance` endpoint would return.
// Swap `getFinanceOverview()` for a real fetch() call when the API is ready.

export type PaymentReportTab =
  | "Booking Payments"
  | "Refunds"
  | "Commission"
  | "Withdrawals"
  | "Failed";

export type RevenuePeriod = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface RevenuePoint {
  label: string;
  revenue: number;
  commission: number;
}

export interface PaymentTransaction {
  id: string;
  type: PaymentReportTab;
  party: string;
  amount: number;
  currency: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface FinanceOverview {
  stats: {
    totalRevenue: { amount: number; currency: string; trend: string };
    monthlyRevenue: { amount: number; currency: string; trend: string };
    todayRevenue: { amount: number; currency: string; trend: string };
  };
  commissionSettings: {
    platformCommissionPct: number;
    homeVisitCommissionPct: number;
    salonVisitCommissionPct: number;
    minWithdrawal: number;
    maxWithdrawal: number;
  };
  revenueSeries: Record<RevenuePeriod, RevenuePoint[]>;
  transactions: PaymentTransaction[];
}

const monthlySeries: RevenuePoint[] = [
  { label: "Jan", revenue: 210000, commission: 235000 },
  { label: "Feb", revenue: 260000, commission: 285000 },
  { label: "Mar", revenue: 300000, commission: 305000 },
  { label: "Apr", revenue: 250000, commission: 265000 },
  { label: "May", revenue: 340000, commission: 355000 },
  { label: "Jun", revenue: 380000, commission: 395000 },
  { label: "Jul (cur)", revenue: 400000, commission: 421000 },
];

const dailySeries: RevenuePoint[] = [
  { label: "Mon", revenue: 42000, commission: 46000 },
  { label: "Tue", revenue: 39000, commission: 41000 },
  { label: "Wed", revenue: 45000, commission: 48000 },
  { label: "Thu", revenue: 51000, commission: 53500 },
  { label: "Fri", revenue: 60000, commission: 63000 },
  { label: "Sat", revenue: 58000, commission: 61000 },
  { label: "Sun", revenue: 42100, commission: 42100 },
];

const weeklySeries: RevenuePoint[] = [
  { label: "W1", revenue: 260000, commission: 275000 },
  { label: "W2", revenue: 290000, commission: 300000 },
  { label: "W3", revenue: 310000, commission: 320000 },
  { label: "W4", revenue: 342000, commission: 356000 },
];

const yearlySeries: RevenuePoint[] = [
  { label: "2022", revenue: 1800000, commission: 1900000 },
  { label: "2023", revenue: 2400000, commission: 2550000 },
  { label: "2024", revenue: 2850000, commission: 2980000 },
  { label: "2025", revenue: 3420000, commission: 3560000 },
];

const transactions: PaymentTransaction[] = [
  {
    id: "TXN-48291",
    type: "Booking Payments",
    party: "Aria Patel",
    amount: 4500,
    currency: "AUD",
    date: "2025-07-05",
    status: "Completed",
  },
  {
    id: "TXN-48302",
    type: "Booking Payments",
    party: "Kavya Reddy",
    amount: 1800,
    currency: "AUD",
    date: "2025-07-06",
    status: "Completed",
  },
  {
    id: "TXN-48315",
    type: "Booking Payments",
    party: "Riya Jain",
    amount: 3200,
    currency: "AUD",
    date: "2025-07-07",
    status: "Completed",
  },
  {
    id: "TXN-48338",
    type: "Booking Payments",
    party: "Tanya Verma",
    amount: 3800,
    currency: "AUD",
    date: "2025-07-09",
    status: "Completed",
  },
  {
    id: "TXN-48349",
    type: "Booking Payments",
    party: "Deepika Das",
    amount: 5200,
    currency: "AUD",
    date: "2025-07-10",
    status: "Completed",
  },
];

export function getFinanceOverview(): FinanceOverview {
  return {
    stats: {
      totalRevenue: { amount: 2890000, currency: "AUD", trend: "+24.3%" },
      monthlyRevenue: { amount: 4210000, currency: "AUD", trend: "+12.5%" },
      todayRevenue: { amount: 421000, currency: "AUD", trend: "+8.1%" },
    },
    commissionSettings: {
      platformCommissionPct: 15,
      homeVisitCommissionPct: 18,
      salonVisitCommissionPct: 12,
      minWithdrawal: 500,
      maxWithdrawal: 100000,
    },
    revenueSeries: {
      Daily: dailySeries,
      Weekly: weeklySeries,
      Monthly: monthlySeries,
      Yearly: yearlySeries,
    },
    transactions,
  };
}

export const PAYMENT_REPORT_TABS: PaymentReportTab[] = [
  "Booking Payments",
  "Refunds",
  "Commission",
  "Withdrawals",
  "Failed",
];

export const REVENUE_PERIODS: RevenuePeriod[] = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
];