"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Clock,
  Info,
  User,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Topbar } from "@/components/layout/topbar";
import { getRefundDetail } from "../data";

function formatCurrency(amount: number, currency: string) {
  return `${currency === "AUD" ? "$" : currency + " $"}${amount.toFixed(2)}`;
}

function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_BADGE: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-rose-50 text-rose-500",
  "Wallet Credited": "bg-blue-50 text-blue-600",
};

export default function RefundDetailsPage() {
  const params = useParams<{ id: string }>();
  const refundId = decodeURIComponent(params.id);

  // In production this comes from `await fetch(`/api/admin/refunds/${refundId}`)`.
  const detail = useMemo(() => getRefundDetail(refundId), [refundId]);

  if (!detail) {
    return (
      <div className="flex flex-col min-h-screen bg-muted/40">
        <Topbar section="Cancellation & Refund" page="Refund Details" />
        <main className="flex-1 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-subtle">
            No refund found for &ldquo;{refundId}&rdquo;.
          </p>
          <Link
            href="/refunds"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-pinkDeep hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Cancellation & Refund
          </Link>
        </main>
      </div>
    );
  }

  const refundTypeLabel =
    detail.type === "Wallet Credit" ? "Wallet Credit" : `${detail.type} Refund`;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Topbar section="Cancellation & Refund" page="Refund Details" />

      <main className="flex-1 px-8 py-7 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/refunds"
              className="flex items-center gap-1 text-xs font-semibold text-subtle hover:text-brand-pinkDeep transition-colors"
            >
              <ArrowLeft size={13} />
              Back to Cancellation & Refund
            </Link>
            {/* <ChevronRight size={13} className="text-subtle" />
            <span className="text-xs font-semibold text-subtle">
              Refund Details
            </span>
            <ChevronRight size={13} className="text-subtle" />
            <span className="text-xs font-bold text-ink">
              {detail.refundId}
            </span> */}
          </div>

          <h1 className="text-2xl font-extrabold text-ink">Refund Details</h1>
          <p className="text-sm text-subtle mt-1">
            Review refund request details, booking information, payment
            history, and take administrative action.
          </p>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DetailCard
            icon={FileText}
            iconClassName="bg-violet-100 text-violet-500"
            label="Refund ID"
            value={detail.refundId}
          />
          <DetailCard
            icon={CreditCard}
            iconClassName="bg-blue-100 text-blue-500"
            label="Booking ID"
            value={detail.bookingId}
          />
          <DetailCard
            icon={Clock}
            iconClassName="bg-amber-100 text-amber-500"
            label="Refund Status"
            badge={{
              text: detail.bookingSummary.paymentStatus,
              className: STATUS_BADGE[detail.bookingSummary.paymentStatus],
            }}
          />
          <DetailCard
            icon={Info}
            iconClassName="bg-violet-100 text-violet-500"
            label="Refund Type"
            badge={{
              text: refundTypeLabel,
              className: "bg-violet-50 text-violet-600",
            }}
          />
        </div>

        {/* Customer + Artist information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
            <h2 className="font-bold text-ink mb-4">Customer Information</h2>
            <div className="flex items-center gap-3 pb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                {detail.customer.initials}
              </div>
              <div>
                <p className="font-bold text-ink text-sm">
                  {detail.customer.name}
                </p>
                <p className="text-xs text-subtle">Verified Customer</p>
              </div>
            </div>
            <div className="border-t border-hairline pt-2">
              <InfoRow label="Email" value={detail.customer.email} />
              <InfoRow label="Phone Number" value={detail.customerDetail.phone} />
              <InfoRow
                label="Booking Date"
                value={formatLongDate(detail.customerDetail.bookingDate)}
              />
              <InfoRow
                label="Payment Method"
                value={detail.customerDetail.paymentMethod}
              />
              <InfoRow
                label="Transaction ID"
                value={detail.customerDetail.transactionId}
                mono
                last
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
            <h2 className="font-bold text-ink mb-4">Artist Information</h2>
            <div className="flex items-center gap-3 pb-4">
              <div className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center text-sm font-bold">
                {detail.artistDetail.initials}
              </div>
              <div>
                <p className="font-bold text-ink text-sm">{detail.artist}</p>
                <p className="text-xs text-subtle">Verified Artist</p>
              </div>
            </div>
            <div className="border-t border-hairline pt-2">
              <InfoRow
                label="Business Name"
                value={detail.artistDetail.businessName}
              />
              <InfoRow
                label="Service Category"
                value={detail.artistDetail.serviceCategory}
              />
              <InfoRow
                label="Service Name"
                value={detail.artistDetail.serviceName}
              />
              <InfoRow
                label="Appointment Date"
                value={detail.artistDetail.appointmentDate}
              />
              <InfoRow
                label="Appointment Time"
                value={detail.artistDetail.appointmentTime}
                last
              />
            </div>
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
          <h2 className="font-bold text-ink mb-4">Booking Summary</h2>

          <div className="flex items-center justify-between text-[11px] font-bold text-subtle uppercase tracking-wide pb-2">
            <span>Item</span>
            <span>Amount</span>
          </div>
          <div className="border-t border-hairline">
            {detail.bookingSummary.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3 border-b border-hairline text-sm"
              >
                <span className="text-ink/80">{item.label}</span>
                <span className="font-mono text-ink">
                  {formatCurrency(item.amount, detail.currency)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-3 border-b border-hairline">
              <span className="font-bold text-ink text-sm">
                Final Refund Amount
              </span>
              <span className="font-mono font-bold text-emerald-600">
                {formatCurrency(detail.bookingSummary.finalRefundAmount, detail.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-subtle">Payment Status</span>
              <span
                className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  STATUS_BADGE[detail.bookingSummary.paymentStatus],
                )}
              >
                {detail.bookingSummary.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Cancellation details */}
        <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6">
          <h2 className="font-bold text-ink mb-4">Cancellation Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-subtle">Cancelled By</span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
                <User size={14} className="text-subtle" />
                {detail.cancellation.cancelledBy}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-subtle">Refund Policy Applied</span>
              <span className="text-sm font-bold text-ink">
                {detail.cancellation.refundPolicyApplied}
              </span>
            </div>
          </div>
          <div className="border-t border-hairline mt-1 pt-1 grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-sm text-subtle">Cancellation Date</span>
                <span className="text-sm font-bold text-ink">
                  {detail.cancellation.cancellationDate}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-sm text-subtle">Cancellation Time</span>
                <span className="text-sm font-bold text-ink">
                  {detail.cancellation.cancellationTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment timeline */}
        <div className="bg-white rounded-2xl border border-hairline shadow-soft p-6 max-w-xl">
          <h2 className="font-bold text-ink mb-5">Payment Timeline</h2>
          <div>
            {detail.timeline.map((step, i) => {
              const isLast = i === detail.timeline.length - 1;
              return (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                        step.completed
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-subtle",
                      )}
                    >
                      {step.completed ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <Circle size={15} />
                      )}
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-hairline my-1 min-h-[24px]" />
                    )}
                  </div>
                  <div className={cn("pb-6", isLast && "pb-0")}>
                    <p
                      className={cn(
                        "text-sm font-bold",
                        step.completed ? "text-ink" : "text-subtle",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-subtle mt-0.5">
                      {step.date} · {step.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  iconClassName,
  label,
  value,
  badge,
}: {
  icon: typeof FileText;
  iconClassName: string;
  label: string;
  value?: string;
  badge?: { text: string; className: string };
}) {
  return (
    <div className="bg-white rounded-2xl border border-hairline shadow-soft p-5">
      <div
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center mb-3",
          iconClassName,
        )}
      >
        <Icon size={16} />
      </div>
      <p className="text-xs text-subtle">{label}</p>
      {value && <p className="font-bold text-ink text-sm mt-1">{value}</p>}
      {badge && (
        <span
          className={cn(
            "inline-block text-xs font-bold px-2.5 py-1 rounded-full mt-1.5",
            badge.className,
          )}
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
  last,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2.5",
        !last && "border-b border-hairline/60",
      )}
    >
      <span className="text-sm text-subtle">{label}</span>
      <span
        className={cn(
          "text-sm font-semibold text-ink text-right",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </span>
    </div>
  );
}