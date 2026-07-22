"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";
import type { InspirationImage } from "../data";

const TAG_STYLES: Record<string, string> = {
  Party: "bg-violet-50 text-violet-600",
  Natural: "bg-emerald-50 text-emerald-600",
  Formal: "bg-indigo-50 text-indigo-600",
  Wedding: "bg-amber-50 text-amber-600",
  "Luxury Glam": "bg-orange-50 text-orange-600",
  Festival: "bg-rose-50 text-rose-500",
};

interface InspirationViewProps {
  images: InspirationImage[];
  onUpload: () => void;
}

export function InspirationView({ images, onUpload }: InspirationViewProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            Beauty Inspiration Management
          </h1>
          <p className="text-sm text-subtle mt-1">
            Manage inspiration images displayed inside the mobile application.
          </p>
        </div>
        <button
          onClick={onUpload}
          className="flex items-center gap-2 bg-brand-gradient text-white text-sm font-bold rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          <Upload size={15} /> Upload Images
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-2xl border border-hairline shadow-soft overflow-hidden"
          >
            <div className="relative aspect-square bg-muted">
              <Image
                src={img.imageUrl}
                alt={img.tag}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                onClick={() => toggle(img.id)}
                aria-label="Select image"
                className={`absolute top-3 left-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  selected.has(img.id)
                    ? "bg-brand-pinkDeep border-brand-pinkDeep"
                    : "bg-white/90 border-white"
                }`}
              >
                {selected.has(img.id) && (
                  <span className="w-2 h-2 rounded-sm bg-white" />
                )}
              </button>
            </div>
            <div className="px-4 py-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  TAG_STYLES[img.tag] ?? "bg-muted text-ink/70"
                }`}
              >
                {img.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}