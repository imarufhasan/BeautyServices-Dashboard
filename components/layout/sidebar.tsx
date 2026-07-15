"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  ShieldCheck,
  CalendarCheck,
  RotateCcw,
  Wallet,
  FileText,
  Star,
  Bell,
  BarChart3,
  LifeBuoy,
  ScrollText,
  ChevronRight,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/users", label: "Users", icon: Users },
  { href: "/verification", label: "Verification", icon: ShieldCheck, badge: 23 },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/refunds", label: "Cancellation & Refund", icon: RotateCcw, badge: 47 },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: 5 },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/support", label: "Support", icon: LifeBuoy, badge: 3 },
  { href: "/policies", label: "Policies", icon: ScrollText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-hairline h-screen sticky top-0 flex flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center">
          <Gem size={16} className="text-white" fill="white" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-ink leading-none">
            memillennial
          </p>
          <p className="text-[10px] font-bold text-subtle tracking-wide mt-0.5">
            ADMIN PANEL
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-brand-gradient text-white shadow-soft"
                  : "text-ink/80 hover:bg-muted",
              )}
            >
              <Icon size={17} />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span
                  className={cn(
                    "text-[10px] font-bold rounded-full px-2 py-0.5",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-accent text-brand-pinkDeep",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-hairline">
        <button className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-muted transition-colors">
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
            AO
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-bold text-ink leading-none">
              Alex O&apos;Brien
            </p>
            <p className="text-[10px] text-subtle mt-1">Super Admin</p>
          </div>
          <ChevronRight size={15} className="text-subtle" />
        </button>
      </div>
    </aside>
  );
}
