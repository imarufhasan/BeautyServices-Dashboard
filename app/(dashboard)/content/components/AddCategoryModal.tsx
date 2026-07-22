"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";

interface AddCategoryModalProps {
  onClose: () => void;
  onSave: (payload: {
    name: string;
    subCategory: string;
    description: string;
  }) => void;
}

export function AddCategoryModal({ onClose, onSave }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-hairline">
          <h2 className="font-extrabold text-ink">Add Category</h2>
          <button onClick={onClose} aria-label="Close" className="text-ink/60">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <div>
            <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hair & Styling"
              className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
                Sub-category Name
              </label>
              <button
                type="button"
                aria-label="Add sub-category"
                className="w-5 h-5 rounded-full bg-brand-gradient text-white flex items-center justify-center"
              >
                <Plus size={12} />
              </button>
            </div>
            <input
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="e.g. Hair & Styling"
              className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-subtle uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this category..."
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-hairline bg-muted/60 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-pinkDeep/30 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-4 border-t border-hairline">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-hairline text-sm font-semibold text-ink hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, subCategory, description })}
            className="flex items-center gap-2 bg-brand-gradient text-white text-sm font-bold rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity"
          >
            <Check size={15} /> Save Category
          </button>
        </div>
      </div>
    </div>
  );
}