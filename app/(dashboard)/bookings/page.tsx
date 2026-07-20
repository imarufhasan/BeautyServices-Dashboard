"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  CalendarDays,
  Image as ImageIcon,
  Bell,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Download,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Home,
  Store,
  MoreVertical,
  X,
  Eye,
  Ban,
  CheckCheck,
  ChevronLeft,
} from "lucide-react";
import { INITIAL_BOOKINGS } from "./bookingData";


const STATUS_TABS = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
  "Disputed",
];

const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Confirmed: "bg-sky-50 text-sky-600",
  "In Progress": "bg-violet-50 text-violet-600",
  Cancelled: "bg-slate-100 text-slate-500",
  Disputed: "bg-rose-50 text-rose-600",
};

const PAYMENT_STYLES = {
  Paid: "text-emerald-600",
  Pending: "text-amber-600",
  Refunded: "text-slate-500",
  "Partial Refund": "text-rose-500",
};

function currency(n) {
  return `AUD ${n.toLocaleString("en-AU")}`;
}

function timeAgoNote() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function StatCard({ icon: Icon, iconBg, iconColor, trend, value, label }) {
  return (
    <div className="flex-1 min-w-[150px] rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={18} className={iconColor} strokeWidth={2.25} />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trend.startsWith("-") ? "text-rose-500" : "text-emerald-500"
            }`}
          >
            <ChevronRight
              size={12}
              className={`-rotate-90 ${trend.startsWith("-") ? "rotate-90" : ""}`}
            />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-bold text-slate-800">{value}</div>
      <div className="mt-0.5 text-[13px] text-slate-400">{label}</div>
    </div>
  );
}

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Toast({ toasts }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg animate-[fadeIn_0.15s_ease-out]"
        >
          <CheckCheck size={16} className="text-emerald-400" />
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BookingManagement() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [exporting, setExporting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const menuRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null);
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pushToast(message) {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(INITIAL_BOOKINGS.map((b) => b.category)))],
    []
  );

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesTab = activeTab === "All" || b.status === activeTab;
      const matchesCategory = categoryFilter === "All" || b.category === categoryFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        b.customer.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.artist.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q);
      return matchesTab && matchesCategory && matchesQuery;
    });
  }, [bookings, activeTab, categoryFilter, query]);

  const counts = useMemo(() => {
    const c = { total: bookings.length };
    STATUS_TABS.slice(1).forEach((s) => {
      c[s] = bookings.filter((b) => b.status === s).length;
    });
    return c;
  }, [bookings]);

  function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setOpenMenuId(null);
    pushToast(`${id} marked as ${status}`);
  }

  function handleExport() {
    setExporting(true);
    pushToast(`Exporting ${filtered.length} bookings…`);
    setTimeout(() => {
      setExporting(false);
      pushToast(`Export complete · bookings_${timeAgoNote()}.csv`);
    }, 1200);
  }

  return (
    <div className="flex h-screen w-full bg-[#f7f7f9] font-sans text-slate-700 antialiased">

      {/* ---------------- Main ---------------- */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-100 bg-white/70 px-8 py-4 backdrop-blur">
          <div>
            <h1 className="text-[17px] font-bold text-slate-800">Booking Management</h1>
            <p className="text-[13px] text-slate-400">memillennial Admin · Manage and monitor all bookings</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => pushToast("No new notifications")}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:bg-slate-50"
            >
              <Bell size={16} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-400" />
            </button>
            <div className="flex items-center gap-2.5 border-l border-slate-100 pl-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-300 text-[11px] font-semibold text-white">
                AO
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-slate-800">Alex O'Brien</div>
                <div className="text-[11px] text-slate-400">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">
          {/* Title row */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Booking Management</h2>
              <p className="text-[13px] text-slate-400">Manage and monitor all platform bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-56 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-[13px] text-slate-600 outline-none placeholder:text-slate-300 focus:border-pink-300"
                />
              </div>

              <div className="relative" ref={filterRef}>
                <button
                  type="button"
                  onClick={() => setFilterOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  <SlidersHorizontal size={14} />
                  Advanced Filter
                </button>
                {filterOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
                    <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Category
                    </div>
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCategoryFilter(c);
                          setFilterOpen(false);
                          pushToast(`Filtered by ${c}`);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[13px] hover:bg-slate-50 ${
                          categoryFilter === c ? "font-semibold text-pink-500" : "text-slate-600"
                        }`}
                      >
                        {c}
                        {categoryFilter === c && <CheckCheck size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-orange-300 px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-70"
              >
                <Download size={14} />
                {exporting ? "Exporting…" : "Export"}
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mb-5 flex flex-wrap gap-4">
            <StatCard
              icon={CalendarDays}
              iconBg="bg-rose-400"
              iconColor="text-white"
              trend="+12.5%"
              value={counts.total.toLocaleString()}
              label="Total Bookings · All time"
            />
            <StatCard
              icon={Clock}
              iconBg="bg-sky-500"
              iconColor="text-white"
              trend="+3"
              value="4"
              label="Today's Bookings"
            />
            <StatCard
              icon={AlertCircle}
              iconBg="bg-amber-400"
              iconColor="text-white"
              value={counts.Pending}
              label="Pending"
            />
            <StatCard
              icon={CheckCircle2}
              iconBg="bg-emerald-500"
              iconColor="text-white"
              trend="+8.2%"
              value={counts.Completed}
              label="Completed"
            />
            <StatCard
              icon={XCircle}
              iconBg="bg-slate-400"
              iconColor="text-white"
              trend="-2.1%"
              value={counts.Cancelled}
              label="Cancelled"
            />
            <StatCard
              icon={AlertTriangle}
              iconBg="bg-rose-300"
              iconColor="text-white"
              value={counts.Disputed}
              label="Disputed"
            />
          </div>

          {/* Status tabs */}
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <span className="mr-1 text-[12px] font-medium text-slate-400">Status:</span>
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-400 to-orange-300 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3 font-semibold">Booking ID</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Artist</th>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Date &amp; Time</th>
                    <th className="px-5 py-3 font-semibold">Visit Type</th>
                    <th className="px-5 py-3 font-semibold">Payment</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Amount</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                      <td className="px-5 py-3.5 font-semibold text-rose-400">{b.id}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ${b.avatar}`}>
                            {b.initials}
                          </div>
                          <div>
                            <div className="font-medium text-slate-700">{b.customer}</div>
                            <div className="text-[11.5px] text-slate-400">{b.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-700">{b.artist}</div>
                        <div className="text-[11.5px] text-slate-400">{b.artistRole}</div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{b.service}</td>
                      <td className="px-5 py-3.5">
                        <span className={`font-medium ${b.categoryColor}`}>{b.category}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-slate-700">{b.date}</div>
                        <div className="text-[11.5px] text-slate-400">{b.time}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          {b.visitType === "Home" ? (
                            <Home size={13} className="text-slate-400" />
                          ) : (
                            <Store size={13} className="text-slate-400" />
                          )}
                          {b.visitType}
                        </span>
                      </td>
                      <td className={`px-5 py-3.5 font-medium ${PAYMENT_STYLES[b.payment]}`}>{b.payment}</td>
                      <td className="px-5 py-3.5">
                        <StatusPill status={b.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold text-slate-800">{currency(b.amount)}</td>
                      <td className="relative px-5 py-3.5 text-right">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === b.id ? null : b.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === b.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-5 top-11 z-20 w-44 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 text-left shadow-lg"
                          >
                            <button
                              onClick={() => {
                                setDetailBooking(b);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 px-3.5 py-2 text-[13px] text-slate-600 hover:bg-slate-50"
                            >
                              <Eye size={14} /> View Details
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "Completed")}
                              className="flex w-full items-center gap-2 px-3.5 py-2 text-[13px] text-slate-600 hover:bg-slate-50"
                            >
                              <CheckCheck size={14} /> Mark Completed
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "Cancelled")}
                              className="flex w-full items-center gap-2 px-3.5 py-2 text-[13px] text-rose-500 hover:bg-rose-50"
                            >
                              <Ban size={14} /> Cancel Booking
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-5 py-12 text-center text-slate-400">
                        No bookings match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[12.5px] text-slate-400">
              <span>
                Showing 1-{filtered.length} of {filtered.length} results
              </span>
              <div className="flex items-center gap-1.5">
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-300">
                  <ChevronLeft size={14} />
                </button>
                <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-800 px-2 font-medium text-white">
                  1/1
                </span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-300">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Detail modal (fake) */}
      {detailBooking && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm"
          onClick={() => setDetailBooking(null)}
        >
          <div
            className="w-[420px] rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800">{detailBooking.id}</h3>
              <button onClick={() => setDetailBooking(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-[13px]">
              <Row label="Customer" value={`${detailBooking.customer} · ${detailBooking.email}`} />
              <Row label="Artist" value={`${detailBooking.artist} · ${detailBooking.artistRole}`} />
              <Row label="Service" value={detailBooking.service} />
              <Row label="Category" value={detailBooking.category} />
              <Row label="Date & Time" value={`${detailBooking.date}, ${detailBooking.time}`} />
              <Row label="Visit Type" value={detailBooking.visitType} />
              <Row label="Payment" value={detailBooking.payment} />
              <Row label="Amount" value={currency(detailBooking.amount)} />
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Status</span>
                <StatusPill status={detailBooking.status} />
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast toasts={toasts} />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}