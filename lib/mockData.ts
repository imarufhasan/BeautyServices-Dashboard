// Simulates network latency so pages can show real loading/skeleton states
// and buttons can show a spinner before "succeeding". Swap this out for a
// real fetch()/RTK Query call when the API is ready.
export function fakeDelay<T>(data: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// ---------- Notifications ----------

export type NotificationChannel = "Push" | "SMS" | "Email" | "System Alert" | "Announcements";

export type AudienceOption = {
  key: "all" | "customers" | "artists" | "admins" | "verified" | "custom";
  label: string;
  count: number | null;
};

export const AUDIENCE_OPTIONS: AudienceOption[] = [
  { key: "all", label: "All Users", count: 24831 },
  { key: "customers", label: "Customers", count: 18204 },
  { key: "artists", label: "Artists", count: 6401 },
  { key: "admins", label: "Admins", count: 12 },
  { key: "verified", label: "Verified Artists", count: 4210 },
  { key: "custom", label: "Custom Audience", count: null },
];

export type SentNotification = {
  id: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  audience: string;
  reach: number;
  sentAt: string;
  status: "Sent" | "Scheduled" | "Draft";
};

export const RECENT_NOTIFICATIONS: SentNotification[] = [
  {
    id: "NTF-3391",
    title: "Weekend Glow Bundle",
    message: "Book a 3-service bundle this weekend and save 15%.",
    channel: "Push",
    audience: "All Users",
    reach: 24831,
    sentAt: "Jul 21, 2026 · 9:02 AM",
    status: "Sent",
  },
  {
    id: "NTF-3388",
    title: "New Artists in Brisbane",
    message: "12 newly verified artists just joined near you.",
    channel: "Email",
    audience: "Customers",
    reach: 18204,
    sentAt: "Jul 19, 2026 · 6:30 PM",
    status: "Sent",
  },
  {
    id: "NTF-3384",
    title: "Payout Schedule Update",
    message: "Payouts now process every Tuesday and Friday.",
    channel: "System Alert",
    audience: "Artists",
    reach: 6401,
    sentAt: "Jul 17, 2026 · 11:15 AM",
    status: "Sent",
  },
  {
    id: "NTF-3379",
    title: "Spring Refresh Promo",
    message: "20% off skin treatments, ends July 31.",
    channel: "Push",
    audience: "All Users",
    reach: 24831,
    sentAt: "Jul 26, 2026 · 8:00 AM",
    status: "Scheduled",
  },
];

// ---------- Review Moderation ----------

export type ReviewStatus = "Approved" | "Reported" | "Pending" | "Resolved";

export type Review = {
  id: string;
  customer: string;
  customerInitials: string;
  artist: string;
  rating: number;
  snippet: string;
  fullReview: string;
  reports: number | null;
  status: ReviewStatus;
  date: string;
  photos: number;
};

export const REVIEWS: Review[] = [
  {
    id: "REV-1029",
    customer: "Sarah Mitchell",
    customerInitials: "SM",
    artist: "Luna Beauty Studio",
    rating: 5,
    snippet: "Absolutely amazing",
    fullReview: "Absolutely amazing experience from start to finish, will be back every month.",
    reports: null,
    status: "Approved",
    date: "Jun 28, 2026",
    photos: 0,
  },
  {
    id: "REV-1028",
    customer: "Alex Thompson",
    customerInitials: "AT",
    artist: "Glow Studio by Mia",
    rating: 1,
    snippet: "Terrible service, artist...",
    fullReview: "Terrible service, artist was over an hour late and rushed the whole appointment.",
    reports: 8,
    status: "Reported",
    date: "Jun 27, 2026",
    photos: 1,
  },
  {
    id: "REV-1027",
    customer: "Priya Sharma",
    customerInitials: "PS",
    artist: "The Beauty Loft",
    rating: 4,
    snippet: "Great experience",
    fullReview:
      "Great experience overall. The facial was relaxing and my skin feels amazing afterward. Would visit again.",
    reports: null,
    status: "Approved",
    date: "Jun 26, 2026",
    photos: 2,
  },
  {
    id: "REV-1026",
    customer: "Jordan Lee",
    customerInitials: "JL",
    artist: "Luxe Nails & Spa",
    rating: 2,
    snippet: "Did not match the photos",
    fullReview: "Did not match the photos I sent as reference at all, quite disappointed.",
    reports: 5,
    status: "Reported",
    date: "Jun 25, 2026",
    photos: 3,
  },
  {
    id: "REV-1025",
    customer: "Emma Wilson",
    customerInitials: "EW",
    artist: "Artisan Brow Bar",
    rating: 5,
    snippet: "My brows look perfect!",
    fullReview: "My brows look perfect! Exactly the shape I've been chasing for years.",
    reports: null,
    status: "Approved",
    date: "Jun 24, 2026",
    photos: 1,
  },
  {
    id: "REV-1024",
    customer: "Marcus Davis",
    customerInitials: "MD",
    artist: "Serenity Massage",
    rating: 1,
    snippet: "SCAM ARTIST!! Do...",
    fullReview: "SCAM ARTIST!! Do not book, took my deposit and cancelled the day of with no refund.",
    reports: 12,
    status: "Reported",
    date: "Jun 23, 2026",
    photos: 0,
  },
  {
    id: "REV-1023",
    customer: "Olivia Chen",
    customerInitials: "OC",
    artist: "Bloom Beauty Bar",
    rating: 3,
    snippet: "Service was okay but not...",
    fullReview: "Service was okay but not worth the price point compared to other studios nearby.",
    reports: 1,
    status: "Pending",
    date: "Jun 22, 2026",
    photos: 0,
  },
];

export const REVIEW_STATS = {
  totalReviews: 4821,
  totalReviewsDelta: "+124 this week",
  pendingReports: 23,
  avgRating: 4.6,
};





// new
export type TicketPriority = "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "Pending" | "Escalated" | "Resolved";
export type TicketCategory =
  | "Payment"
  | "Technical"
  | "Booking"
  | "Verification"
  | "Refund"
  | "General";

export type ChatMessage = {
  id: string;
  from: "customer" | "admin";
  author: string;
  text: string;
  time: string;
};

export type Ticket = {
  id: string;
  requester: string;
  requesterInitials: string;
  requesterType: "Customer" | "Artist";
  priority: TicketPriority;
  title: string;
  category: TicketCategory;
  status: TicketStatus;
  date: string;
  assignedTo: string;
  createdDate: string;
  bookingRef: string | null;
  responseTime: string;
  messages: ChatMessage[];
};

export const SUPPORT_STATS = {
  open: 124,
  resolved: 2841,
  pending: 67,
  avgResponse: "1.4h",
};

export const TICKET_FILTERS = [
  "All",
  "Customers",
  "Artists",
  "Technical",
  "Payment",
  "Verification",
  "Booking",
  "Refund",
  "High Priority",
] as const;

export const TICKETS: Ticket[] = [
  {
    id: "TK-8821",
    requester: "Emma Williams",
    requesterInitials: "EW",
    requesterType: "Customer",
    priority: "High",
    title: "Payment charged but booking not confirmed",
    category: "Payment",
    status: "Open",
    date: "Dec 28, 2024",
    assignedTo: "Sarah M.",
    createdDate: "Dec 28, 2024",
    bookingRef: "BK-44821",
    responseTime: "1.2 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "Emma",
        text: "Hi, I was charged $85 for a booking but haven't received any confirmation email. The booking doesn't show in my account either.",
        time: "10:24 AM",
      },
    ],
  },
  {
    id: "TK-8820",
    requester: "James Okafor",
    requesterInitials: "JO",
    requesterType: "Artist",
    priority: "Medium",
    title: "Unable to upload portfolio photos",
    category: "Technical",
    status: "Pending",
    date: "Dec 28, 2024",
    assignedTo: "Sarah M.",
    createdDate: "Dec 28, 2024",
    bookingRef: null,
    responseTime: "3.5 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "James",
        text: "Every time I try to upload a photo to my portfolio it just spins forever and never finishes.",
        time: "9:02 AM",
      },
    ],
  },
  {
    id: "TK-8819",
    requester: "Priya Sharma",
    requesterInitials: "PS",
    requesterType: "Customer",
    priority: "High",
    title: "Artist cancelled 2 hours before appointment",
    category: "Booking",
    status: "Escalated",
    date: "Dec 27, 2024",
    assignedTo: "Marcus T.",
    createdDate: "Dec 27, 2024",
    bookingRef: "BK-44790",
    responseTime: "0.8 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "Priya",
        text: "My artist cancelled with barely 2 hours notice and I already had my venue booked. I'd like a full refund plus compensation.",
        time: "2:10 PM",
      },
    ],
  },
  {
    id: "TK-8817",
    requester: "Daniel Kim",
    requesterInitials: "DK",
    requesterType: "Customer",
    priority: "Low",
    title: "Question about referral credits",
    category: "General",
    status: "Open",
    date: "Dec 26, 2024",
    assignedTo: "Sarah M.",
    createdDate: "Dec 26, 2024",
    bookingRef: null,
    responseTime: "4.1 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "Daniel",
        text: "I referred two friends last month, when do the credits usually land in my wallet?",
        time: "11:45 AM",
      },
    ],
  },
  {
    id: "TK-8814",
    requester: "Sofia Alvarez",
    requesterInitials: "SA",
    requesterType: "Artist",
    priority: "Medium",
    title: "Refund dispute on cancelled booking",
    category: "Refund",
    status: "Pending",
    date: "Dec 25, 2024",
    assignedTo: "Marcus T.",
    createdDate: "Dec 25, 2024",
    bookingRef: "BK-44701",
    responseTime: "2.3 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "Sofia",
        text: "The customer cancelled after I'd already bought supplies. I don't think I should have to refund the full amount.",
        time: "4:30 PM",
      },
    ],
  },
  {
    id: "TK-8811",
    requester: "Michael Chen",
    requesterInitials: "MC",
    requesterType: "Artist",
    priority: "High",
    title: "Verification documents rejected without reason",
    category: "Verification",
    status: "Open",
    date: "Dec 24, 2024",
    assignedTo: "Sarah M.",
    createdDate: "Dec 24, 2024",
    bookingRef: null,
    responseTime: "1.9 hours",
    messages: [
      {
        id: "m1",
        from: "customer",
        author: "Michael",
        text: "My license upload got rejected but there's no note on why. I've resubmitted twice now.",
        time: "8:15 AM",
      },
    ],
  },
];

