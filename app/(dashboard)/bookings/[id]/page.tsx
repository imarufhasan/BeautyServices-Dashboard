"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Hash,
  User,
  Star,
  Scissors,
  FileText,
  Clock,
  CreditCard,
  Eye,
  CreditCard as CardIcon,
  Printer,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import Skeleton from "@/components/dashboard/Skeleton";
import { Booking, BookingStatus, INITIAL_BOOKINGS } from "@/lib/bookingData";



interface BookingService {
  name: string;
  duration: string;
  price: number;
}


const STATUS_STYLES: Record<BookingStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Confirmed: "bg-sky-50 text-sky-600",
  "In Progress": "bg-violet-50 text-violet-600",
  Cancelled: "bg-slate-100 text-slate-500",
};

const TIMELINE_STEPS = [
  "Booking Created",
  "Artist Accepted",
  "Payment Completed",
  "Service Started",
  "Service Completed",
  "Booking Closed",
] as const;

// How many timeline steps are "done" for a given status — deterministic,
// so the fake timeline always looks consistent with the booking's status.
function completedStepsFor(status: BookingStatus): number {
  switch (status) {
    case "Pending":
      return 1;
    case "Confirmed":
      return 2;
    case "In Progress":
      return 4;
    case "Completed":
      return 5;
    case "Cancelled":
    default:
      return 1;
  }
}

