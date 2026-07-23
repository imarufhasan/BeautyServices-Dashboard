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