"use client";

import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  iconClassName?: string;
  value: string;
  label: string;
  sublabel?: string;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
}

export function StatCard({
  icon: Icon,
  iconClassName,
  value,
  label,
  sublabel,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-hairline p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center",
            iconClassName ?? "bg-brand-gradient",
          )}
        >
          <Icon size={18} className="text-white" />
        </div>

        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-bold",
              trend.direction === "up" ? "text-emerald-500" : "text-rose-500",
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}
            {trend.value}
          </span>
        )}
      </div>

      <p className="text-2xl font-extrabold text-ink mt-4">{value}</p>
      <p className="text-sm text-subtle mt-1">{label}</p>
      {sublabel && <p className="text-[11px] text-subtle/70">{sublabel}</p>}
    </div>
  );
}