// ---------- Reports & Analytics ----------

export const USER_GROWTH: { month: string; newUsers: number; activeUsers: number }[] = [
  { month: "Jan", newUsers: 1180, activeUsers: 8400 },
  { month: "Feb", newUsers: 1340, activeUsers: 9120 },
  { month: "Mar", newUsers: 1290, activeUsers: 9840 },
  { month: "Apr", newUsers: 1510, activeUsers: 10600 },
  { month: "May", newUsers: 1620, activeUsers: 11480 },
  { month: "Jun", newUsers: 1780, activeUsers: 12390 },
  { month: "Jul", newUsers: 1690, activeUsers: 13210 },
  { month: "Aug", newUsers: 1840, activeUsers: 14080 },
  { month: "Sep", newUsers: 1920, activeUsers: 15040 },
  { month: "Oct", newUsers: 2050, activeUsers: 16210 },
  { month: "Nov", newUsers: 2210, activeUsers: 17480 },
  { month: "Dec", newUsers: 2380, activeUsers: 18920 },
];

export const BOOKING_ANALYTICS: { month: string; bookings: number }[] = [
  { month: "Jul", bookings: 4620 },
  { month: "Aug", bookings: 4980 },
  { month: "Sep", bookings: 5410 },
  { month: "Oct", bookings: 5890 },
  { month: "Nov", bookings: 6340 },
  { month: "Dec", bookings: 6920 },
];

