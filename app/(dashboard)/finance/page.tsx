"use client";

import { useMemo, useState } from "react";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  getFinanceOverview,
  PAYMENT_REPORT_TABS,
  REVENUE_PERIODS,
  type PaymentReportTab,
  type RevenuePeriod,
} from "./data";
import { AdminTopbar } from "@/components/dashboard/admin-topbar";
import { StatCard } from "@/components/dashboard/stat-card2";
import { Topbar } from "@/components/layout/topbar";

function formatCurrency(amount: number, currency: string) {
  return `${currency} $${amount.toLocaleString("en-IN")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  Completed: "text-emerald-600",
  Pending: "text-amber-600",
  Failed: "text-rose-500",
};

export default function FinancePage() {
  // In production this comes from `await fetch("/api/admin/finance")`.
  const overview = useMemo(() => getFinanceOverview(), []);

  const [period, setPeriod] = useState<RevenuePeriod>("Monthly");
  const [reportTab, setReportTab] =
    useState<PaymentReportTab>("Booking Payments");
  const [settings, setSettings] = useState(overview.commissionSettings);

  const chartData = overview.revenueSeries[period];
  const visibleTransactions = overview.transactions.filter(
    (t) => t.type === reportTab,
  );

  function updateSetting(key: keyof typeof settings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* <AdminTopbar
        title="Financial Management"
        subtitle="memillennial Admin · Revenue, commissions and withdrawals"
      /> */}

      <Topbar section="memillennial" page="Finance" />

      <main className="flex-1 px-8 py-7 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">
              Financial Management
            </h1>
            <p className="text-sm text-subtle mt-1">
              Platform revenue, commissions, withdrawals and financial reports
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-ink bg-white border border-hairline rounded-xl px-4 py-2.5 shadow-soft">
            Jul 1 – Jul 2, 2025
            <ChevronDown size={15} className="text-subtle" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={TrendingUp}
            iconClassName="bg-rose-400"
            value={formatCurrency(
              overview.stats.totalRevenue.amount,
              overview.stats.totalRevenue.currency,
            )}
            label="Total Revenue"
            sublabel="All time"
            trend={{
              direction: "up",
              value: overview.stats.totalRevenue.trend,
            }}
          />
          <StatCard
            icon={BarChart3}
            iconClassName="bg-blue-500"
            value={formatCurrency(
              overview.stats.monthlyRevenue.amount,
              overview.stats.monthlyRevenue.currency,
            )}
            label="Monthly Revenue"
            trend={{
              direction: "up",
              value: overview.stats.monthlyRevenue.trend,
            }}
          />
          <StatCard
            icon={DollarSign}
            iconClassName="bg-violet-500"
            value={formatCurrency(
              overview.stats.todayRevenue.amount,
              overview.stats.todayRevenue.currency,
            )}
            label="Today's Revenue"
            trend={{
              direction: "up",
              value: overview.stats.todayRevenue.trend,
            }}
          />
        </div>

        <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-ink">Revenue Overview</h2>
              <p className="text-xs text-subtle mt-0.5">
                Platform revenue, commission, and refunds
              </p>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              {REVENUE_PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors",
                    period === p
                      ? "bg-white text-ink shadow-sm"
                      : "text-subtle hover:text-ink",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: 8, right: 8 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#9aa0a6" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9aa0a6" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  formatter={(value) =>
                    `$${Number(value ?? 0).toLocaleString()}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f472b6"
                  strokeWidth={2}
                  dot={false}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                  name="Commission"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-5 mt-2 text-xs font-semibold text-ink/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />{" "}
              Commission
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6 h-fit">
            <div className="flex items-center gap-2 mb-5">
              <Settings size={16} className="text-ink/70" />
              <h2 className="font-bold text-ink">Commission Settings</h2>
            </div>

            <div className="space-y-4">
              <Field
                label="Platform Commission (%)"
                value={settings.platformCommissionPct}
                onChange={(v) => updateSetting("platformCommissionPct", v)}
              />
              <Field
                label="Home Visit Commission (%)"
                value={settings.homeVisitCommissionPct}
                onChange={(v) => updateSetting("homeVisitCommissionPct", v)}
              />
              <Field
                label="Salon Visit Commission (%)"
                value={settings.salonVisitCommissionPct}
                onChange={(v) => updateSetting("salonVisitCommissionPct", v)}
              />
              <Field
                label="Min Withdrawal ($)"
                value={settings.minWithdrawal}
                onChange={(v) => updateSetting("minWithdrawal", v)}
              />
              <Field
                label="Max Withdrawal ($)"
                value={settings.maxWithdrawal}
                onChange={(v) => updateSetting("maxWithdrawal", v)}
              />

              <button className="w-full bg-brand-gradient text-white text-sm font-bold rounded-xl py-3 mt-2 hover:opacity-90 transition-opacity">
                Save Settings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
            <h2 className="font-bold text-ink mb-4">Payment Reports</h2>

            <div className="flex items-center gap-1 bg-muted rounded-full p-1 w-fit mb-4 overflow-x-auto">
              {PAYMENT_REPORT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setReportTab(tab)}
                  className={cn(
                    "text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors",
                    reportTab === tab
                      ? "bg-brand-gradient text-white"
                      : "text-ink/70 hover:text-ink",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline text-[11px] font-bold text-subtle uppercase tracking-wide">
                    <th className="text-left py-3">Transaction ID</th>
                    <th className="text-left py-3">Type</th>
                    <th className="text-left py-3">Customer / Artist</th>
                    <th className="text-left py-3">Amount</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-sm text-subtle"
                      >
                        No {reportTab.toLowerCase()} yet.
                      </td>
                    </tr>
                  ) : (
                    visibleTransactions.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-hairline last:border-0"
                      >
                        <td className="py-3.5 font-bold text-brand-pinkDeep">
                          {t.id}
                        </td>
                        <td className="py-3.5">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                            {t.type}
                          </span>
                        </td>
                        <td className="py-3.5 text-ink/80">{t.party}</td>
                        <td className="py-3.5 font-semibold text-ink">
                          {formatCurrency(t.amount, t.currency)}
                        </td>
                        <td className="py-3.5 text-ink/70">
                          {formatDate(t.date)}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={cn(
                              "font-semibold flex items-center gap-1",
                              STATUS_STYLES[t.status],
                            )}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
      />
    </div>
  );
}
