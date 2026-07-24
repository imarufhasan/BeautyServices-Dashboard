"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Wallet,
  AlertTriangle,
  Eye,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getRefundOverview,
  REFUND_STATUS_FILTERS,
  DATE_RANGE_FILTERS,
  type RefundStatus,
} from "./data";
import { AdminTopbar } from "@/components/dashboard/admin-topbar";
import { StatCard } from "@/components/dashboard/stat-card2";
import { Topbar } from "@/components/layout/topbar";

function formatCurrency(amount: number, currency: string) {
  return `${currency} $${amount.toLocaleString("en-AU")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<RefundStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Rejected: "bg-rose-50 text-rose-500",
  Processing: "bg-blue-50 text-blue-600",
};

const TYPE_STYLES: Record<string, string> = {
  Full: "text-blue-600",
  Partial: "text-orange-500",
  "Wallet Credit": "text-emerald-600",
};

export default function RefundsPage() {
  // In production this comes from `await fetch("/api/admin/refunds")`.
  const { stats, records } = useMemo(() => getRefundOverview(), []);

  const [statusFilter, setStatusFilter] =
    useState<(typeof REFUND_STATUS_FILTERS)[number]>("All");
  const [dateFilter, setDateFilter] =
    useState<(typeof DATE_RANGE_FILTERS)[number]>("Last 7 days");

  const filteredRecords = useMemo(() => {
    if (statusFilter === "All") return records;
    return records.filter((r) => r.status === statusFilter);
  }, [records, statusFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
 
      <Topbar section="memillennial" page="Cancellation & Refund" />

      <main className="flex-1 px-8 py-7 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            Cancellation & Refund Management
          </h1>
          <p className="text-sm text-subtle mt-1">
            Manage refund requests and cancellation policies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            icon={Clock}
            iconClassName="bg-orange-400"
            value={String(stats.pendingRefunds)}
            label="Pending Refunds"
          />
          <StatCard
            icon={CheckCircle2}
            iconClassName="bg-emerald-500"
            value={String(stats.approvedRefunds.count)}
            label="Approved Refunds"
            trend={{ direction: "up", value: stats.approvedRefunds.trend }}
          />
          <StatCard
            icon={XCircle}
            iconClassName="bg-slate-400"
            value={String(stats.rejectedRefunds)}
            label="Rejected Refunds"
          />
          <StatCard
            icon={FileText}
            iconClassName="bg-rose-400"
            value={String(stats.cancellationRequests)}
            label="Cancellation Requests"
          />
          <StatCard
            icon={Wallet}
            iconClassName="bg-pink-300"
            value={formatCurrency(
              stats.totalRefundValue.amount,
              stats.totalRefundValue.currency,
            )}
            label="Total Refund Value"
            trend={{ direction: "down", value: stats.totalRefundValue.trend }}
          />
          <StatCard
            icon={AlertTriangle}
            iconClassName="bg-amber-400"
            value={String(stats.compensationRequests)}
            label="Compensation Requests"
          />
        </div>

        <div className="bg-white rounded-2xl border border-hairline shadow-soft px-5 py-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-subtle">
              Refund Status:
            </span>
            {REFUND_STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors",
                  statusFilter === status
                    ? "bg-brand-gradient text-white"
                    : "bg-muted text-ink/70 hover:bg-muted/70",
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-subtle">Date Range:</span>
            {DATE_RANGE_FILTERS.map((range) => (
              <button
                key={range}
                onClick={() => setDateFilter(range)}
                className={cn(
                  "text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors",
                  dateFilter === range
                    ? "bg-ink text-white"
                    : "bg-muted text-ink/70 hover:bg-muted/70",
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-hairline shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline text-[11px] font-bold text-subtle uppercase tracking-wide">
                  <th className="text-left px-6 py-3.5">Refund ID</th>
                  <th className="text-left px-6 py-3.5">Booking ID</th>
                  <th className="text-left px-6 py-3.5">Customer</th>
                  <th className="text-left px-6 py-3.5">Artist</th>
                  <th className="text-left px-6 py-3.5">Original Amount</th>
                  <th className="text-left px-6 py-3.5">Refund Amount</th>
                  <th className="text-left px-6 py-3.5">Type</th>
                  <th className="text-left px-6 py-3.5">Status</th>
                  <th className="text-left px-6 py-3.5">Requested Date</th>
                  <th className="text-left px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r) => (
                  <tr
                    key={r.refundId}
                    className="border-b border-hairline last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-brand-pinkDeep">
                      {r.refundId}
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {r.bookingId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-bold text-ink/70">
                          {r.customer.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">
                            {r.customer.name}
                          </p>
                          <p className="text-xs text-subtle">
                            {r.customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink/80">{r.artist}</td>
                    <td className="px-6 py-4 font-semibold text-ink">
                      {formatCurrency(r.originalAmount, r.currency)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-rose-500">
                      {formatCurrency(r.refundAmount, r.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn("font-semibold", TYPE_STYLES[r.type])}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-xs font-bold px-3 py-1 rounded-full",
                          STATUS_STYLES[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink/70">
                      {formatDate(r.requestedDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-subtle">
                        <button aria-label="View" className="hover:text-ink">
                          <Eye size={16} />
                        </button>
                        <button aria-label="More" className="hover:text-ink">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-hairline">
            <p className="text-xs text-subtle">
              Showing 1–{filteredRecords.length} of {records.length} results
            </p>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-subtle disabled:opacity-40">
                ‹
              </button>
              <span className="text-xs font-semibold text-ink px-2">1 / 1</span>
              <button className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-subtle disabled:opacity-40">
                ›
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
