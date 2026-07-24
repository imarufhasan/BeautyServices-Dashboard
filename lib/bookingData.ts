
export type BookingService = {
  name: string;
  duration: string;
  price: number;
};

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Disputed";

  export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Refunded"
  | "Partial Refund";

export interface Booking {
  id: string;
  customer: string;
  email: string;
  initials: string;
  avatar?: string;

  artist: string;
  artistRole: string;

  service: string;
  category: string;
  categoryColor?: string;

  date: string;
  time: string;

  visitType: string;

  payment: PaymentStatus;

  status: BookingStatus;

  amount: number;

  location: string;
  createdDate: string;
  transactionId: string;
  travelFee: string;

  customerPhone: string;
  customerType: string;

  artistEmail: string;
  artistRating: number;
  artistReviews: number;

  paymentMethod: string;

  specialNotes?: string;

  services: BookingService[];
}

export const INITIAL_BOOKINGS = [
  {
    id: "BK-2025-001",
    customer: "Aria Patel",
    email: "aria.patel@email.com",
    initials: "AP",
    avatar: "bg-rose-100 text-rose-500",
    artist: "Sofia Chen",
    artistRole: "Bridal & Makeup",
    service: "Bridal Makeup",
    category: "Makeup",
    categoryColor: "text-fuchsia-500",
    date: "Jul 5, 2025",
    time: "10:00 AM",
    visitType: "Home",
    payment: "Paid",
    status: "Completed",
    amount: 4500,
    // ---- detail-page fields ----
    location: "Koramangala, Bangalore",
    createdDate: "Jun 30, 2025",
    transactionId: "TXN-7741205",
    travelFee: "AUD 150",
    customerPhone: "+91 98450 11223",
    customerType: "Premium Member",
    artistEmail: "sofia.chen@memillennial.com",
    artistRating: 4.8,
    artistReviews: 214,
    paymentMethod: "Razorpay · Card",
    specialNotes: "Bride requested waterproof makeup for outdoor ceremony.",
    services: [
      { name: "Bridal Makeup", duration: "3h", price: 3800 },
      { name: "Hair Styling Add-on", duration: "1h", price: 700 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-002",
    customer: "Meera Singh",
    email: "meera.singh@email.com",
    initials: "MS",
    avatar: "bg-sky-100 text-sky-500",
    artist: "Priya Nair",
    artistRole: "Hair & Extensions",
    service: "Hair Spa Treatment",
    category: "Hair",
    categoryColor: "text-violet-500",
    date: "Jul 6, 2025",
    time: "2:00 PM",
    visitType: "Salon",
    payment: "Pending",
    status: "Pending",
    amount: 2800,
    location: "Bandra Kurla Complex, Mumbai",
    createdDate: "Jul 1, 2025",
    transactionId: "—",
    travelFee: "—",
    customerPhone: "+91 99100 22345",
    customerType: "Premium Member",
    artistEmail: "priya.nair@memillennial.com",
    artistRating: 4.9,
    artistReviews: 127,
    paymentMethod: "Razorpay · UPI",
    specialNotes: "Regular client. Prefers organic products.",
    services: [
      { name: "Hair Spa", duration: "2h", price: 2000 },
      { name: "Deep Conditioning", duration: "45m", price: 800 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-003",
    customer: "Kavya Reddy",
    email: "kavya.reddy@email.com",
    initials: "KR",
    avatar: "bg-amber-100 text-amber-600",
    artist: "Anita Sharma",
    artistRole: "Nail Art Specialist",
    service: "Nail Art & Pedicure",
    category: "Nails",
    categoryColor: "text-pink-500",
    date: "Jul 6, 2025",
    time: "11:00 AM",
    visitType: "Home",
    payment: "Paid",
    status: "Confirmed",
    amount: 1800,
    location: "Jubilee Hills, Hyderabad",
    createdDate: "Jul 2, 2025",
    transactionId: "TXN-7741340",
    travelFee: "AUD 100",
    customerPhone: "+91 90000 33445",
    customerType: "Regular Member",
    artistEmail: "anita.sharma@memillennial.com",
    artistRating: 4.7,
    artistReviews: 98,
    paymentMethod: "Razorpay · UPI",
    specialNotes: "Customer allergic to acrylic — use gel only.",
    services: [
      { name: "Nail Art Design", duration: "1.5h", price: 1200 },
      { name: "Pedicure", duration: "1h", price: 600 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-004",
    customer: "Riya Jain",
    email: "riya.jain@email.com",
    initials: "RJ",
    avatar: "bg-rose-100 text-rose-500",
    artist: "Sofia Chen",
    artistRole: "Bridal & Makeup",
    service: "Party Makeup",
    category: "Makeup",
    categoryColor: "text-fuchsia-500",
    date: "Jul 7, 2025",
    time: "4:00 PM",
    visitType: "Salon",
    payment: "Paid",
    status: "In Progress",
    amount: 3200,
    location: "Sofia Chen Studio, Andheri West, Mumbai",
    createdDate: "Jul 3, 2025",
    transactionId: "TXN-7741522",
    travelFee: "—",
    customerPhone: "+91 98200 44556",
    customerType: "New Customer",
    artistEmail: "sofia.chen@memillennial.com",
    artistRating: 4.8,
    artistReviews: 214,
    paymentMethod: "Razorpay · Card",
    specialNotes: "First-time client, prefers natural glam look.",
    services: [
      { name: "Party Makeup", duration: "1.5h", price: 2600 },
      { name: "False Lashes Add-on", duration: "20m", price: 600 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-005",
    customer: "Nisha Gupta",
    email: "nisha.gupta@email.com",
    initials: "NG",
    avatar: "bg-emerald-100 text-emerald-600",
    artist: "Priya Nair",
    artistRole: "Hair & Extensions",
    service: "Keratin Treatment",
    category: "Hair",
    categoryColor: "text-violet-500",
    date: "Jul 8, 2025",
    time: "9:00 AM",
    visitType: "Home",
    payment: "Refunded",
    status: "Cancelled",
    amount: 6500,
    location: "Whitefield, Bangalore",
    createdDate: "Jul 4, 2025",
    transactionId: "TXN-7739981",
    travelFee: "AUD 200",
    customerPhone: "+91 97400 55667",
    customerType: "Premium Member",
    artistEmail: "priya.nair@memillennial.com",
    artistRating: 4.9,
    artistReviews: 127,
    paymentMethod: "Razorpay · UPI",
    specialNotes: "Cancelled by customer due to schedule conflict. Full refund issued.",
    services: [
      { name: "Keratin Treatment", duration: "3.5h", price: 5800 },
      { name: "Hair Mask Add-on", duration: "30m", price: 700 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-006",
    customer: "Pooja Shah",
    email: "pooja.shah@email.com",
    initials: "PS",
    avatar: "bg-indigo-100 text-indigo-500",
    artist: "Anita Sharma",
    artistRole: "Nail Art Specialist",
    service: "Manicure + Spa",
    category: "Nails",
    categoryColor: "text-pink-500",
    date: "Jul 8, 2025",
    time: "1:00 PM",
    visitType: "Salon",
    payment: "Partial Refund",
    status: "Disputed",
    amount: 2400,
    location: "Anita Sharma Nail Bar, Malad, Mumbai",
    createdDate: "Jul 5, 2025",
    transactionId: "TXN-7740116",
    travelFee: "—",
    customerPhone: "+91 96300 66778",
    customerType: "Regular Member",
    artistEmail: "anita.sharma@memillennial.com",
    artistRating: 4.7,
    artistReviews: 98,
    paymentMethod: "Razorpay · Card",
    specialNotes: "Customer disputed service quality — under review by support team.",
    services: [
      { name: "Manicure", duration: "1h", price: 1200 },
      { name: "Hand Spa", duration: "1h", price: 1200 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-007",
    customer: "Tanya Verma",
    email: "tanya.verma@email.com",
    initials: "TV",
    avatar: "bg-cyan-100 text-cyan-600",
    artist: "Rekha Kumar",
    artistRole: "Skincare & Facials",
    service: "Anti-Aging Facial + C",
    category: "Skincare",
    categoryColor: "text-teal-500",
    date: "Jul 9, 2025",
    time: "5:00 PM",
    visitType: "Home",
    payment: "Paid",
    status: "Completed",
    amount: 3800,
    location: "Indiranagar, Bangalore",
    createdDate: "Jul 6, 2025",
    transactionId: "TXN-7742007",
    travelFee: "AUD 150",
    customerPhone: "+91 95500 77889",
    customerType: "Premium Member",
    artistEmail: "rekha.kumar@memillennial.com",
    artistRating: 4.85,
    artistReviews: 176,
    paymentMethod: "Razorpay · Card",
    specialNotes: "Sensitive skin — patch test done prior.",
    services: [
      { name: "Anti-Aging Facial", duration: "1.5h", price: 2800 },
      { name: "Vitamin C Boost", duration: "30m", price: 1000 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-008",
    customer: "Simran Kaur",
    email: "simran.kaur@email.com",
    initials: "SK",
    avatar: "bg-rose-100 text-rose-500",
    artist: "Sofia Chen",
    artistRole: "Bridal & Makeup",
    service: "Engagement Makeup",
    category: "Makeup",
    categoryColor: "text-fuchsia-500",
    date: "Jul 10, 2025",
    time: "8:00 AM",
    visitType: "Home",
    payment: "Pending",
    status: "Pending",
    amount: 7500,
    location: "Vasant Vihar, New Delhi",
    createdDate: "Jul 7, 2025",
    transactionId: "—",
    travelFee: "AUD 250",
    customerPhone: "+91 99990 88990",
    customerType: "New Customer",
    artistEmail: "sofia.chen@memillennial.com",
    artistRating: 4.8,
    artistReviews: 214,
    paymentMethod: "—",
    specialNotes: "Client wants trial session before the event.",
    services: [
      { name: "Engagement Makeup", duration: "2.5h", price: 6200 },
      { name: "Hair Styling", duration: "1h", price: 1300 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-009",
    customer: "Deepika Das",
    email: "deepika.das@email.com",
    initials: "DD",
    avatar: "bg-lime-100 text-lime-600",
    artist: "Rekha Kumar",
    artistRole: "Skincare & Facials",
    service: "Hair Color + Highlight",
    category: "Hair",
    categoryColor: "text-violet-500",
    date: "Jul 10, 2025",
    time: "12:00 PM",
    visitType: "Salon",
    payment: "Paid",
    status: "Confirmed",
    amount: 5200,
    location: "Rekha Kumar Studio, Salt Lake, Kolkata",
    createdDate: "Jul 8, 2025",
    transactionId: "TXN-7742210",
    travelFee: "—",
    customerPhone: "+91 94320 99001",
    customerType: "Regular Member",
    artistEmail: "rekha.kumar@memillennial.com",
    artistRating: 4.85,
    artistReviews: 176,
    paymentMethod: "Razorpay · UPI",
    specialNotes: "Customer bringing reference photo for color match.",
    services: [
      { name: "Hair Color", duration: "2h", price: 3200 },
      { name: "Highlights", duration: "1.5h", price: 2000 },
    ] as BookingService[],
  },
  {
    id: "BK-2025-010",
    customer: "Ananya Roy",
    email: "ananya.roy@email.com",
    initials: "AR",
    avatar: "bg-orange-100 text-orange-500",
    artist: "Priya Nair",
    artistRole: "Hair & Extensions",
    service: "Bridal Mehndi",
    category: "Mehndi",
    categoryColor: "text-rose-500",
    date: "Jul 11, 2025",
    time: "10:00 AM",
    visitType: "Home",
    payment: "Partial Refund",
    status: "Disputed",
    amount: 8000,
    location: "Park Street, Kolkata",
    createdDate: "Jul 9, 2025",
    transactionId: "TXN-7738820",
    travelFee: "AUD 300",
    customerPhone: "+91 93100 12233",
    customerType: "Premium Member",
    artistEmail: "priya.nair@memillennial.com",
    artistRating: 4.9,
    artistReviews: 127,
    paymentMethod: "Razorpay · Card",
    specialNotes: "Dispute over design complexity vs. quoted price — escalated to support.",
    services: [
      { name: "Bridal Mehndi - Both Hands", duration: "4h", price: 6500 },
      { name: "Bridal Mehndi - Feet", duration: "1.5h", price: 1500 },
    ] as BookingService[],
  },
];