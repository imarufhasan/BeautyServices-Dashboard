"use client";

import Image from "next/image";
import { MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Banner } from "../data";

const STATUS_STYLES: Record<Banner["status"], string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Scheduled: "bg-amber-50 text-amber-600",
  Draft: "bg-slate-100 text-slate-500",
};

interface BannersViewProps {
  banners: Banner[];
  onAddBanner: () => void;
}

export function BannersView({ banners, onAddBanner }: BannersViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-hairline shadow-soft">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="font-bold text-ink">Homepage Banners</h2>
        <button
          onClick={onAddBanner}
          className="flex items-center gap-1.5 bg-brand-gradient text-white text-sm font-bold rounded-full px-4 py-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={15} /> Add Banner
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-hairline text-[11px] font-bold text-subtle uppercase tracking-wide">
              <th className="text-left px-6 py-3">Preview</th>
              <th className="text-left px-6 py-3">Banner Title</th>
              <th className="text-left px-6 py-3">CTA</th>
              <th className="text-left px-6 py-3">Target Page</th>
              <th className="text-left px-6 py-3">Order</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Schedule</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-b border-hairline last:border-0">
                <td className="px-6 py-4">
                  <div className="w-16 h-11 rounded-lg overflow-hidden relative bg-muted">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-ink">{banner.title}</p>
                  <p className="text-xs text-subtle max-w-[220px] truncate">
                    {banner.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                    {banner.ctaText}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink/70">{banner.targetPage}</td>
                <td className="px-6 py-4">
                  <span className="w-6 h-6 rounded-full bg-muted text-xs font-bold text-ink flex items-center justify-center">
                    {banner.order}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full",
                      STATUS_STYLES[banner.status],
                    )}
                  >
                    {banner.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink/70 whitespace-nowrap">
                  {banner.scheduleLabel}
                </td>
                <td className="px-6 py-4">
                  <button aria-label="More" className="text-subtle hover:text-ink">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}