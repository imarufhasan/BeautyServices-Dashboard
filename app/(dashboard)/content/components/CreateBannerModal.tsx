"use client";

import { useState } from "react";
import { ChevronDown, UploadCloud, X } from "lucide-react";

interface CreateBannerModalProps {
  onClose: () => void;
  onCreate: (payload: Record<string, string>) => void;
}

export function CreateBannerModal({ onClose, onCreate }: CreateBannerModalProps) {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    ctaText: "",
    ctaDestination: "",
    startDate: "",
    endDate: "",
    priority: "",
    status: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md my-8 shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-hairline">
          <h2 className="font-extrabold text-ink">Create Banner</h2>
          <button onClick={onClose} aria-label="Close" className="text-ink/60">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <label className="block border-2 border-dashed border-rose-200 bg-rose-50/40 rounded-2xl py-8 text-center cursor-pointer">
            <input type="file" accept="image/*" className="hidden" />
            <div className="w-11 h-11 rounded-full bg-accent mx-auto flex items-center justify-center mb-3">
              <UploadCloud size={18} className="text-brand-pinkDeep" />
            </div>
            <p className="text-sm font-bold text-ink">Upload Banner Image</p>
            <p className="text-xs text-subtle mt-1">
              PNG, JPG up to 5MB · 1440×500px recommended
            </p>
          </label>

          <TextField
            label="Banner Title"
            placeholder="e.g. Summer Glow Collection"
            value={form.title}
            onChange={(v) => update("title", v)}
          />
          <TextField
            label="Subtitle"
            placeholder="Short promotional message"
            value={form.subtitle}
            onChange={(v) => update("subtitle", v)}
          />
          <TextField
            label="CTA Button Text"
            placeholder="e.g. Book Now"
            value={form.ctaText}
            onChange={(v) => update("ctaText", v)}
          />
          <TextField
            label="CTA Destination"
            placeholder="/browse/summer"
            value={form.ctaDestination}
            onChange={(v) => update("ctaDestination", v)}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Start Date"
              type="date"
              value={form.startDate}
              onChange={(v) => update("startDate", v)}
            />
            <TextField
              label="End Date"
              type="date"
              value={form.endDate}
              onChange={(v) => update("endDate", v)}
            />
          </div>

          <SelectField
            label="Priority"
            value={form.priority}
            options={["High", "Medium", "Low"]}
            onChange={(v) => update("priority", v)}
          />
          <SelectField
            label="Status"
            value={form.status}
            options={["Active", "Scheduled", "Draft"]}
            onChange={(v) => update("status", v)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-4 border-t border-hairline">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-hairline text-sm font-semibold text-ink hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate(form)}
            className="bg-brand-gradient text-white text-sm font-bold rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity"
          >
            Create Banner
          </button>
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle pointer-events-none"
        />
      </div>
    </div>
  );
}