"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

interface UploadImageModalProps {
  onClose: () => void;
  onUpload: (tags: string) => void;
}

export function UploadImageModal({ onClose, onUpload }: UploadImageModalProps) {
  const [tags, setTags] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-hairline">
          <div>
            <h2 className="font-extrabold text-ink">Upload Image</h2>
            <p className="text-xs text-subtle mt-1">
              Add a new beauty inspiration image
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink/60">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <label className="block border-2 border-dashed border-hairline rounded-2xl py-10 text-center cursor-pointer hover:border-brand-pinkDeep/40 transition-colors">
            <input type="file" accept="image/*" className="hidden" />
            <div className="w-11 h-11 rounded-full bg-accent mx-auto flex items-center justify-center mb-3">
              <UploadCloud size={18} className="text-brand-pinkDeep" />
            </div>
            <p className="text-sm font-bold text-ink">
              Drag & drop your image here
            </p>
            <p className="text-xs text-subtle mt-1">or click to browse files</p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {["JPG", "PNG", "WEBP", "Max 10 MB"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-ink/60 bg-muted rounded-md px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </label>

          <div>
            <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
              Tags
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="bridal, glow, natural (comma separated)"
              className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={() => onUpload(tags)}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-gradient text-white text-sm font-bold rounded-full py-3 hover:opacity-90 transition-opacity"
          >
            <UploadCloud size={15} /> Upload Image
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-hairline text-sm font-semibold text-ink hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}