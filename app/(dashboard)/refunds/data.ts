// Shape mirrors what `/api/admin/refunds` (list) and
// `/api/admin/refunds/:id` (detail) would return.
// Swap `getRefundOverview()` / `getRefundDetail()` for real fetch() calls
// when the API is ready — every consumer only depends on these two functions.

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
    customer: {
      name: "Nisha Gupta",
      email: "nisha.g@email.com",
      initials: "NG",
    },
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
    customer: {
      name: "Pooja Shah",
      email: "pooja.shah@email.com",
      initials: "PS",
    },
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
    customer: {
      name: "Ananya Roy",
      email: "ananya.r@email.com",
      initials: "AR",
    },
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
    customer: {
      name: "Kavya Reddy",
      email: "kavya.r@email.com",
      initials: "KR",
    },
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
    customer: {
      name: "Ishita Malhotra",
      email: "ishita.m@email.com",
      initials: "IM",
    },
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
    customer: {
      name: "Vidya Krishnan",
      email: "vidya.k@email.com",
      initials: "VK",
    },
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
    customer: {
      name: "Pallavi Iyer",
      email: "pallavi.iyer@email.com",
      initials: "PI",
    },
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
    customer: {
      name: "Shruti Agarwal",
      email: "shruti.a@email.com",
      initials: "SA",
    },
    artist: "Priya Nair",
    originalAmount: 4800,
    refundAmount: 3360,
    currency: "AUD",
    type: "Partial",
    status: "Rejected",
    requestedDate: "2025-06-20",
  },
  {
    refundId: "RF-2025-009",
    bookingId: "BK-2025-012",
    customer: {
      name: "Meera Patel",
      email: "meera.p@email.com",
      initials: "MP",
    },
    artist: "Sofia Chen",
    originalAmount: 4200,
    refundAmount: 4200,
    currency: "AUD",
    type: "Full",
    status: "Approved",
    requestedDate: "2025-07-15",
  },
  {
    refundId: "RF-2025-010",
    bookingId: "BK-2025-013",
    customer: {
      name: "Riya Sharma",
      email: "riya.s@email.com",
      initials: "RS",
    },
    artist: "Priya Nair",
    originalAmount: 3000,
    refundAmount: 1500,
    currency: "AUD",
    type: "Partial",
    status: "Pending",
    requestedDate: "2025-07-16",
  },
  {
    refundId: "RF-2025-011",
    bookingId: "BK-2025-014",
    customer: {
      name: "Aarav Singh",
      email: "aarav.s@email.com",
      initials: "AS",
    },
    artist: "Anita Sharma",
    originalAmount: 7200,
    refundAmount: 7200,
    currency: "AUD",
    type: "Full",
    status: "Processing",
    requestedDate: "2025-07-17",
  },
  {
    refundId: "RF-2025-012",
    bookingId: "BK-2025-015",
    customer: {
      name: "Simran Kaur",
      email: "simran.k@email.com",
      initials: "SK",
    },
    artist: "Rekha Kumar",
    originalAmount: 2500,
    refundAmount: 0,
    currency: "AUD",
    type: "Full",
    status: "Rejected",
    requestedDate: "2025-07-18",
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
      totalRefundValue: {
        amount: totalRefundValue,
        currency: "AUD",
        trend: "+18%",
      },
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

export const DATE_RANGE_FILTERS = [
  "Last 7 days",
  "This month",
  "Custom",
] as const;

/* -------------------------------------------------------------------------- */
/*  Refund Details (single record)                                            */
/* -------------------------------------------------------------------------- */

export interface RefundDetail extends RefundRecord {
  customerDetail: {
    verified: boolean;
    phone: string;
    bookingDate: string;
    paymentMethod: string;
    transactionId: string;
  };
  artistDetail: {
    initials: string;
    verified: boolean;
    businessName: string;
    serviceCategory: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
  };
  bookingSummary: {
    items: { label: string; amount: number }[];
    finalRefundAmount: number;
    paymentStatus: "Paid" | "Pending" | "Failed" | "Wallet Credited";
  };
  cancellation: {
    cancelledBy: string;
    cancellationDate: string;
    cancellationTime: string;
    refundPolicyApplied: string;
  };
  timeline: {
    label: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
}

// --- tiny deterministic "random" helpers so the same refundId always
//     produces the same detail data, without needing a real backend yet. ---
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(items: T[], seed: string): T {
  return items[hashSeed(seed) % items.length];
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const BUSINESS_NAMES = [
  "Lee Artistry Studio",
  "Glow House Beauty",
  "Luxe Nails & Spa",
  "Bloom Beauty Bar",
  "Studio Radiance",
  "Velvet Beauty Lounge",
  "Aura Aesthetics",
  "Petal & Polish",
];

const SERVICE_BY_TYPE: Record<RefundType, string[]> = {
  Full: ["Premium Hair Styling", "Bridal Makeup Package", "Full Makeover"],
  Partial: ["Facial Treatment", "Hair Styling", "Manicure & Pedicure"],
  "Wallet Credit": ["Express Facial", "Touch-up Makeup", "Blow Dry & Style"],
};

const SERVICE_CATEGORIES = [
  "Beauty & Wellness",
  "Hair & Styling",
  "Skincare & Facials",
  "Nail Care",
];

const APPOINTMENT_TIMES = [
  "10:00 AM — 12:00 PM",
  "2:00 PM — 4:00 PM",
  "11:00 AM — 1:00 PM",
  "3:00 PM — 5:00 PM",
];

const PAYMENT_METHODS = [
  "Visa ···4242",
  "Mastercard ···8831",
  "Visa ···1123",
  "Amex ···3005",
];

const CANCELLED_BY_OPTIONS = [
  "Customer",
  "Customer",
  "Customer",
  "Artist",
  "Support Team",
];

const REFUND_POLICY_BY_TYPE: Record<RefundType, string> = {
  Full: "48-Hour Cancellation Policy",
  Partial: "24-Hour Cancellation Policy",
  "Wallet Credit": "Wallet Credit Policy",
};

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildTimeline(
  record: RefundRecord,
  bookingDate: string,
  cancellationDate: string,
) {
  const isWallet = record.type === "Wallet Credit";
  const refundStepLabel = isWallet
    ? "Wallet Credit Issued"
    : "Refund Initiated";
  const finalStepLabel =
    record.status === "Rejected" ? "Refund Rejected" : "Refund Completed";

  return [
    {
      label: "Booking Created",
      date: formatShortDate(bookingDate),
      time: "09:14 AM",
      completed: true,
    },
    {
      label: "Payment Completed",
      date: formatShortDate(bookingDate),
      time: "09:16 AM",
      completed: true,
    },
    {
      label: "Appointment Confirmed",
      date: formatShortDate(addDays(bookingDate, 1)),
      time: "10:00 AM",
      completed: true,
    },
    {
      label: "Cancellation Requested",
      date: formatShortDate(cancellationDate),
      time: "02:30 PM",
      completed: true,
    },
    {
      label: refundStepLabel,
      date: formatShortDate(record.requestedDate),
      time: "03:00 PM",
      completed: record.status !== "Pending",
    },
    {
      label: finalStepLabel,
      date:
        record.status === "Approved"
          ? formatShortDate(addDays(record.requestedDate, 1))
          : "—",
      time: record.status === "Approved" ? "11:00 AM" : "—",
      completed: record.status === "Approved" || record.status === "Rejected",
    },
  ];
}

export function getRefundDetail(refundId: string): RefundDetail | undefined {
  const record = records.find((r) => r.refundId === refundId);
  if (!record) return undefined;

  const bookingDate = addDays(record.requestedDate, -3);
  const cancellationDate = addDays(record.requestedDate, -1);
  const travelFee = pick([15, 20, 25, 30, 0], record.refundId + "fee");

  const paymentStatus: RefundDetail["bookingSummary"]["paymentStatus"] =
    record.type === "Wallet Credit"
      ? "Wallet Credited"
      : record.status === "Approved" || record.status === "Processing"
        ? "Paid"
        : record.status === "Rejected"
          ? "Failed"
          : "Pending";

  return {
    ...record,
    customerDetail: {
      verified: true,
      phone: `+1 (555) ${100 + (hashSeed(record.refundId) % 800)}-${1000 + (hashSeed(record.refundId + "p") % 9000)}`,
      bookingDate,
      paymentMethod: pick(PAYMENT_METHODS, record.refundId + "pm"),
      transactionId:
        `txn_${hashSeed(record.bookingId).toString(36)}${hashSeed(record.refundId).toString(36)}`
          .slice(0, 18)
          .toUpperCase(),
    },
    artistDetail: {
      initials: initialsOf(record.artist),
      verified: true,
      businessName: pick(BUSINESS_NAMES, record.artist),
      serviceCategory: pick(SERVICE_CATEGORIES, record.artist + "cat"),
      serviceName: pick(SERVICE_BY_TYPE[record.type], record.refundId + "svc"),
      appointmentDate: formatLongDate(record.requestedDate),
      appointmentTime: pick(APPOINTMENT_TIMES, record.refundId + "time"),
    },
    bookingSummary: {
      items: [
        {
          label: "Advance Booking Amount",
          amount: record.originalAmount - travelFee,
        },
        { label: "Travel Fee", amount: travelFee },
      ],
      finalRefundAmount: record.refundAmount,
      paymentStatus,
    },
    cancellation: {
      cancelledBy: pick(CANCELLED_BY_OPTIONS, record.refundId + "who"),
      cancellationDate: formatLongDate(cancellationDate),
      cancellationTime: "2:30 PM PST",
      refundPolicyApplied: REFUND_POLICY_BY_TYPE[record.type],
    },
    timeline: buildTimeline(record, bookingDate, cancellationDate),
  };
}