function currency(n: number) {
  return `AUD ${n.toLocaleString("en-AU")}`;
}

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const bookingId = decodeURIComponent(params.id);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notes, setNotes] = useState("");
  const [noteSaveState, setNoteSaveState] = useState<
    "idle" | "saving" | "saved"
  >("idle");
  const [updating, setUpdating] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Refs to hold the pending autosave timers so we can clear them
  // whenever the user types again (debounce) or the component unmounts.
  const savingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const found =
      (INITIAL_BOOKINGS as Booking[]).find((b) => b.id === bookingId) ?? null;
    const timer = setTimeout(() => {
      setBooking(found);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [bookingId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  // Clean up any pending autosave timers on unmount.
  useEffect(() => {
    return () => {
      if (savingTimerRef.current) clearTimeout(savingTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  function pushToast(message: string) {
    setToast(message);
  }

  // Fake autosave pulse, triggered directly from the textarea's onChange
  // rather than from an effect watching `notes`. This is user-input
  // handling, not syncing with an external system, so it belongs in the
  // event handler — this also avoids the "setState in effect" issue,
  // since the state update now happens in response to a real event.
  function handleNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setNotes(value);

    if (savingTimerRef.current) clearTimeout(savingTimerRef.current);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    if (!value) {
      setNoteSaveState("idle");
      return;
    }

    setNoteSaveState("saving");
    savingTimerRef.current = setTimeout(() => setNoteSaveState("saved"), 600);
    idleTimerRef.current = setTimeout(() => setNoteSaveState("idle"), 1600);
  }

  async function handleUpdate() {
    setUpdating(true);
    await new Promise((r) => setTimeout(r, 1100));
    setUpdating(false);
    pushToast("Booking updated successfully");
  }

  async function handleCancel() {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 1100));
    setCancelling(false);
    pushToast(`${booking?.id} has been cancelled`);
  }

  function handleQuickAction(label: string) {
    pushToast(`Opening ${label}…`);
  }

  if (loading) {
    return (
      <>
        <Topbar section="memillennial" page="Bookings" />
        <div className="min-h-screen w-full bg-[#f7f7f9] px-8 py-6">
          <BookingDetailSkeleton />
        </div>
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Topbar section="memillennial" page="Bookings" />
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-[#f7f7f9] text-slate-500">
          <p className="text-lg font-semibold text-slate-700">
            Booking not found
          </p>
          <p className="text-[13px]">No booking exists with ID {bookingId}</p>
          <Link
            href="/bookings"
            className="mt-2 flex items-center gap-1.5 rounded-xl bg-linear-to-r from-pink-400 to-orange-300 px-4 py-2 text-[13px] font-semibold text-white"
          >
            <ChevronLeft size={14} />
            Back to Bookings
          </Link>
        </div>
      </>
    );
  }

  const status = booking.status;
  const doneSteps = completedStepsFor(status);
  const commission = Math.round(booking.amount * 0.15);
  const payout = booking.amount - commission;
  const totalFromServices = booking.services.reduce(
    (sum: number, s: BookingService) => sum + s.price,
    0,
  );

  return (
    <>
      <Topbar section="memillennial" page="Bookings" />

      <div className="min-h-screen w-full bg-[#f7f7f9] font-sans text-slate-700 antialiased">
        <main className="w-full px-8 py-6">
          {/* Back link */}
          <button
            onClick={() => router.push("/bookings")}
            className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-700"
          >
            <ChevronLeft size={15} />
            Back to Bookings
          </button>

          {/* Title row */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {booking.id}
              </h1>
              <p className="mt-0.5 text-[13px] text-slate-400">
                {booking.service} · {booking.date} at {booking.time}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${STATUS_STYLES[status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status}
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
            {/* Left column */}
            <div className="space-y-5">
              {/* Booking Information */}
              <Card icon={Hash} title="Booking Information">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <Field label="Booking ID" value={booking.id} />
                  <Field
                    label="Created Date"
                    value={booking.createdDate}
                    bold
                  />
                  <Field
                    label="Visit Type"
                    value={`${booking.visitType} Visit`}
                    bold
                  />
                  <Field label="Transaction ID" value={booking.transactionId} />
                  <Field label="Location" value={booking.location} bold />
                  <Field label="Travel Fee" value={booking.travelFee} />
                </div>
              </Card>

              {/* Customer + Artist */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Card icon={User} title="Customer Information">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-[13px] font-semibold text-rose-500">
                      {booking.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-slate-800">
                        {booking.customer}
                      </p>
                      <p className="text-[12px] text-slate-400">
                        {booking.customerType}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-[12.5px] text-slate-500">
                    <p className="flex items-center gap-2">
                      <Mail size={13} className="text-slate-300" />
                      {booking.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={13} className="text-slate-300" />
                      {booking.customerPhone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={13} className="text-slate-300" />
                      {booking.location}
                    </p>
                  </div>
                </Card>

                <Card icon={Star} title="Artist Information">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-[13px] font-semibold text-emerald-600">
                      {booking.artist
                        .split(" ")
                        .map((w: string) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-slate-800">
                        {booking.artist}
                      </p>
                      <p className="text-[12px] text-slate-400">
                        {booking.artistRole}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-[12.5px] text-slate-500">
                    <p className="flex items-center gap-2">
                      <Mail size={13} className="text-slate-300" />
                      {booking.artistEmail}
                    </p>
                    <p className="flex items-center gap-2">
                      <Star
                        size={13}
                        className="fill-amber-400 text-amber-400"
                      />
                      {booking.artistRating} Rating · {booking.artistReviews}{" "}
                      Reviews
                    </p>
                  </div>
                </Card>
              </div>

              {/* Service Details */}
              <Card icon={Scissors} title="Service Details">
                <div className="divide-y divide-slate-50">
                  {booking.services.map((s: BookingService) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between py-3 first:pt-0"
                    >
                      <div>
                        <p className="text-[13.5px] font-medium text-slate-800">
                          {s.name}
                        </p>
                        <p className="text-[11.5px] text-slate-400">
                          Duration: {s.duration}
                        </p>
                      </div>
                      <p className="text-[13.5px] font-semibold text-slate-800">
                        {currency(s.price)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3">
                  <span className="text-[13.5px] font-semibold text-slate-800">
                    Total Amount
                  </span>
                  <span className="text-[15px] font-bold text-rose-500">
                    {currency(totalFromServices)}
                  </span>
                </div>

                {booking.specialNotes && (
                  <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                    <p className="text-[11.5px] font-semibold text-amber-700">
                      Special Notes
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-amber-700/80">
                      {booking.specialNotes}
                    </p>
                  </div>
                )}
              </Card>

              {/* Internal Notes */}
              <Card icon={FileText} title="Internal Notes">
                <textarea
                  value={notes}
                  onChange={handleNotesChange}
                  rows={4}
                  placeholder="Add internal admin notes here..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                />
                {noteSaveState !== "idle" && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-slate-400">
                    {noteSaveState === "saving" ? (
                      <>
                        <Loader2 size={11} className="animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={11} className="text-emerald-500" />{" "}
                        Saved
                      </>
                    )}
                  </p>
                )}
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Timeline */}
              <Card icon={Clock} title="Booking Timeline">
                <div className="space-y-0">
                  {TIMELINE_STEPS.map((step, i) => {
                    const done = i < doneSteps;
                    const isLast = i === TIMELINE_STEPS.length - 1;
                    return (
                      <div key={step} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                              done
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-slate-200 bg-white text-transparent"
                            }`}
                          >
                            {done && <CheckCircle2 size={14} />}
                          </div>
                          {!isLast && (
                            <div
                              className={`w-px flex-1 ${
                                done ? "bg-emerald-300" : "bg-slate-150"
                              }`}
                              style={{ minHeight: 28 }}
                            />
                          )}
                        </div>
                        <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                          <p
                            className={`text-[13px] font-medium ${
                              done ? "text-slate-800" : "text-slate-300"
                            }`}
                          >
                            {step}
                          </p>
                          {i === 0 && (
                            <p className="text-[11px] text-slate-400">
                              {booking.createdDate} · 10:23 AM
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Payment Details */}
              <Card icon={CreditCard} title="Payment Details">
                <div className="space-y-3 text-[12.5px]">
                  <Row label="Transaction ID" value={booking.transactionId} />
                  <Row label="Payment Method" value={booking.paymentMethod} />
                  <Row label="Gross Amount" value={currency(booking.amount)} />
                  <Row
                    label="Platform Commission (15%)"
                    value={`AUD ${commission.toLocaleString("en-AU")}`}
                    valueClass="text-rose-500"
                  />
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <span className="text-slate-400">Artist Payout</span>
                    <span className="text-[13.5px] font-bold text-slate-800">
                      {currency(payout)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card icon={FileText} title="Quick Actions" noIcon>
                <div className="space-y-1">
                  <QuickAction
                    icon={Eye}
                    label="View Customer Profile"
                    onClick={() => handleQuickAction("customer profile")}
                  />
                  <QuickAction
                    icon={Star}
                    label="View Artist Profile"
                    onClick={() => handleQuickAction("artist profile")}
                  />
                  <QuickAction
                    icon={CardIcon}
                    label="View Payment"
                    onClick={() => handleQuickAction("payment details")}
                  />
                  <QuickAction
                    icon={Printer}
                    label="Download Invoice"
                    onClick={() => handleQuickAction("invoice download")}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="flex min-w-37.5 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-400 to-orange-300 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-70"
            >
              {updating ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Updating…
                </>
              ) : (
                "Update Booking"
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex min-w-35 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-rose-500 hover:bg-rose-50 disabled:opacity-70"
            >
              {cancelling ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Cancelling…
                </>
              ) : (
                "Cancel Booking"
              )}
            </button>
          </div>
        </main>

        {toast && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-[13px] text-white shadow-lg">
            <CheckCircle2 size={16} className="text-emerald-400" />
            {toast}
          </div>
        )}
      </div>
    </>
  );
}

function Card({
  icon: Icon,
  title,
  children,
  noIcon,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  noIcon?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center gap-2">
        {!noIcon && <Icon size={15} className="text-rose-400" />}
        <h3 className="text-[13.5px] font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div>
      <p className="text-[11.5px] text-slate-400">{label}</p>
      <p
        className={`mt-0.5 text-[13.5px] text-slate-700 ${
          bold ? "font-semibold" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className={`font-medium text-slate-700 ${valueClass ?? ""}`}>
        {value}
      </span>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] text-slate-600 hover:bg-slate-50"
    >
      <Icon size={15} className="text-slate-400" />
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function BookingDetailSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="h-4 w-32 rounded-md" />
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        
        <div className="space-y-5">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-5">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-60 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>

      <div className="flex gap-3">
        <Skeleton className="h-11 w-40 rounded-xl" />
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
    </div>
  );
}
