"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  HelpCircle,
  FileText,
  ShieldQuestion,
  XCircle,
  DollarSign,
  BookOpen,
  ShieldCheck,
  AlertOctagon,
  Hash,
  Bold,
  Italic,
  AlignLeft,
  List,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  ChevronDown,
  Maximize2,
  Pencil,
  Eye,
  Clock,
  Archive,
  Sparkles,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import {
  POLICY_NAV,
  POLICY_DOCS,
  FAQ_ITEMS,
  fakeDelay,
  type PolicyKey,
  type FaqItem,
} from "@/lib/mockData";
import Skeleton from "@/components/dashboard/Skeleton";
import { Topbar } from "@/components/layout/topbar";

const NAV_ICONS: Record<PolicyKey, React.ElementType> = {
  faq: HelpCircle,
  terms: FileText,
  privacy: ShieldQuestion,
  cancellation: XCircle,
  refund: DollarSign,
  community: BookOpen,
  safety: ShieldCheck,
  incident: AlertOctagon,
};

const VIEWPORTS = ["Desktop", "Tablet", "Mobile"] as const;

type PublishState = "idle" | "publishing" | "published";
type SaveState = "idle" | "saving" | "saved";

export default function PolicyPagesPage() {
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState<PolicyKey>("privacy");
  const [viewport, setViewport] =
    useState<(typeof VIEWPORTS)[number]>("Desktop");
  const [draftText, setDraftText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [publishState, setPublishState] = useState<PublishState>("idle");
  const [toast, setToast] = useState<string | null>(null);

  // FAQ manager state
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [faqSearch, setFaqSearch] = useState("");
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [savingFaq, setSavingFaq] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fakeDelay(true, 1050).then(() => {
      if (!mounted) return;
      setFaqs(FAQ_ITEMS);
      setDraftText(POLICY_DOCS.privacy.body);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const doc = POLICY_DOCS[activeKey];

  const handleSelectDoc = (key: PolicyKey) => {
    setActiveKey(key);
    setPublishState("idle");
    if (key !== "faq") setDraftText(POLICY_DOCS[key].body);
  };

  // Simulated autosave: whenever the editor text changes, show a brief
  // "saving…" pulse before settling back to "auto-saving" (idle = green dot).
  // useEffect(() => {
  //   if (loading || activeKey === "faq") return;
  //   setSaveState("saving");
  //   const t = setTimeout(() => setSaveState("saved"), 700);
  //   const t2 = setTimeout(() => setSaveState("idle"), 1600);
  //   return () => {
  //     clearTimeout(t);
  //     clearTimeout(t2);
  //   };
  // }, [draftText]);

  useEffect(() => {
    if (loading || activeKey === "faq") return;

    const startSaving = setTimeout(() => {
      setSaveState("saving");
    }, 0);

    const savedTimer = setTimeout(() => {
      setSaveState("saved");
    }, 700);

    const idleTimer = setTimeout(() => {
      setSaveState("idle");
    }, 1600);

    return () => {
      clearTimeout(startSaving);
      clearTimeout(savedTimer);
      clearTimeout(idleTimer);
    };
  }, [draftText, loading, activeKey]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const handlePublish = async () => {
    setPublishState("publishing");
    await fakeDelay(true, 1300);
    setPublishState("published");
    setToast(`${doc.label} published successfully`);
    setTimeout(() => setPublishState("idle"), 2000);
  };

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return faqs;
    const q = faqSearch.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  }, [faqSearch, faqs]);

  const handleSaveFaq = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setSavingFaq(true);
    await fakeDelay(true, 1000);
    const newItem: FaqItem = {
      id: `FAQ-${(parseInt(faqs[0]?.id.split("-")[1] ?? "041") + 1).toString().padStart(3, "0")}`,
      question: newQuestion,
      answerPreview:
        newAnswer.length > 90 ? newAnswer.slice(0, 90) + "…" : newAnswer,
      category: newCategory || "General",
      status: "Draft",
      lastUpdated: "Just now",
    };
    setFaqs((prev) => [newItem, ...prev]);
    setNewQuestion("");
    setNewAnswer("");
    setNewCategory("");
    setSavingFaq(false);
    setShowFaqForm(false);
    setToast("FAQ entry saved as draft");
  };

  const handleDeleteFaq = async (id: string) => {
    setDeletingId(id);
    await fakeDelay(true, 700);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    setDeletingId(null);
    setToast(`${id} removed`);
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* <Sidebar active="Policies" /> */}

      <div className="flex-1">
        <Topbar section="memillennial" page="Policies" />

        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-[26px] font-semibold text-gray-900">
              Policy Pages
            </h1>
            <p className="mt-1 text-[14px] text-gray-400">
              Legal pages, FAQ management &amp; content publishing
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[290px_1fr]">
            {/* Left nav column */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-100">
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  <input
                    placeholder="Search..."
                    className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-[13px] outline-none placeholder:text-gray-300 focus:border-pink-300 focus:bg-white"
                  />
                </div>

                {loading ? (
                  <div className="space-y-1.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-9 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <nav className="space-y-1">
                    {POLICY_NAV.map((item) => {
                      const Icon = NAV_ICONS[item.key];
                      const isActive = item.key === activeKey;
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleSelectDoc(item.key)}
                          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                            isActive
                              ? "bg-linear-to-r from-pink-500 to-orange-400 font-medium text-white shadow-sm shadow-pink-200"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                )}
              </div>

              {!loading && doc.hasVersionHistory && (
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-100">
                  <p className="mb-3 px-1 text-[13px] font-semibold text-gray-900">
                    Version History
                  </p>
                  <div className="space-y-3">
                    {doc.history.map((h) => (
                      <div key={h.version} className="flex gap-2.5 px-1">
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            h.current ? "bg-pink-500" : "bg-gray-300"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[12.5px] font-semibold text-gray-900">
                              {h.version}
                            </span>
                            {h.current && (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-[11.5px] text-gray-400">
                            {h.author} · {h.date}
                          </p>
                          <p className="mt-1 text-[12px] leading-snug text-gray-500">
                            {h.note}
                          </p>
                          {h.restorable && (
                            <button className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-pink-500 hover:underline">
                              <RotateCcw className="h-3 w-3" />
                              Restore
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right content column */}
            <div className="space-y-6">
              {loading ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
                  <Skeleton className="h-6 w-48 rounded-md" />
                  <Skeleton className="mt-3 h-4 w-64 rounded-md" />
                  <Skeleton className="mt-5 h-10 w-full rounded-xl" />
                  <Skeleton className="mt-4 h-96 w-full rounded-xl" />
                </div>
              ) : activeKey === "faq" ? (
                <FaqManager
                  faqs={filteredFaqs}
                  search={faqSearch}
                  setSearch={setFaqSearch}
                  showForm={showFaqForm}
                  setShowForm={setShowFaqForm}
                  question={newQuestion}
                  setQuestion={setNewQuestion}
                  answer={newAnswer}
                  setAnswer={setNewAnswer}
                  category={newCategory}
                  setCategory={setNewCategory}
                  saving={savingFaq}
                  onSave={handleSaveFaq}
                  deletingId={deletingId}
                  onDelete={handleDeleteFaq}
                />
              ) : (
                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-[19px] font-semibold text-gray-900">
                      {doc.label}
                    </h2>
                    {doc.hasViewportToggle && (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 rounded-full bg-gray-50 p-1">
                          {VIEWPORTS.map((v) => (
                            <button
                              key={v}
                              onClick={() => setViewport(v)}
                              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                                viewport === v
                                  ? "bg-white text-gray-900 shadow-sm"
                                  : "text-gray-400"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                        <button className="rounded-full border border-gray-200 p-2 text-gray-400 hover:bg-gray-50">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[12.5px] text-gray-400">
                    <span>Version {doc.version}</span>
                    <span>·</span>
                    <span>Last updated {doc.lastUpdated}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      {saveState === "saving" ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="text-emerald-500">Auto-saving</span>
                        </>
                      )}
                    </span>
                    <span>·</span>
                    <span>Word count: {doc.wordCount.toLocaleString()}</span>
                  </div>

                  {/* Toolbar */}
                  <div className="mt-4 flex flex-wrap items-center gap-1 rounded-full border border-gray-200 px-2 py-1.5">
                    {[
                      Hash,
                      Bold,
                      Italic,
                      AlignLeft,
                      List,
                      Link2,
                      ImageIcon,
                      TableIcon,
                      Type,
                    ].map((Icon, i) => (
                      <button
                        key={i}
                        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                    <span className="mx-1 h-4 w-px bg-gray-200" />
                    <button className="flex items-center gap-1 rounded-full px-2 py-1 text-[12px] text-gray-400 hover:bg-gray-50">
                      Section Navigation
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Editor + sections */}
                  <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_180px]">
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
                        LIVE PREVIEW — {viewport.toUpperCase()}
                      </p>
                      <textarea
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                        rows={14}
                        className={`w-full resize-none rounded-2xl border border-gray-200 bg-white p-5 text-[13.5px] leading-relaxed text-gray-600 outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-100 ${
                          viewport === "Mobile"
                            ? "max-w-sm"
                            : viewport === "Tablet"
                              ? "max-w-xl"
                              : ""
                        }`}
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400">
                        SECTIONS
                      </p>
                      <ol className="space-y-2.5">
                        {doc.sections.map((s, i) => (
                          <li key={s}>
                            <button className="flex items-center gap-2 text-left text-[13px] text-gray-500 hover:text-pink-500">
                              <span className="text-gray-300">{i + 1}.</span>
                              {s}
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </section>
              )}

              {/* Bottom action bar — shared across all policy views */}
              {!loading && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setToast("Draft saved")}
                      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Save Draft
                    </button>
                    <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </button>
                    <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                      <Clock className="h-3.5 w-3.5" />
                      Schedule
                    </button>
                    <button
                      onClick={() => setToast(`${doc.label} archived`)}
                      className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      Archive
                    </button>
                  </div>
                  <button
                    onClick={handlePublish}
                    disabled={publishState !== "idle"}
                    className="flex min-w-42.5 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-5 py-2 text-[13px] font-medium text-white shadow-sm shadow-pink-200 disabled:opacity-80"
                  >
                    {publishState === "publishing" && (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Publishing…
                      </>
                    )}
                    {publishState === "published" && (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Published!
                      </>
                    )}
                    {publishState === "idle" && (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        Publish Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-[13px] text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function FaqManager({
  faqs,
  search,
  setSearch,
  showForm,
  setShowForm,
  question,
  setQuestion,
  answer,
  setAnswer,
  category,
  setCategory,
  saving,
  onSave,
  deletingId,
  onDelete,
}: {
  faqs: FaqItem[];
  search: string;
  setSearch: (v: string) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  question: string;
  setQuestion: (v: string) => void;
  answer: string;
  setAnswer: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  saving: boolean;
  onSave: () => void;
  deletingId: string | null;
  onDelete: (id: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-55">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-[13px] outline-none placeholder:text-gray-300 focus:border-pink-300 focus:bg-white"
          />
        </div>
        <select className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-500 outline-none">
          <option>All Categories</option>
          <option>Bookings</option>
          <option>Policy</option>
          <option>Artists</option>
          <option>Payments</option>
          <option>General</option>
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-4 py-2.5 text-[13px] font-medium text-white shadow-sm shadow-pink-200"
        >
          {showForm ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {showForm ? "Close" : "Add FAQ"}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 rounded-2xl border border-pink-100 bg-pink-50/30 p-5">
          <p className="mb-3 text-[13px] font-semibold text-gray-900">
            New FAQ Entry
          </p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question..."
            className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13.5px] outline-none placeholder:text-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Rich text answer..."
            rows={4}
            className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13.5px] outline-none placeholder:text-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-500 outline-none"
            >
              <option value="">Category</option>
              <option>Bookings</option>
              <option>Policy</option>
              <option>Artists</option>
              <option>Payments</option>
              <option>General</option>
            </select>
            <select className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-500 outline-none">
              <option>Draft</option>
              <option>Published</option>
            </select>
            <input
              placeholder="Order"
              type="number"
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[13px] outline-none placeholder:text-gray-300"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-white"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving || !question.trim() || !answer.trim()}
              className="flex min-w-27.5 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-pink-200 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              {saving ? "Saving…" : "Save FAQ"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="text-[11px] font-semibold tracking-wide text-gray-400">
              <th className="pb-3 pr-4">QUESTION</th>
              <th className="pb-3 pr-4">ANSWER PREVIEW</th>
              <th className="pb-3 pr-4">CATEGORY</th>
              <th className="pb-3 pr-4">STATUS</th>
              <th className="pb-3 pr-4">LAST UPDATED</th>
              <th className="pb-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} className="border-t border-gray-50">
                <td className="max-w-55 py-3.5 pr-4">
                  <p className="truncate font-medium text-gray-900">
                    {f.question}
                  </p>
                  <p className="text-[11px] text-gray-300">{f.id}</p>
                </td>
                <td className="max-w-65 py-3.5 pr-4 truncate text-gray-500">
                  {f.answerPreview}
                </td>
                <td className="py-3.5 pr-4">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-500">
                    {f.category}
                  </span>
                </td>
                <td className="py-3.5 pr-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                      f.status === "Published"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-gray-400">{f.lastUpdated}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="rounded-full p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-full p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(f.id)}
                      disabled={deletingId === f.id}
                      className="rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      {deletingId === f.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {faqs.length === 0 && (
          <p className="py-10 text-center text-[13px] text-gray-400">
            No FAQs match your search.
          </p>
        )}
      </div>
    </section>
  );
}
