"use client";

import { Bell } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { notifications } from "@/lib/notificationData";


export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Topbar section="Dashboard" page="Notifications" />

      <main className="px-8 py-7">
        <div className="bg-white rounded-2xl border border-hairline shadow-soft">
          <div className="p-6 border-b border-hairline">
            <h1 className="text-2xl font-extrabold text-ink">
              Notifications
            </h1>
            <p className="text-sm text-subtle mt-1">
              View your latest updates and alerts
            </p>
          </div>

          <div>
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-5 border-b border-hairline last:border-0 hover:bg-muted/40"
              >
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                  <Bell size={18} className="text-brand-pinkDeep" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-ink">
                      {item.title}
                    </h3>

                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-brand-pinkDeep mt-2" />
                    )}
                  </div>

                  <p className="text-sm text-subtle mt-1">
                    {item.message}
                  </p>

                  <p className="text-xs text-subtle mt-2">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}