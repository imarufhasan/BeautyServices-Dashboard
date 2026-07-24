"use client";

import { useEffect, useState } from "react";
import { MapPin, ChevronRight, Star } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  USER_GROWTH,
  BOOKING_ANALYTICS,
  REVENUE_ANALYTICS,
  TOP_ARTISTS,
  CUSTOMER_RETENTION,
  POPULAR_SERVICES,
  LOCATION_ANALYTICS,
  fakeDelay,
} from "@/lib/mockData";
import Skeleton from "@/components/dashboard/Skeleton";
import { Topbar } from "@/components/layout/topbar";

const PERIODS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

const RETENTION_COLORS = ["#fbbf24", "#a855f7", "#ec4899"];

function fmtMoney(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function ReportsAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Monthly");

  useEffect(() => {
    let mounted = true;
    fakeDelay(true, 1150).then(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // const retentionTotal =
  //   CUSTOMER_RETENTION.newCustomers +
  //   CUSTOMER_RETENTION.returning +
  //   CUSTOMER_RETENTION.repeatBookings;
  const retentionData = [
    { name: "New Customers", value: CUSTOMER_RETENTION.newCustomers },
    { name: "Returning", value: CUSTOMER_RETENTION.returning },
    { name: "Repeat Bookings", value: CUSTOMER_RETENTION.repeatBookings },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* <Sidebar active="Reports" /> */}

      <div className="flex-1">
        <Topbar section="memillennial" page="Reports" />

        <main className="space-y-6 p-8">
          <div>
            <h1 className="text-[26px] font-semibold text-gray-900">
              Reports &amp; Analytics
            </h1>
            <p className="mt-1 text-[14px] text-gray-400">
              Comprehensive platform performance insights · December 2024
            </p>
          </div>

          {/* Row 1: User Growth + Booking Analytics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[16px] font-semibold text-gray-900">
                    User Growth
                  </h2>
                  <p className="text-[12.5px] text-gray-400">
                    New registrations vs active users
                  </p>
                </div>
                {loading ? (
                  <Skeleton className="h-8 w-56 rounded-full" />
                ) : (
                  <div className="flex gap-1 rounded-full bg-gray-50 p-1">
                    {PERIODS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                          period === p
                            ? "bg-linear-to-r from-pink-500 to-orange-400 text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 h-64">
                {loading ? (
                  <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={USER_GROWTH}
                      margin={{ left: -12, right: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#F1F1F1"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #F1F1F1",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="newUsers"
                        name="New Users"
                        stroke="#f472b6"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="activeUsers"
                        name="Active Users"
                        stroke="#2dd4bf"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              {!loading && (
                <div className="mt-3 flex items-center justify-center gap-5 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-pink-400" /> New
                    Users
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-400" /> Active
                    Users
                  </span>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Booking Analytics
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Status breakdown · last 6 months
              </p>
              <div className="mt-4 h-64">
                {loading ? (
                  <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={BOOKING_ANALYTICS}
                      margin={{ left: -12, right: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#F1F1F1"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #F1F1F1",
                          fontSize: 12,
                        }}
                      />
                      <Bar
                        dataKey="bookings"
                        name="Bookings"
                        fill="#fb923c"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={36}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>
          </div>

          {/* Row 2: Revenue Analytics */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-gray-900">
                  Revenue Analytics
                </h2>
                <p className="text-[12.5px] text-gray-400">
                  Annual revenue, commission &amp; profit performance
                </p>
              </div>
              {!loading && (
                <div className="flex items-center gap-4 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-pink-400" />{" "}
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />{" "}
                    Commission
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />{" "}
                    Profit
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 h-72">
              {loading ? (
                <Skeleton className="h-full w-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={REVENUE_ANALYTICS}
                    margin={{ left: -12, right: 8 }}
                  >
                    <defs>
                      <linearGradient
                        id="profitFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a855f7"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="#a855f7"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#F1F1F1"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `$${v / 1000}k`}
                      tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      // formatter={(v: number) => fmtMoney(v)}
                      formatter={(value) => fmtMoney(Number(value ?? 0))}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #F1F1F1",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#a855f7"
                      strokeWidth={2}
                      fill="url(#profitFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          {/* Row 3: Top Artists + Customer Retention */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Top Artists
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Performance ranking · December 2024
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="text-[11px] font-semibold tracking-wide text-gray-400">
                      <th className="pb-3 pr-3"></th>
                      <th className="pb-3 pr-3">ARTIST</th>
                      <th className="pb-3 pr-3">CATEGORY</th>
                      <th className="pb-3 pr-3">BOOKINGS</th>
                      <th className="pb-3 pr-3">REVENUE</th>
                      <th className="pb-3 pr-3">RATING</th>
                      <th className="pb-3 pr-3">GROWTH</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from({ length: 7 }).map((_, i) => (
                          <tr key={i}>
                            <td colSpan={8} className="py-2.5">
                              <Skeleton className="h-9 w-full rounded-lg" />
                            </td>
                          </tr>
                        ))
                      : TOP_ARTISTS.map((a) => (
                          <tr key={a.rank} className="border-t border-gray-50">
                            <td className="py-3 pr-3 text-gray-400">
                              {a.rank}
                            </td>
                            <td className="py-3 pr-3">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-pink-400 to-orange-300 text-[10px] font-semibold text-white">
                                  {a.initials}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {a.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-3 text-gray-500">
                              {a.category}
                            </td>
                            <td className="py-3 pr-3 text-gray-700">
                              {a.bookings}
                            </td>
                            <td className="py-3 pr-3 text-gray-700">
                              {fmtMoney(a.revenue)}
                            </td>
                            <td className="py-3 pr-3">
                              <span className="flex items-center gap-1 text-gray-700">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {a.rating}
                              </span>
                            </td>
                            <td
                              className={`py-3 pr-3 font-medium ${a.growth >= 0 ? "text-emerald-500" : "text-red-500"}`}
                            >
                              {a.growth >= 0 ? "+" : ""}
                              {a.growth}%
                            </td>
                            <td className="py-3">
                              <button className="rounded-full border border-gray-200 px-3 py-1 text-[11.5px] font-medium text-gray-600 hover:bg-gray-50">
                                Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Customer Retention
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Booking behavior breakdown
              </p>

              <div className="mt-4 flex items-center justify-center">
                {loading ? (
                  <Skeleton className="h-40 w-40 rounded-full" />
                ) : (
                  <div className="h-44 w-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={retentionData}
                          dataKey="value"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={2}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {retentionData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={RETENTION_COLORS[i]}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          // formatter={(v: number) => v.toLocaleString()}
                          formatter={(value) => fmtMoney(Number(value ?? 0))}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #F1F1F1",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {!loading && (
                <div className="mt-2 space-y-2">
                  {retentionData.map((d, i) => (
                    <div
                      key={d.name}
                      className="flex items-center justify-between text-[12.5px]"
                    >
                      <span className="flex items-center gap-2 text-gray-600">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: RETENTION_COLORS[i] }}
                        />
                        {d.name}
                      </span>
                      <span className="font-medium text-gray-900">
                        {d.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                {loading ? (
                  <>
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </>
                ) : (
                  <>
                    <div className="rounded-xl bg-red-50 p-3 text-center">
                      <p className="text-[18px] font-semibold text-red-500">
                        {CUSTOMER_RETENTION.repeatRate}%
                      </p>
                      <p className="text-[11px] text-red-400">Repeat Rate</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3 text-center">
                      <p className="text-[18px] font-semibold text-emerald-600">
                        {fmtMoney(CUSTOMER_RETENTION.avgIncomePerArtist)}
                      </p>
                      <p className="text-[11px] text-emerald-500">
                        Avg income per Artist
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Row 4: Popular Services + Location Analytics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-gray-900">
                  Popular Services
                </h2>
                <button className="flex items-center gap-1 text-[12.5px] font-medium text-pink-500 hover:underline">
                  See All
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-xl" />
                    ))
                  : POPULAR_SERVICES.map((s) => (
                      <div
                        key={s.rank}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-pink-400 to-orange-300 text-[13px] font-semibold text-white">
                            {s.rank}
                          </span>
                          <div>
                            <p className="text-[13.5px] font-medium text-gray-900">
                              {s.name}
                            </p>
                            <p className="text-[12px] text-gray-400">
                              {s.bookings.toLocaleString()} bookings ·{" "}
                              {fmtMoney(s.revenue)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-semibold text-emerald-500">
                            +{s.growth}%
                          </p>
                          <p className="text-[11px] text-gray-400">{s.tag}</p>
                        </div>
                      </div>
                    ))}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">
                Location Analytics
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Top cities · service areas · highest revenue locations
              </p>

              {loading ? (
                <Skeleton className="mt-4 h-24 w-full rounded-xl" />
              ) : (
                <div className="relative mt-4 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-pink-50 to-orange-50 text-[13px] text-gray-400">
                  <MapPin className="mr-2 h-4 w-4 text-pink-300" />
                  United States — Interactive Map
                </div>
              )}

              <div className="mt-4 grid grid-cols-3 gap-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))
                  : LOCATION_ANALYTICS.map((c) => (
                      <div
                        key={c.city}
                        className="rounded-xl border border-gray-100 p-3"
                      >
                        <p className="flex items-center gap-1 text-[11px] text-gray-400">
                          <MapPin className="h-3 w-3" />
                          {c.city}
                        </p>
                        <p className="mt-1 text-[15px] font-semibold text-gray-900">
                          {c.bookings.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {fmtMoney(c.revenue)}
                        </p>
                      </div>
                    ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
