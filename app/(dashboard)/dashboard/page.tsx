import {
  Users,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  DollarSign,
  Activity,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { StatCard, TrendPoint } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { BookingChart } from "@/components/dashboard/booking-chart";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { PendingVerifications } from "@/components/dashboard/pending-verifications";

// Dummy "API response" shape for each stat's trend sparkline — 8 daily
// samples, as if returned by GET /api/dashboard/stats?range=8d
function trend(values: number[]): TrendPoint[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  return values.map((value, i) => ({ date: days[i % days.length], value }));
}

const STATS = [
  {
    icon: Users,
    iconBg: "#F4E9FC",
    iconColor: "#B57EDC",
    value: "24,832",
    label: "Total Users",
    change: "+12.4%",
    trend: "up" as const,
    sparklineColor: "#F4879B",
    sparkline: trend([40, 46, 42, 52, 58, 54, 66, 74]),
  },
  {
    icon: Sparkles,
    iconBg: "#DDF3E7",
    iconColor: "#2FA773",
    value: "3,241",
    label: "Total Artists",
    change: "+8.7%",
    trend: "up" as const,
    sparklineColor: "#2FA773",
    sparkline: trend([50, 44, 58, 52, 64, 60, 70, 68]),
  },
  {
    icon: ShieldCheck,
    iconBg: "#FBEBD6",
    iconColor: "#E8A33D",
    value: "23",
    label: "Pending Verify",
    change: "-5.2%",
    trend: "down" as const,
    sparklineColor: "#E8A33D",
    sparkline: trend([62, 70, 58, 66, 50, 56, 44, 40]),
  },
  {
    icon: CalendarCheck,
    iconBg: "#E1EAFB",
    iconColor: "#3E6FE0",
    value: "89,432",
    label: "Total Bookings",
    change: "+15.2%",
    trend: "up" as const,
    sparklineColor: "#2FA773",
    sparkline: trend([38, 48, 44, 56, 62, 58, 70, 78]),
  },
  {
    icon: DollarSign,
    iconBg: "#FBE2E9",
    iconColor: "#E0507F",
    value: "$8,420",
    label: "Total's Revenue",
    change: "+18.9%",
    trend: "up" as const,
    sparklineColor: "#F4879B",
    sparkline: trend([36, 42, 40, 50, 56, 60, 68, 80]),
  },
  {
    icon: Activity,
    iconBg: "#FBE2E2",
    iconColor: "#E5484D",
    value: "18,943",
    label: "Active Users",
    change: "+9.1%",
    trend: "up" as const,
    sparklineColor: "#F4879B",
    sparkline: trend([46, 40, 52, 48, 60, 56, 66, 72]),
  },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Topbar section="memillennial" page="Dashboard" />

      <main className="p-6 space-y-6">
        <div className="rounded-xl p-6 bg-gradient-to-r from-[#FDE0E9] via-[#FDEDE3] to-[#EAF7EF]">
          <p className="text-xl font-extrabold text-ink">
            Welcome back, Alex O&apos;Brien 👋
          </p>
          <p className="text-xs text-subtle mt-1">
            Platform overview for {today}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <RevenueChart />
          <BookingChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <RecentBookings />
          <PendingVerifications />
        </div>
      </main>
    </>
  );
}
