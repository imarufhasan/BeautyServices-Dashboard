"use client";

import { useMemo, useState } from "react";
import { Clock, FileText, Wallet, Eye, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import { StatCard } from "@/components/dashboard/stat-card2";
import {
  DATE_RANGE_FILTERS,
  getRefundOverview,
  REFUND_STATUS_FILTERS,
  RefundStatus,
} from "./data";
import Link from "next/link";
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

export default function RefundsPage() {
  const { stats, records } = useMemo(() => getRefundOverview(), []);
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] =
    useState<(typeof REFUND_STATUS_FILTERS)[number]>("All");
  const [dateFilter, setDateFilter] =
    useState<(typeof DATE_RANGE_FILTERS)[number]>("Last 7 days");

  const filteredRecords = useMemo(() => {
    let filtered = records;

    if (statusFilter !== "All") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    return filtered;
  }, [records, statusFilter]);

  //  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / ITEMS_PER_PAGE),
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Topbar section="Cancellation & Refund" page="Refund" />

      <main className="flex-1 px-8 py-7 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            Cancellation & Refund Management
          </h1>
          <p className="text-sm text-subtle mt-1">
            Manage refund requests and cancellation policies
          </p>
        </div>

        {/* Showing only Pending Refunds, Total Refund Value, and Cancellation Requests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            icon={Clock}
            iconClassName="bg-orange-400"
            value={String(stats.pendingRefunds)}
            label="Pending Refunds"
          />

          <StatCard
            icon={FileText}
            iconClassName="bg-rose-400"
            value={String(stats.cancellationRequests)}
            label="Cancellation Requests"
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
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
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
                onClick={() => {
                  setDateFilter(range);
                  setCurrentPage(1);
                }}
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
                  <th className="text-left px-6 py-3.5">Status</th>
                  <th className="text-left px-6 py-3.5">Requested Date</th>
                  <th className="text-left px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((r) => (
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
                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[11px] font-bold">
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
                    <td className="px-6 py-4 justify-center">
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
                      <div className="flex items-center justify-center text-subtle">
                        <Link
                          href={`/refunds/${r.refundId}`}
                          aria-label="View refund details"
                          className="hover:text-ink"
                        >
                          <Eye size={16} />
                        </Link>
                        {/* <button aria-label="More" className="hover:text-ink">
                          <MoreVertical size={16} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-hairline">
            {/* <p className="text-xs text-subtle">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredRecords.length)}{" "}
              of {filteredRecords.length} results
            </p> */}
            <p className="text-xs text-subtle">
              {filteredRecords.length > 0 ? (
                <>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredRecords.length,
                  )}{" "}
                  of {filteredRecords.length} results
                </>
              ) : (
                "No results found"
              )}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-subtle disabled:opacity-40"
              >
                ‹
              </button>

              <span className="text-xs font-semibold text-ink px-2">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-subtle disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
