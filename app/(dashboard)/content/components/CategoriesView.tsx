"use client";

import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "../data";

interface CategoriesViewProps {
  categories: Category[];
  onAddCategory: () => void;
}

export function CategoriesView({
  categories,
  onAddCategory,
}: CategoriesViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-hairline shadow-soft">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="font-bold text-ink">Category Management</h2>
        <div className="flex items-center gap-3">
          <button
            aria-label="Search categories"
            className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-subtle hover:bg-muted"
          >
            <Search size={15} />
          </button>
          <button
            onClick={onAddCategory}
            className="flex items-center gap-1.5 bg-brand-gradient text-white text-sm font-bold rounded-full px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> Add Category
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-hairline text-[11px] font-bold text-subtle uppercase tracking-wide">
              <th className="text-left px-6 py-3">No</th>
              <th className="text-left px-6 py-3">Category Name</th>
              <th className="text-left px-6 py-3">Description</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-hairline last:border-0">
                <td className="px-6 py-4 text-ink/70">{cat.no}</td>
                <td className="px-6 py-4 font-bold text-ink">{cat.name}</td>
                <td className="px-6 py-4 text-subtle">{cat.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold w-fit",
                      cat.status === "Active"
                        ? "text-emerald-600"
                        : "text-subtle",
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        cat.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-slate-400",
                      )}
                    />
                    {cat.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button aria-label="Edit" className="text-blue-500 hover:text-blue-600">
                      <Pencil size={15} />
                    </button>
                    <button aria-label="Delete" className="text-rose-500 hover:text-rose-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}