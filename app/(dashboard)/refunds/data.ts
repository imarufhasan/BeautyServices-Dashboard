// Shape mirrors what a `/api/admin/refunds` endpoint would return.
// Swap `getRefundOverview()` for a real fetch() call when the API is ready.

export type RefundType = "Full" | "Partial" | "Wallet Credit";
export type RefundStatus = "Pending" | "Approved" | "Rejected" | "Processing";

export interface RefundRecord {
  refundId: string;
  bookingId: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  artist: string;
  originalAmount: number;
  refundAmount: number;
  currency: string;
  type: RefundType;
  status: RefundStatus;
  requestedDate: string;
}

export interface RefundOverview {
  stats: {
    pendingRefunds: number;
    approvedRefunds: { count: number; trend: string };
    rejectedRefunds: number;
    cancellationRequests: number;
    totalRefundValue: { amount: number; currency: string; trend: string };
    compensationRequests: number;
  };
  records: RefundRecord[];
}

const records: RefundRecord[] = [
  {
    refundId: "RF-2025-001",
    bookingId: "BK-2025-005",
    customer: { name: "Nisha Gupta", email: "nisha.g@email.com", initials: "NG" },
    artist: "Priya Nair",
    originalAmount: 6500,
    refundAmount: 5850,
    currency: "AUD",
    type: "Full",
    status: "Approved",
    requestedDate: "2025-07-08",
  },
  {
    refundId: "RF-2025-002",
    bookingId: "BK-2025-006",
    customer: { name: "Pooja Shah", email: "pooja.shah@email.com", initials: "PS" },
    artist: "Anita Sharma",
    originalAmount: 2400,
    refundAmount: 1200,
    currency: "AUD",
    type: "Partial",
    status: "Pending",
    requestedDate: "2025-07-09",
  },
  {
    refundId: "RF-2025-003",
    bookingId: "BK-2025-010",
    customer: { name: "Ananya Roy", email: "ananya.r@email.com", initials: "AR" },
    artist: "Priya Nair",
    originalAmount: 8000,
    refundAmount: 4000,
    currency: "AUD",
    type: "Partial",
    status: "Pending",
    requestedDate: "2025-07-11",
  },
  {
    refundId: "RF-2025-004",
    bookingId: "BK-2025-003",
    customer: { name: "Kavya Reddy", email: "kavya.r@email.com", initials: "KR" },
    artist: "Anita Sharma",
    originalAmount: 1800,
    refundAmount: 1800,
    currency: "AUD",
    type: "Wallet Credit",
    status: "Processing",
    requestedDate: "2025-07-07",
  },
  {
    refundId: "RF-2025-005",
    bookingId: "BK-2024-892",
    customer: { name: "Ishita Malhotra", email: "ishita.m@email.com", initials: "IM" },
    artist: "Rekha Kumar",
    originalAmount: 3500,
    refundAmount: 0,
    currency: "AUD",
    type: "Full",
    status: "Rejected",
    requestedDate: "2025-07-02",
  },
  {
    refundId: "RF-2025-006",
    bookingId: "BK-2024-901",
    customer: { name: "Vidya Krishnan", email: "vidya.k@email.com", initials: "VK" },
    artist: "Sofia Chen",
    originalAmount: 5500,
    refundAmount: 5500,
    currency: "AUD",
    type: "Full",
    status: "Approved",
    requestedDate: "2025-06-28",
  },
  {
    refundId: "RF-2025-007",
    bookingId: "BK-2024-888",
    customer: { name: "Pallavi Iyer", email: "pallavi.iyer@email.com", initials: "PI" },
    artist: "Anita Sharma",
    originalAmount: 2200,
    refundAmount: 1980,
    currency: "AUD",
    type: "Partial",
    status: "Approved",
    requestedDate: "2025-06-25",
  },
  {
    refundId: "RF-2025-008",
    bookingId: "BK-2024-876",
    customer: { name: "Shruti Agarwal", email: "shruti.a@email.com", initials: "SA" },
    artist: "Priya Nair",
    originalAmount: 4800,
    refundAmount: 3360,
    currency: "AUD",
    type: "Partial",
    status: "Rejected",
    requestedDate: "2025-06-20",
  },
];

export function getRefundOverview(): RefundOverview {
  const pendingRefunds = records.filter((r) => r.status === "Pending").length;
  const approvedRefunds = records.filter((r) => r.status === "Approved").length;
  const rejectedRefunds = records.filter((r) => r.status === "Rejected").length;
  const totalRefundValue = records.reduce((sum, r) => sum + r.refundAmount, 0);

  return {
    stats: {
      pendingRefunds,
      approvedRefunds: { count: approvedRefunds, trend: "+4" },
      rejectedRefunds,
      cancellationRequests: 8,
      totalRefundValue: { amount: totalRefundValue, currency: "AUD", trend: "+18%" },
      compensationRequests: 2,
    },
    records,
  };
}

export const REFUND_STATUS_FILTERS = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Processing",
] as const;

export const DATE_RANGE_FILTERS = ["Last 7 days", "This month", "Custom"] as const;