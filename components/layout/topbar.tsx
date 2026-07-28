"use client";

import { Bell, Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AccountDropdown from "../common/AccountDropdown";

const notifications = [
  {
    id: 1,
    title: "New refund request",
    message: "Customer requested a refund for booking BK-2025-015",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "New booking received",
    message: "A new beauty service booking request has arrived",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment completed",
    message: "Payment for booking BK-2025-014 was successful",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    title: "Provider verification completed",
    message: "Sarah Williams completed account verification",
    time: "Yesterday",
    unread: false,
  },
];

export function Topbar({
  section,
  page,
}: {
  section: string;
  page: string;
}) {
  const router = useRouter();
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <header className="h-16 border-b border-hairline bg-white/70 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Breadcrumb */}
      <div className="text-sm">
        <span className="text-subtle font-medium">{section}</span>
        <span className="mx-1.5 text-subtle">›</span>
        <span className="text-ink font-bold">{page}</span>
      </div>


      <div className="flex items-center gap-4 relative">

        {/* Notification Button */}
        <button
          onClick={() => setOpenNotification(!openNotification)}
          className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition"
        >
          <Bell size={17} className="text-ink" />

          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-pinkDeep text-white text-[9px] font-bold flex items-center justify-center">
            4
          </span>
        </button>


        {/* Notification Dropdown */}
        {openNotification && (
          <div className="absolute right-0 top-12 w-[380px] bg-white rounded-2xl border border-hairline shadow-xl overflow-hidden">

            {/* Header */}
            <div className="px-5 py-4 border-b border-hairline flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink">
                  Notifications
                </h3>
                <p className="text-xs text-subtle mt-1">
                  You have 4 unread notifications
                </p>
              </div>

              <button className="text-xs text-brand-pinkDeep font-semibold hover:underline">
                Mark all read
              </button>
            </div>


            {/* List */}
            <div className="max-h-[380px] overflow-y-auto">

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`px-5 py-4 flex gap-3 hover:bg-muted/50 cursor-pointer border-b border-hairline last:border-0 ${
                    item.unread ? "bg-pink-50/40" : ""
                  }`}
                >

                  {/* Icon */}
                  <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <Bell
                      size={15}
                      className="text-brand-pinkDeep"
                    />
                  </div>


                  <div className="flex-1">

                    <div className="flex justify-between gap-2">
                      <h4 className="text-sm font-bold text-ink">
                        {item.title}
                      </h4>

                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-brand-pinkDeep mt-1.5" />
                      )}
                    </div>


                    <p className="text-xs text-subtle mt-1 leading-relaxed">
                      {item.message}
                    </p>


                    <span className="text-[11px] text-subtle block mt-2">
                      {item.time}
                    </span>

                  </div>

                </div>
              ))}

            </div>


            {/* Footer */}
            <button
              onClick={() => router.push("/NotificationsList")}
              className="w-full py-3 border-t border-hairline flex items-center justify-center gap-2 text-sm font-semibold text-brand-pinkDeep hover:bg-muted transition"
            >
              View all notifications
              <ChevronRight size={15}/>
            </button>

          </div>
        )}


        <div className="pl-4 border-l border-hairline">
          <AccountDropdown />
        </div>

      </div>
    </header>
  );
}