export const REVENUE_ANALYTICS: {
  month: string;
  revenue: number;
  commission: number;
  profit: number;
}[] = [
  { month: "Jan", revenue: 198000, commission: 39600, profit: 24800 },
  { month: "Feb", revenue: 205000, commission: 41000, profit: 26200 },
  { month: "Mar", revenue: 214000, commission: 42800, profit: 27900 },
  { month: "Apr", revenue: 226000, commission: 45200, profit: 29600 },
  { month: "May", revenue: 241000, commission: 48200, profit: 31800 },
  { month: "Jun", revenue: 255000, commission: 51000, profit: 33900 },
  { month: "Jul", revenue: 251000, commission: 50200, profit: 32700 },
  { month: "Aug", revenue: 262000, commission: 52400, profit: 34500 },
  { month: "Sep", revenue: 279000, commission: 55800, profit: 37100 },
  { month: "Oct", revenue: 294000, commission: 58800, profit: 39400 },
  { month: "Nov", revenue: 308000, commission: 61600, profit: 41700 },
  { month: "Dec", revenue: 324000, commission: 64800, profit: 44200 },
];

export type TopArtist = {
  rank: number;
  name: string;
  initials: string;
  category: string;
  bookings: number;
  revenue: number;
  rating: number;
  growth: number;
};

