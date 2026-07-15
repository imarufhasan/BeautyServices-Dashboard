"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Shape mirrors what a real /api/analytics/revenue endpoint would return:
// an array of period buckets, each with a raw cents value, a bookings count,
// and a pre-formatted label so the UI doesn't have to reformat dates itself.
type RevenuePoint = {
  period: string; // ISO-ish bucket key, e.g. "2026-01"
  label: string; // display label for the axis
  revenueCents: number; // amounts in cents, like money typically comes back from an API
  bookings: number;
};

interface RevenueApiResponse {
  currency: string;
  granularity: "daily" | "weekly" | "monthly" | "yearly";
  generatedAt: string;
  data: RevenuePoint[];
}

// Simulated API response payload (dummy data standing in for a real fetch)
const MOCK_RESPONSE: RevenueApiResponse = {
  currency: "USD",
  granularity: "monthly",
  generatedAt: "2026-07-15T09:12:03Z",
  data: [
    {
      period: "2026-01",
      label: "Jan",
      revenueCents: 15_420_000,
      bookings: 1180,
    },
    {
      period: "2026-02",
      label: "Feb",
      revenueCents: 17_830_000,
      bookings: 1340,
    },
    {
      period: "2026-03",
      label: "Mar",
      revenueCents: 19_960_000,
      bookings: 1510,
    },
    {
      period: "2026-04",
      label: "Apr",
      revenueCents: 18_640_000,
      bookings: 1460,
    },
    {
      period: "2026-05",
      label: "May",
      revenueCents: 23_910_000,
      bookings: 2020,
    },
    {
      period: "2026-06",
      label: "Jun",
      revenueCents: 25_270_000,
      bookings: 2210,
    },
    {
      period: "2026-07",
      label: "Jul",
      revenueCents: 24_580_000,
      bookings: 2150,
    },
    {
      period: "2026-08",
      label: "Aug",
      revenueCents: 27_340_000,
      bookings: 2480,
    },
    {
      period: "2026-09",
      label: "Sep",
      revenueCents: 29_880_000,
      bookings: 2790,
    },
    {
      period: "2026-10",
      label: "Oct",
      revenueCents: 27_950_000,
      bookings: 2640,
    },
    {
      period: "2026-11",
      label: "Nov",
      revenueCents: 29_410_000,
      bookings: 2810,
    },
    {
      period: "2026-12",
      label: "Dec",
      revenueCents: 28_760_000,
      bookings: 2700,
    },
  ],
};

// Normalize cents -> dollars once, the way you'd map a real API response
// before handing it to the chart.
function toChartData(res: RevenueApiResponse) {
  return res.data.map((d) => ({
    month: d.label,
    revenue: d.revenueCents / 100,
    bookings: d.bookings,
  }));
}

const PERIODS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export function RevenueChart() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Monthly");
  const chartData = toChartData(MOCK_RESPONSE);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Platform revenue &amp; bookings over time
          </CardDescription>
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors",
                period === p
                  ? "bg-white text-ink shadow-sm"
                  : "text-subtle hover:text-ink",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {/* Explicit inline minHeight guards against ResponsiveContainer
            collapsing to 0px if the arbitrary Tailwind height class ever
            gets purged/not generated for this file path. */}
        <div className="h-[260px]" style={{ minHeight: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: -10, right: 10, top: 10 }}
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2FA773" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2FA773" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#EFEAF3"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8590" }}
              />
              <YAxis
                yAxisId="revenue"
                tickFormatter={(v) => `$${v / 1000}k`}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8590" }}
              />
              <YAxis
                yAxisId="bookings"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8590" }}
              />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === "revenue"
                    ? [`$${value.toLocaleString()}`, "Revenue"]
                    : [value.toLocaleString(), "Bookings"]
                }
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #EFEAF3",
                  fontSize: 12,
                }}
              />
              {/* Bound to the right axis so it actually scales (0 -> ~3800),
                  drawn invisible since Figma only shows the green revenue
                  line — the right axis exists purely as a reference scale
                  for bookings volume. */}
              <Area
                yAxisId="bookings"
                type="monotone"
                dataKey="bookings"
                stroke="transparent"
                fill="transparent"
                isAnimationActive={false}
              />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#2FA773"
                strokeWidth={2.5}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
