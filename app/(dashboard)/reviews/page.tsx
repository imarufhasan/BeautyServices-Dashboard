"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Star,
  Clock,
  CheckCircle2,
  EyeOff,
  Trash2,
  AlertTriangle,
  ShieldAlert,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { fakeDelay, Review, REVIEW_STATS, REVIEWS, ReviewStatus } from "@/lib/mockData";
import Skeleton from "@/components/dashboard/Skeleton";


const TABS = [
  "All Reviews",
  "Reported",
  "Fake Reviews",
  "Pending",
  "Resolved",
] as const;

function StatusPill({ status }: { status: ReviewStatus }) {
  const styles: Record<ReviewStatus, string> = {
    Approved: "bg-emerald-50 text-emerald-600",
    Reported: "bg-red-50 text-red-500",
    Pending: "bg-amber-50 text-amber-600",
    Resolved: "bg-gray-100 text-gray-500",
  };
  const dot: Record<ReviewStatus, string> = {
    Approved: "bg-emerald-500",
    Reported: "bg-red-500",
    Pending: "bg-amber-500",
    Resolved: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
}

type ActionKey = "approve" | "hide" | "remove" | "warn" | "suspend";

export default function ReviewModerationPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("All Reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<ActionKey | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fakeDelay(REVIEWS, 1100).then((data) => {
      if (!mounted) return;
      setReviews(data);
      setSelectedId(data[2]?.id ?? data[0]?.id ?? null);
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
    if (activeTab === "All Reviews") return reviews;
    if (activeTab === "Reported")
      return reviews.filter((r) => r.status === "Reported");
    if (activeTab === "Pending")
      return reviews.filter((r) => r.status === "Pending");
    if (activeTab === "Resolved")
      return reviews.filter((r) => r.status === "Resolved");
    // "Fake Reviews" — no dedicated field in the mock schema, approximate as
    // heavily-reported entries until a real fake-review classifier is wired up.
    return reviews.filter((r) => (r.reports ?? 0) >= 8);
  }, [activeTab, reviews]);

  const selected = reviews.find((r) => r.id === selectedId) ?? null;

  const runAction = async (action: ActionKey) => {
    if (!selected) return;
    setPendingAction(action);
    await fakeDelay(true, 900);

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== selected.id) return r;
        if (action === "approve")
          return { ...r, status: "Approved", reports: null };
        if (action === "hide") return { ...r, status: "Resolved" };
        if (action === "remove") return { ...r, status: "Resolved" };
        return r; // warn / suspend don't change review status
      }),
    );

    const messages: Record<ActionKey, string> = {
      approve: `Review ${selected.id} approved`,
      hide: `Review ${selected.id} hidden from public view`,
      remove: `Review ${selected.id} removed`,
      warn: `Warning sent to ${selected.customer}`,
      suspend: `${selected.customer} suspended from reviewing`,
    };
    setToast(messages[action]);
    setPendingAction(null);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* <Sidebar active="Reviews" /> */}

      <div className="flex-1">
        {/* <Topbar crumb="Review Moderation" /> */}

        <main className="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-semibold text-gray-900">
                Review Moderation
              </h1>
              <p className="mt-1 text-[14px] text-gray-400">
                Review customer feedback, remove fake reviews and manage
                reported content.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <>
                  <Skeleton className="h-28 w-full rounded-2xl" />
                  <Skeleton className="h-28 w-full rounded-2xl" />
                  <Skeleton className="h-28 w-full rounded-2xl" />
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <Star className="h-4 w-4 fill-red-500" />
                    </span>
                    <p className="mt-3 text-[24px] font-semibold text-gray-900">
                      {REVIEW_STATS.totalReviews.toLocaleString()}
                    </p>
                    <p className="text-[12px] text-gray-400">Total Reviews</p>
                    <p className="mt-1 text-[11px] font-medium text-emerald-500">
                      {REVIEW_STATS.totalReviewsDelta}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-500">
                      <Clock className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-[24px] font-semibold text-gray-900">
                      {REVIEW_STATS.pendingReports}
                    </p>
                    <p className="text-[12px] text-gray-400">Pending Reports</p>
                    <p className="mt-1 text-[11px] font-medium text-emerald-500">
                      Needs review
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                      <Star className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-[24px] font-semibold text-gray-900">
                      {REVIEW_STATS.avgRating}
                    </p>
                    <p className="text-[12px] text-gray-400">Avg. Rating</p>
                    <p className="mt-1 text-[11px] font-medium text-gray-400">
                      Platform avg
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Table card */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      disabled={loading}
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors disabled:opacity-40 ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full border border-gray-200 px-3.5 py-1.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50">
                    Newest
                  </button>
                  <button className="rounded-full border border-gray-200 px-3.5 py-1.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50">
                    Lowest Rating
                  </button>
                </div>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="text-[11px] font-semibold tracking-wide text-gray-400">
                      <th className="pb-3 pr-4">REVIEW ID</th>
                      <th className="pb-3 pr-4">CUSTOMER</th>
                      <th className="pb-3 pr-4">ARTIST</th>
                      <th className="pb-3 pr-4">RATING</th>
                      <th className="pb-3 pr-4">SNIPPET</th>
                      <th className="pb-3 pr-4">REPORTS</th>
                      <th className="pb-3 pr-4">STATUS</th>
                      <th className="pb-3">DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <tr key={i} className="border-t border-gray-50">
                            <td className="py-3.5" colSpan={8}>
                              <Skeleton className="h-8 w-full rounded-lg" />
                            </td>
                          </tr>
                        ))
                      : filtered.map((r) => (
                          <tr
                            key={r.id}
                            onClick={() => setSelectedId(r.id)}
                            className={`cursor-pointer border-t border-gray-50 transition-colors hover:bg-gray-50/70 ${
                              selectedId === r.id ? "bg-pink-50/40" : ""
                            }`}
                          >
                            <td className="py-3.5 pr-4 font-medium text-gray-400">
                              {r.id}
                            </td>
                            <td className="py-3.5 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-300 text-[10px] font-semibold text-white">
                                  {r.customerInitials}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {r.customer}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 pr-4 text-gray-500">
                              {r.artist}
                            </td>
                            <td className="py-3.5 pr-4">
                              <Stars rating={r.rating} />
                            </td>
                            <td className="py-3.5 pr-4 max-w-[160px] truncate text-gray-500">
                              {r.snippet}
                            </td>
                            <td className="py-3.5 pr-4">
                              {r.reports ? (
                                <span className="flex items-center gap-1 font-medium text-red-500">
                                  <AlertTriangle className="h-3 w-3" />
                                  {r.reports}
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="py-3.5 pr-4">
                              <StatusPill status={r.status} />
                            </td>
                            <td className="py-3.5 text-gray-400">{r.date}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
                {!loading && filtered.length === 0 && (
                  <p className="py-10 text-center text-[13px] text-gray-400">
                    No reviews match this filter.
                  </p>
                )}
              </div>

              {!loading && (
                <div className="mt-5 flex items-center justify-between text-[12px] text-gray-400">
                  <span>
                    Showing {filtered.length} of {reviews.length} reviews
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((n) => (
                      <button
                        key={n}
                        className={`h-7 w-7 rounded-full text-[12px] font-medium ${
                          n === 1
                            ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <span className="px-1">…</span>
                    <button className="h-7 w-7 rounded-full text-[12px] font-medium text-gray-400 hover:bg-gray-50">
                      18
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right column — review detail + admin actions */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-gray-900">
                  Review Details
                </p>
                {!loading && selected && (
                  <StatusPill status={selected.status} />
                )}
              </div>

              {loading || !selected ? (
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              ) : (
                <>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-300 text-[11px] font-semibold text-white">
                      {selected.customerInitials}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.customer}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Customer · BK-{selected.id.slice(4)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-500">
                      {selected.artist
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">
                        {selected.artist}
                      </p>
                      <p className="text-[11px] text-gray-400">Beauty Artist</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Stars rating={selected.rating} />
                    <span className="text-[13px] font-semibold text-gray-900">
                      {selected.rating}.0
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
                    {selected.fullReview}
                  </p>

                  {selected.photos > 0 && (
                    <div className="mt-3 flex gap-2">
                      {Array.from({ length: selected.photos }).map((_, i) => (
                        <span
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-300"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-[11px] text-gray-300">
                    Submitted {selected.date}
                  </p>
                </>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <p className="mb-3 text-[13px] font-semibold text-gray-900">
                Admin Actions
              </p>
              <div className="space-y-2.5">
                <ActionButton
                  label="Approve Review"
                  icon={CheckCircle2}
                  tone="brand"
                  loading={pendingAction === "approve"}
                  disabled={loading || pendingAction !== null}
                  onClick={() => runAction("approve")}
                />
                <ActionButton
                  label="Hide Review"
                  icon={EyeOff}
                  tone="neutral"
                  loading={pendingAction === "hide"}
                  disabled={loading || pendingAction !== null}
                  onClick={() => runAction("hide")}
                />
                <ActionButton
                  label="Remove Review"
                  icon={Trash2}
                  tone="danger"
                  loading={pendingAction === "remove"}
                  disabled={loading || pendingAction !== null}
                  onClick={() => runAction("remove")}
                />
                <ActionButton
                  label="Warn User"
                  icon={AlertTriangle}
                  tone="warning"
                  loading={pendingAction === "warn"}
                  disabled={loading || pendingAction !== null}
                  onClick={() => runAction("warn")}
                />
                <ActionButton
                  label="Suspend Reviewer"
                  icon={ShieldAlert}
                  tone="danger"
                  loading={pendingAction === "suspend"}
                  disabled={loading || pendingAction !== null}
                  onClick={() => runAction("suspend")}
                />
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-[13px] text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  tone,
  loading,
  disabled,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  tone: "brand" | "neutral" | "danger" | "warning";
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const toneStyles: Record<typeof tone, string> = {
    brand:
      "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200",
    neutral: "border border-gray-200 text-gray-600 hover:bg-gray-50",
    danger: "border border-red-100 text-red-500 hover:bg-red-50",
    warning: "border border-amber-100 text-amber-600 hover:bg-amber-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-opacity disabled:opacity-40 ${toneStyles[tone]}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {loading ? "Working…" : label}
    </button>
  );
}