export const TOP_ARTISTS: TopArtist[] = [
  { rank: 1, name: "Sophia Chen", initials: "SC", category: "Bridal Makeup", bookings: 284, revenue: 19248, rating: 4.97, growth: 24.3 },
  { rank: 2, name: "Amara Osei", initials: "AO", category: "Hair Styling", bookings: 261, revenue: 17420, rating: 4.94, growth: 18.7 },
  { rank: 3, name: "Valentina Ruiz", initials: "VR", category: "Nail Art", bookings: 249, revenue: 14940, rating: 4.92, growth: 15.2 },
  { rank: 4, name: "Priya Nair", initials: "PN", category: "Skincare", bookings: 238, revenue: 16660, rating: 4.91, growth: 12.8 },
  { rank: 5, name: "Aisha Mohammed", initials: "AM", category: "Eyelash Ext.", bookings: 224, revenue: 13440, rating: 4.89, growth: 9.4 },
  { rank: 6, name: "Clara Fontaine", initials: "CF", category: "Waxing", bookings: 218, revenue: 10900, rating: 4.87, growth: -2.1 },
  { rank: 7, name: "Mei Lin Zhang", initials: "ML", category: "Microblading", bookings: 196, revenue: 19600, rating: 4.96, growth: 21.5 },
];

export const CUSTOMER_RETENTION = {
  newCustomers: 28400,
  returning: 47200,
  repeatBookings: 31800,
  repeatRate: 74.2,
  avgIncomePerArtist: 284,
};

export type PopularService = {
  rank: number;
  name: string;
  bookings: number;
  revenue: number;
  growth: number;
  tag: string;
};

export const POPULAR_SERVICES: PopularService[] = [
  { rank: 1, name: "Bridal Makeup Package", bookings: 1842, revenue: 147360, growth: 28.4, tag: "Makeup" },
  { rank: 2, name: "Hair Color & Highlights", bookings: 1624, revenue: 121800, growth: 19.2, tag: "Hair" },
  { rank: 3, name: "Full Body Waxing", bookings: 1480, revenue: 88800, growth: 14.7, tag: "Waxing" },
  { rank: 4, name: "Classic Eyelash Extensions", bookings: 1298, revenue: 77880, growth: 22.1, tag: "Lashes" },
  { rank: 5, name: "Luxury Facial Treatment", bookings: 1124, revenue: 89920, growth: 31.6, tag: "Skincare" },
];

