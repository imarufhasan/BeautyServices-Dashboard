"use client";

import { useMemo, useState } from "react";
import { Grid3x3, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { getContentOverview, type ContentTab } from "./data";
import { AdminTopbar } from "@/components/dashboard/admin-topbar";
import { BannersView } from "./components/BannersView";
import { CategoriesView } from "./components/CategoriesView";
import { InspirationView } from "./components/InspirationView ";
import { UploadImageModal } from "./components/UploadImageModal";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { CreateBannerModal } from "./components/CreateBannerModal";
import { Topbar } from "@/components/layout/topbar";

const SUB_NAV: { id: ContentTab; label: string; icon: typeof Grid3x3 }[] = [
  { id: "banners", label: "Banners", icon: ImageIcon },
  { id: "categories", label: "Categories", icon: Grid3x3 },
  { id: "inspiration", label: "Beauty Inspiration Add", icon: LayoutGrid },
];

export default function ContentPage() {
  // In production this comes from `await fetch("/api/admin/content")`.
  const content = useMemo(() => getContentOverview(), []);

  const [activeTab, setActiveTab] = useState<ContentTab>("banners");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* <AdminTopbar breadcrumb={["Admin", "Content Management"]} /> */}

      <Topbar section="memillennial" page="Content" />

      <main className="flex-1 px-8 py-7">
        {activeTab !== "inspiration" && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-ink">
                Content Management
              </h1>
              <p className="text-sm text-subtle mt-1">
                Manage homepage content, categories, services and promotional
                banners.
              </p>
            </div>
          </div>
        )}

        <div
          className={cn(
            "grid gap-6",
            activeTab === "inspiration"
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-[220px_1fr]",
          )}
        >
          {activeTab !== "inspiration" && (
            <nav className="bg-white rounded-2xl border border-hairline shadow-soft p-2 h-fit">
              {SUB_NAV.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-left transition-colors",
                      isActive
                        ? "bg-rose-50 text-brand-pinkDeep"
                        : "text-ink/70 hover:bg-muted",
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}

          <div>
            {activeTab === "banners" && (
              <BannersView
                banners={content.banners}
                onAddBanner={() => setShowBannerModal(true)}
              />
            )}
            {activeTab === "categories" && (
              <CategoriesView
                categories={content.categories}
                onAddCategory={() => setShowCategoryModal(true)}
              />
            )}
            {activeTab === "inspiration" && (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setActiveTab("banners")}
                    className="text-xs font-semibold text-subtle hover:text-ink"
                  >
                    ← Back to Content Management
                  </button>
                </div>
                <InspirationView
                  images={content.inspirationImages}
                  onUpload={() => setShowUploadModal(true)}
                />
              </>
            )}
          </div>
        </div>

        {activeTab !== "inspiration" && (
          <div className="flex items-center justify-end gap-3 mt-6">
            <button className="px-6 py-2.5 rounded-full border border-hairline text-sm font-semibold text-ink hover:bg-muted transition-colors">
              Discard
            </button>
            <button className="bg-brand-gradient text-white text-sm font-bold rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        )}
      </main>

      {showUploadModal && (
        <UploadImageModal
          onClose={() => setShowUploadModal(false)}
          onUpload={() => setShowUploadModal(false)}
        />
      )}
      {showCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSave={() => setShowCategoryModal(false)}
        />
      )}
      {showBannerModal && (
        <CreateBannerModal
          onClose={() => setShowBannerModal(false)}
          onCreate={() => setShowBannerModal(false)}
        />
      )}
    </div>
  );
}
