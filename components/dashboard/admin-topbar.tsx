"use client";

import { Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminTopbarProps {
  /** e.g. "Cancellation & Refund" */
  title?: string;
  /** e.g. "memillennial Admin · Handle refunds and cancellations" */
  subtitle?: string;
  /** e.g. ["Admin", "Content Management"] – renders as breadcrumb instead of title/subtitle */
  breadcrumb?: string[];
  hasNotification?: boolean;
}

export function AdminTopbar({
  title,
  subtitle,
  breadcrumb,
  hasNotification = true,
}: AdminTopbarProps) {
  return (
    <header className="h-[73px] shrink-0 flex items-center justify-between px-8 border-b border-hairline bg-white">
      <div>
        {breadcrumb ? (
          <nav className="flex items-center gap-1.5 text-sm">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} className="text-subtle" />}
                <span
                  className={cn(
                    i === breadcrumb.length - 1
                      ? "font-semibold text-ink"
                      : "text-subtle",
                  )}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        ) : (
          <>
            <h1 className="text-lg font-extrabold text-ink leading-none">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-subtle mt-1.5">{subtitle}</p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full border border-hairline flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Bell size={16} className="text-ink/70" />
          {hasNotification && (
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-brand-pinkDeep" />
          )}
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 pl-1 pr-1"
        >
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
            AO
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-bold text-ink">Alex O&apos;Brien</p>
            <p className="text-[10px] text-subtle">Super Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}