export type CityStat = { city: string; bookings: number; revenue: number };

export const LOCATION_ANALYTICS: CityStat[] = [
  { city: "New York, NY", bookings: 8421, revenue: 62840 },
  { city: "Los Angeles, CA", bookings: 7184, revenue: 54120 },
  { city: "Chicago, IL", bookings: 5920, revenue: 41480 },
  { city: "Houston, TX", bookings: 4812, revenue: 34960 },
  { city: "Miami, FL", bookings: 4248, revenue: 31480 },
  { city: "Atlanta, GA", bookings: 3840, revenue: 27920 },
];

// ---------- Policy Pages ----------

export type PolicyKey =
  | "faq"
  | "terms"
  | "privacy"
  | "cancellation"
  | "refund"
  | "community"
  | "safety"
  | "incident";

export type VersionEntry = {
  version: string;
  current: boolean;
  author: string;
  date: string;
  note: string;
  restorable: boolean;
};

export type PolicyDoc = {
  key: PolicyKey;
  label: string;
  version: string;
  lastUpdated: string;
  wordCount: number;
  sections: string[];
  hasVersionHistory: boolean;
  hasViewportToggle: boolean;
  body: string;
  status: "Published" | "Draft" | "Scheduled";
  history: VersionEntry[];
};

export const POLICY_NAV: { key: PolicyKey; label: string }[] = [
  { key: "faq", label: "FAQ" },
  { key: "terms", label: "Terms & Conditions" },
  { key: "privacy", label: "Privacy Policy" },
  { key: "cancellation", label: "Cancellation Policy" },
  { key: "refund", label: "Refund Policy" },
  { key: "community", label: "Community Guidelines" },
  { key: "safety", label: "Safety Policy" },
  { key: "incident", label: "Incident Report" },
];

const DEFAULT_SECTIONS = [
  "Introduction",
  "Services",
  "User Accounts",
  "Booking Policy",
  "Artist Verification",
  "Disputes & Refunds",
];

