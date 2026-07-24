"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MailOpen,
  CheckCircle2,
  Clock,
  Zap,
  Paperclip,
  Image as ImageIcon,
  Loader2,
  MoreHorizontal,
  X,
  RotateCcw,
  ArrowUpRight,
  Repeat,
  Send as SendIcon,
} from "lucide-react";
import {
  SUPPORT_STATS,
  TICKET_FILTERS,
  TICKETS,
  fakeDelay,
  type Ticket,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/mockData";
import Skeleton from "@/components/dashboard/Skeleton";
import { Topbar } from "@/components/layout/topbar";

function PriorityPill({ priority }: { priority: TicketPriority }) {
  const styles: Record<TicketPriority, string> = {
    High: "bg-red-50 text-red-500",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatusTag({ status }: { status: TicketStatus }) {
  const styles: Record<TicketStatus, string> = {
    Open: "bg-red-50 text-red-500",
    Pending: "bg-amber-50 text-amber-600",
    Escalated: "bg-red-50 text-red-500",
    Resolved: "bg-emerald-50 text-emerald-600",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function SupportCenterPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"tickets" | "mail">("tickets");
  const [activeFilter, setActiveFilter] =
    useState<(typeof TICKET_FILTERS)[number]>("All");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composeTab, setComposeTab] = useState<
    "Reply" | "Internal Note" | "Template"
  >("Reply");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fakeDelay(TICKETS, 1000).then((data) => {
      if (!mounted) return;
      setTickets(data);
      setSelectedId(data[0]?.id ?? null);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case "All":
        return tickets;
      case "Customers":
        return tickets.filter((t) => t.requesterType === "Customer");
      case "Artists":
        return tickets.filter((t) => t.requesterType === "Artist");
      case "Technical":
        return tickets.filter((t) => t.category === "Technical");
      case "Payment":
        return tickets.filter((t) => t.category === "Payment");
      case "Verification":
        return tickets.filter((t) => t.category === "Verification");
      case "Booking":
        return tickets.filter((t) => t.category === "Booking");
      case "Refund":
        return tickets.filter((t) => t.category === "Refund");
      case "High Priority":
        return tickets.filter((t) => t.priority === "High");
      default:
        return tickets;
    }
  }, [activeFilter, tickets]);

  const selected = tickets.find((t) => t.id === selectedId) ?? null;

  const handleSendReply = async () => {
    if (!selected || !draft.trim()) return;
    setSending(true);
    const messageText = draft;
    await fakeDelay(true, 1100);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  id: `m${t.messages.length + 1}`,
                  from: "admin",
                  author: "Sarah M.",
                  text: messageText,
                  time: "Just now",
                },
              ],
            }
          : t,
      ),
    );
    setDraft("");
    setSending(false);
    setToast(
      composeTab === "Internal Note" ? "Internal note saved" : "Reply sent",
    );
  };

  const handleResolve = async () => {
    if (!selected) return;
    setResolving(true);
    await fakeDelay(true, 900);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id ? { ...t, status: "Resolved" } : t,
      ),
    );
    setResolving(false);
    setToast(`Ticket #${selected.id} resolved`);
  };

  const handleClose = async () => {
    if (!selected) return;
    await fakeDelay(true, 700);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id ? { ...t, status: "Resolved" } : t,
      ),
    );
    setToast(`Ticket #${selected.id} closed`);
  };

  const handleReopen = async () => {
    if (!selected) return;
    await fakeDelay(true, 700);
    setTickets((prev) =>
      prev.map((t) => (t.id === selected.id ? { ...t, status: "Open" } : t)),
    );
    setToast(`Ticket #${selected.id} reopened`);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* <Sidebar active="Support" /> */}

      <div className="flex-1">
        <Topbar section="memillennial" page="Support" />

        <main className="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[400px_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-semibold text-gray-900">
                Support Center
              </h1>
              <p className="mt-1 text-[14px] text-gray-400">
                Centralized help desk, ticket management &amp; mail support
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))
              ) : (
                <>
                  <div className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm shadow-gray-100">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-400">
                      <MailOpen className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-[17px] font-semibold text-gray-900">
                      {SUPPORT_STATS.open}
                    </p>
                    <p className="text-[11px] text-gray-400">Open</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm shadow-gray-100">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-[17px] font-semibold text-gray-900">
                      {SUPPORT_STATS.resolved.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-gray-400">Resolved</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm shadow-gray-100">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                      <Clock className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-[17px] font-semibold text-gray-900">
                      {SUPPORT_STATS.pending}
                    </p>
                    <p className="text-[11px] text-gray-400">Pending</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm shadow-gray-100">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                      <Zap className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-[17px] font-semibold text-gray-900">
                      {SUPPORT_STATS.avgResponse}
                    </p>
                    <p className="text-[11px] text-gray-400">Avg Resp.</p>
                  </div>
                </>
              )}
            </div>

            {/* View toggle */}
            {loading ? (
              <Skeleton className="h-11 w-full rounded-full" />
            ) : (
              <div className="flex gap-2 rounded-full bg-gray-50 p-1">
                <button
                  onClick={() => setView("tickets")}
                  className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                    view === "tickets"
                      ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                      : "text-gray-500"
                  }`}
                >
                  Support Tickets
                </button>
                <button
                  onClick={() => setView("mail")}
                  className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                    view === "mail"
                      ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                      : "text-gray-500"
                  }`}
                >
                  Mail Support
                </button>
              </div>
            )}

            {/* Filter chips */}
            {loading ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {TICKET_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                      activeFilter === f
                        ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            {/* Ticket list */}
            <div className="space-y-3">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-2xl" />
                  ))
                : filtered.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                        selectedId === t.id
                          ? "border-pink-200 bg-pink-50/40"
                          : "border-gray-100 bg-white hover:bg-gray-50/60"
                      } shadow-sm shadow-gray-100`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-pink-400 to-orange-300 text-[11px] font-semibold text-white">
                          {t.requesterInitials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-medium text-gray-400">
                              #{t.id}
                            </span>
                            <PriorityPill priority={t.priority} />
                          </div>
                          <p className="mt-1 truncate text-[13.5px] font-medium text-gray-900">
                            {t.title}
                          </p>
                          <p className="mt-0.5 text-[12px] text-gray-400">
                            {t.requester} · {t.category}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <StatusTag status={t.status} />
                            <span className="text-[11px] text-gray-300">
                              {t.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              {!loading && filtered.length === 0 && (
                <p className="py-8 text-center text-[13px] text-gray-400">
                  No tickets match this filter.
                </p>
              )}
            </div>
          </div>

          {/* Right column — ticket detail */}
          <div className="space-y-6">
            {loading || !selected ? (
              <>
                <Skeleton className="h-28 w-full rounded-2xl" />
                <Skeleton className="h-64 w-full rounded-2xl" />
              </>
            ) : (
              <>
                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-pink-400 to-orange-300 text-[13px] font-semibold text-white">
                        {selected.requesterInitials}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[15px] font-semibold text-gray-900">
                            {selected.requester}
                          </p>
                          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-600">
                            {selected.requesterType}
                          </span>
                          <PriorityPill priority={selected.priority} />
                          <StatusTag status={selected.status} />
                        </div>
                        <p className="mt-1 text-[13px] text-gray-500">
                          {selected.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 text-right">
                      <div>
                        <p className="text-[11px] text-gray-400">Ticket ID</p>
                        <p className="text-[13px] font-semibold text-gray-900">
                          #{selected.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400">Assigned To</p>
                        <p className="text-[13px] font-semibold text-gray-900">
                          {selected.assignedTo}
                        </p>
                      </div>
                      <button className="mt-0.5 rounded-full p-1.5 text-gray-300 hover:bg-gray-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-4 border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-[11px] text-gray-400">Category</p>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">Created</p>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.createdDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">Booking Ref</p>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.bookingRef ? `#${selected.bookingRef}` : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">Response Time</p>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.responseTime}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold text-gray-900">
                      Live Conversation
                    </p>
                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Customer Online
                    </span>
                  </div>

                  <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                    {selected.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] ${m.from === "admin" ? "text-right" : ""}`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                              m.from === "admin"
                                ? "bg-linear-to-r from-pink-500 to-orange-400 text-white"
                                : "bg-gray-50 text-gray-700"
                            }`}
                          >
                            {m.text}
                          </div>
                          <p className="mt-1 text-[11px] text-gray-300">
                            {m.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <div className="flex gap-2">
                      {(["Reply", "Internal Note", "Template"] as const).map(
                        (tab) => (
                          <button
                            key={tab}
                            onClick={() => setComposeTab(tab)}
                            className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors ${
                              composeTab === tab
                                ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {tab}
                          </button>
                        ),
                      )}
                    </div>

                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder={`Type your ${composeTab === "Internal Note" ? "note" : "reply to " + selected.requester.split(" ")[0]}...`}
                      rows={3}
                      className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-[13.5px] text-gray-900 outline-none placeholder:text-gray-300 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                    />

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-2">
                        <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50">
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50">
                          <ImageIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-[12.5px] font-medium text-gray-600 hover:bg-gray-50">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          Escalate
                        </button>
                        <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-[12.5px] font-medium text-gray-600 hover:bg-gray-50">
                          <Repeat className="h-3.5 w-3.5" />
                          Transfer
                        </button>
                        <button
                          onClick={handleSendReply}
                          disabled={sending || !draft.trim()}
                          className="flex min-w-32 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-4 py-2 text-[12.5px] font-medium text-white shadow-sm shadow-pink-200 disabled:opacity-50"
                        >
                          {sending ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <SendIcon className="h-3.5 w-3.5" />
                              {composeTab === "Internal Note"
                                ? "Save Note"
                                : "Send Reply"}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={handleClose}
                      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      Close Ticket
                    </button>
                    <button
                      onClick={handleReopen}
                      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reopen
                    </button>
                  </div>
                  <button
                    onClick={handleResolve}
                    disabled={resolving}
                    className="flex min-w-37.5 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-pink-200 disabled:opacity-70"
                  >
                    {resolving ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Resolving…
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Resolve Ticket
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-[13px] text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
