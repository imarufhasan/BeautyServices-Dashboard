"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { avatarColor } from "@/lib/avatar-color";
import { VERIFICATION_REQUESTS } from "./verificationRequests";
import Link from "next/link";

const VERIFICATION_STATS = [
  {
    value: "23",
    label: "Pending Reviews",
    icon: "⏱️",
    color: "text-brand-pinkDeep",
    bgColor: "bg-[#FBE2E9]",
  },
  {
    value: "8",
    label: "Approved Today",
    icon: "✓",
    color: "text-success",
    bgColor: "bg-[#DDF3E7]",
  },
  {
    value: "2",
    label: "Rejected Today",
    icon: "✗",
    color: "text-destructive",
    bgColor: "bg-[#FBE2E2]",
  },
  {
    value: "4.2h",
    label: "Avg Review Time",
    icon: "⚡",
    color: "text-[#3E6FE0]",
    bgColor: "bg-[#E1EAFB]",
  },
];

export default function VerificationPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const ITEMS_PER_PAGE = 10;

  // Search filter
  // const filteredRequests = VERIFICATION_REQUESTS.filter((req) =>
  //   `${req.name} ${req.businessName} ${req.email} ${req.category}`
  //     .toLowerCase()
  //     .includes(search.toLowerCase()),
  // );
  const filteredRequests = VERIFICATION_REQUESTS.filter((req) => {
    const matchesSearch =
      `${req.name} ${req.businessName} ${req.email} ${req.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);

  const paginatedRequests = filteredRequests.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <>
      <Topbar section="memillennial" page="Verification Approvals" />

      <main className="p-4 md:p-6 space-y-6">
        {/* Header */}

        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            Verification Approvals
          </h1>

          <p className="text-sm text-subtle mt-0.5">
            Review and approve artist verification requests
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VERIFICATION_STATS.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className={`text-2xl font-extrabold ${stat.color}`}>
                    {stat.value}
                  </p>

                  <p className="text-xs text-subtle mt-1.5">{stat.label}</p>
                </div>

                <div
                  className={`
                    w-9 h-9 rounded-lg 
                    flex items-center justify-center
                    text-lg
                    ${stat.bgColor}
                    `}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search */}

        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                icon={<Search size={15} />}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by artist or business name..."
              />
            </div>

            {/* <button
              className="
              h-11 px-4 rounded-md 
              border border-hairline 
              bg-white
              flex items-center gap-2
              text-sm font-semibold
              text-ink
              hover:bg-muted
              "
            >
              Filter
              <ChevronDown size={14} className="text-subtle" />
            </button> */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="h-11 px-4 rounded-md border border-hairline bg-white flex items-center gap-2 text-sm font-semibold text-ink hover:bg-muted"
              >
                Status
                {statusFilter !== "All" && (
                  <span className="bg-brand-pinkDeep text-white text-[10px] px-2 py-0.5 rounded-full">
                    {statusFilter}
                  </span>
                )}
                <ChevronDown size={14} className="text-subtle" />
              </button>

              {showStatusMenu && (
                <div className="absolute top-12 right-0 w-44 bg-white border border-hairline rounded-xl shadow-lg z-50 p-2">
                  {["All", "Pending", "Approved", "Rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setPage(1);
                        setShowStatusMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-muted"
                    >
                      {status === "All" ? "All Status" : status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Table */}

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr
                  className="
                text-[10px]
                uppercase
                tracking-wide
                text-subtle
                border-b
                border-hairline
                bg-muted/30
                "
                >
                  <th className="text-left px-5 py-3">Artist</th>

                  <th className="text-left px-3 py-3">Business Name</th>

                  <th className="text-left px-3 py-3">Category</th>

                  <th className="text-left px-3 py-3">Submitted</th>

                  <th className="text-left px-3 py-3">Status</th>

                  <th className="text-center px-3 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-sm text-subtle"
                    >
                      No verification requests found
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="
                    border-b
                    border-hairline
                    hover:bg-muted/50
                    transition-colors
                    "
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback
                              className={`
                            ${avatarColor(req.name)}
                            text-ink
                            text-sm
                            font-bold
                            `}
                            >
                              {req.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="text-xs font-bold text-ink">
                              {req.name}
                            </p>

                            <p className="text-[10px] text-subtle mt-1">
                              {req.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-xs font-semibold text-ink">
                          {req.businessName}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <Badge
                          variant="info"
                          className={`
                        ${req.categoryBg}
                        ${req.categoryColor}
                        `}
                        >
                          {req.category}
                        </Badge>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-xs text-subtle">{req.submitted}</p>
                      </td>

                      <td className="px-3 py-4">
                        <Badge variant={req.statusVariant}>{req.status}</Badge>
                      </td>

                      <td className="px-3 py-4 text-center">
                        <Button
                          asChild
                          size="sm"
                          className=" bg-brand-gradient text-white  hover:opacity-90"
                        >
                          <Link href={`/verification/${req.id}`}>✓ Review</Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-3
            items-center
            justify-between
            px-5
            py-4
            border-t
            border-hairline
            bg-muted/20
            "
          >
            <p className="text-xs text-subtle font-medium">
              Showing{" "}
              {filteredRequests.length === 0
                ? 0
                : (page - 1) * ITEMS_PER_PAGE + 1}
              {" - "}
              {Math.min(page * ITEMS_PER_PAGE, filteredRequests.length)}
              {" of "}
              {filteredRequests.length}
              {" verification requests"}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="
                w-8 h-8
                rounded-md
                border
                border-hairline
                flex
                items-center
                justify-center
                disabled:opacity-40
                "
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`
                    w-8 h-8
                    rounded-md
                    text-xs
                    font-bold
                    ${
                      page === index + 1
                        ? "bg-brand-gradient text-white"
                        : "border border-hairline text-ink"
                    }
                    `}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="
                w-8 h-8
                rounded-md
                border
                border-hairline
                flex
                items-center
                justify-center
                disabled:opacity-40
                "
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