export const POLICY_DOCS: Record<PolicyKey, PolicyDoc> = {
  faq: {
    key: "faq",
    label: "FAQ",
    version: "2.4",
    lastUpdated: "Dec 20, 2024",
    wordCount: 2841,
    sections: DEFAULT_SECTIONS,
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Published",
    body: "",
    history: [],
  },
  terms: {
    key: "terms",
    label: "Terms & Conditions",
    version: "2.4",
    lastUpdated: "Dec 20, 2024",
    wordCount: 2841,
    sections: DEFAULT_SECTIONS,
    hasVersionHistory: true,
    hasViewportToggle: true,
    status: "Published",
    body: "These Terms & Conditions govern the use of the memillennial platform, including bookings made between customers and independent beauty artists. By creating an account you agree to abide by our booking, cancellation and dispute-resolution processes outlined below.",
    history: [
      {
        version: "v2.4",
        current: true,
        author: "Sarah Mitchell",
        date: "Dec 20, 2024",
        note: "Updated cancellation policy section, clarified refund timelines",
        restorable: false,
      },
      {
        version: "v2.3",
        current: false,
        author: "Alex Rodriguez",
        date: "Nov 15, 2024",
        note: "Added GDPR data retention clause, updated contact information",
        restorable: true,
      },
      {
        version: "v2.2",
        current: false,
        author: "Sarah Mitchell",
        date: "Oct 02, 2024",
        note: "Revised artist verification requirements section",
        restorable: true,
      },
    ],
  },
  privacy: {
    key: "privacy",
    label: "Privacy Policy",
    version: "2.4",
    lastUpdated: "Dec 20, 2024",
    wordCount: 2841,
    sections: DEFAULT_SECTIONS,
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Published",
    body: "We collect only the information needed to connect customers with beauty artists and process bookings securely — including contact details, payment information, and booking history. We never sell personal data to third parties.",
    history: [],
  },
  cancellation: {
    key: "cancellation",
    label: "Cancellation Policy",
    version: "1.8",
    lastUpdated: "Dec 12, 2024",
    wordCount: 1204,
    sections: ["Introduction", "Customer Cancellations", "Artist Cancellations", "Refund Windows", "No-Show Policy"],
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Published",
    body: "Customers may cancel a booking free of charge up to 24 hours before the scheduled appointment. Cancellations within 24 hours are subject to a 50% service charge. Artists who cancel with less than 12 hours notice forfeit their booking fee.",
    history: [],
  },
  refund: {
    key: "refund",
    label: "Refund Policy",
    version: "1.6",
    lastUpdated: "Dec 08, 2024",
    wordCount: 986,
    sections: ["Introduction", "Eligible Refunds", "Processing Time", "Disputed Charges"],
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Published",
    body: "Refunds for eligible cancellations are processed back to the original payment method within 5-7 business days. Disputed charges are reviewed by our support team within 48 hours of being reported.",
    history: [],
  },
  community: {
    key: "community",
    label: "Community Guidelines",
    version: "1.3",
    lastUpdated: "Nov 28, 2024",
    wordCount: 1520,
    sections: ["Introduction", "Respectful Conduct", "Content Standards", "Reporting Violations"],
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Draft",
    body: "memillennial is built on mutual respect between customers and artists. Harassment, discrimination, or abusive language toward another user will result in account review and possible suspension.",
    history: [],
  },
  safety: {
    key: "safety",
    label: "Safety Policy",
    version: "1.1",
    lastUpdated: "Nov 10, 2024",
    wordCount: 1340,
    sections: ["Introduction", "Hygiene Standards", "Location Safety", "Emergency Procedures"],
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Published",
    body: "All verified artists must adhere to platform hygiene and sanitation standards. Customers can report unsafe conditions directly from the booking detail screen at any time.",
    history: [],
  },
  incident: {
    key: "incident",
    label: "Incident Report",
    version: "1.0",
    lastUpdated: "Oct 22, 2024",
    wordCount: 640,
    sections: ["Introduction", "How to Report", "Investigation Process", "Resolution"],
    hasVersionHistory: false,
    hasViewportToggle: false,
    status: "Draft",
    body: "Incidents involving safety, payment disputes, or policy violations can be reported through the Support Center. Our trust & safety team reviews all reports within 24 hours.",
    history: [],
  },
};

export type FaqStatus = "Published" | "Draft";

export type FaqItem = {
  id: string;
  question: string;
  answerPreview: string;
  category: string;
  status: FaqStatus;
  lastUpdated: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "FAQ-041",
    question: "How do I book an artist for a wedding?",
    answerPreview: "Navigate to Services, select Bridal Makeup, then choose an available artist near you and pick a date.",
    category: "Bookings",
    status: "Published",
    lastUpdated: "Dec 20, 2024",
  },
  {
    id: "FAQ-040",
    question: "What is the cancellation policy?",
    answerPreview: "Cancellations made 48 hours before the appointment are fully refundable, minus the platform fee.",
    category: "Policy",
    status: "Published",
    lastUpdated: "Dec 18, 2024",
  },
  {
    id: "FAQ-039",
    question: "How long does artist verification take?",
    answerPreview: "Artist verification typically takes 2-3 business days once ID and portfolio documents are submitted.",
    category: "Artists",
    status: "Published",
    lastUpdated: "Dec 15, 2024",
  },
  {
    id: "FAQ-038",
    question: "Can I request a refund for a completed service?",
    answerPreview: "Refunds for completed services are only issued if the service materially differed from what was booked.",
    category: "Payments",
    status: "Draft",
    lastUpdated: "Dec 12, 2024",
  },
  {
    id: "FAQ-037",
    question: "How does the rating and review system work?",
    answerPreview: "After each completed booking, both the customer and artist are invited to leave a rating and review.",
    category: "General",
    status: "Published",
    lastUpdated: "Dec 10, 2024",
  },
];