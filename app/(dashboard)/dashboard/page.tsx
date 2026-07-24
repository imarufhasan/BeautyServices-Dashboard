"use client";

import { useEffect, useState } from "react";
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
import Skeleton from "@/components/dashboard/Skeleton";

function trend(values: number[]): TrendPoint[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

  return values.map((value, i) => ({
    date: days[i % days.length],
    value,
  }));
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

function DashboardSkeleton() {
  return (
    <>
      {/* Welcome Card */}
      <Skeleton className="h-28 w-full rounded-xl" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Topbar section="memillennial" page="Dashboard" />

      <main className="space-y-6 p-6">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Welcome */}
            <div className="rounded-xl bg-linear-to-r from-[#FDE0E9] via-[#FDEDE3] to-[#EAF7EF] p-6">
              <p className="text-xl font-extrabold text-ink">
                Welcome back, Alex O&apos;Brien 👋
              </p>

              <p className="mt-1 text-xs text-subtle">
                Platform overview for {today}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <RevenueChart />
              <BookingChart />
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <RecentBookings />
              <PendingVerifications />
            </div>
          </>
        )}
      </main>
    </>
  );
}
