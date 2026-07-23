"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  MessageCircle,
  Mail,
  Globe,
  Megaphone,
  Upload,
  Eye,
  Save,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { AUDIENCE_OPTIONS, AudienceOption, fakeDelay, NotificationChannel, RECENT_NOTIFICATIONS } from "@/lib/mockData";
import Skeleton from "@/components/dashboard/Skeleton";


const CHANNELS: { key: NotificationChannel; icon: React.ElementType }[] = [
  { key: "Push", icon: Smartphone },
  { key: "SMS", icon: MessageCircle },
  { key: "Email", icon: Mail },
  { key: "System Alert", icon: Globe },
  { key: "Announcements", icon: Megaphone },
];

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<NotificationChannel>("Push");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState<AudienceOption["key"]>("all");
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");
  const [scheduleMode, setScheduleMode] = useState<"now" | "later">("now");

  // Simulate initial fetch of audience counts + recent notification history
  useEffect(() => {
    let mounted = true;
    fakeDelay(true, 1000).then(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const selectedAudience = AUDIENCE_OPTIONS.find((a) => a.key === audience)!;

  const handleSend = async () => {
    setSendState("sending");
    await fakeDelay(true, 1400);
    setSendState("sent");
    setTimeout(() => setSendState("idle"), 2200);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* <Sidebar active="Notifications" /> */}

      <div className="flex-1">
        {/* <Topbar crumb="Notifications" /> */}

        <main className="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-semibold text-gray-900">Notifications</h1>
              <p className="mt-1 text-[14px] text-gray-400">
                Create and manage platform-wide notifications and campaigns.
              </p>
            </div>

            {/* Create notification card */}
            <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-100">
              <h2 className="text-[17px] font-semibold text-gray-900">Create Notification</h2>
              <p className="mt-1 text-[13px] text-gray-400">
                Compose and send a notification to your users.
              </p>

              {/* Channel selector */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                NOTIFICATION CHANNEL
              </p>
              {loading ? (
                <div className="flex gap-2">
                  {CHANNELS.map((c) => (
                    <Skeleton key={c.key} className="h-9 w-24 rounded-full" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {CHANNELS.map((c) => {
                    const Icon = c.icon;
                    const isActive = channel === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setChannel(c.key)}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                            : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {c.key}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Title */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                NOTIFICATION TITLE
              </p>
              {loading ? (
                <Skeleton className="h-11 w-full rounded-xl" />
              ) : (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Sale Extended!"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-[14px] text-gray-900 outline-none placeholder:text-gray-300 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              )}

              {/* Message */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                NOTIFICATION MESSAGE
              </p>
              {loading ? (
                <Skeleton className="h-24 w-full rounded-xl" />
              ) : (
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your notification message here..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-[14px] text-gray-900 outline-none placeholder:text-gray-300 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              )}

              {/* Banner image */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                BANNER IMAGE (OPTIONAL)
              </p>
              {loading ? (
                <Skeleton className="h-24 w-full rounded-xl" />
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-pink-200 bg-pink-50/40 py-7 text-center hover:bg-pink-50">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-medium text-gray-700">Upload Banner Image</span>
                  <span className="text-[11px] text-gray-400">PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/png,image/jpeg" className="hidden" />
                </label>
              )}

              {/* Audience selection */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                AUDIENCE SELECTION
              </p>
              {loading ? (
                <div className="space-y-2">
                  {AUDIENCE_OPTIONS.map((a) => (
                    <Skeleton key={a.key} className="h-12 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {AUDIENCE_OPTIONS.map((a) => {
                    const isActive = audience === a.key;
                    return (
                      <button
                        key={a.key}
                        onClick={() => setAudience(a.key)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-[13px] transition-colors ${
                          isActive
                            ? "border-pink-200 bg-pink-50/60 text-gray-900"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                              isActive ? "border-pink-500" : "border-gray-300"
                            }`}
                          >
                            {isActive && <span className="h-2 w-2 rounded-full bg-pink-500" />}
                          </span>
                          {a.label}
                        </span>
                        <span className="font-medium text-gray-400">
                          {a.count !== null ? a.count.toLocaleString() : "—"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Scheduling */}
              <p className="mb-2 mt-6 text-[11px] font-semibold tracking-wide text-gray-400">
                SCHEDULING
              </p>
              {loading ? (
                <div className="flex gap-3">
                  <Skeleton className="h-11 flex-1 rounded-xl" />
                  <Skeleton className="h-11 flex-1 rounded-xl" />
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setScheduleMode("now")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      scheduleMode === "now"
                        ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send Now
                  </button>
                  <button
                    onClick={() => setScheduleMode("later")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      scheduleMode === "later"
                        ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm shadow-pink-200"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    Schedule Later
                  </button>
                </div>
              )}

              {/* Action row */}
              <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
                <button
                  disabled={loading}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </button>
                <button
                  disabled={loading}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Draft
                </button>
                <button
                  disabled={loading || sendState !== "idle"}
                  onClick={handleSend}
                  className="flex min-w-[168px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-2 text-[13px] font-medium text-white shadow-sm shadow-pink-200 transition-opacity disabled:opacity-70"
                >
                  {sendState === "sending" && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Sending…
                    </>
                  )}
                  {sendState === "sent" && (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Sent!
                    </>
                  )}
                  {sendState === "idle" && (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send Notification
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Recent notifications */}
            <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-100">
              <h2 className="text-[17px] font-semibold text-gray-900">Recent Notifications</h2>
              <p className="mt-1 text-[13px] text-gray-400">Your last few campaigns.</p>

              <div className="mt-5 space-y-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))
                  : RECENT_NOTIFICATIONS.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
                      >
                        <div>
                          <p className="text-[13px] font-medium text-gray-900">{n.title}</p>
                          <p className="mt-0.5 line-clamp-1 text-[12px] text-gray-400">{n.message}</p>
                          <p className="mt-1 text-[11px] text-gray-300">
                            {n.channel} · {n.audience} · {n.sentAt}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${
                            n.status === "Sent"
                              ? "bg-emerald-50 text-emerald-600"
                              : n.status === "Scheduled"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {n.status}
                        </span>
                      </div>
                    ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <p className="mb-4 text-[11px] font-semibold tracking-wide text-gray-400">LIVE PREVIEW</p>

              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full rounded-2xl" />
                  <Skeleton className="h-24 w-full rounded-2xl" />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Push mock */}
                  <div className="rounded-2xl bg-gray-900 p-4 text-white">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-[8px] font-bold">
                        m
                      </span>
                      memillennial · now
                    </div>
                    <p className="mt-1.5 text-[13px] font-semibold">
                      {title || "Summer Sale Extended!"}
                    </p>
                    <p className="mt-0.5 text-[12px] text-gray-300">
                      {message ||
                        "Your favorite beauty services are now 20% off. Book before July 31."}
                    </p>
                  </div>

                  {/* Email mock */}
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 text-[11px] font-bold text-white">
                        m
                      </span>
                      <div>
                        <p className="text-[12px] font-medium text-gray-900">memillennial</p>
                        <p className="text-[11px] text-gray-400">no-reply@memillennial.com</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold text-gray-900">
                      {title || "Summer Sale Extended!"}
                    </p>
                    <p className="text-[12px] text-gray-400">
                      {message ? message.slice(0, 40) + (message.length > 40 ? "…" : "") : "Your message will appear here…"}
                    </p>
                    <button className="mt-3 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 py-2 text-[12px] font-medium text-white">
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
              <p className="mb-3 text-[11px] font-semibold tracking-wide text-gray-400">
                AUDIENCE SUMMARY
              </p>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-28 rounded-md" />
                  <Skeleton className="mt-3 h-4 w-20 rounded-md" />
                </>
              ) : (
                <>
                  <p className="text-[26px] font-semibold text-gray-900">
                    {selectedAudience.count !== null ? selectedAudience.count.toLocaleString() : "—"}
                  </p>
                  <p className="text-[13px] text-gray-400">{selectedAudience.label}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-400">
                    <Smartphone className="h-3.5 w-3.5" />
                    via {channel}
                  </div>
                </>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}